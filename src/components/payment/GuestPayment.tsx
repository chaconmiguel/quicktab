'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function GuestPayment({ 
  amount, 
  billId, 
  onSuccess 
}: { 
  amount: number;
  billId: string;
  onSuccess: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const stripe = await stripePromise;
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          billId,
        }),
      });

      const { clientSecret } = await response.json();
      
      // Redirect to Stripe Checkout
      const result = await stripe!.confirmCardPayment(clientSecret);
      
      if (result.error) {
        throw result.error;
      }

      onSuccess();
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <button
        onClick={handlePayment}
        disabled={loading}
        className={`w-full py-3 rounded-lg font-medium ${
          loading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </div>
  );
} 