// Role: Adapter
// Purpose: Transform Saleor product data to UI-friendly format

import { Product } from '@/types';

export function adaptProduct(saleorProduct: any): Product {
  return {
    id: saleorProduct.id,
    name: saleorProduct.name,
    slug: saleorProduct.slug,
    description: saleorProduct.description || '',
    thumbnail: saleorProduct.thumbnail
      ? {
          url: saleorProduct.thumbnail.url,
          alt: saleorProduct.thumbnail.alt || saleorProduct.name,
        }
      : undefined,
    pricing: saleorProduct.pricing,
    category: saleorProduct.category,
  };
}

export function adaptProducts(saleorProducts: any[]): Product[] {
  return saleorProducts.map(adaptProduct);
}

