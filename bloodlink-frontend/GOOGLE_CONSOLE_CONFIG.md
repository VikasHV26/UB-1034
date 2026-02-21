# 🔑 Google Cloud Console Configuration

## 📋 Copy-Paste Configuration

Use these exact values when configuring Google Cloud Console.

---

## 1️⃣ Authorized JavaScript Origins

**Add ALL of these** in:
```
Google Cloud Console → Credentials → OAuth Client ID → Authorized JavaScript origins
```

### Copy this entire block:
```
http://localhost:5173
http://localhost:5174
http://127.0.0.1:5173
http://127.0.0.1:5174
```

**How to add:**
1. Click "Add URI" button
2. Paste each URL separately (press Enter after each)
3. All 4 should be listed

---

## 2️⃣ Authorized Redirect URIs

**Add ALL of these** in:
```
Google Cloud Console → Credentials → OAuth Client ID → Authorized redirect URIs
```

### Copy this entire block:
```
http://localhost:5173
http://localhost:5174
http://127.0.0.1:5173
http://127.0.0.1:5174
```

**How to add:**
1. Click "Add URI" button
2. Paste each URL separately (press Enter after each)
3. All 4 should be listed

---

## 3️⃣ Consent Screen Configuration

**Go to:**
```
Google Cloud Console → OAuth consent screen
```

### Authorized domains section:

Add:
```
localhost
127.0.0.1
```

---

## ✅ Verification Checklist

After adding to Google Console:

- [ ] All 4 localhost origins are listed
- [ ] All 4 redirect URIs are listed
- [ ] localhost and 127.0.0.1 are in authorized domains
- [ ] You clicked SAVE
- [ ] You waited 5 minutes for Google to propagate

---

## 🚀 Quick Setup Steps

1. Open: https://console.cloud.google.com/
2. Select: **BloodLink** project
3. Click: **APIs & Services**
4. Click: **Credentials**
5. Click: Your **OAuth 2.0 Client ID**
6. In **Authorized JavaScript origins**:
   - Click **Add URI**
   - Paste: `http://localhost:5173`
   - Click **Add URI**
   - Paste: `http://localhost:5174`
   - Click **Add URI**
   - Paste: `http://127.0.0.1:5173`
   - Click **Add URI**
   - Paste: `http://127.0.0.1:5174`
7. In **Authorized redirect URIs**:
   - Repeat same 4 URLs
8. Click **SAVE**
9. Go to **OAuth consent screen**
10. In **Authorized domains**:
    - Click **Add domain**
    - Type: `localhost`
    - Click **Add domain**
    - Type: `127.0.0.1`
11. Click **SAVE**
12. **Wait 5-10 minutes**
13. Go back to your app
14. Run: `npm run dev`
15. Test login!

---

## 📋 What Each URL Does

| URL | Purpose | When Used |
|-----|---------|-----------|
| `http://localhost:5173` | Dev server default port | Vite default |
| `http://localhost:5174` | Dev server alternative port | If 5173 busy |
| `http://127.0.0.1:5173` | Same as 5173, different notation | Fallback |
| `http://127.0.0.1:5174` | Same as 5174, different notation | Fallback |

**Why add all 4?** Because Vite might use either 5173 or 5174, and browser might use `localhost` or `127.0.0.1`.

---

## 🔒 Your Client ID Details

```
Client ID: 165842518661-2smkv2bkh6k3gm97pvveqjiioh4f5ts3.apps.googleusercontent.com
Client Secret: [stored in Google Console - don't share]
Project: BloodLink
```

This Client ID is already in your `.env.local` file.

---

## ⚡ Current Configuration Status

### Frontend ✅
```
File: .env.local
VITE_GOOGLE_CLIENT_ID=165842518661-2smkv2bkh6k3gm97pvveqjiioh4f5ts3.apps.googleusercontent.com
VITE_API_URL=http://localhost:8000
```

### Backend ✅
```
File: app/main.py
CORS allows: localhost:5173, localhost:5174, 127.0.0.1:5173, 127.0.0.1:5174
```

### Google Console 🔴 (NEEDS YOUR UPDATE)
```
Need to add 4 JavaScript origins
Need to add 4 redirect URIs
Need to add localhost & 127.0.0.1 to consent screen
```

---

## ⏰ How Long Does This Take?

- Adding origins: **2 minutes**
- Google propagating changes: **5-10 minutes** ⏳
- Testing: **1 minute**
- **Total: 10-15 minutes**

---

## 🎯 After You Save

Don't test immediately - **wait 5 minutes** for Google's servers to update.

Then:
1. Refresh your browser
2. Clear cache (Ctrl+Shift+Delete)
3. Try login again
4. Should work! ✅

---

## 🚨 Common Mistakes

❌ Only added 1 or 2 origins (add all 4)  
❌ Forgot to add localhost to consent screen  
❌ Tested immediately (wait 5 minutes)  
❌ Didn't click SAVE  
❌ Added wrong port (should be 5173 & 5174)  
❌ Didn't clear browser cache after adding  

---

## 🔍 How to Verify It's Configured

1. Go to Google Cloud Console
2. Click Credentials
3. Click your OAuth Client ID
4. Scroll down
5. You should see 4 origins listed:
   ```
   ✅ http://localhost:5173
   ✅ http://localhost:5174
   ✅ http://127.0.0.1:5173
   ✅ http://127.0.0.1:5174
   ```

---

## 📱 For Mobile Testing

To test on other devices on same network, also add:
```
http://your-computer-ip:5173
http://your-computer-ip:5174
```

Find your IP: Run `ipconfig` in terminal, look for IPv4 address

---

## 🌍 For Production

When deploying to production, also add:
```
https://yourdomain.com
https://www.yourdomain.com
```

And create `.env.production` with production Client ID and domain.

---

**✅ Ready?**

Go to Google Cloud Console, add the 4 origins, and you're done!
