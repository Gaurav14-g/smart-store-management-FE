interface SpinnerProps {
  size?: 'sm' | 'lg';
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  fullScreen?: boolean;
}

export default function Spinner({ size, variant = 'primary', fullScreen = false }: SpinnerProps) {
  const sizeClass = size === 'sm' ? 'spinner-border-sm' : '';
  
  const spinner = (
    <div className={`spinner-border text-${variant} ${sizeClass}`} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-white bg-opacity-75" style={{ zIndex: 9999 }}>
        {spinner}
      </div>
    );
  }

  return <div className="text-center">{spinner}</div>;
}
