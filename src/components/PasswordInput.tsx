import { useState } from 'react';

interface PasswordInputProps {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  id?: string;
}

export default function PasswordInput({ label, value, onChange, placeholder, required, className = '', id }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={`mb-3 ${className}`}>
      {label && <label htmlFor={inputId} className="form-label">{label}</label>}
      <div className="input-group">
        <input
          type={showPassword ? 'text' : 'password'}
          className="form-control"
          id={inputId}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        >
          <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i>
        </button>
      </div>
    </div>
  );
}
