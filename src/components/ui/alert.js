import React from 'react';

export function Alert({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-gray-100 border border-gray-300 text-gray-800',
    destructive: 'bg-red-100 border border-red-400 text-red-700',
  };

  return (
    <div className={`p-4 rounded-lg ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}

export function AlertDescription({ children, className = '' }) {
  return <p className={`text-sm ${className}`}>{children}</p>;
}
