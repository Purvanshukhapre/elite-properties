import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  loading = false, 
  className = '', 
  ...props 
}) => {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-300 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden';
  
  const variantClasses = {
    primary: 'btn-base btn-primary',
    secondary: 'btn-base btn-secondary',
    luxury: 'btn-base btn-primary',
    danger: 'btn-base',
    success: 'btn-base btn-primary',
    outline: 'btn-base btn-secondary',
    subtle: 'btn-base btn-secondary'
  };
  
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  return (
    <motion.button 
      className={`${classes} ${sizeClasses[size]}`}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.18, ease: 'easeInOut' }}
      disabled={disabled || loading} 
      {...props}
    >
      <span className="relative z-10">
        {loading ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </div>
        ) : children}
      </span>
      
      {/* Subtle hover effect overlay */}
      <span className="absolute inset-0 bg-white opacity-0 hover:opacity-06 transition-opacity duration-200 rounded-lg"></span>
        <span className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-200 rounded-lg"></span>
    </motion.button>
  );
};

export default Button;