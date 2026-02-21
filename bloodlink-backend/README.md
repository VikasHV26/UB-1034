# BloodLink Backend API

A FastAPI-based blood management system backend that handles authentication, blood inventory management, patient requests, and hospital operations.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Features](#features)
- [Configuration](#configuration)
- [Database](#database)
- [Authentication](#authentication)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

BloodLink Backend is a comprehensive blood donation and management system that enables:

- **User Management**: Registration and authentication via Google OAuth
- **Role-Based Access Control**: Patient, Hospital, Blood Bank, and Admin roles
- **Blood Inventory Management**: Track blood units by type and location
- **Patient Requests**: Create and manage blood requests
- **Hospital Operations**: Process and manage patient blood requests
- **Emergency Requests**: Handle urgent blood requirements
- **Notifications**: Real-time alerts via WhatsApp and email

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| **Framework** | FastAPI 0.104+ |
| **Language** | Python 3.9+ |
| **Database** | SQLite3 |
| **Authentication** | Google OAuth 2.0 + JWT |
| **Security** | python-jose, passlib |
| **HTTP Client** | requests |
| **Notifications** | Twilio WhatsApp, SMTP |
| **CORS** | FastAPI CORS Middleware |
| **Server** | Uvicorn |

---

## 📁 Project Structure

```
bloodlink-backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # Application entry point
│   ├── config.py               # Configuration settings
│   ├── database.py             # Database connection & queries
│   │
│   ├── middleware/
│   │   ├── __init__.py
│   │   └── auth_middleware.py  # JWT authentication middleware
│   │
│   ├── models/
│   │   ├── schema.sql          # Database schema
│   │   └── seed.sql            # Sample data
│   │
│   ├── routers/
│   │   ├── __init__.py
│   │   ├── admin.py            # Admin endpoints
│   │   ├── auth.py             # Authentication endpoints
│   │   ├── bloodbank.py        # Blood Bank operations
│   │   ├── dashboard.py        # Dashboard data endpoints
│   │   ├── emergency.py        # Emergency request endpoints
│   │   ├── hospital.py         # Hospital operations
│   │   ├── patient.py          # Patient operations
│   │   ├── requests.py         # Blood request endpoints
│   │   └── users.py            # User management
│   │
│   └── services/
│       ├── __init__.py
│       ├── matching_service.py      # Blood request matching
│       ├── notification_service.py  # Email/SMS notifications
│       └── whatsapp_service.py      # WhatsApp integration
│
├── requirements.txt            # Python dependencies
└── README.md                  # This file
```

---

## 🚀 Setup & Installation

### Prerequisites

- Python 3.9 or higher
- pip (Python package manager)
- Google OAuth 2.0 credentials
- Twilio account (for WhatsApp notifications)
- SMTP server access (for email notifications)

### Step 1: Clone & Navigate

```bash
cd c:\Bloodlink\bloodlink-backend
```

### Step 2: Create Virtual Environment

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 4: Configure Environment

Create a `.env` file in the root directory:

```env
# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id_here

# Database
DATABASE_URL=sqlite:///./app.db

# JWT Secret
SECRET_KEY=bloodlink_secret_key

# Twilio WhatsApp
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+1234567890

# SMTP Configuration
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_password
```

### Step 5: Initialize Database

```bash
python -c "from app.database import init_db; init_db()"
```

---

## ▶️ Running the Application

### Development Mode (with auto-reload)

```bash
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Output**:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete
```

### Production Mode

```bash
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

### Access Points

- **API Documentation**: http://localhost:8000/docs (Swagger UI)
- **Alternative Docs**: http://localhost:8000/redoc (ReDoc)
- **Health Check**: http://localhost:8000/health (if implemented)

---

## 📡 API Endpoints

### Authentication Endpoints

#### 1. Google Login
```
POST /auth/google-login
Content-Type: application/json

{
  "token": "google_token_string",
  "role": "patient|hospital|bloodbank|admin",
  "phone": "optional_phone",
  "blood_group": "optional_blood_group",
  "city": "optional_city"
}

Response:
{
  "access_token": "jwt_token",
  "role": "selected_role"
}
```

#### 2. Get Current User
```
GET /users/me
Authorization: Bearer {access_token}

Response:
{
  "id": 1,
  "google_id": "user_google_id",
  "name": "User Name",
  "email": "user@example.com",
  "role": "patient",
  "blood_group": "O+",
  "city": "New York"
}
```

### Patient Endpoints

#### 1. Create Blood Request
```
POST /patient/requests
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "blood_group": "A+",
  "units_required": 2,
  "request_type": "immediate|scheduled",
  "scheduled_date": "2026-02-25",
  "city": "New York"
}

Response:
{
  "id": 1,
  "patient_id": 1,
  "blood_group": "A+",
  "units_required": 2,
  "status": "pending",
  "created_at": "2026-02-21T10:30:00"
}
```

#### 2. Get Patient Requests
```
GET /patient/requests
Authorization: Bearer {access_token}

Response: List of user's blood requests
```

#### 3. Get Dashboard Data
```
GET /patient/dashboard
Authorization: Bearer {access_token}

Response:
{
  "total_requests": 5,
  "pending_requests": 2,
  "fulfilled_requests": 3,
  "recent_requests": [...]
}
```

### Hospital Endpoints

#### 1. Get Patient Requests
```
GET /hospital/requests
Authorization: Bearer {access_token}

Response: List of all patient requests for processing
```

#### 2. Update Request Status
```
PUT /hospital/requests/{request_id}?status=approved|rejected|fulfilled
Authorization: Bearer {access_token}

Response:
{
  "message": "Request status updated",
  "status": "approved"
}
```

### Blood Bank Endpoints

#### 1. Get Inventory
```
GET /bloodbank/inventory
Authorization: Bearer {access_token}

Response:
[
  {
    "id": 1,
    "blood_group": "O+",
    "units_available": 50,
    "expiry_date": "2026-03-21"
  }
]
```

#### 2. Add Blood Inventory
```
POST /bloodbank/inventory
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "blood_group": "A+",
  "units_available": 20,
  "expiry_date": "2026-03-21"
}

Response:
{
  "id": 1,
  "blood_group": "A+",
  "units_available": 20
}
```

#### 3. Delete Inventory
```
DELETE /bloodbank/inventory/{inventory_id}
Authorization: Bearer {access_token}

Response:
{
  "message": "Inventory deleted successfully"
}
```

### Dashboard Endpoints

#### 1. Get Dashboard Stats
```
GET /dashboard/stats
Authorization: Bearer {access_token}

Response:
{
  "role": "patient",
  "total_requests": 5,
  "pending": 2,
  "fulfilled": 3,
  "urgent_requests": 1
}
```

### Emergency Endpoints

#### 1. Create Emergency Request
```
POST /emergency/requests
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "blood_group": "O-",
  "units_required": 10,
  "latitude": 40.7128,
  "longitude": -74.0060
}

Response:
{
  "id": 1,
  "status": "active",
  "created_at": "2026-02-21T10:30:00"
}
```

#### 2. Get Active Emergency Requests
```
GET /emergency/requests
Authorization: Bearer {access_token}

Response: List of active emergency requests
```

---

## ✨ Features

### 1. **User Authentication**
- Google OAuth 2.0 integration
- JWT token-based authentication
- Role-based access control (4 roles: Patient, Hospital, Blood Bank, Admin)
- Secure token storage in database

### 2. **Blood Inventory Management**
- Track blood units by type
- Monitor expiry dates
- Update availability in real-time
- Multiple blood bank support

### 3. **Patient Blood Requests**
- Create immediate or scheduled requests
- Specify blood type and quantity
- Location-based filtering
- Request status tracking

### 4. **Hospital Operations**
- View all patient requests
- Approve/reject requests
- Mark requests as fulfilled
- Hospital-specific dashboard

### 5. **Blood Bank Operations**
- Manage inventory (add/delete units)
- Track blood availability
- Monitor expiry dates
- Blood Bank dashboard

### 6. **Emergency Management**
- Create urgent blood requests
- Location-based emergency routing
- Real-time notifications
- Priority handling

### 7. **Notifications**
- WhatsApp alerts for requests
- Email notifications
- SMS reminders
- Configurable message templates

### 8. **Dashboard & Analytics**
- Role-specific dashboards
- Request statistics
- Inventory overview
- Performance metrics

---

## ⚙️ Configuration

### Database Configuration

Located in `app/config.py`:

```python
DATABASE_URL = "sqlite:///./app.db"
SQLITE_URL = "sqlite:///./app.db"
```

For PostgreSQL, change to:
```python
DATABASE_URL = "postgresql://user:password@localhost/bloodlink"
```

### JWT Configuration

```python
SECRET_KEY = "bloodlink_secret_key"  # Change in production!
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60
```

### CORS Configuration

```python
CORS_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
]
```

---

## 💾 Database

### Schema Overview

The database includes the following tables:

| Table | Purpose |
|-------|---------|
| `users` | User accounts with roles |
| `hospitals` | Hospital profiles |
| `blood_banks` | Blood bank information |
| `blood_inventory` | Blood unit tracking |
| `patient_requests` | Patient blood requests |
| `emergency_requests` | Urgent blood requests |
| `notifications` | Notification history |

### Initialize Database

```bash
# Create fresh database with schema
python -c "from app.database import init_db; init_db()"

