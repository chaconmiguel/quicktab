'use client';

import { useState } from 'react';
import { 
  User, 
  CreditCard, 
  Camera, 
  LogOut, 
  Settings, 
  Clock,
  HelpCircle,
  Lock,
  Menu,
  X,
  ChevronLeft
} from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm lg:hidden">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center">
            {activeTab !== 'profile' && (
              <button 
                onClick={() => handleTabChange('profile')}
                className="mr-3"
              >
                <ChevronLeft className="h-6 w-6 text-gray-500" />
              </button>
            )}
            <span className="text-xl font-bold text-blue-600">QuickTab</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-500" />
            ) : (
              <Menu className="h-6 w-6 text-gray-500" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="absolute w-full bg-white border-t border-gray-100 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['profile', 'payment', 'orders', 'security', 'support'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`w-full flex items-center px-4 py-3 text-base rounded-lg ${
                    activeTab === tab 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-600'
                  }`}
                >
                  {tab === 'profile' && <User className="h-5 w-5 mr-3" />}
                  {tab === 'payment' && <CreditCard className="h-5 w-5 mr-3" />}
                  {tab === 'orders' && <Clock className="h-5 w-5 mr-3" />}
                  {tab === 'security' && <Lock className="h-5 w-5 mr-3" />}
                  {tab === 'support' && <HelpCircle className="h-5 w-5 mr-3" />}
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
              <button
                className="w-full flex items-center px-4 py-3 text-base text-red-600"
              >
                <LogOut className="h-5 w-5 mr-3" />
                Sign Out
              </button>
            </div>
          </nav>
        )}
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Sidebar - Hidden on Mobile */}
          <div className="hidden lg:block w-64">
            <div className="bg-white rounded-lg shadow">
              <nav className="p-4 space-y-2">
                {['profile', 'payment', 'orders', 'security', 'support'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`w-full flex items-center px-4 py-2 text-sm rounded-md ${
                      activeTab === tab 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {tab === 'profile' && <User className="h-5 w-5 mr-3" />}
                    {tab === 'payment' && <CreditCard className="h-5 w-5 mr-3" />}
                    {tab === 'orders' && <Clock className="h-5 w-5 mr-3" />}
                    {tab === 'security' && <Lock className="h-5 w-5 mr-3" />}
                    {tab === 'support' && <HelpCircle className="h-5 w-5 mr-3" />}
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
                <button
                  className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Sign Out
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm">
              {/* Profile Section */}
              {activeTab === 'profile' && (
                <div className="p-4 sm:p-6">
                  <h2 className="text-xl font-bold mb-6">Profile</h2>
                  
                  {/* Profile Picture - Mobile Optimized */}
                  <div className="mb-8 flex flex-col items-center sm:flex-row sm:items-start">
                    <div className="relative mb-4 sm:mb-0">
                      <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                        <Camera className="h-8 w-8 text-gray-400" />
                      </div>
                      <button className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 text-white">
                        <Camera className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="text-center sm:text-left sm:ml-6">
                      <button className="text-sm text-blue-600">Change photo</button>
                      <p className="mt-1 text-xs text-gray-500">JPG or PNG. 1MB max</p>
                    </div>
                  </div>

                  {/* Profile Form - Mobile Optimized */}
                  <form className="space-y-4">
                    <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-base"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-base"
                        />
                      </div>
                    </div>
                    
                    {/* Birthday input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Birthday
                      </label>
                      <input
                        type="date"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-base"
                      />
                    </div>
                    
                    {/* Save button - Full width on mobile */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-blue-700"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Payment Methods Section - Mobile Optimized */}
              {activeTab === 'payment' && (
                <div className="p-4 sm:p-6">
                  <h2 className="text-xl font-bold mb-6">Payment Methods</h2>
                  
                  <button className="w-full sm:w-auto mb-6 flex items-center justify-center sm:justify-start bg-blue-600 text-white px-6 py-3 rounded-lg">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Add New Card
                  </button>
                  
                  <div className="space-y-4">
                    {/* Saved card - Mobile friendly layout */}
                    <div className="border rounded-lg p-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                        <div className="flex items-center mb-4 sm:mb-0">
                          <CreditCard className="h-8 w-8 text-gray-400 mr-4" />
                          <div>
                            <p className="font-medium">•••• 4242</p>
                            <p className="text-sm text-gray-500">Expires 12/24</p>
                          </div>
                        </div>
                        <button className="w-full sm:w-auto mt-4 sm:mt-0 text-red-600 border border-red-600 rounded-lg px-4 py-2 text-sm">
                          Remove Card
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Recent Orders Section - Mobile Optimized */}
              {activeTab === 'orders' && (
                <div className="p-4 sm:p-6">
                  <h2 className="text-xl font-bold mb-6">Recent Orders</h2>
                  
                  <div className="space-y-4">
                    {/* Order card - Mobile friendly */}
                    <div className="border rounded-lg p-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <div className="mb-4 sm:mb-0">
                          <h3 className="font-medium">Restaurant Name</h3>
                          <p className="text-sm text-gray-500">Order #123456</p>
                          <p className="text-sm text-gray-500">March 10, 2024</p>
                        </div>
                        <div className="flex flex-col sm:items-end">
                          <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full inline-flex items-center justify-center mb-2 sm:mb-0">
                            Completed
                          </span>
                          <p className="text-lg font-medium mt-2">$45.00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Section - Mobile Optimized */}
              {activeTab === 'security' && (
                <div className="p-4 sm:p-6">
                  <h2 className="text-xl font-bold mb-6">Security</h2>
                  
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-base"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-base"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-base"
                      />
                    </div>
                    
                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-blue-700"
                      >
                        Update Password
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Support Section - Mobile Optimized */}
              {activeTab === 'support' && (
                <div className="p-4 sm:p-6">
                  <h2 className="text-xl font-bold mb-6">Support</h2>
                  
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-base"
                        placeholder="What do you need help with?"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-base"
                        placeholder="Describe your issue..."
                      />
                    </div>
                    
                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-blue-700"
                      >
                        Send Message
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 