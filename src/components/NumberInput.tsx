interface NumberInputProps {
  label?: string;
  value?: number | string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  id?: string;
}

export default function NumberInput({ label, value, onChange, placeholder, required, min, max, step, className = '', id }: NumberInputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={`mb-3 ${className}`}>
      {label && <label htmlFor={inputId} className="form-label">{label}</label>}
      <input
        type="number"
        className="form-control"
        id={inputId}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
        step={step}
      />
    </div>
  );
}
