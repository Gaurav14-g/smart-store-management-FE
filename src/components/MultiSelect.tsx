interface MultiSelectOption {
  value: string;
  label: string;
}

interface MultiSelectProps {
  label?: string;
  value?: string[];
  onChange?: (selected: string[]) => void;
  options: MultiSelectOption[];
  className?: string;
  id?: string;
}

export default function MultiSelect({ label, value = [], onChange, options, className = '', id }: MultiSelectProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    onChange?.(selected);
  };

  return (
    <div className={`mb-3 ${className}`}>
      {label && <label htmlFor={inputId} className="form-label">{label}</label>}
      <select
        className="form-select"
        id={inputId}
        multiple
        value={value}
        onChange={handleChange}
        size={5}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
