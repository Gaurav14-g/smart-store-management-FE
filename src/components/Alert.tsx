interface AlertProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  dismissible?: boolean;
  onClose?: () => void;
  className?: string;
}

export default function Alert({
  children,
  variant = 'info',
  dismissible = false,
  onClose,
  className = ''
}: AlertProps) {
  return (
    <div className={`alert alert-${variant} ${dismissible ? 'alert-dismissible fade show' : ''} ${className}`} role="alert">
      {children}
      {dismissible && (
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={onClose}></button>
      )}
    </div>
  );
}
