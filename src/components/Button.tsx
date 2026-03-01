interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link';
  type?: 'button' | 'submit' | 'reset';
  size?: 'sm' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  type = 'button',
  size,
  className = '',
  onClick,
  disabled = false
}: ButtonProps) {
  const sizeClass = size ? `btn-${size}` : '';

  return (
    <button
      type={type}
      className={`btn btn-${variant} ${sizeClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
