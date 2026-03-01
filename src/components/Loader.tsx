interface LoaderProps {
  size?: 'sm' | 'lg';
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
}

export default function Loader({ size, variant = 'primary' }: LoaderProps) {
  const sizeClass = size === 'sm' ? 'spinner-border-sm' : '';

  return (
    <div className="text-center">
      <div className={`spinner-border text-${variant} ${sizeClass}`} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
