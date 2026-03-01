import { useEffect } from 'react';

interface SnackbarProps {
  message: string;
  show: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Snackbar({ message, show, onClose, duration = 3000 }: SnackbarProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  return (
    <div className="position-fixed bottom-0 start-50 translate-middle-x p-3" style={{ zIndex: 11 }}>
      <div className="alert alert-dark d-flex align-items-center" role="alert">
        {message}
      </div>
    </div>
  );
}
