import React, { HTMLProps } from 'react';
import './index.scss';

type Props = HTMLProps<HTMLInputElement> & {
  label?: string;
  containerClassName?: string;
  error?: string;
  type?: string;
  prefilledText?: string;
};

const TextInput: React.FC<Props> = ({
  containerClassName,
  className,
  value,
  error,
  label,
  disabled,
  type = 'text',
  prefilledText,
  ...rest
}) => {
  return (
    <div
      className={`input-wrapper ${error ? 'error' : ''} ${containerClassName}`}
    >
      <div className="label">{label}</div>
      {!!prefilledText && <div className="prefilled-text">{prefilledText}</div>}
      <input
        className={`text-input  ${className}`}
        value={value}
        type={type}
        {...rest}
        disabled={disabled}
      />
      {!!error && <div className="error-text">{error}</div>}
    </div>
  );
};

export default TextInput;
