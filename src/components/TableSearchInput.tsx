interface TableSearchInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function TableSearchInput({ value, onChange, placeholder = 'Search...', className = '' }: TableSearchInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={`input-group ${className}`}>
        <span className="input-group-text">
          <i className="bi bi-search"></i>
        </span>
        <input
          type="text"
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </form>
  );
}
