interface CurrencyInputProps {
  label?: string;
  value?: number | string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  currency?: string;
  className?: string;
  id?: string;
}

export default function CurrencyInput({ label, value, onChange, placeholder, required, currency = '$', className = '', id }: CurrencyInputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={`mb-3 ${className}`}>
      {label && <label htmlFor={inputId} className="form-label">{label}</label>}
      <div className="input-group">
        <span className="input-group-text">{currency}</span>
        <input
          type="number"
          className="form-control"
          id={inputId}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          step="0.01"
          min="0"
        />
      </div>
    </div>
  );
}
