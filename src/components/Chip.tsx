interface ChipProps {
  label: string;
  onRemove?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  className?: string;
}

export default function Chip({ label, onRemove, variant = 'secondary', className = '' }: ChipProps) {
  return (
    <span className={`badge bg-${variant} ${className}`}>
      {label}
      {onRemove && (
        <button
          type="button"
          className="btn-close btn-close-white ms-2"
          aria-label="Remove"
          onClick={onRemove}
          style={{ fontSize: '0.6rem' }}
        ></button>
      )}
    </span>
  );
}
