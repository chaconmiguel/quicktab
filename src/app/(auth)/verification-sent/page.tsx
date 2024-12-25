'use client';

import Link from 'next/link';
import { Mail, ArrowLeft } from 'lucide-react';

export default function VerificationSent() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex items-center text-blue-600 hover:text-blue-500 mb-6 mx-4 sm:mx-0">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to home
        </Link>
        
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
            
            <h2 className="mt-6 text-2xl font-bold text-gray-900">
              Check your email
            </h2>
            
            <p className="mt-4 text-gray-600">
              We've sent you a verification link to your email address. Please click the link to verify your account.
            </p>
            
            <div className="mt-8 space-y-4">
              <button
                onClick={() => window.location.href = "https://gmail.com"}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Open Gmail
              </button>
              
              <p className="text-sm text-gray-500">
                Didn't receive the email?{' '}
                <button className="font-medium text-blue-600 hover:text-blue-500">
                  Click to resend
                </button>
              </p>
              
              <p className="text-sm text-gray-500">
                Already verified?{' '}
                <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 