'use client';

import { useState } from 'react';
import { QrCode, Menu, X, Sparkles, Users, CreditCard } from 'lucide-react';
import dynamic from 'next/dynamic';

// Import QR scanner with no SSR
const QRScanner = dynamic(() => import('@/components/qr/QRScanner'), {
  ssr: false,
});

export default function Home() {
  const [showScanner, setShowScanner] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden">
      {showScanner && <QRScanner onClose={() => setShowScanner(false)} />}
      
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">QuickTab</span>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900">How it Works</a>
              <a href="#faq" className="text-gray-600 hover:text-gray-900">FAQ</a>
              <a href="/login" className="text-gray-600 hover:text-gray-900">Login</a>
              <a href="/signup" 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all">
                Sign Up Free
              </a>
            </div>
          </div>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
              <a
                href="#features"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                How it Works
              </a>
              <a
                href="#faq"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                FAQ
              </a>
              <a
                href="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Login
              </a>
              <a
                href="/signup"
                className="block px-3 py-2 rounded-md text-base font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
              >
                Sign Up Free
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative pt-20 pb-16 sm:pt-32">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-white to-white -z-10" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] -z-10" />

        {/* Animated gradient orbs - adjusted for mobile */}
        <div className="absolute top-0 -left-4 w-48 sm:w-72 h-48 sm:h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-0 -right-4 w-48 sm:w-72 h-48 sm:h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-48 sm:w-72 h-48 sm:h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            {/* New Badge */}
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                Split bills effortlessly with friends
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
                Split Bills Instantly.
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Pay Effortlessly.
              </span>
            </h1>
            <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in">
              No account needed. Just scan, split, and pay your restaurant bill in seconds.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
              <button
                onClick={() => setShowScanner(true)}
                className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-medium hover:opacity-90 transition-all inline-flex items-center justify-center hover:scale-105 transform"
              >
                <QrCode className="h-5 w-5 sm:h-6 sm:w-6 mr-2 group-hover:animate-pulse" />
                Scan QR Code
              </button>
              <a href="#how-it-works" 
                className="bg-white text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-medium hover:bg-gray-50 transition-all inline-flex items-center justify-center border border-gray-200 hover:border-gray-300 hover:shadow-md"
              >
                See How It Works
              </a>
            </div>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500 animate-fade-in-up">
              No account required for quick payments
            </p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="relative py-16 sm:py-24 bg-white" id="features">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/20 via-white to-blue-50/20 -z-10" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white mb-4 sm:mb-6">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              Simple as 1-2-3
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Split Bills in Three Easy Steps
            </h2>
            <p className="mt-3 sm:mt-4 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Quick, easy, and fair for everyone
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Step 1 */}
            <div className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <QrCode className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Scan QR Code</h3>
              <p className="text-gray-600">Just scan your table's QR code to instantly view your bill</p>
            </div>

            {/* Step 2 */}
            <div className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Split Your Way</h3>
              <p className="text-gray-600">Split by items, percentage, or evenly - no calculator needed</p>
            </div>

            {/* Step 3 */}
            <div className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CreditCard className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Pay Instantly</h3>
              <p className="text-gray-600">Use your preferred payment method - no app download required</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-16 sm:py-24 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 -z-10" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 -z-10" />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 sm:mb-8 animate-fade-in">
              Ready to try QuickTab?
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button 
                onClick={() => setShowScanner(true)}
                className="group bg-white backdrop-blur-sm bg-opacity-90 text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-medium hover:bg-opacity-100 transition-all inline-flex items-center justify-center hover:scale-105 transform shadow-lg hover:shadow-xl"
              >
                <QrCode className="h-5 w-5 sm:h-6 sm:w-6 mr-2 group-hover:animate-pulse" />
                Scan QR Code Now
              </button>
            </div>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-white/90 animate-fade-in-up">
              For restaurants: <a href="/signup" className="font-medium hover:text-white">Sign up here</a> to start accepting QR payments
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
