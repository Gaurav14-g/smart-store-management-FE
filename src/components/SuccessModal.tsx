import Modal from './Modal';
import Button from './Button';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
}

export default function SuccessModal({ isOpen, onClose, title = 'Success', message }: SuccessModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={
        <Button variant="success" onClick={onClose}>
          OK
        </Button>
      }
    >
      <div className="text-center">
        <i className="bi bi-check-circle text-success" style={{ fontSize: '3rem' }}></i>
        <p className="mt-3">{message}</p>
      </div>
    </Modal>
  );
}
