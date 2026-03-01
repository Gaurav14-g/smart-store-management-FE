interface WarningBannerProps {
  message: string;
  onClose?: () => void;
}

export default function WarningBanner({ message, onClose }: WarningBannerProps) {
  return (
    <div className="alert alert-warning alert-dismissible fade show" role="alert">
      <i className="bi bi-exclamation-triangle me-2"></i>
      {message}
      {onClose && (
        <button type="button" className="btn-close" onClick={onClose}></button>
      )}
    </div>
  );
}
