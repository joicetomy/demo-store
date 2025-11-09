// Role: Hook
// Purpose: Fetch and manage product data from Saleor

'use client';

import { useState, useEffect } from 'react';
import { getProducts } from '@/services/products';
import { Product } from '@/types';
import { handleError } from '@/utils/handleError';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError(handleError(err));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
}

