// src/components/ui/Label.jsx
import React from 'react';

const Label = ({ htmlFor, children, className }) => {
  return (
    <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 ${className}`}>
      {children}
    </label>
  );
};

export default Label;
