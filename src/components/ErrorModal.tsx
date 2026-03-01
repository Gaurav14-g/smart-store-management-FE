import Modal from './Modal';
import Button from './Button';

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
}

export default function ErrorModal({ isOpen, onClose, title = 'Error', message }: ErrorModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={
        <Button variant="danger" onClick={onClose}>
          Close
        </Button>
      }
    >
      <div className="text-center">
        <i className="bi bi-x-circle text-danger" style={{ fontSize: '3rem' }}></i>
        <p className="mt-3">{message}</p>
      </div>
    </Modal>
  );
}
