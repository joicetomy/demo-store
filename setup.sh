#!/bin/bash

echo "🚀 Saleor E-Commerce Frontend Setup"
echo "===================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local from example..."
    if [ -f .env.local.example ]; then
        cp .env.local.example .env.local
        echo "✅ Created .env.local - Please update it with your API keys!"
    else
        echo "⚠️  .env.local.example not found. Creating basic .env.local..."
        cat > .env.local << 'EOF'
# Saleor Configuration (Using demo instance)
NEXT_PUBLIC_SALEOR_API_URL=https://demo.saleor.io/graphql/
NEXT_PUBLIC_SALEOR_CHANNEL=default-channel

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=change-this-to-a-random-secret-key

# OAuth Providers (Optional)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# Razorpay Configuration
NEXT_PUBLIC_RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
EOF
        echo "✅ Created basic .env.local"
    fi
else
    echo "✅ .env.local already exists"
fi

echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Setup complete!"
    echo ""
    echo "📚 Next steps:"
    echo "1. Update .env.local with your API keys"
    echo "2. Run 'npm run dev' to start the development server"
    echo "3. Open http://localhost:3000 in your browser"
    echo ""
    echo "📖 Check QUICK_START.md for detailed setup instructions"
    echo ""
else
    echo ""
    echo "❌ Installation failed. Please check the errors above."
    exit 1
fi

