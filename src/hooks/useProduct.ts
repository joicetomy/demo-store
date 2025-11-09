// Role: Hook
// Purpose: Fetch single product by slug

'use client';

import { useState, useEffect } from 'react';
import { getProductBySlug } from '@/services/products';
import { Product } from '@/types';
import { handleError } from '@/utils/handleError';

export function useProduct(slug: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProductBySlug(slug);
        setProduct(data);
      } catch (err) {
        setError(handleError(err));
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  return { product, loading, error };
}

