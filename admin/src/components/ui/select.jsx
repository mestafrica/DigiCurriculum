import React from 'react';

export const Select = ({ children, onValueChange }) => {
  return (
    <select onChange={(e) => onValueChange(e.target.value)}>
      {children}
    </select>
  );
};

export const SelectValue = ({ placeholder }) => {
  return <option value="">{placeholder}</option>;
};

export const SelectItem = ({ value, children }) => {
  return <option value={value}>{children}</option>;
};

// Usage example for Select
export const SelectExample = ({ options, onValueChange }) => {
  return (
    <Select onValueChange={onValueChange}>
      <SelectValue placeholder="Select an option" />
      {options.map((option, index) => (
        <SelectItem key={index} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </Select>
  );
};
