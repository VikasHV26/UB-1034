# 🧪 Login Testing - Step by Step

## ✅ Pre-Test Checklist

Before you start, make sure:
- [ ] Both terminals are ready
- [ ] Backend port: 8000
- [ ] Frontend port: 5174 (or 5173)
- [ ] Browser ready
- [ ] DevTools accessible (F12)

---

## 🚀 Step 1: Start Backend

**Terminal 1** - In PowerShell or Terminal:
```bash
cd C:\Bloodlink\bloodlink-backend
python -m uvicorn app.main:app --reload
```

**Expected Output**:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete
```

✅ **Check**: Backend should be running on http://127.0.0.1:8000

---

## 🚀 Step 2: Start Frontend

**Terminal 2** - In new PowerShell or Terminal:
```bash
cd C:\Bloodlink\bloodlink-frontend
npm run dev
```

**Expected Output**:
```
VITE v... dev server running at:
  ➜  Local:   http://localhost:5174
  ➜  press h to show help
```

✅ **Check**: Frontend should be running on http://localhost:5174

---

## 🎯 TEST 1: Patient Login

### Step 1a: Open Login Page
```
1. Open browser
2. Go to: http://localhost:5174
3. Should see: BloodLink landing page
4. Click: "Login" button
5. Should see: Login page with role selection
```

### Step 1b: Select Patient Role
```
1. See 3 buttons on login page:
   👤 Patient  |  🏥 Hospital  |  🩸 Blood Bank
2. Click: Patient button (should already be selected)
3. See: "👤 Patient - Request blood when needed"
4. Button should have red border (selected)
```

### Step 1c: Google Login
```
1. Click: "Sign in with Google" button
2. Should see: Google OAuth popup (NOT error!)
3. Select: Your Google account
4. Google authenticates
```

### Step 1d: Verify Patient Dashboard
```
1. Should redirect to: /dashboard
2. Check sidebar:
   - Shows: "🩸 BloodLink"
   - Shows: "👤 Patient" badge
3. Check main content:
   - Should show: Patient Dashboard
   - Should NOT show: Hospital or Blood Bank content
4. ✅ Patient login SUCCESS
```

### Step 1e: Verify Token Storage
```
1. Press: F12 (DevTools)
2. Go to: Application tab
3. Click: Local Storage
4. Click: http://localhost:5174
5. You should see:
   ✓ "token" key with JWT value
   ✓ "role" key with value "patient"
6. ✅ Token properly stored
```

---

## 🎯 TEST 2: Hospital Login (Key Test!)

### Step 2a: Logout
```
1. Click: "Logout" button in sidebar
2. Should redirect to: Landing page
3. Check localStorage:
   - Press F12
   - Application → Local Storage
   - "token" key should be GONE ❌
   - "role" key should be GONE ❌
4. ✅ Logout successful
```

### Step 2b: Go to Login
```
1. Click: "Login" button
2. Should see: Login page with role selection
3. Currently selected: Patient (default)
4. ⚠️ DO NOT use Patient - select Hospital!
```

### Step 2c: Select Hospital Role (IMPORTANT!)
```
1. See 3 buttons:
   👤 Patient  |  🏥 Hospital  |  🩸 Blood Bank
2. Click: Hospital button (MIDDLE one)
3. Button should highlight red
4. See: "🏥 Hospital - Manage patient requests"
5. ⚠️ CRITICAL: This is different from Patient!
```

### Step 2d: Google Login
```
1. Click: "Sign in with Google" button
2. Should see: Google OAuth popup (NOT error!)
3. Select: Your Google account
4. Wait for authentication...
5. ⚠️ IMPORTANT: Watch for redirect!
```

### Step 2e: Verify Hospital Dashboard
```
1. Should redirect to: /dashboard
2. Check URL: Should say /dashboard ✓
3. Check sidebar:
   - Shows: "🩸 BloodLink" ✓
   - Shows: "🏥 Hospital" badge ✓✓✓ (NOT 👤 Patient!)
4. Check main content:
   - Should show: Hospital Dashboard ✓
   - Should NOT show: Patient components ✗
   - Should show: Hospital-specific content ✓
5. 🎉 Hospital login SUCCESS!
```

### Step 2f: Verify Token Storage
```
1. Press: F12 (DevTools)
2. Go to: Application tab
3. Click: Local Storage
4. Click: http://localhost:5174
5. You should see:
   ✓ "token" key with JWT value
   ✓ "role" key with value "hospital" (NOT "patient"!)
6. 🎉 Token properly stored with hospital role!
```

---

## 🎯 TEST 3: Blood Bank Login

### Step 3a: Logout
```
1. Click: "Logout" button
2. Should redirect to: Landing page
3. localStorage should be cleared
```

### Step 3b: Go to Login
```
1. Click: "Login" button
2. See: Login page with role selection
3. Currently selected: Patient (default)
```

### Step 3c: Select Blood Bank Role
```
1. See 3 buttons:
   👤 Patient  |  🏥 Hospital  |  🩸 Blood Bank
