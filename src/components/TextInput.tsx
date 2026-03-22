interface TextInputProps {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  disabled?: boolean;
  className?: string;
  id?: string;
}

export default function TextInput({ label, value, onChange, placeholder, required, maxLength, disabled, className = '', id }: TextInputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={`mb-3 ${className}`}>
      {label && <label htmlFor={inputId} className="form-label">{label}</label>}
      <input
        type="text"
        className="form-control"
        id={inputId}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        disabled={disabled}
        autoComplete="off"
      />
    </div>
  );
}
