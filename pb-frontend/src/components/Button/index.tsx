import React from 'react';
import './index.scss';

type Props = {
  title: string;
  type?: 'filled' | 'outline' | 'transparent';
  color?:
    | 'blue'
    | 'purple'
    | 'black'
    | 'red'
    | 'orange'
    | 'green'
    | 'black-table'
    | 'grey'
    | 'white'
    | 'dark-blue-text'
    | 'table-grey'
    | 'icon-grey';
  style?: React.CSSProperties;
  disabled?: boolean;
  onClick: () => void;
  fullWidth?: boolean;
  marginTop?: boolean;
  marginBottom?: boolean;
  className?: string;
};

const Button = ({
  title,
  onClick,
  type = 'filled',
  color = 'blue',
  style,
  disabled,
  fullWidth,
  marginTop,
  marginBottom,
  className,
}: Props) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`button ${type} ${disabled ? 'disabled' : color} ${
        fullWidth ? 'fullWidth' : ''
      } ${className} ${marginTop ? 'margin-top' : ''} ${
        marginBottom ? 'margin-bottom' : ''
      }`}
      style={style}
    >
      {title}
    </button>
  );
};

export default Button;