# Seed sample data (if available)
python -c "from app.database import seed_db; seed_db()"
```

### Database File Location

```
bloodlink-backend/app.db  (SQLite file)
```

---

## 🔐 Authentication

### How Authentication Works

1. **User logs in with Google OAuth**
   - Frontend sends Google token to backend
   - Backend verifies token with Google API
   - Backend checks/creates user in database

2. **Backend creates JWT token**
   - Token includes user_id and role
   - Expires in 60 minutes (configurable)

3. **Frontend stores JWT token**
   - Stored in localStorage
   - Sent with every API request

4. **Middleware validates token**
   - Every protected route checks JWT
   - Extracts user_id and role
   - Validates authorization level

### Protected Routes

All routes starting with `/patient`, `/hospital`, `/bloodbank`, `/admin` require:

```
Authorization: Bearer {jwt_token}
```

### Role-Based Access Control

| Role | Permissions |
|------|------------|
| **Patient** | Create requests, view own requests, dashboard |
| **Hospital** | View requests, update status, dashboard |
| **Blood Bank** | Manage inventory, view inventory, dashboard |
| **Admin** | All operations, user management |

---

## 🔧 Development

### Adding New Endpoints

1. Create a new router file in `routers/`
2. Define Pydantic models for request/response
3. Implement endpoint with role validation
4. Include proper error handling
5. Document the endpoint

Example:

```python
from fastapi import APIRouter, HTTPException, Depends
from app.middleware.auth_middleware import get_current_user

