interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  label?: string;
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  options: RadioOption[];
  inline?: boolean;
  className?: string;
}

export default function RadioGroup({ label, name, value, onChange, options, inline = false, className = '' }: RadioGroupProps) {
  return (
    <div className={`mb-3 ${className}`}>
      {label && <label className="form-label">{label}</label>}
      {options.map((option) => (
        <div key={option.value} className={`form-check ${inline ? 'form-check-inline' : ''}`}>
          <input
            className="form-check-input"
            type="radio"
            name={name}
            id={`${name}-${option.value}`}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange?.(e.target.value)}
          />
          <label className="form-check-label" htmlFor={`${name}-${option.value}`}>
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
}
