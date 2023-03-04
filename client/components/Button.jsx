import React from 'react';
import './Button.css';

const styles = ['button-main', 'button-outline'];
const sizes = ['button-medium', 'button-large'];

const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize
}) => {
  const checkButtonStyle = styles.includes(buttonStyle) ? buttonStyle : styles[0];
  const checkButtonSize = sizes.includes(buttonSize) ? buttonSize : sizes[0];

  return (
    <button className={`button ${checkButtonStyle} ${checkButtonSize}`} onClick={type}>
      {children}
    </button>
  );
};

export default Button;
