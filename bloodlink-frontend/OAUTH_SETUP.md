# 🔐 Google OAuth Setup Guide - BloodLink

## ⚠️ OAuth Origin Mismatch Error

**Error**: `Error 400: origin_mismatch`  
**Message**: "You can't sign in to this app because it doesn't comply with Google's OAuth 2.0 policy."

This happens when the app's actual origin doesn't match the authorized JavaScript origins in Google Cloud Console.

---

## ✅ How to Fix

### Step 1: Go to Google Cloud Console
1. Open [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project: **BloodLink** (or the project name)
3. Go to: **APIs & Services → Credentials**

### Step 2: Edit OAuth 2.0 Consent Screen
1. Click on **OAuth 2.0 Consent Screen** (left sidebar)
2. Click **Edit App**
3. Go to **Authorized domains** section
4. Add these domains:
   ```
   localhost
   127.0.0.1
   ```
5. Click **Save and Continue**

### Step 3: Update OAuth Client ID
1. Go back to **Credentials**
2. Find your OAuth 2.0 Client ID
3. Click on it to edit
4. Under **Authorized JavaScript origins**, add:
   ```
   http://localhost:5173
   http://localhost:5174
   http://127.0.0.1:5173
   http://127.0.0.1:5174
   http://localhost:3000
   ```
5. Under **Authorized redirect URIs**, add:
   ```
   http://localhost:5173
   http://localhost:5174
   http://127.0.0.1:5173
   http://127.0.0.1:5174
   http://localhost:3000
   ```
6. Click **Save**

### Step 4: Configure Your Environment (Already Done ✅)

The `.env.local` file has been created with:
```
VITE_GOOGLE_CLIENT_ID=165842518661-2smkv2bkh6k3gm97pvveqjiioh4f5ts3.apps.googleusercontent.com
VITE_API_URL=http://localhost:8000
```

### Step 5: Restart Your App
```bash
npm run dev
```

---

## 🚀 Production Setup

For production, update your `.env.production`:
```
VITE_GOOGLE_CLIENT_ID=YOUR_PRODUCTION_CLIENT_ID
VITE_API_URL=https://api.yourdomain.com
```

And configure these authorized origins in Google Cloud Console:
```
https://yourdomain.com
https://www.yourdomain.com
https://app.yourdomain.com
```

---

## 🔧 Code Changes Made

### 1. **Environment Variables** (`.env.local`)
- `VITE_GOOGLE_CLIENT_ID` - Google OAuth Client ID
- `VITE_API_URL` - Backend API URL

### 2. **main.tsx** - Dynamic Client ID Loading
```tsx
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "FALLBACK_ID";

<GoogleOAuthProvider clientId={clientId}>
  <App />
</GoogleOAuthProvider>
```

### 3. **Login.tsx** - Improved Error Handling
- Better error messages
- Handles OAuth errors gracefully
- Shows user-friendly error messages

### 4. **api.ts** - Dynamic API URL
- Uses `VITE_API_URL` environment variable
- Added request timeout
- Added response interceptor for 401 errors
- Auto-redirect to login on unauthorized access

---

## 🧪 Testing

### Test 1: Local Development
```bash
# Start backend
cd bloodlink-backend
python -m uvicorn app.main:app --reload

# Start frontend
cd bloodlink-frontend
npm run dev
```

Visit: `http://localhost:5174/`

### Test 2: Try Login
1. Click "Login" button
2. Select your role
3. Click "Sign in with Google"
4. It should now work without origin_mismatch error

---

## 🐛 Troubleshooting

### Issue: Still getting origin_mismatch error
**Solution**: 
- Wait 5-10 minutes for Google to propagate changes
- Clear browser cache (Ctrl+Shift+Delete)
- Try incognito window (Ctrl+Shift+N)

### Issue: Port 5174 not working
**Solution**:
- Vite uses port 5173 by default, but tries 5174 if 5173 is busy
- Check `.env.local` and update port if needed
- Update Google Console accordingly

### Issue: Getting different error
**Solution**:
- Check browser console (F12) for detailed error
- Check backend logs (should show in terminal)
- Ensure backend is running on port 8000

---

## 📝 Files Modified

✅ Created: `.env.local` (environment variables)  
✅ Updated: `src/main.tsx` (dynamic client ID)  
✅ Updated: `src/features/auth/Login.tsx` (error handling)  
✅ Updated: `src/services/api.ts` (dynamic API URL)  

---

## ✨ Features Added

✅ Environment-based configuration  
✅ Better error messages  
✅ Request timeout handling  
✅ Auto-redirect on 401  
✅ Fallback client ID  
✅ Production-ready setup  

---

## 📋 Checklist

- [ ] Updated Google Cloud Console authorized origins
- [ ] Updated Google Cloud Console authorized redirect URIs
- [ ] Restarted development server
- [ ] Tested login with Google account
- [ ] Checked browser console for errors
- [ ] Verified backend is running on port 8000
- [ ] Cleared browser cache and cookies

---

**Need more help?**
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Google Cloud Console](https://console.cloud.google.com/)
- Check the error details in browser DevTools (F12)
