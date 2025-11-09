// Role: Service
// Purpose: Razorpay payment integration

export interface RazorpayOptions {
  amount: number;
  currency: string;
  orderId: string;
  email?: string;
  name?: string;
}

export function loadRazorpay(): Promise<any> {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve((window as any).Razorpay);
    };
    document.body.appendChild(script);
  });
}

export async function initiateRazorpayPayment(
  options: RazorpayOptions,
  onSuccess: (response: any) => void,
  onError: (error: any) => void
): Promise<void> {
  try {
    const Razorpay = await loadRazorpay();

    const razorpayOptions = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: Math.round(options.amount * 100), // Convert to paise
      currency: options.currency,
      name: 'Saleor Store',
      description: `Order #${options.orderId}`,
      order_id: options.orderId,
      prefill: {
        email: options.email,
        name: options.name,
      },
      theme: {
        color: '#1976d2',
      },
      handler: function (response: any) {
        onSuccess(response);
      },
      modal: {
        ondismiss: function () {
          onError(new Error('Payment cancelled by user'));
        },
      },
    };

    const paymentObject = new Razorpay(razorpayOptions);
    paymentObject.open();
  } catch (error) {
    onError(error);
  }
}

