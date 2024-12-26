'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const supabase = createClientComponentClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${location.origin}/auth/callback`,
      });

      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-4 py-8 sm:py-12 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 via-white to-white">
      <div className="w-full sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center mb-8 sm:mb-6">
          <h1 className="text-4xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            QuickTab
          </h1>
        </Link>
        <h2 className="text-center text-3xl sm:text-2xl font-bold tracking-tight text-gray-900">
          Reset your password
        </h2>
        <p className="mt-3 text-center text-base sm:text-sm text-gray-600">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <div className="mt-8 w-full sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-6 sm:px-10 shadow-lg rounded-2xl sm:rounded-xl">
          {success ? (
            <div className="text-center">
              <div className="bg-green-50 border border-green-200 text-base sm:text-sm text-green-600 rounded-xl p-4 mb-6">
                Check your email for a password reset link.
              </div>
              <Link 
                href="/login"
                className="text-base sm:text-sm font-semibold text-blue-600 hover:text-blue-500"
              >
                Back to login
              </Link>
            </div>
          ) : (
            <form className="space-y-7 sm:space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border border-red-200 text-base sm:text-sm text-red-600 rounded-xl p-4">
                  {error}
                </div>
              )}
              
              <div>
                <label htmlFor="email" className="block text-base sm:text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-4 py-3.5 sm:py-2.5 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base sm:text-sm"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-4 sm:py-3 px-4 border border-transparent rounded-xl shadow-sm text-base sm:text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="w-6 h-6 sm:w-5 sm:h-5 animate-spin" />
                  ) : (
                    'Send reset link'
                  )}
                </button>
              </div>

              <div className="text-center">
                <Link 
                  href="/login"
                  className="text-base sm:text-sm font-semibold text-blue-600 hover:text-blue-500"
                >
                  Back to login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
} 