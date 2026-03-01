interface FilterOption {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  label?: string;
  options: FilterOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export default function FilterDropdown({ label = 'Filter', options, value, onChange, className = '' }: FilterDropdownProps) {
  return (
    <div className={`dropdown ${className}`}>
      <button
        className="btn btn-outline-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
      >
        <i className="bi bi-funnel me-2"></i>
        {label}
      </button>
      <ul className="dropdown-menu">
        {options.map((option) => (
          <li key={option.value}>
            <button
              className={`dropdown-item ${value === option.value ? 'active' : ''}`}
              onClick={() => onChange?.(option.value)}
            >
              {option.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
