interface EmailInputProps {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  id?: string;
}

export default function EmailInput({ label, value, onChange, placeholder, required, className = '', id }: EmailInputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={`mb-3 ${className}`}>
      {label && <label htmlFor={inputId} className="form-label">{label}</label>}
      <input
        type="email"
        className="form-control"
        id={inputId}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}
