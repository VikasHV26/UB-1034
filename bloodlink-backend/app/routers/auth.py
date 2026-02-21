from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from datetime import datetime, timedelta
from jose import jwt
from app.database import get_connection
from google.oauth2 import id_token
from google.auth.transport import requests

# =============================
# CONFIG
# =============================

SECRET_KEY = "bloodlink_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

GOOGLE_CLIENT_ID = "165842518661-2smkv2bkh6k3gm97pvveqjiioh4f5ts3.apps.googleusercontent.com"

router = APIRouter(prefix="/auth", tags=["Auth"])

# =============================
# REQUEST MODEL
# =============================

class GoogleLogin(BaseModel):
    token: str
    role: str
    phone: str | None = None
    blood_group: str | None = None
    city: str | None = None


# =============================
# CREATE JWT
# =============================

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# =============================
# GOOGLE LOGIN
# =============================

@router.post("/google-login")
def google_login(payload: GoogleLogin):

    # 1️⃣ Verify Google Token
    try:
        idinfo = id_token.verify_oauth2_token(
            payload.token,
            requests.Request(),
            GOOGLE_CLIENT_ID
        )

        google_id = idinfo["sub"]
        name = idinfo.get("name")
        email = idinfo.get("email")

    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid Google token")

    conn = get_connection()
    cursor = conn.cursor()

    # 2️⃣ Check if user exists
    cursor.execute(
        "SELECT * FROM users WHERE google_id = ?",
        (google_id,)
    )
    user = cursor.fetchone()

    # 3️⃣ If not, create user. If exists, update role + other fields
    if not user:
        cursor.execute("""
            INSERT INTO users 
            (google_id, role, name, email, phone, blood_group, city)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (
            google_id,
            payload.role,
            name,
            email,
            payload.phone,
            payload.blood_group,
            payload.city
        ))
    else:
        # ✅ Update existing user with new role and optional fields
        cursor.execute("""
            UPDATE users
            SET role = ?, phone = COALESCE(?, phone), blood_group = COALESCE(?, blood_group), city = COALESCE(?, city)
            WHERE google_id = ?
        """, (
            payload.role,
            payload.phone,
            payload.blood_group,
            payload.city,
            google_id
        ))
    
    conn.commit()

    # 4️⃣ Fetch updated user
    cursor.execute(
        "SELECT * FROM users WHERE google_id = ?",
        (google_id,)
    )
    user = cursor.fetchone()

    
    # 5️⃣ Create JWT
    access_token = create_access_token({
        "user_id": user["id"],
        "role": user["role"]
    })

    conn.close()

    return {
        "access_token": access_token,
        "role": user["role"]
    }