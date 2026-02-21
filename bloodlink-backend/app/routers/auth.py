from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from datetime import datetime, timedelta
from jose import jwt
from app.database import get_connection
from google.oauth2 import id_token
from google.auth.transport import requests

class GoogleLogin(BaseModel):
    token: str
    role: str


SECRET_KEY = "bloodlink_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

router = APIRouter(prefix="/auth", tags=["Auth"])

# -----------------------------
# Request Models
# -----------------------------

class GoogleLogin(BaseModel):
    google_id: str
    name: str
    email: str
    role: str  # donor / patient


# -----------------------------
# Create JWT Token
# -----------------------------

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# -----------------------------
# Google Login (Hackathon Mock)
# -----------------------------





@router.post("/google-login")
def google_login(payload: GoogleLogin):
    try:
        idinfo = id_token.verify_oauth2_token(
            payload.token,
            requests.Request(),
            "165842518661-2smkv2bkh6k3gm97pvveqjiioh4f5ts3.apps.googleusercontent.com"
        )

        google_id = idinfo["sub"]
        name = idinfo["name"]
        email = idinfo["email"]

    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid Google token")

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM users WHERE google_id = ?",
        (google_id,)
    )
    user = cursor.fetchone()

    if not user:
        cursor.execute("""
            INSERT INTO users (google_id, role, name, email)
            VALUES (?, ?, ?, ?)
        """, (
            google_id,
            payload.role,
            name,
            email
        ))
        conn.commit()

        cursor.execute(
            "SELECT * FROM users WHERE google_id = ?",
            (google_id,)
        )
        user = cursor.fetchone()

    token = create_access_token({
        "user_id": user["id"],
        "role": user["role"]
    })

    conn.close()

    return {
        "access_token": token,
        "role": user["role"]
    }