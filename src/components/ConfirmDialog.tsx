import Modal from './Modal';
import Button from './Button';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'primary';
}

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger'
}: ConfirmDialogProps) {
  const iconMap = {
    danger: { icon: 'bi-exclamation-triangle-fill', bg: 'text-danger', ring: 'border-danger' },
    warning: { icon: 'bi-exclamation-circle-fill', bg: 'text-warning', ring: 'border-warning' },
    primary: { icon: 'bi-question-circle-fill', bg: 'text-primary', ring: 'border-primary' },
  };
  const { icon, bg, ring } = iconMap[variant];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="text-center px-2 py-3">
        <div
          className={`d-inline-flex align-items-center justify-content-center rounded-circle border border-2 ${ring} mb-3`}
          style={{ width: 64, height: 64 }}
        >
          <i className={`bi ${icon} ${bg} fs-2`}></i>
        </div>
        <h5 className="fw-semibold mb-2">{title}</h5>
        <p className="text-muted mb-0" style={{ fontSize: '0.95rem' }}>{message}</p>
      </div>
      <div className="d-flex gap-2 px-2 pb-3">
        <Button variant="light" className="flex-fill border" onClick={onClose}>
          {cancelText}
        </Button>
        <Button variant={variant} className="flex-fill" onClick={onConfirm}>
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
}
