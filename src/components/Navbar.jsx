import React, { useState } from 'react';
import { Menu, Bell, User, LogOut, ChevronDown } from 'lucide-react';

export default function Navbar({ user, onLogout }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Menu className="h-6 w-6 text-gray-600" />
            <span className="ml-3 text-xl font-semibold text-gray-800">CampusConnect</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 relative">
              <Bell className="h-6 w-6 text-gray-600" />
              {/* Conditionally show the notification bubble */}
              {false && (
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              )}
            </button>
            
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
                aria-expanded={showProfileMenu}
                aria-haspopup="true"
              >
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="text-gray-700">{user?.name || 'User'}</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 animate-fade-in">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                  <button
                    onClick={onLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
