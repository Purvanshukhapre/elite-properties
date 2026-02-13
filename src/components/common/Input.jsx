import React from 'react';

const Input = ({ 
  label, 
  id, 
  name, 
  type = 'text', 
  required = false, 
  error, 
  className = '', 
  ...props 
}) => {
  const inputClasses = `w-full h-12 px-4 py-3 border border-premium-platinum rounded-lg focus:ring-2 focus:ring-premium-royal focus:border-premium-royal transition-colors bg-premium-pearl ${className}`;
  
  if (type === 'textarea') {
    return (
      <div>
        {label && (
          <label htmlFor={id || name} className="block text-sm font-medium text-premium-onyx mb-2">
            {label}
          </label>
        )}
        <textarea
          id={id || name}
          name={name}
          required={required}
          className={inputClasses}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
  
  return (
    <div>
      {label && (
        <label htmlFor={id || name} className="block text-sm font-medium text-premium-onyx mb-2">
          {label}
        </label>
      )}
      <input
        id={id || name}
        name={name}
        type={type}
        required={required}
        className={inputClasses}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input;