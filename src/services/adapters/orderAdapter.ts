// Role: Adapter
// Purpose: Transform Saleor order data to UI-friendly format

import { Order, OrderLine } from '@/types';

export function adaptOrderLine(line: any): OrderLine {
  return {
    id: line.id,
    productName: line.productName,
    variantName: line.variantName,
    quantity: line.quantity,
    totalPrice: line.totalPrice,
    thumbnail: line.thumbnail,
  };
}

export function adaptOrder(saleorOrder: any): Order {
  return {
    id: saleorOrder.id,
    number: saleorOrder.number,
    created: saleorOrder.created,
    status: saleorOrder.status,
    total: saleorOrder.total,
    lines: saleorOrder.lines?.map(adaptOrderLine) || [],
    shippingAddress: saleorOrder.shippingAddress
      ? {
          firstName: saleorOrder.shippingAddress.firstName,
          lastName: saleorOrder.shippingAddress.lastName,
          streetAddress1: saleorOrder.shippingAddress.streetAddress1,
          streetAddress2: saleorOrder.shippingAddress.streetAddress2,
          city: saleorOrder.shippingAddress.city,
          postalCode: saleorOrder.shippingAddress.postalCode,
          country: saleorOrder.shippingAddress.country?.code || '',
          phone: saleorOrder.shippingAddress.phone,
        }
      : undefined,
    billingAddress: saleorOrder.billingAddress
      ? {
          firstName: saleorOrder.billingAddress.firstName,
          lastName: saleorOrder.billingAddress.lastName,
          streetAddress1: saleorOrder.billingAddress.streetAddress1,
          streetAddress2: saleorOrder.billingAddress.streetAddress2,
          city: saleorOrder.billingAddress.city,
          postalCode: saleorOrder.billingAddress.postalCode,
          country: saleorOrder.billingAddress.country?.code || '',
          phone: saleorOrder.billingAddress.phone,
        }
      : undefined,
  };
}