router = APIRouter(prefix="/example", tags=["Example"])

@router.get("/data")
def get_data(current_user: dict = Depends(get_current_user)):
    if current_user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    return {"data": "example"}
```

### Adding New Database Models

1. Update `models/schema.sql`
2. Add CREATE TABLE statement
3. Include foreign keys if needed
4. Update `database.py` connection handlers
5. Reinitialize database for testing

---

## 🐛 Troubleshooting

### Issue: "Invalid Google Token"

**Solution**:
- Verify Google Client ID in code matches Google Cloud Console
- Check token hasn't expired (valid for ~1 hour)
- Ensure GOOGLE_CLIENT_ID environment variable is set

### Issue: "CORS Error"

**Solution**:
- Check frontend URL is in CORS_ORIGINS list in `main.py`
- Ensure backend is running on correct port (8000)
- Clear browser cache and hard refresh

### Issue: "Database Locked"

**Solution**:
```bash
# Stop backend server
# Delete app.db
rm app.db

# Restart backend
python -m uvicorn app.main:app --reload
```

### Issue: "401 Unauthorized"

**Solution**:
- Verify JWT token is sent in Authorization header
- Check token hasn't expired
- Ensure token format is: `Bearer {token}`

### Issue: "403 Forbidden"

**Solution**:
- Verify user role matches endpoint requirements
- Check user role in database
- Ensure role is "patient", "hospital", "bloodbank", or "admin"

---

## 📊 Performance Tips

1. **Use pagination** for large data sets
2. **Add database indexes** for frequently queried fields
3. **Cache responses** using Redis (optional)
4. **Use connection pooling** for database
5. **Monitor API response times** using APM tools

---

## 🔒 Security Best Practices

1. **Never commit `.env`** file to git
2. **Change `SECRET_KEY`** in production
3. **Use HTTPS** in production
4. **Validate all input** data
5. **Rate limit** API endpoints
6. **Log all access** for audit trail
7. **Regular security updates** for dependencies

---

## 📦 Dependencies

Key packages used:

```
fastapi==0.104.1          # Web framework
uvicorn==0.24.0           # ASGI server
pydantic==2.5.0           # Data validation
python-jose==3.3.0        # JWT handling
passlib==1.7.4            # Password hashing
google-auth==2.25.0       # Google OAuth
requests==2.31.0          # HTTP client
twilio==8.10.0            # WhatsApp
python-multipart==0.0.6   # Form data
```

Full list: See `requirements.txt`

---

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Create a pull request
5. Code review required before merge

---

## 📄 License

This project is part of the BloodLink Blood Management System.

---

## 📞 Support

For issues or questions:

1. Check the Troubleshooting section
2. Review API documentation at `/docs`
3. Check application logs for errors
4. Contact the development team

---

## 🚀 Deployment

### Using Docker

```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

Build and run:
```bash
docker build -t bloodlink-backend .
docker run -p 8000:8000 bloodlink-backend
```

### Using Heroku

```bash
heroku create bloodlink-backend
git push heroku main
```

---

## 📝 API Response Formats

### Success Response (200 OK)

```json
{
  "id": 1,
  "name": "Example",
  "status": "success"
}
```

### Error Response (400/401/403/500)

```json
{
  "detail": "Error message explaining what went wrong"
}
```

---

**Version**: 1.0  
**Last Updated**: February 2026  
**Status**: Production Ready ✅
