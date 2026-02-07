import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND } from '../constants/brand';

const AuthNavbar = () => {
  return (
    <nav className="h-16 flex items-center justify-between px-6">
      <div className="flex items-center">
        <Link to="/" className="text-2xl font-bold text-white hover:text-blue-200 transition-colors">
          {BRAND.name}
        </Link>
      </div>
      
      <div className="flex items-center space-x-4">
        <Link 
          to="/" 
          className="text-white hover:text-blue-200 transition-colors text-sm font-medium"
        >
          Back to Home
        </Link>
      </div>
    </nav>
  );
};

export default AuthNavbar;