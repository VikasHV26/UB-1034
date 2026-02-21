# Hospital & Blood Bank Login - Debugging Guide

## 🔍 If Tests Still Fail

Use this guide to debug any remaining issues.

---

## 1. Check Backend auth.py Endpoint

### Verify the FIX is in place

```python
# Look for this pattern in auth.py around line 75-110
if not user:
    # CREATE user
else:
    # ✅ UPDATE user (this is the fix!)
    cursor.execute("""UPDATE users SET role = ...""")

# Then always fetch
cursor.execute("SELECT * FROM users WHERE google_id = ?")
user = cursor.fetchone()
```

**Check Command**:
```bash
grep -n "UPDATE users" app/routers/auth.py
```

Should show output like: `XX:            UPDATE users`

---

## 2. Add Logging to Backend

If the fix is in place but still not working, add logging to see what's happening:

### Edit `app/routers/auth.py`

At line 65, add this after parsing the Google token:

```python
print(f"🔐 Google Login Attempt:")
print(f"  Google ID: {google_id}")
print(f"  Email: {email}")
print(f"  Requested Role: {payload.role}")  # ← What role is being sent?
```

After the UPDATE/INSERT, add this (around line 110):

```python
print(f"✅ User in Database After Login:")
print(f"  User ID: {user['id']}")
print(f"  Stored Role: {user['role']}")  # ← Is role updated?
```

### Run Backend with Logging

```bash
cd bloodlink-backend
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

When you login, watch the terminal for the print statements.

---

## 3. Check Frontend Login Component

### Verify Role is Being Sent

Edit `src/features/auth/Login.tsx`, in the `handleSuccess` function:

```typescript
const handleSuccess = async (credentialResponse: any) => {
  try {
    setLoading(true);
    setError("");
    
    console.log("🔐 Sending login request:", {
      role: role,  // ← What role is selected?
      token: credentialResponse.credential.substring(0, 20) + "..."
    });
    
    const response = await API.post("/auth/google-login", {
      token: credentialResponse.credential,
      role: role
    });

    console.log("✅ Backend response:", response.data);  // ← What did backend return?
    
    // ... rest of code
  }
};
```

### Run Frontend with Logging

Open Browser DevTools (F12 → Console), then login. You'll see:
- What role is being sent
- What the backend returns
- Any errors

---

## 4. Verify Database State

### Check What's Actually in Database

Stop backend with Ctrl+C, then:

```bash
cd bloodlink-backend
sqlite3 app.db  # Opens SQLite CLI
```

Then run:

```sql
-- See all users
SELECT id, google_id, role, name, email FROM users;

