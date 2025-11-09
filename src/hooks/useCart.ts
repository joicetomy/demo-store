// Role: Hook
// Purpose: Cart operations and state management

'use client';

import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  addItem as addItemAction,
  removeItem as removeItemAction,
  updateItemQuantity as updateQuantityAction,
  clearCart as clearCartAction,
  setCheckoutId,
} from '@/store/cartSlice';
import { CartItem } from '@/types';
import { createCheckout, addToCheckout, updateCheckoutLine } from '@/services/checkout';

const CART_STORAGE_KEY = 'saleor-cart';

export function useCart() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);

  useEffect(() => {
    // Load cart from localStorage on mount
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      // Dispatch load cart action if needed
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addItem = useCallback(
    async (item: CartItem) => {
      dispatch(addItemAction(item));

      // Sync with Saleor checkout
      try {
        if (cart.checkoutId) {
          await addToCheckout(cart.checkoutId, [
            { variantId: item.variantId, quantity: item.quantity },
          ]);
        } else {
          const checkout = await createCheckout('', [
            { variantId: item.variantId, quantity: item.quantity },
          ]);
          dispatch(setCheckoutId(checkout.id));
        }
      } catch (error) {
        console.error('Error syncing cart with Saleor:', error);
      }
    },
    [cart.checkoutId, dispatch]
  );

  const removeItem = useCallback(
    (itemId: string) => {
      dispatch(removeItemAction(itemId));
    },
    [dispatch]
  );

  const updateQuantity = useCallback(
    async (itemId: string, quantity: number) => {
      dispatch(updateQuantityAction({ id: itemId, quantity }));

      // Sync with Saleor
      if (cart.checkoutId) {
        try {
          await updateCheckoutLine(cart.checkoutId, itemId, quantity);
        } catch (error) {
          console.error('Error updating checkout line:', error);
        }
      }
    },
    [cart.checkoutId, dispatch]
  );

  const clearCart = useCallback(() => {
    dispatch(clearCartAction());
    localStorage.removeItem(CART_STORAGE_KEY);
  }, [dispatch]);

  return {
    items: cart.items,
    total: cart.total,
    currency: cart.currency,
    checkoutId: cart.checkoutId,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };
}

