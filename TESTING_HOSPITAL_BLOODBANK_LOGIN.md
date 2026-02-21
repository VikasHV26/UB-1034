# Hospital & Blood Bank Login Testing Guide

## 🚀 What Was Fixed

The backend auth endpoint (`app/routers/auth.py`) has been updated to **properly update the user's role when they log in with a different role**. Previously, if a user logged in as a Patient and then tried to log in as a Hospital, the system would keep them as a Patient because it didn't update the existing user's role.

### Key Changes:
```python
# OLD CODE - Did not update role for existing users
if not user:
    CREATE user
    # Returns user with old role if already exists!

# NEW CODE - Updates role for all logins
if not user:
    CREATE user
else:
    UPDATE user role and other fields

# Always fetch the updated user
user = fetch latest user from database
```

---

## ✅ Testing Checklist

### Step 1: Start the Application

#### Backend:
```bash
cd bloodlink-backend
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
Should see: `Uvicorn running on http://0.0.0.0:8000`

#### Frontend:
```bash
cd bloodlink-frontend
npm run dev
```
Should see: `VITE v... ready in ... ms` and local URL like `http://localhost:5173`

---

### Step 2: Test Patient Login (Should Already Work)

1. Open http://localhost:5173
2. Click "Login" button
3. On login page:
   - **👤 Patient** button should be selected (highlighted in red)
   - Role description shows "Request blood when needed"
4. Click "Sign in with Google"
5. Complete Google OAuth flow
6. **Expected Result**: 
   - Redirects to `/dashboard`
   - Shows "👤 Patient Dashboard" with "Create Blood Request" form
   - Navbar shows `👤 patient` badge
   - Sidebar stats show "Total Requests", "Pending Requests", etc.

---

### Step 3: Test Hospital Login (This Was Broken)

1. From Patient Dashboard, click **Logout** button
2. Back on Login page:
   - Click **🏥 Hospital** button
   - Role description changes to "Manage patient requests"
3. Click "Sign in with Google"
4. Use the **SAME Google account** as Patient login
5. **Expected Result**:
   - Redirects to `/dashboard`
   - Shows "🏥 Hospital Dashboard" with "Blood Requests Management" table
   - Navbar shows `🏥 hospital` badge
   - Sidebar stats show "Total Requests", "Pending Requests", "Fulfilled", "Cancelled"
   - **NOT** showing Patient Dashboard

---

### Step 4: Test Blood Bank Login (This Was Broken)

1. From Hospital Dashboard, click **Logout** button
2. Back on Login page:
   - Click **🩸 Blood Bank** button
   - Role description changes to "Manage your inventory"
3. Click "Sign in with Google"
4. Use the **SAME Google account** again
5. **Expected Result**:
   - Redirects to `/dashboard`
   - Shows "🩸 Blood Bank Dashboard" with "Blood Inventory Management" form and table
   - Navbar shows `🩸 bloodbank` badge
   - Sidebar stats show "Total Units", "A+ Units", "B+ Units", "AB- Units", "O+ Units", "O- Units"
   - **NOT** showing Patient Dashboard

---

### Step 5: Test Role Switching

1. **Patient → Hospital**:
   - Logout from Patient
   - Select Hospital role
   - Login with same Google
   - ✅ Should show Hospital Dashboard

2. **Hospital → Blood Bank**:
   - Logout from Hospital
   - Select Blood Bank role
   - Login with same Google
   - ✅ Should show Blood Bank Dashboard

3. **Blood Bank → Patient**:
   - Logout from Blood Bank
   - Select Patient role
   - Login with same Google
   - ✅ Should show Patient Dashboard

---

## 🔍 Debugging Tips

### If Patient Login Works But Hospital/Blood Bank Fails:

#### Check Browser Console
Press `F12`, go to **Console** tab:
- Look for red error messages
- Check the error details

#### Check Network Tab (F12 → Network)
When clicking login:
1. Find `google-login` request
2. Click it and go to **Response** tab
3. Look for:
   - `"role": "hospital"` or `"role": "bloodbank"` ✅
   - Any error messages ❌

