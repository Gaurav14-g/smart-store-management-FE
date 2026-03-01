import { useEffect } from 'react';

interface ToastProps {
  message: string;
  variant?: 'primary' | 'success' | 'danger' | 'warning' | 'info';
  show: boolean;
  onClose: () => void;
  autoHide?: boolean;
  delay?: number;
}

export default function Toast({ message, variant = 'primary', show, onClose, autoHide = true, delay = 3000 }: ToastProps) {
  useEffect(() => {
    if (show && autoHide) {
      const timer = setTimeout(onClose, delay);
      return () => clearTimeout(timer);
    }
  }, [show, autoHide, delay, onClose]);

  if (!show) return null;

  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 11 }}>
      <div className={`toast show bg-${variant} text-white`}>
        <div className="toast-body d-flex justify-content-between align-items-center">
          {message}
          <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
        </div>
      </div>
    </div>
  );
}
