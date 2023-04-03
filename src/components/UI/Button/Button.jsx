import React from 'react';

const Button = (props) => {

  const {
    onClick,
    title,
    className,
    disabled = false,
    type = 'button'
  } = props

  return (
    <div>
      <button
        className={className}
        onClick={onClick}
        type={type}
        disabled={disabled}
      >
        {title}
      </button>
    </div>
  );
};

export default Button;