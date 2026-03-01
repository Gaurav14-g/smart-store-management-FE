interface DatePickerProps {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  min?: string;
  max?: string;
  className?: string;
  id?: string;
}

export default function DatePicker({ label, value, onChange, required, min, max, className = '', id }: DatePickerProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={`mb-3 ${className}`}>
      {label && <label htmlFor={inputId} className="form-label">{label}</label>}
      <input
        type="date"
        className="form-control"
        id={inputId}
        value={value}
        onChange={onChange}
        required={required}
        min={min}
        max={max}
      />
    </div>
  );
}
