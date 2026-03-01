interface TextareaProps {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  className?: string;
  id?: string;
}

export default function Textarea({ label, value, onChange, placeholder, required, rows = 3, className = '', id }: TextareaProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={`mb-3 ${className}`}>
      {label && <label htmlFor={inputId} className="form-label">{label}</label>}
      <textarea
        className="form-control"
        id={inputId}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
      />
    </div>
  );
}
