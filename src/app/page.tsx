// Role: Page
// Purpose: Home page route

import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/products');
}

