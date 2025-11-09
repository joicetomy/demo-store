# Quick Start Guide

## 🎯 Getting Started in 5 Minutes

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# Saleor Configuration (Use demo instance for quick start)
NEXT_PUBLIC_SALEOR_API_URL=https://demo.saleor.io/graphql/
NEXT_PUBLIC_SALEOR_CHANNEL=default-channel

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# OAuth Providers (Optional for testing)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# Razorpay Configuration (Use test keys)
NEXT_PUBLIC_RAZORPAY_KEY_ID=your-test-key-id
RAZORPAY_KEY_SECRET=your-test-key-secret
```

### Step 3: Run the Development Server

```bash
npm run dev
```

### Step 4: Open Your Browser

Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 Getting Your API Keys

### Saleor (Backend)

**Option 1: Use Demo Instance (Fastest)**
- Use `https://demo.saleor.io/graphql/` (already in the example above)
- No setup required!

**Option 2: Create Your Own Instance**
1. Go to [https://cloud.saleor.io](https://cloud.saleor.io)
2. Sign up for a free account
3. Create a new Saleor instance
4. Copy your GraphQL API URL
5. Update `NEXT_PUBLIC_SALEOR_API_URL` in `.env.local`

### NextAuth Secret

Generate a random secret:

```bash
openssl rand -base64 32
```

Or use any random string for local development.

### Google OAuth (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Secret to `.env.local`

### GitHub OAuth (Optional)

1. Go to [GitHub Settings](https://github.com/settings/developers)
2. Click "OAuth Apps" → "New OAuth App"
3. Fill in:
   - Application name: `Saleor Store Dev`
   - Homepage URL: `http://localhost:3000`
   - Callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and Secret to `.env.local`

### Razorpay (Payment Gateway)

1. Sign up at [https://razorpay.com](https://razorpay.com)
2. Go to Settings → API Keys
3. Generate Test Keys (for development)
4. Copy Key ID and Secret to `.env.local`

## 🎨 Project Features

### What You Can Do

✅ **Browse Products** - View products from Saleor
✅ **Add to Cart** - Add items with quantity selection
✅ **Shopping Cart** - Update quantities, remove items
✅ **Checkout** - Complete purchase with Razorpay
✅ **Authentication** - Sign in with Google/GitHub
✅ **View Orders** - See order history (requires auth)

### Pages

- **Home** (`/`) - Redirects to products
- **Products** (`/products`) - Product listing
- **Cart** (`/cart`) - Shopping cart
- **Checkout** (`/checkout`) - Payment flow
- **Orders** (`/orders`) - Order history (protected)
- **Sign In** (`/auth/signin`) - Authentication

## 🏗️ Project Architecture

```
Frontend (This App)
    ↓
Next.js 15 + React 19
    ↓
Apollo Client (GraphQL)
    ↓
Saleor API (Backend)
```

### Key Technologies

- **Next.js 15** - App Router, Server Components
- **React 19** - Latest React features
- **Material-UI** - Modern UI components
- **Redux Toolkit** - State management for cart
- **Apollo Client** - GraphQL client
- **NextAuth** - Authentication
- **Razorpay** - Payment processing

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000

# Or use a different port
PORT=3001 npm run dev
```

### Module Not Found Errors

```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

### Environment Variables Not Working

- Make sure the file is named `.env.local` exactly
- Restart the dev server after changing env vars
- Client-side vars must start with `NEXT_PUBLIC_`

### Apollo Client Errors

- Check your Saleor API URL is correct
- Verify the Saleor instance is running
- Check network tab for GraphQL errors

## 📚 Next Steps

1. **Explore the Code**
   - Check `/src/app` for pages
   - Look at `/src/components` for UI
   - Review `/src/hooks` for logic

2. **Customize**
   - Update theme in `/src/styles/theme.ts`
   - Add your logo to the header
   - Modify product card styling

3. **Deploy**
   - Push to GitHub
   - Connect to Vercel
   - Add production environment variables
   - Deploy!

## 💡 Tips

- The demo Saleor instance has sample products already
- You can use test mode for Razorpay (no real payments)
- Authentication is optional for browsing/cart
- Orders page requires authentication

## 🤝 Need Help?

- Check the main [README.md](./README.md)
- Review the code comments
- Check Saleor docs: [https://docs.saleor.io](https://docs.saleor.io)
- Check Next.js docs: [https://nextjs.org/docs](https://nextjs.org/docs)

---

**Ready to build?** Run `npm run dev` and start coding! 🚀

