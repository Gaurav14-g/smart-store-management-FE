interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'lg' | 'xl';
  footer?: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children, size, footer }: ModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="modal show d-block" tabIndex={-1}>
        <div className={`modal-dialog ${size ? `modal-${size}` : ''}`}>
          <div className="modal-content">
            {title && (
              <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
                <button type="button" className="btn-close" onClick={onClose}></button>
              </div>
            )}
            <div className="modal-body">{children}</div>
            {footer && <div className="modal-footer">{footer}</div>}
          </div>
        </div>
      </div>
      <div className="modal-backdrop show"></div>
    </>
  );
}
