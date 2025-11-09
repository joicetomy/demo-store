// Role: Service
// Purpose: Product data fetching and management

import { apolloClient } from './apollo-client';
import { GET_PRODUCTS, GET_PRODUCT_BY_SLUG } from './graphql/queries/products.query';
import { adaptProduct, adaptProducts } from './adapters/productAdapter';
import { Product } from '@/types';

export async function getProducts(): Promise<Product[]> {
  try {
    const { data } = await apolloClient.query({
      query: GET_PRODUCTS,
      variables: {
        first: 20,
        channel: process.env.NEXT_PUBLIC_SALEOR_CHANNEL || 'default-channel',
      },
    });

    const products = data.products.edges.map((edge: any) => edge.node);
    return adaptProducts(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function getProductBySlug(slug: string): Promise<Product> {
  try {
    const { data } = await apolloClient.query({
      query: GET_PRODUCT_BY_SLUG,
      variables: {
        slug,
        channel: process.env.NEXT_PUBLIC_SALEOR_CHANNEL || 'default-channel',
      },
    });

    return adaptProduct(data.product);
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}