#### Check LocalStorage (F12 → Application → Local Storage)
After successful login:
- `token`: Should have a long JWT string
- `role`: Should match the dashboard (hospital or bloodbank)

### If Backend Errors Appear:

#### Check Backend Terminal
Look for error messages when login happens:
- `Invalid Google token` - Google OAuth issue
- `400 Bad Request` - Malformed request
- `500 Internal Server Error` - Database or code issue

---

## 📊 Expected Database State

After testing all three roles with the same Google account:

```sql
SELECT google_id, role, name, email FROM users WHERE email = 'your-email@gmail.com';
```

Should show **ONE row** with the **MOST RECENT role**:
- If you logged in as Patient last: `role = 'patient'`
- If you logged in as Hospital last: `role = 'hospital'`
- If you logged in as Blood Bank last: `role = 'bloodbank'`

---

## 🎯 Quick Validation

| Step | Expected | Status |
|------|----------|--------|
| Backend starts without errors | ✅ | ? |
| Frontend starts without errors | ✅ | ? |
| Patient login works | ✅ | ? |
| Hospital login works with same account | ✅ | ? |
| Blood Bank login works with same account | ✅ | ? |
| Role switches correctly on logout/login | ✅ | ? |
| Navbar shows correct role badge | ✅ | ? |
| Dashboard shows correct content for role | ✅ | ? |

---

## 📝 Common Issues & Solutions

### Issue: "Invalid Google token"
- **Cause**: Google Client ID mismatch or token expired
- **Solution**: Make sure `VITE_GOOGLE_CLIENT_ID` in `.env.local` matches Google Cloud Console

### Issue: Hospital/Blood Bank Dashboard shows Patient content
- **Cause**: Role not updated in database
- **Solution**: Check that auth.py UPDATE statement is working (we just fixed this!)

### Issue: Login loops back to /login
- **Cause**: Role validation failed in DashboardRouter
- **Solution**: Check browser console for errors, verify role is correct in localStorage

### Issue: Navbar shows wrong role badge
- **Cause**: localStorage has old role
- **Solution**: Open DevTools → Application → Clear all localStorage → Re-login

---

## ✅ Success Criteria

All tests pass when:
1. ✅ Backend starts without errors
2. ✅ Frontend starts without errors
3. ✅ All 3 roles can login with the same Google account
4. ✅ Each role shows the correct dashboard
5. ✅ Navbar shows the correct role icon
6. ✅ Role switching works (logout and login with different role)
7. ✅ No console errors
8. ✅ No 403 Forbidden errors

---

## 📞 Still Having Issues?

If Hospital or Blood Bank logins still fail after these changes:

1. **Check the auth endpoint** is returning the correct role
   - Add `console.log("Backend response:", response.data)` in Login.tsx handleSuccess

2. **Check the database** is storing the new role
   - Query: `SELECT * FROM users WHERE email = 'your-email'`
   - Verify role column matches selected role

3. **Check DashboardRouter** receives correct role
   - Add `console.log("DashboardRouter role:", role)` in App.tsx DashboardRouter

4. **Check localStorage** has correct role
   - DevTools → Application → LocalStorage → Look for "role" key

---

## 🔧 Code Changes Made

### File: `app/routers/auth.py`

**Old code** (didn't update existing users):
```python
if not user:
    cursor.execute("INSERT INTO users...")
    conn.commit()
    cursor.execute("SELECT * FROM users WHERE google_id = ?")
    user = cursor.fetchone()
# If user exists, old role is kept!
```

**New code** (updates role for all logins):
```python
if not user:
    cursor.execute("INSERT INTO users...")
else:
    cursor.execute("UPDATE users SET role = ?, phone = ..., blood_group = ..., city = ?")

conn.commit()
cursor.execute("SELECT * FROM users WHERE google_id = ?")
user = cursor.fetchone()
# Always get the updated user with current role!
```

This ensures that when a user logs in with a different role, the database is updated to reflect their new role before creating the JWT token.

---

**Last Updated**: Today
**Status**: Ready for Testing ✅
