import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const UserMenu = () => {
  const { isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex flex-col space-y-2">
      <Link 
        to="/user/profile" 
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
      >
        Profile
      </Link>
      <Link 
        to="/user/saved" 
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
      >
        Saved Properties
      </Link>
      <Link 
        to="/user/viewed" 
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
      >
        Recently Viewed
      </Link>
      <Link 
        to="/user/enquiries" 
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
      >
        Sent Enquiries
      </Link>
      <Link 
        to="/user/seller/post-property" 
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
      >
        Post Property
      </Link>
      <button
        onClick={logout}
        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
      >
        Logout
      </button>
    </div>
  );
};

export default UserMenu;