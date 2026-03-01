import { useState, useEffect } from 'react';

interface AsyncSelectOption {
  value: string;
  label: string;
}

interface AsyncSelectProps {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  loadOptions: () => Promise<AsyncSelectOption[]>;
  placeholder?: string;
  required?: boolean;
  className?: string;
  id?: string;
}

export default function AsyncSelect({ label, value, onChange, loadOptions, placeholder, required, className = '', id }: AsyncSelectProps) {
  const [options, setOptions] = useState<AsyncSelectOption[]>([]);
  const [loading, setLoading] = useState(true);
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  useEffect(() => {
    loadOptions().then((data) => {
      setOptions(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className={`mb-3 ${className}`}>
      {label && <label htmlFor={inputId} className="form-label">{label}</label>}
      <select
        className="form-select"
        id={inputId}
        value={value}
        onChange={onChange}
        required={required}
        disabled={loading}
      >
        {placeholder && <option value="">{loading ? 'Loading...' : placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
