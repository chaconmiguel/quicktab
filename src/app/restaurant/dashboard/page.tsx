'use client';

import { useState } from 'react';
import { QRCodeSVG as QRCode } from 'qrcode.react';
import { supabase } from '@/lib/supabase';

export default function RestaurantDashboard() {
  const [tableNumber, setTableNumber] = useState('');
  const [items, setItems] = useState([
    { name: 'Burger', price: 12.99, quantity: 1 },
    { name: 'Fries', price: 4.99, quantity: 1 },
    { name: 'Drink', price: 2.99, quantity: 1 }
  ]);
  const [generatedBillId, setGeneratedBillId] = useState<string | null>(null);

  const handleCreateBill = async () => {
    try {
      const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      // Create bill in Supabase
      const { data: bill, error } = await supabase
        .from('bills')
        .insert([
          {
            restaurant_id: '123e4567-e89b-12d3-a456-426614174000',
            table_number: tableNumber,
            items: items,
            total: total,
            status: 'active'
          }
        ])
        .select()
        .single();

      if (error) throw error;
      
      setGeneratedBillId(bill.id);
    } catch (error) {
      console.error('Error creating bill:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Test Restaurant Dashboard</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Create Test Bill</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Table Number
            </label>
            <input
              type="text"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-800"
              placeholder="Enter table number"
            />
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Items</h3>
            {items.map((item, index) => (
              <div key={index} className="flex items-center gap-4 mb-2">
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[index].name = e.target.value;
                    setItems(newItems);
                  }}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-800"
                  placeholder="Item name"
                />
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[index].price = parseFloat(e.target.value);
                    setItems(newItems);
                  }}
                  className="w-24 rounded-lg border border-gray-300 px-4 py-2 text-gray-800"
                  placeholder="Price"
                />
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[index].quantity = parseInt(e.target.value);
                    setItems(newItems);
                  }}
                  className="w-24 rounded-lg border border-gray-300 px-4 py-2 text-gray-800"
                  placeholder="Qty"
                />
              </div>
            ))}
            <button
              onClick={() => setItems([...items, { name: '', price: 0, quantity: 1 }])}
              className="text-blue-600 text-sm mt-2 hover:text-blue-700"
            >
              + Add Item
            </button>
          </div>

          <button
            onClick={handleCreateBill}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Generate Bill & QR Code
          </button>
        </div>
      </div>

      {generatedBillId && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Generated QR Code</h2>
          <div className="flex flex-col items-center">
            <QRCode 
              value={generatedBillId}
              size={200}
              level="H"
            />
            <p className="mt-4 text-sm text-gray-700">
              Bill ID: {generatedBillId}
            </p>
          </div>
        </div>
      )}
    </div>
  );
} 