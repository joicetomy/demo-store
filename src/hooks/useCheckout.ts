// Role: Hook
// Purpose: Checkout flow management

'use client';

import { useState, useCallback } from 'react';
import { completeCheckout } from '@/services/checkout';
import { initiateRazorpayPayment } from '@/services/razorpay';
import { handleError } from '@/utils/handleError';
import { useCart } from './useCart';

export function useCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { checkoutId, total, currency, clearCart } = useCart();

  const processPayment = useCallback(
    async (email: string, name: string) => {
      if (!checkoutId) {
        setError('No checkout found');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Initiate Razorpay payment
        await new Promise((resolve, reject) => {
          initiateRazorpayPayment(
            {
              amount: total,
              currency,
              orderId: checkoutId,
              email,
              name,
            },
            async (response) => {
              try {
                // Complete checkout in Saleor after successful payment
                const order = await completeCheckout(checkoutId);
                clearCart();
                resolve(order);
              } catch (err) {
                reject(err);
              }
            },
            (err) => {
              reject(err);
            }
          );
        });

        return true;
      } catch (err) {
        setError(handleError(err));
        return false;
      } finally {
        setLoading(false);
      }
    },
    [checkoutId, total, currency, clearCart]
  );

  return {
    processPayment,
    loading,
    error,
  };
}

