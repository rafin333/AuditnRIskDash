import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

// Utility function for handling logout
export const handleLogout = (navigate) => {
  // Clear all auth-related data
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  
  // Navigate to landing page
  navigate('/');
};

// Dashboard menu item configuration
export const logoutMenuItem = {
  name: 'Logout',
  href: '/dashboard/settings',
  icon: LogOut,
  onClick: (navigate) => {
    handleLogout(navigate);
  }
};

// Component to handle the logout menu item
export const LogoutMenuItem = ({ onMenuItemClick }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault(); // Prevent default navigation
    handleLogout(navigate);
    if (onMenuItemClick) {
      onMenuItemClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
    >
      <LogOut className="w-5 h-5" />
      <span>Logout</span>
    </div>
  );
};