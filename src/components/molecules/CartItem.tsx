// Role: Component (Molecule)
// Purpose: Cart item display and management

import {
  Box,
  Typography,
  IconButton,
  TextField,
  Card,
  CardContent,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { CartItem as CartItemType } from '@/types';
import { formatCurrency } from '@/utils/formatCurrency';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (newQuantity > 0) {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {item.thumbnail && (
            <Box
              component="img"
              src={item.thumbnail}
              alt={item.name}
              sx={{
                width: 80,
                height: 80,
                objectFit: 'cover',
                borderRadius: 1,
              }}
            />
          )}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6">{item.name}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {formatCurrency(item.price, item.currency)} each
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
              <TextField
                type="number"
                size="small"
                value={item.quantity}
                onChange={handleQuantityChange}
                inputProps={{ min: 1, style: { width: '60px' } }}
              />
              <Typography variant="body1" fontWeight="bold">
                Total: {formatCurrency(item.price * item.quantity, item.currency)}
              </Typography>
            </Box>
          </Box>
          <IconButton
            onClick={() => onRemove(item.id)}
            color="error"
            aria-label="remove item"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}