-- See a specific user by email
SELECT id, google_id, role, name, email FROM users WHERE email = 'your-email@gmail.com';
```

**What to look for**:
- ✅ Should show ONE row per unique Google account
- ✅ Role should be the MOST RECENT role that was selected
- ❌ Should NOT show multiple rows for same email

---

## 5. Check LocalStorage in Browser

Open DevTools (F12), go to **Application** tab → **Local Storage** → Click your localhost URL

**What to look for**:

| Key | Expected Value | Status |
|-----|-----------------|--------|
| `token` | Long JWT string (starts with `eyJ`) | ✅ |
| `role` | `hospital` or `bloodbank` | ✅ |

If these are correct but dashboard is wrong, problem is in DashboardRouter.

---

## 6. Test Auth Middleware

The auth middleware checks if JWT tokens are valid.

### Verify auth middleware exists

```bash
cat app/middleware/auth_middleware.py
```

Should show:
- `get_current_user()` function
- `require_role()` function
- JWT decoding with SECRET_KEY

---

## 7. Check Hospital & Blood Bank Endpoints

### Hospital Endpoint

```bash
# Should return 403 if not hospital role
curl -X GET http://localhost:8000/hospital/requests \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json"
```

**Expected**:
- ✅ 200 with data (if role is "hospital")
- ❌ 403 Forbidden (if role is not "hospital")

### Blood Bank Endpoint

```bash
# Should return 403 if not bloodbank role
curl -X GET http://localhost:8000/bloodbank/inventory \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json"
```

**Expected**:
- ✅ 200 with data (if role is "bloodbank")
- ❌ 403 Forbidden (if role is not "bloodbank")

---

## 8. Common Errors & Solutions

### Error: "Unexpected token < in JSON"
- **Cause**: Backend returning HTML error instead of JSON
- **Solution**: Check backend terminal for error, fix the issue, restart backend

### Error: "Access denied for this role"
- **Cause**: JWT has wrong role or middleware isn't extracting it correctly
- **Solution**: 
  1. Check `user["role"]` in auth.py matches selected role
  2. Check JWT payload contains role
  3. Check middleware is extracting role from JWT

### Error: "Invalid Google token"
- **Cause**: Google Client ID doesn't match or token is expired
- **Solution**: 
  1. Verify `GOOGLE_CLIENT_ID` in auth.py matches `.env.local`
  2. Try fresh Google login (don't use cached tokens)

### Error: "CORS error" or "No 'Access-Control-Allow-Origin' header"
- **Cause**: Backend CORS not configured for frontend URL
- **Solution**: Check `main.py` has correct CORS setup

---

## 9. Reset Database (Nuclear Option)

If database gets corrupted or has bad data:

```bash
cd bloodlink-backend

# Delete the database
rm app.db

# Reinitialize it
python -c "from app.database import init_db; init_db()"

# Or if that doesn't work, delete and restart backend
rm app.db
python -m uvicorn app.main:app --reload
```

This creates a fresh database with correct schema.

---

## 10. Full Debug Workflow

If Hospital/Blood Bank login STILL doesn't work after the fix, follow this:

### Step 1: Backend Verification
```bash
# 1. Check auth.py has the UPDATE statement
grep -n "UPDATE users" app/routers/auth.py

# 2. Add logging and watch terminal
python -m uvicorn app.main:app --reload
# Try login, watch for print statements
```

### Step 2: Frontend Verification
```bash
# 1. Open DevTools (F12)
# 2. Go to Console tab
# 3. Login with Hospital role
# 4. Look for console.log statements showing:
#    - Sent role: hospital
#    - Received role: hospital
```

### Step 3: Database Verification
```bash
# 1. Stop backend (Ctrl+C)
# 2. sqlite3 app.db
# 3. SELECT * FROM users WHERE email = 'your-email';
# 4. Check role column matches last login role
```

### Step 4: Token Verification
```bash
# 1. F12 → Application → LocalStorage
# 2. Check token and role keys exist
# 3. token should start with "eyJ"
# 4. role should be "hospital" or "bloodbank"
```

### Step 5: Endpoint Verification
```bash
# Test with curl if steps 1-4 look good
curl -X GET http://localhost:8000/hospital/requests \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📋 Debug Checklist

- [ ] auth.py has UPDATE statement (grep check)
- [ ] Backend logging shows correct role being received
- [ ] Backend logging shows role being stored
- [ ] Frontend console shows correct role sent
- [ ] Frontend console shows correct role received
- [ ] localStorage shows correct role
- [ ] Database shows correct role in users table
- [ ] Endpoint test returns 200 (not 403)
- [ ] DashboardRouter shows correct dashboard

If all checkboxes pass but Hospital/Blood Bank still doesn't work, something unexpected is happening. Document the issue and check with the development team.

---

## 🆘 Still Stuck?

Collect this information and share:

1. **Screenshot of the problem**
2. **Backend terminal output** (with logging added)
3. **Browser console error** (F12 → Console)
4. **Network tab response** (F12 → Network → google-login)
5. **Database query result** (SELECT * FROM users WHERE email = '...')
6. **localStorage values** (F12 → Application → LocalStorage)

This will help pinpoint exactly where the problem is.

---

**Status**: Debugging Guide ✅
**Last Updated**: Today
