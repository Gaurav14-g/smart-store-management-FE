interface NotificationBellProps {
  count?: number;
  onClick?: () => void;
}

export default function NotificationBell({ count = 0, onClick }: NotificationBellProps) {
  return (
    <button className="btn btn-link position-relative" onClick={onClick}>
      <i className="bi bi-bell" style={{ fontSize: '1.5rem' }}></i>
      {count > 0 && (
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </button>
  );
}
