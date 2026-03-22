interface InputProps {
  type?: string;
  placeholder?: string;
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  id?: string;
}

export default function Input({
  type = 'text',
  placeholder,
  label,
  value,
  onChange,
  onKeyPress,
  disabled,
  required = false,
  className = '',
  id
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={`mb-3 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
        </label>
      )}
      <input
        type={type}
        className="form-control"
        id={inputId}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        disabled={disabled}
        required={required}
      />
    </div>
  );
}
