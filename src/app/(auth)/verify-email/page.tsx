'use client';

import Link from 'next/link';
import { Mail } from 'lucide-react';

export default function VerifyEmail() {
  return (
    <div className="min-h-screen flex flex-col justify-center px-4 py-8 sm:py-12 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 via-white to-white">
      <div className="w-full sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center mb-8 sm:mb-6">
          <h1 className="text-4xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            QuickTab
          </h1>
        </Link>

        <div className="text-center">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-3xl sm:text-2xl font-bold tracking-tight text-gray-900">
            Check your email
          </h2>
          <p className="mt-3 text-base sm:text-sm text-gray-600 max-w-sm mx-auto">
            We've sent you a verification link. Please check your email and click the link to verify your account.
          </p>
        </div>
      </div>

      <div className="mt-8 w-full sm:mx-auto sm:w-full sm:max-w-md text-center">
        <p className="text-base sm:text-sm text-gray-600">
          Didn't receive the email?{' '}
          <button className="font-semibold text-blue-600 hover:text-blue-500">
            Click to resend
          </button>
        </p>
        <p className="mt-4 text-base sm:text-sm text-gray-600">
          <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-500">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
} 