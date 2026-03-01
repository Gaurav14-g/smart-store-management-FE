interface FileUploadProps {
  label?: string;
  onChange?: (files: FileList | null) => void;
  accept?: string;
  multiple?: boolean;
  required?: boolean;
  className?: string;
  id?: string;
}

export default function FileUpload({ label, onChange, accept, multiple, required, className = '', id }: FileUploadProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-') || 'file-upload';

  return (
    <div className={`mb-3 ${className}`}>
      {label && <label htmlFor={inputId} className="form-label">{label}</label>}
      <input
        type="file"
        className="form-control"
        id={inputId}
        onChange={(e) => onChange?.(e.target.files)}
        accept={accept}
        multiple={multiple}
        required={required}
      />
    </div>
  );
}
