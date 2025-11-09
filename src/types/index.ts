// Role: Type Definitions
// Purpose: Shared TypeScript types and interfaces

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  thumbnail?: {
    url: string;
    alt?: string;
  };
  pricing?: {
    priceRange: {
      start: {
        gross: {
          amount: number;
          currency: string;
        };
      };
    };
  };
  category?: {
    id: string;
    name: string;
  };
}

export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  name: string;
  quantity: number;
  price: number;
  currency: string;
  thumbnail?: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
  currency: string;
}

export interface Order {
  id: string;
  number: string;
  created: string;
  status: string;
  total: {
    gross: {
      amount: number;
      currency: string;
    };
  };
  lines: OrderLine[];
  shippingAddress?: Address;
  billingAddress?: Address;
}

export interface OrderLine {
  id: string;
  productName: string;
  variantName: string;
  quantity: number;
  totalPrice: {
    gross: {
      amount: number;
      currency: string;
    };
  };
  thumbnail?: {
    url: string;
  };
}

export interface Address {
  firstName: string;
  lastName: string;
  streetAddress1: string;
  streetAddress2?: string;
  city: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface CheckoutData {
  id: string;
  email?: string;
  lines: CartItem[];
  shippingAddress?: Address;
  billingAddress?: Address;
  totalPrice: {
    gross: {
      amount: number;
      currency: string;
    };
  };
}

