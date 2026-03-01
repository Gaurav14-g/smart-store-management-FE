interface SwitchToggleProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  id?: string;
}

export default function SwitchToggle({ label, checked, onChange, className = '', id }: SwitchToggleProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-') || 'switch';

  return (
    <div className={`form-check form-switch mb-3 ${className}`}>
      <input
        className="form-check-input"
        type="checkbox"
        role="switch"
        id={inputId}
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      {label && <label className="form-check-label" htmlFor={inputId}>{label}</label>}
    </div>
  );
}
