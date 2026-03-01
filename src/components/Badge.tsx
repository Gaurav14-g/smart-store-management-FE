interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  pill?: boolean;
  className?: string;
}

export default function Badge({ children, variant = 'primary', pill = false, className = '' }: BadgeProps) {
  return (
    <span className={`badge bg-${variant} ${pill ? 'rounded-pill' : ''} ${className}`}>
      {children}
    </span>
  );
}
