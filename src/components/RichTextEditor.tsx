interface RichTextEditorProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  id?: string;
}

export default function RichTextEditor({ label, value, onChange, placeholder, className = '', id }: RichTextEditorProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={`mb-3 ${className}`}>
      {label && <label htmlFor={inputId} className="form-label">{label}</label>}
      <div className="border rounded">
        <div className="btn-toolbar border-bottom p-2" role="toolbar">
          <div className="btn-group btn-group-sm me-2">
            <button type="button" className="btn btn-outline-secondary" title="Bold">
              <i className="bi bi-type-bold"></i>
            </button>
            <button type="button" className="btn btn-outline-secondary" title="Italic">
              <i className="bi bi-type-italic"></i>
            </button>
            <button type="button" className="btn btn-outline-secondary" title="Underline">
              <i className="bi bi-type-underline"></i>
            </button>
          </div>
          <div className="btn-group btn-group-sm">
            <button type="button" className="btn btn-outline-secondary" title="List">
              <i className="bi bi-list-ul"></i>
            </button>
            <button type="button" className="btn btn-outline-secondary" title="Link">
              <i className="bi bi-link"></i>
            </button>
          </div>
        </div>
        <textarea
          className="form-control border-0"
          id={inputId}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          rows={6}
          style={{ resize: 'vertical' }}
        />
      </div>
    </div>
  );
}
