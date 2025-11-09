// Role: Layout
// Purpose: Root layout with providers

import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Providers } from './providers';
import { Header } from '@/components/organisms/Header';

export const metadata: Metadata = {
  title: 'Saleor E-Commerce Store',
  description: 'Modern e-commerce frontend built with Next.js 15 and Saleor',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}

