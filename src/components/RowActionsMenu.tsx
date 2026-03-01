interface Action {
  label: string;
  icon?: string;
  onClick: () => void;
  variant?: 'danger' | 'warning' | 'primary';
}

interface RowActionsMenuProps {
  actions: Action[];
}

export default function RowActionsMenu({ actions }: RowActionsMenuProps) {
  return (
    <div className="dropdown">
      <button
        className="btn btn-sm btn-outline-secondary"
        type="button"
        data-bs-toggle="dropdown"
      >
        <i className="bi bi-three-dots-vertical"></i>
      </button>
      <ul className="dropdown-menu">
        {actions.map((action, index) => (
          <li key={index}>
            <button
              className={`dropdown-item ${action.variant ? `text-${action.variant}` : ''}`}
              onClick={action.onClick}
            >
              {action.icon && <i className={`bi bi-${action.icon} me-2`}></i>}
              {action.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
