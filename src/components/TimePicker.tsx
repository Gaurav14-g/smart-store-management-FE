interface TimePickerProps {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  id?: string;
}

export default function TimePicker({ label, value, onChange, required, className = '', id }: TimePickerProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={`mb-3 ${className}`}>
      {label && <label htmlFor={inputId} className="form-label">{label}</label>}
      <input
        type="time"
        className="form-control"
        id={inputId}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}
