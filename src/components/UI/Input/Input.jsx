import React from 'react';

const Input = (props) => {

  const {
    onChange,
    placeholder,
    type,
    className,
    value,
    checked
  } = props

  return (
    <div>
      <input
        placeholder={placeholder}
        onChange={onChange}
        type={type}
        className={className}
        value={value}
        checked={!!checked}
      />
    </div>
  );
};

export default Input;