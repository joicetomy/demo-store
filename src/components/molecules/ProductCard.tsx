// Role: Component (Molecule)
// Purpose: Product card display

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Box,
} from '@mui/material';
import { Button } from '@/components/atoms/Button';
import { Product } from '@/types';
import { formatCurrency } from '@/utils/formatCurrency';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const price = product.pricing?.priceRange?.start?.gross;

  return (
    <Card>
      <Link href={`/products/${product.slug}`} style={{ textDecoration: 'none' }}>
        <CardMedia
          component="img"
          height="200"
          image={product.thumbnail?.url || 'https://via.placeholder.com/300x200'}
          alt={product.thumbnail?.alt || product.name}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" noWrap>
            {product.name}
          </Typography>
          {product.category && (
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {product.category.name}
            </Typography>
          )}
          {price && (
            <Box sx={{ mt: 1 }}>
              <Typography variant="h6" color="primary">
                {formatCurrency(price.amount, price.currency)}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Link>
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          fullWidth
          onClick={() => onAddToCart(product)}
          size="small"
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}

