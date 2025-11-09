// Role: Container
// Purpose: Products listing container with cart functionality

'use client';

import { Container, Typography, Box } from '@mui/material';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';
import { ProductList } from '@/components/organisms/ProductList';
import { Loader } from '@/components/atoms/Loader';
import { ErrorMessage } from '@/components/atoms/ErrorMessage';
import { Product } from '@/types';

export default function ProductsContainer() {
  const { products, loading, error } = useProducts();
  const { addItem } = useCart();

  const handleAddToCart = (product: Product) => {
    const price = product.pricing?.priceRange?.start?.gross;
    if (!price) return;

    addItem({
      id: product.id,
      productId: product.id,
      variantId: product.id, // Simplified - in real app, select variant
      name: product.name,
      quantity: 1,
      price: price.amount,
      currency: price.currency,
      thumbnail: product.thumbnail?.url,
    });
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Our Products
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Browse our collection of amazing products
        </Typography>
      </Box>
      <ProductList products={products} onAddToCart={handleAddToCart} />
    </Container>
  );
}

