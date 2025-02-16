
import React from 'react';

export const Form = ({ children, onSubmit }) => (
  <form onSubmit={onSubmit} className="space-y-4">
    {children}
  </form>
);

export const FormField = ({ children }) => <div className="space-y-2">{children}</div>;

export const FormLabel = ({ children }) => (
  <label className="text-sm font-medium text-gray-700">{children}</label>
);

export const FormControl = ({ children }) => <div className="w-full">{children}</div>;

export const FormFooter = ({ children }) => <div className="flex justify-end mt-4">{children}</div>;

export const FormMessage = ({ children }) => (
  <div className="text-sm text-red-500 mt-1">{children}</div>
);
