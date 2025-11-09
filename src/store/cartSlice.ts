// Role: Redux Slice
// Purpose: Shopping cart state management

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '@/types';

interface CartState {
  items: CartItem[];
  checkoutId: string | null;
  total: number;
  currency: string;
}

const initialState: CartState = {
  items: [],
  checkoutId: null,
  total: 0,
  currency: 'USD',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.variantId === action.payload.variantId
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      state.total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    updateItemQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        state.total = state.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      }
    },
    setCheckoutId: (state, action: PayloadAction<string>) => {
      state.checkoutId = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
      state.checkoutId = null;
      state.total = 0;
    },
    loadCart: (state, action: PayloadAction<CartState>) => {
      return action.payload;
    },
  },
});

export const {
  addItem,
  removeItem,
  updateItemQuantity,
  setCheckoutId,
  clearCart,
  loadCart,
} = cartSlice.actions;

export default cartSlice.reducer;

