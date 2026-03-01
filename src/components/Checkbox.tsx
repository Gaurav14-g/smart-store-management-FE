interface CheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  id?: string;
}

export default function Checkbox({ label, checked, onChange, className = '', id }: CheckboxProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={`form-check mb-3 ${className}`}>
      <input
        className="form-check-input"
        type="checkbox"
        id={inputId}
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <label className="form-check-label" htmlFor={inputId}>
        {label}
      </label>
    </div>
  );
}
