// Role: Adapter
// Purpose: Transform Saleor checkout data to UI-friendly format

import { CheckoutData, CartItem } from '@/types';

export function adaptCheckoutLine(line: any): CartItem {
  return {
    id: line.id,
    productId: line.variant.product.id,
    variantId: line.variant.id,
    name: line.variant.product.name,
    quantity: line.quantity,
    price: line.variant.pricing?.price?.gross?.amount || 0,
    currency: line.variant.pricing?.price?.gross?.currency || 'USD',
    thumbnail: line.variant.product.thumbnail?.url,
  };
}

export function adaptCheckout(saleorCheckout: any): CheckoutData {
  return {
    id: saleorCheckout.id,
    email: saleorCheckout.email,
    lines: saleorCheckout.lines.map(adaptCheckoutLine),
    shippingAddress: saleorCheckout.shippingAddress,
    billingAddress: saleorCheckout.billingAddress,
    totalPrice: saleorCheckout.totalPrice,
  };
}

