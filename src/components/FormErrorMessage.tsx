interface FormErrorMessageProps {
  message: string;
  className?: string;
}

export default function FormErrorMessage({ message, className = '' }: FormErrorMessageProps) {
  return (
    <div className={`alert alert-danger d-flex align-items-center ${className}`} role="alert">
      <i className="bi bi-exclamation-triangle me-2"></i>
      <div>{message}</div>
    </div>
  );
}
