# 🩹 Fix Summary - Google OAuth Error 400

## 🎯 Problem
```
Error 400: origin_mismatch
"You can't sign in to this app because it doesn't comply with Google's OAuth 2.0 policy"
```

**Root Cause**: The app frontend (http://localhost:5174) wasn't registered in Google Cloud Console as an authorized JavaScript origin.

---

## ✅ Complete Fix (What Was Done)

### 1. **Frontend Configuration** ✅

#### Created `.env.local`
```dotenv
VITE_GOOGLE_CLIENT_ID=165842518661-2smkv2bkh6k3gm97pvveqjiioh4f5ts3.apps.googleusercontent.com
VITE_API_URL=http://localhost:8000
```

#### Updated `src/main.tsx`
- Moved Google Client ID to environment variable
- Added fallback for safety
- Now loads from `.env.local` at runtime

```tsx
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "fallback-id";

<GoogleOAuthProvider clientId={clientId}>
  <App />
</GoogleOAuthProvider>
```

#### Updated `src/features/auth/Login.tsx`
- Added `handleError` callback for better error messages
- Improved error display to users
- Better handling of OAuth failures

```tsx
const handleError = () => {
  setError("Google Login Failed. Make sure your browser allows popups.");
};

<GoogleLogin
  onSuccess={handleSuccess}
  onError={handleError}
/>
```

#### Updated `src/services/api.ts`
- Dynamic API URL from environment
- Added 10-second timeout
- Response interceptor for 401 errors (auto-logout)

```tsx
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
```

---

### 2. **Backend Configuration** ✅

#### Updated `app/main.py`
- Added CORS support for ports 5173 & 5174
- Supports both localhost and 127.0.0.1

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 🔑 Critical: Google Cloud Console Setup

### **YOU MUST DO THIS:**

1. Go to: https://console.cloud.google.com/
2. Select: **BloodLink** project
3. Go to: **APIs & Services → Credentials**
4. Find your OAuth Client ID
5. Click it to edit
6. Add to **Authorized JavaScript origins**:
   ```
   http://localhost:5173
   http://localhost:5174
   http://127.0.0.1:5173
   http://127.0.0.1:5174
   ```
7. Add to **Authorized redirect URIs** (same list)
8. Click **SAVE**
9. **Wait 5-10 minutes** for Google to propagate
10. Restart your app: `npm run dev`

---

## 🧪 Testing Checklist

- [ ] Backend running on port 8000
- [ ] Frontend running on port 5173 or 5174
- [ ] `.env.local` exists with correct Client ID
- [ ] Google Cloud Console updated with origins
- [ ] Browser cache cleared
- [ ] Try login without error
- [ ] Verify token stored in localStorage
- [ ] Test 401 redirect (if available)

---

## 🚀 After Fix Works

You should see:
- ✅ Login page loads without errors
- ✅ Google OAuth button appears
- ✅ Can select role (Patient, Hospital, etc.)
- ✅ Can sign in with Google account
- ✅ Token stored in localStorage
- ✅ Redirected to dashboard after login
- ✅ Backend receives requests with token

---

## 📊 Configuration Files

| File | Changes | Status |
|------|---------|--------|
| `.env.local` | **NEW** - Environment variables | ✅ Done |
| `src/main.tsx` | Uses env Client ID | ✅ Done |
| `src/features/auth/Login.tsx` | Better error handling | ✅ Done |
| `src/services/api.ts` | Uses env API URL + interceptors | ✅ Done |
| `app/main.py` | CORS for ports 5173/5174 | ✅ Done |

---

## 🔄 Environment-Specific Setup

### Development (`.env.local`)
```dotenv
VITE_GOOGLE_CLIENT_ID=165842518661-2smkv2bkh6k3gm97pvveqjiioh4f5ts3.apps.googleusercontent.com
VITE_API_URL=http://localhost:8000
```

### Production (`.env.production`)
```dotenv
VITE_GOOGLE_CLIENT_ID=YOUR_PRODUCTION_CLIENT_ID
VITE_API_URL=https://api.yourdomain.com
```

---

## 🎯 Architecture

```
User Browser (localhost:5174)
        ↓
   Google OAuth
        ↓
Google Servers ← Check against authorized origins
        ↓
✅ Returns token (if origin matches)
        ↓
Frontend stores token
        ↓
API calls with Authorization header
        ↓
Backend (port 8000) - Checks CORS and validates token
        ↓
✅ Returns user data / dashboard content
```

---

## 🆘 Troubleshooting

### Still getting "origin_mismatch"?
- [ ] Check you're on `localhost:5174` (or 5173)
- [ ] Verify Google Console has that origin
- [ ] Wait 10 minutes for Google to propagate
- [ ] Clear cache: Ctrl+Shift+Delete
- [ ] Try incognito: Ctrl+Shift+N

### Getting "Failed to fetch"?
- [ ] Backend not running on port 8000?
- [ ] Check CORS config in `app/main.py`
- [ ] Check `VITE_API_URL` in `.env.local`

### Getting "Client ID not found"?
- [ ] `.env.local` file exists?
- [ ] Restarted dev server after creating `.env.local`?
- [ ] Check file has correct Client ID?

---

## 📝 What This Enables

✅ **Environment-based configuration** - Different settings for dev/prod  
✅ **Secure credentials** - Not hardcoded in source  
✅ **Better error handling** - Users see helpful messages  
✅ **Auto-logout** - 401 errors trigger re-login  
✅ **Production ready** - Can deploy to multiple environments  
✅ **CORS security** - Backend validates origins  

---

## 🎓 Key Concepts

**OAuth 2.0 Origin Mismatch**
- When you request OAuth token from origin X, but Google Console only knows about origin Y
- Google rejects it for security (prevents token theft)
- Solution: Register all your origins in Google Console

**CORS (Cross-Origin Resource Sharing)**
- Backend must explicitly allow requests from frontend origin
- Without it, browser blocks requests (same-origin policy)
- Our fix: Backend allows localhost:5173 & 5174

**Environment Variables**
- Store secrets outside source code
- Different values for dev/production
- Vite loads from `.env.local` automatically

---

**Next**: Follow the Google Cloud Console checklist above, restart your app, and test!
