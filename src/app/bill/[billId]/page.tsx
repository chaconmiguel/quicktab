'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2, DollarSign, Users, Percent } from 'lucide-react';
import GuestPayment from '@/components/payment/GuestPayment';

interface BillItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Bill {
  id: string;
  restaurant_name: string;
  table_number: string;
  total_amount: number;
  items: BillItem[];
  created_at: string;
}

export default function BillPage({ params }: { params: { billId: string } }) {
  const [billData, setBillData] = useState<Bill | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [splitMethod, setSplitMethod] = useState<'equal' | 'items' | 'percentage'>('equal');
  const [numberOfPeople, setNumberOfPeople] = useState(2);
  const [percentages, setPercentages] = useState<{ [key: string]: number }>({});
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    fetchBillData();
  }, [params.billId]);

  const fetchBillData = async () => {
    try {
      const { data, error } = await supabase
        .from('bills')
        .select('*')
        .eq('id', params.billId)
        .single();

      if (error) throw error;
      setBillData(data);
    } catch (error) {
      console.error('Error fetching bill:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleItemSelect = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const calculateShare = () => {
    if (!billData) return 0;

    switch (splitMethod) {
      case 'equal':
        return billData.total_amount / numberOfPeople;
      case 'items':
        const selectedTotal = billData.items
          .filter(item => selectedItems.includes(item.id))
          .reduce((sum, item) => sum + (item.price * item.quantity), 0);
        return selectedTotal;
      case 'percentage':
        return (billData.total_amount * (percentages[params.billId] || 0)) / 100;
      default:
        return 0;
    }
  };

  const handlePaymentSuccess = async () => {
    setPaymentSuccess(true);
    // Refresh bill data to show updated payment status
    await fetchBillData();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!billData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Bill Not Found</h2>
          <p className="mt-2 text-gray-600">This bill may have expired or been deleted.</p>
        </div>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mb-4">
            <svg className="mx-auto h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Payment Successful!</h2>
          <p className="mt-2 text-gray-600">Thank you for your payment.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            View Updated Bill
          </button>
        </div>
      </div>
    );
  }

  const shareAmount = calculateShare();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">{billData.restaurant_name}</h1>
            <p className="text-gray-600">Table {billData.table_number}</p>
            <p className="text-sm text-gray-500">
              {new Date(billData.created_at).toLocaleDateString()}
            </p>
          </div>

          {/* Split Method Selection */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">How would you like to split?</h2>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setSplitMethod('equal')}
                className={`p-3 rounded-lg flex flex-col items-center justify-center text-sm ${
                  splitMethod === 'equal' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Users className="h-5 w-5 mb-1" />
                Equal Split
              </button>
              <button
                onClick={() => setSplitMethod('items')}
                className={`p-3 rounded-lg flex flex-col items-center justify-center text-sm ${
                  splitMethod === 'items' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <DollarSign className="h-5 w-5 mb-1" />
                By Items
              </button>
              <button
                onClick={() => setSplitMethod('percentage')}
                className={`p-3 rounded-lg flex flex-col items-center justify-center text-sm ${
                  splitMethod === 'percentage' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Percent className="h-5 w-5 mb-1" />
                Percentage
              </button>
            </div>
          </div>

          {/* Split Options Based on Method */}
          {splitMethod === 'equal' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of People
              </label>
              <input
                type="number"
                min="2"
                value={numberOfPeople}
                onChange={(e) => setNumberOfPeople(Math.max(2, parseInt(e.target.value) || 2))}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          )}

          {splitMethod === 'percentage' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Percentage
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={percentages[params.billId] || 0}
                  onChange={(e) => setPercentages({
                    ...percentages,
                    [params.billId]: Math.min(100, Math.max(0, parseInt(e.target.value) || 0))
                  })}
                  className="w-full px-3 py-2 border rounded-lg pr-8"
                />
                <span className="absolute right-3 top-2 text-gray-500">%</span>
              </div>
            </div>
          )}

          {/* Bill Items */}
          {splitMethod === 'items' && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Select Your Items</h2>
              <div className="space-y-2">
                {billData.items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleItemSelect(item.id)}
                    className={`p-3 rounded-lg border cursor-pointer ${
                      selectedItems.includes(item.id)
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-600'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Total Section */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Bill Total</span>
              <span className="font-medium">${billData.total_amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-600">Your Share</span>
              <span className="font-bold text-lg">${shareAmount.toFixed(2)}</span>
            </div>
            
            <GuestPayment 
              amount={shareAmount} 
              billId={params.billId}
              onSuccess={handlePaymentSuccess}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 