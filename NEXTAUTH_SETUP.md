# 🔐 NextAuth Environment Setup Guide

This guide will help you set up NextAuth.js with Google and GitHub OAuth providers.

## 📋 Required Environment Variables

Create a `.env.local` file in the root of your project with these variables:

```env
# NextAuth Configuration (REQUIRED)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth (Optional - for Google Sign In)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth (Optional - for GitHub Sign In)
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

---

## 🔑 Step 1: Generate NEXTAUTH_SECRET

The `NEXTAUTH_SECRET` is used to encrypt JWT tokens and sessions. Generate a random secret:

### Option A: Using OpenSSL (Recommended)
```bash
openssl rand -base64 32
```

### Option B: Using Node.js
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Option C: Online Generator
Visit: https://generate-secret.vercel.app/32

**Copy the generated string** and use it as your `NEXTAUTH_SECRET`.

---

## 🌐 Step 2: Set NEXTAUTH_URL

- **Development**: `http://localhost:3000` (or whatever port you're using)
- **Production**: Your production domain (e.g., `https://yourdomain.com`)

**Important**: 
- Use `http://` for localhost
- Use `https://` for production
- No trailing slash

---

## 🔵 Step 3: Google OAuth Setup

### 3.1 Create Google OAuth Credentials

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com
   - Sign in with your Google account

2. **Create a New Project** (if you don't have one)
   - Click "Select a project" → "New Project"
   - Enter project name (e.g., "Saleor Store")
   - Click "Create"

3. **Enable Google+ API**
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API"
   - Click "Enable"

4. **Create OAuth 2.0 Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - If prompted, configure OAuth consent screen first:
     - User Type: External (for testing) or Internal (for Google Workspace)
     - App name: "Saleor Store"
     - User support email: Your email
     - Developer contact: Your email
     - Click "Save and Continue"
     - Scopes: Leave default, click "Save and Continue"
     - Test users: Add your email, click "Save and Continue"

5. **Create OAuth Client ID**
   - Application type: **Web application**
   - Name: "Saleor Store Dev" (or any name)
   - **Authorized redirect URIs**: 
     ```
     http://localhost:3000/api/auth/callback/google
     ```
   - For production, also add:
     ```
     https://yourdomain.com/api/auth/callback/google
     ```
   - Click "Create"

6. **Copy Credentials**
   - You'll see a popup with:
     - **Client ID** → Use as `GOOGLE_CLIENT_ID`
     - **Client secret** → Use as `GOOGLE_CLIENT_SECRET`
   - Copy both values

---

## 🐙 Step 4: GitHub OAuth Setup

### 4.1 Create GitHub OAuth App

1. **Go to GitHub Developer Settings**
   - Visit: https://github.com/settings/developers
   - Sign in to GitHub

2. **Create New OAuth App**
   - Click "OAuth Apps" → "New OAuth App"
   - Or visit: https://github.com/settings/applications/new

3. **Fill in Application Details**
   - **Application name**: `Saleor Store` (or any name)
   - **Homepage URL**: 
     ```
     http://localhost:3000
     ```
   - **Authorization callback URL**: 
     ```
     http://localhost:3000/api/auth/callback/github
     ```
   - For production, use:
     ```
     https://yourdomain.com/api/auth/callback/github
     ```
   - Click "Register application"

4. **Copy Credentials**
   - You'll see:
     - **Client ID** → Use as `GITHUB_CLIENT_ID`
     - **Client secret** → Click "Generate a new client secret"
     - Copy the secret immediately (it's only shown once!)
     - Use as `GITHUB_CLIENT_SECRET`

---

## 📝 Step 5: Create .env.local File

Create `.env.local` in your project root:

```bash
# In your project root
touch .env.local
```

Then add all the values:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=paste-your-generated-secret-here

# Google OAuth
GOOGLE_CLIENT_ID=paste-your-google-client-id-here
GOOGLE_CLIENT_SECRET=paste-your-google-client-secret-here

# GitHub OAuth
GITHUB_CLIENT_ID=paste-your-github-client-id-here
GITHUB_CLIENT_SECRET=paste-your-github-client-secret-here
```

---

## ✅ Step 6: Verify Setup

1. **Restart your dev server** (required after changing .env files):
   ```bash
   # Stop current server (Ctrl+C)
   pnpm run dev
   ```

2. **Test the sign-in page**:
   - Visit: http://localhost:3000/auth/signin
   - You should see "Sign In" buttons for Google and GitHub

3. **Test authentication**:
   - Click "Continue with Google" or "Continue with GitHub"
   - You should be redirected to the OAuth provider
   - After authorization, you'll be redirected back to your app

---

## 🚨 Troubleshooting

### Issue: "Invalid redirect URI"
- **Solution**: Make sure the redirect URI in your OAuth app matches exactly:
  - Development: `http://localhost:3000/api/auth/callback/google`
  - No trailing slash, exact match required

### Issue: "NEXTAUTH_SECRET is missing"
- **Solution**: Make sure `.env.local` exists and has `NEXTAUTH_SECRET` set
- Restart the dev server after adding it

### Issue: "OAuth provider not working"
- **Solution**: 
  - Check that client ID and secret are correct (no extra spaces)
  - Verify redirect URIs match exactly
  - Make sure you've enabled the required APIs (for Google)

### Issue: "Session not persisting"
- **Solution**: 
  - Check `NEXTAUTH_SECRET` is set and valid
  - Make sure `NEXTAUTH_URL` matches your current URL
  - Clear browser cookies and try again

---

## 🔒 Security Notes

1. **Never commit `.env.local`** to git (it's already in `.gitignore`)
2. **Use different secrets** for development and production
3. **Rotate secrets** if they're ever exposed
4. **Use environment variables** in production (Vercel, Netlify, etc.)

---

## 🌍 Production Setup

For production, set these in your hosting platform:

### Vercel
1. Go to Project Settings → Environment Variables
2. Add all the variables
3. Set `NEXTAUTH_URL` to your production domain

### Netlify
1. Go to Site Settings → Environment Variables
2. Add all the variables
3. Update OAuth redirect URIs to production URLs

### Other Platforms
- Add environment variables in your platform's dashboard
- Update OAuth redirect URIs in Google/GitHub to production URLs

---

## 📚 Quick Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXTAUTH_URL` | ✅ Yes | Your app URL (http://localhost:3000 for dev) |
| `NEXTAUTH_SECRET` | ✅ Yes | Random 32+ character string |
| `GOOGLE_CLIENT_ID` | Optional | Google OAuth Client ID |
| `GOOGLE_CLIENT_SECRET` | Optional | Google OAuth Client Secret |
| `GITHUB_CLIENT_ID` | Optional | GitHub OAuth Client ID |
| `GITHUB_CLIENT_SECRET` | Optional | GitHub OAuth Client Secret |

---

## 🎯 Minimal Setup (Testing Only)

If you just want to test without OAuth providers, you can use:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here
```

The app will work, but sign-in buttons won't function without OAuth credentials.

---

**Need help?** Check the NextAuth.js docs: https://next-auth.js.org/getting-started/introduction

