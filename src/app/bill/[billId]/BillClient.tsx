'use client';

import { ArrowLeft, Receipt, Users, CreditCard } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface BillItem {
  name: string;
  price: number;
  quantity: number;
}

interface Bill {
  id: string;
  restaurant_id: string;
  table_number: string;
  items: BillItem[];
  total: number;
  status: string;
  restaurants: {
    name: string;
    email: string;
  };
}

export default function BillClient({ bill }: { bill: Bill | null }) {
  const router = useRouter();

  if (!bill) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white px-4">
        <div className="text-center">
          <Receipt className="h-12 w-12 text-gray-400 mb-4 mx-auto" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Bill Not Found</h1>
          <p className="text-gray-600 mb-6">This bill may have expired or been deleted.</p>
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center text-blue-600 font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm lg:hidden">
        <div className="flex items-center px-4 h-16">
          <button 
            onClick={() => router.push('/')}
            className="mr-3"
          >
            <ArrowLeft className="h-6 w-6 text-gray-500" />
          </button>
          <span className="text-xl font-bold text-blue-600">QuickTab</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 lg:py-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Restaurant Info */}
          <div className="p-6 border-b border-gray-100">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{bill.restaurants.name}</h1>
            <p className="text-gray-600">Table {bill.table_number}</p>
          </div>

          {/* Bill Items */}
          <div className="p-6">
            <div className="space-y-4">
              {bill.items.map((item, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-medium text-gray-900 ml-4">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Subtotal and Total */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex justify-between mb-2">
                <p className="text-gray-600">Subtotal</p>
                <p className="font-medium text-gray-900">${bill.total.toFixed(2)}</p>
              </div>
              <div className="flex justify-between mb-6">
                <p className="text-gray-600">Tax</p>
                <p className="font-medium text-gray-900">${(bill.total * 0.0825).toFixed(2)}</p>
              </div>
              <div className="flex justify-between items-center text-lg font-bold">
                <p>Total</p>
                <p>${(bill.total * 1.0825).toFixed(2)}</p>
              </div>
            </div>

            {/* Payment Options */}
            <div className="mt-8 space-y-4">
              <button className="w-full bg-blue-600 text-white h-14 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Pay Full Amount
              </button>
              <button className="w-full bg-white text-blue-600 border-2 border-blue-600 h-14 rounded-xl font-medium hover:bg-blue-50 transition-colors flex items-center justify-center">
                <Users className="h-5 w-5 mr-2" />
                Split with Friends
              </button>
            </div>

            {/* Guest Note */}
            <p className="mt-6 text-center text-sm text-gray-500">
              Paying as guest • <button className="text-blue-600 font-medium">Sign in</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 