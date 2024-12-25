'use client';

import { QrCode } from 'lucide-react';
import { useState } from 'react';
import dynamic from 'next/dynamic';

// Import QR scanner with no SSR
const QRScanner = dynamic(() => import('@/components/qr/QRScanner'), {
  ssr: false,
});

export default function Home() {
  const [showScanner, setShowScanner] = useState(false);

  return (
    <div className="min-h-screen">
      {showScanner && <QRScanner onClose={() => setShowScanner(false)} />}
      
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-blue-600">QuickTab</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900">How it Works</a>
              <a href="#faq" className="text-gray-600 hover:text-gray-900">FAQ</a>
              <a href="/login" className="text-gray-600 hover:text-gray-900">Login</a>
              <a href="/signup" 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Sign Up Free
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-24 pb-16 sm:pt-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 tracking-tight">
              Split Bills Instantly.<br />
              <span className="text-blue-600">Pay Effortlessly.</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              No account needed. Just scan, split, and pay your restaurant bill in seconds.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setShowScanner(true)}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
              >
                <QrCode className="h-6 w-6 mr-2" />
                Scan QR Code
              </button>
              <a href="#how-it-works" 
                className="bg-gray-100 text-gray-700 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-200 transition-colors inline-flex items-center justify-center">
                See How It Works
              </a>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              No account required for quick payments
            </p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 bg-gray-50" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Split Bills in Three Easy Steps</h2>
            <p className="mt-4 text-xl text-gray-600">Quick, easy, and fair for everyone</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <QrCode className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Scan QR Code</h3>
              <p className="text-gray-600">Just scan your table's QR code to instantly view your bill</p>
            </div>
            {/* Step 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Split Your Way</h3>
              <p className="text-gray-600">Split by items, percentage, or evenly - no calculator needed</p>
            </div>
            {/* Step 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Pay Instantly</h3>
              <p className="text-gray-600">Use your preferred payment method - no app download required</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Ready to try QuickTab?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setShowScanner(true)}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              <QrCode className="h-6 w-6 mr-2" />
              Scan QR Code Now
            </button>
          </div>
          <p className="mt-4 text-sm text-blue-200">
            For restaurants: <a href="/signup" className="underline">Sign up here</a> to start accepting QR payments
          </p>
        </div>
      </div>
    </div>
  );
}
