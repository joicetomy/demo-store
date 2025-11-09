// Role: Component (Organism)
// Purpose: Grid of product cards

import { Grid } from '@mui/material';
import { ProductCard } from '@/components/molecules/ProductCard';
import { Product } from '@/types';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export function ProductList({ products, onAddToCart }: ProductListProps) {
  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
          <ProductCard product={product} onAddToCart={onAddToCart} />
        </Grid>
      ))}
    </Grid>
  );
}