2. Click: Blood Bank button (LAST one)
3. Button should highlight red
4. See: "🩸 Blood Bank - Manage your inventory"
```

### Step 3d: Google Login
```
1. Click: "Sign in with Google" button
2. Should see: Google OAuth popup
3. Select: Your Google account
4. Wait for redirect...
```

### Step 3e: Verify Blood Bank Dashboard
```
1. Should redirect to: /dashboard
2. Check sidebar:
   - Shows: "🩸 Blood Bank" badge ✓ (NOT Patient or Hospital!)
3. Check main content:
   - Should show: Blood Bank Dashboard
   - Should have: Inventory management
4. ✅ Blood Bank login SUCCESS
```

---

## 🎯 TEST 4: Token Persistence (Refresh Test)

### Step 4a: Login as Patient
```
1. Click: Logout (if still logged in)
2. Click: Login
3. Select: Patient
4. Google login
5. Wait for Patient Dashboard
```

### Step 4b: Refresh Page
```
1. Press: Ctrl+R (refresh)
2. Page should reload
3. Should NOT redirect to login
4. Should still see: Patient Dashboard
5. Check sidebar: Should still show 👤 Patient
6. ✅ Token persistence works!
```

### Step 4c: Verify Storage
```
1. Press: F12
2. Application → Local Storage
3. "token" and "role" should still be there
4. "role" should be "patient"
5. ✅ localStorage not cleared on refresh
```

---

## 🎯 TEST 5: Multiple Role Changes

### Step 5a: Patient → Hospital
```
1. Logged in as: Patient ✓
2. Click: Logout
3. localStorage cleared ✓
4. Click: Login
5. Select: Hospital (NOT Patient!)
6. Google login
7. Check: Hospital Dashboard shows 🏥 (NOT 👤)
8. ✅ Role changed successfully
```

### Step 5b: Hospital → Blood Bank
```
1. Logged in as: Hospital ✓
2. Click: Logout
3. Click: Login
4. Select: Blood Bank
5. Google login
6. Check: Blood Bank Dashboard shows 🩸
7. ✅ Another role change works
```

---

## ✅ Success Criteria

### ✓ All Tests Passed When:

1. **Patient Login**
   - [x] Can login as patient
   - [x] Shows Patient Dashboard
   - [x] Shows 👤 icon
   - [x] Token stored as "patient"

2. **Hospital Login** ⭐ CRITICAL
   - [x] Can login as hospital
   - [x] Shows Hospital Dashboard (NOT Patient!)
   - [x] Shows 🏥 icon (NOT 👤)
   - [x] Token stored as "hospital"

3. **Blood Bank Login**
   - [x] Can login as blood bank
   - [x] Shows Blood Bank Dashboard
   - [x] Shows 🩸 icon
   - [x] Token stored as "bloodbank"

4. **Token Persistence**
   - [x] Refresh doesn't logout
   - [x] localStorage preserved
   - [x] Same dashboard shows

5. **Role Changes**
   - [x] Can logout and change role
   - [x] Each role shows correct dashboard
   - [x] No mixing of dashboards

---

## 🐛 If Test Fails

### Issue: Hospital login redirects to login again
**Steps to Debug**:
1. Open DevTools: F12
2. Go to: Console tab
3. Look for error messages
4. Go to: Network tab
5. Look for: /auth/google-login request
6. Check response: Should show role = "hospital"

### Issue: Hospital shows Patient dashboard
**Steps to Debug**:
1. Open DevTools: F12
2. Go to: Application tab
3. Check localStorage: "role" should be "hospital"
4. If showing "patient": localStorage wasn't cleared on logout
5. Manual fix: Delete localStorage, logout, login again

### Issue: Can't select Hospital button
**Steps to Debug**:
1. Refresh page: Ctrl+R
2. Try clicking button again
3. Try different browser
4. Check DevTools console for errors

### Issue: Google popup doesn't show
**Steps to Debug**:
1. Check if popup is being blocked
2. Allow popups for localhost
3. Try incognito mode
4. Check DevTools console for errors

---

## 📊 Testing Summary

| Test | Patient | Hospital | Blood Bank | Result |
|------|---------|----------|-----------|--------|
| Login Works | ✅ | ✅ | ✅ | All work |
| Correct Dashboard | ✅ | ✅ | ✅ | All correct |
| Correct Role Badge | 👤 | 🏥 | 🩸 | All show |
| Token Stored | ✓ | ✓ | ✓ | All stored |
| Persistence | ✓ | ✓ | ✓ | All persist |
| Role Change | Can change | Can change | Can change | Can switch |

---

## 🎉 Final Verification

After ALL tests pass:
```
✅ Patient can login
✅ Hospital can login (and shows Hospital Dashboard)
✅ Blood Bank can login
✅ Token persists on refresh
✅ Can logout and change roles
✅ No errors in console
✅ No TypeScript errors
✅ All dashboards work
```

If all are ✅, then **LOGIN IS FIXED!** 🎉

---

## 🚀 Next Steps After Testing

1. **Backend Testing** (if needed)
   - Test actual API endpoints
   - Test database queries
   - Test role validation

2. **Feature Development**
   - Build dashboard features
   - Add patient request functionality
   - Add hospital management features
   - Add blood bank inventory features

3. **Production Deployment**
   - Update Google OAuth for production domain
   - Deploy backend
   - Deploy frontend
   - Update database

---

**Ready to test? Start with TEST 1!** 🧪
