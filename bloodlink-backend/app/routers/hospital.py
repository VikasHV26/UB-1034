from fastapi import APIRouter, Depends, HTTPException
from app.middleware.auth_middleware import get_current_user
from app.database import get_connection

router = APIRouter(prefix="/hospital", tags=["Hospital"])


# 🔹 Get All Requests
@router.get("/requests")
def get_all_requests(current_user: dict = Depends(get_current_user)):
    if current_user["role"] != "hospital":
        raise HTTPException(status_code=403, detail="Only hospitals allowed")

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT pr.id,
               u.name as patient_name,
               pr.blood_group,
               pr.units_required,
               pr.status,
               pr.created_at
        FROM patient_requests pr
        JOIN users u ON pr.patient_id = u.id
        ORDER BY pr.created_at DESC
    """)

    rows = cursor.fetchall()
    conn.close()

    return [dict(row) for row in rows]


# 🔹 Approve / Reject Request
@router.put("/requests/{request_id}")
def update_request_status(
    request_id: int,
    status: str,
    current_user: dict = Depends(get_current_user)
):
    if current_user["role"] != "hospital":
        raise HTTPException(status_code=403, detail="Only hospitals allowed")

    conn = get_connection()
    cursor = conn.cursor()

    # 🔹 Get request
    cursor.execute("""
        SELECT blood_group, units_required
        FROM patient_requests
        WHERE id = ?
    """, (request_id,))
    request = cursor.fetchone()

    if not request:
        raise HTTPException(status_code=404, detail="Request not found")

    blood_group = request["blood_group"]
    units_required = request["units_required"]

    # 🔹 If approving, check inventory
    if status == "approved":

        cursor.execute("""
            SELECT id, units_available
            FROM blood_inventory
            WHERE LOWER(blood_group) = LOWER(?)
            ORDER BY units_available DESC
        """, (blood_group,))

        inventory = cursor.fetchone()

        if not inventory:
            raise HTTPException(status_code=400, detail="No blood stock available")

        if inventory["units_available"] < units_required:
            raise HTTPException(status_code=400, detail="Insufficient stock")

        new_units = inventory["units_available"] - units_required

        cursor.execute("""
            UPDATE blood_inventory
            SET units_available = ?
            WHERE id = ?
        """, (new_units, inventory["id"]))

    # 🔹 Update request status
    cursor.execute("""
        UPDATE patient_requests
        SET status = ?
        WHERE id = ?
    """, (status, request_id))

    conn.commit()
    conn.close()

    return {"message": f"Request {status} successfully"}