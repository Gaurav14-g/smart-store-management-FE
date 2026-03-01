interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read?: boolean;
}

interface NotificationPanelProps {
  notifications: Notification[];
  onMarkAsRead?: (id: string) => void;
  onClearAll?: () => void;
}

export default function NotificationPanel({ notifications, onMarkAsRead, onClearAll }: NotificationPanelProps) {
  return (
    <div className="card" style={{ width: '350px' }}>
      <div className="card-header d-flex justify-content-between align-items-center">
        <h6 className="mb-0">Notifications</h6>
        {onClearAll && (
          <button className="btn btn-sm btn-link" onClick={onClearAll}>
            Clear All
          </button>
        )}
      </div>
      <div className="list-group list-group-flush" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {notifications.length === 0 ? (
          <div className="p-3 text-center text-muted">No notifications</div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className={`list-group-item ${!notif.read ? 'bg-light' : ''}`}
              onClick={() => onMarkAsRead?.(notif.id)}
              style={{ cursor: 'pointer' }}
            >
              <div className="d-flex justify-content-between">
                <strong>{notif.title}</strong>
                <small className="text-muted">{notif.time}</small>
              </div>
              <p className="mb-0 small">{notif.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
