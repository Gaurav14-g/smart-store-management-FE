interface FormSuccessMessageProps {
  message: string;
  className?: string;
}

export default function FormSuccessMessage({ message, className = '' }: FormSuccessMessageProps) {
  return (
    <div className={`alert alert-success d-flex align-items-center ${className}`} role="alert">
      <i className="bi bi-check-circle me-2"></i>
      <div>{message}</div>
    </div>
  );
}
