# Saleor E-Commerce Frontend

A modern, full-featured e-commerce frontend built with **Next.js 15**, **React 19**, **Saleor GraphQL**, **MUI**, **NextAuth**, and **Razorpay**.

## 🚀 Features

- **Product Catalog**: Browse and search products from Saleor backend
- **Shopping Cart**: Add, update, and remove items with real-time sync
- **Checkout Flow**: Secure checkout with Razorpay payment integration
- **Order Management**: View order history and details
- **Authentication**: SSO support with Google and GitHub via NextAuth
- **Responsive Design**: Beautiful UI built with Material-UI (MUI)
- **State Management**: Redux Toolkit for cart state
- **TypeScript**: Full type safety across the application

## 📁 Project Structure

```
src/
├── app/                    # Next.js 15 App Router
│   ├── api/auth/          # NextAuth API routes
│   ├── products/          # Product listing page
│   ├── cart/              # Shopping cart page
│   ├── checkout/          # Checkout page
│   ├── orders/            # Orders page
│   └── auth/              # Authentication pages
├── components/            # React components
│   ├── atoms/            # Basic UI components
│   ├── molecules/        # Composite components
│   └── organisms/        # Complex components
├── hooks/                # Custom React hooks
├── services/             # Data layer (GraphQL, API clients)
│   ├── graphql/         # GraphQL queries, mutations, fragments
│   └── adapters/        # Data transformation layer
├── store/               # Redux store and slices
├── styles/              # Global styles and theme
├── types/               # TypeScript type definitions
└── utils/               # Helper utilities
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **React**: 19.0
- **UI Library**: Material-UI (MUI) v5
- **GraphQL Client**: Apollo Client
- **Backend**: Saleor GraphQL API
- **Authentication**: NextAuth.js (Google, GitHub SSO)
- **Payment**: Razorpay
- **State Management**: Redux Toolkit
- **Language**: TypeScript
- **Styling**: CSS-in-JS (Emotion) via MUI

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd demo-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   
   ```env
   # Saleor Configuration
   NEXT_PUBLIC_SALEOR_API_URL=https://your-saleor-instance.saleor.cloud/graphql/
   NEXT_PUBLIC_SALEOR_CHANNEL=default-channel

   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-nextauth-secret-here

   # OAuth Providers (for SSO)
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GITHUB_CLIENT_ID=your-github-client-id
   GITHUB_CLIENT_SECRET=your-github-client-secret

   # Razorpay Configuration
   NEXT_PUBLIC_RAZORPAY_KEY_ID=your-razorpay-key-id
   RAZORPAY_KEY_SECRET=your-razorpay-key-secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Saleor Setup

1. Create a Saleor instance at [https://cloud.saleor.io](https://cloud.saleor.io)
2. Get your GraphQL API URL
3. Configure your channel name
4. Add the URL and channel to `.env.local`

### NextAuth Setup

1. **Google OAuth**:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create OAuth 2.0 credentials
   - Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

2. **GitHub OAuth**:
   - Go to GitHub Settings > Developer Settings > OAuth Apps
   - Create a new OAuth App
   - Add callback URL: `http://localhost:3000/api/auth/callback/github`

### Razorpay Setup

1. Sign up at [Razorpay](https://razorpay.com)
2. Get your API Key ID and Secret from the dashboard
3. Add them to `.env.local`

## 🏗️ Architecture

### Layer Separation

This project follows a strict separation of concerns:

1. **View Layer** (`/components`): Pure presentational components
2. **Logic Layer** (`/hooks`): Business logic and data fetching
3. **Data Layer** (`/services`): API calls, GraphQL operations, data transformation
4. **State Layer** (`/store`): Global application state

### Key Principles

- Components receive data via props only
- No API calls in components
- Hooks consume services for data operations
- Adapters transform API data to UI-friendly formats
- Redux manages cart state with localStorage persistence

## 📱 Features Detail

### Shopping Cart

- Add/remove items
- Update quantities
- Real-time total calculation
- Synced with Saleor checkout API
- Persisted in localStorage

### Checkout

- Guest and authenticated checkout
- Contact information collection
- Razorpay payment integration
- Order confirmation

### Authentication

- Sign in with Google
- Sign in with GitHub
- Protected routes for orders
- Session management with NextAuth

### Orders

- View order history
- Order details with status
- Tracking information

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

This is a standard Next.js app and can be deployed to any platform that supports Next.js 15:
- Netlify
- AWS Amplify
- Railway
- Render

## 🧪 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SALEOR_API_URL` | Saleor GraphQL API endpoint | Yes |
| `NEXT_PUBLIC_SALEOR_CHANNEL` | Saleor channel slug | Yes |
| `NEXTAUTH_URL` | Application URL | Yes |
| `NEXTAUTH_SECRET` | NextAuth secret key | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | Optional |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret | Optional |
| `GITHUB_CLIENT_ID` | GitHub OAuth client ID | Optional |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth secret | Optional |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Razorpay key ID | Yes |
| `RAZORPAY_KEY_SECRET` | Razorpay secret | Yes |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🐛 Known Issues

- Product variants are simplified (single variant per product)
- Shipping methods not yet implemented
- Address validation needs enhancement

## 🔮 Future Enhancements

- [ ] Product search and filters
- [ ] Wishlist functionality
- [ ] Product reviews and ratings
- [ ] Advanced shipping options
- [ ] Discount codes/coupons
- [ ] Multi-currency support
- [ ] Email notifications
- [ ] PWA support

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

Built with ❤️ using Next.js 15, React 19, and Saleor

# demo-store
