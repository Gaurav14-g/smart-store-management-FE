interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  className?: string;
  id?: string;
}

export default function Select({ label, value, onChange, options, placeholder, required, className = '', id }: SelectProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={`mb-3 ${className}`}>
      {label && <label htmlFor={inputId} className="form-label">{label}</label>}
      <select
        className="form-select"
        id={inputId}
        value={value}
        onChange={onChange}
        required={required}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
