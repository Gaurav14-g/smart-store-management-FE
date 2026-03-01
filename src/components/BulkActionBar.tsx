interface BulkAction {
  label: string;
  icon?: string;
  onClick: () => void;
  variant?: 'primary' | 'danger' | 'warning' | 'success';
}

interface BulkActionBarProps {
  selectedCount: number;
  actions: BulkAction[];
  onClearSelection?: () => void;
}

export default function BulkActionBar({ selectedCount, actions, onClearSelection }: BulkActionBarProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="alert alert-info d-flex justify-content-between align-items-center mb-3">
      <div>
        <strong>{selectedCount}</strong> item{selectedCount > 1 ? 's' : ''} selected
      </div>
      <div className="btn-group">
        {actions.map((action, index) => (
          <button
            key={index}
            className={`btn btn-sm btn-${action.variant || 'primary'}`}
            onClick={action.onClick}
          >
            {action.icon && <i className={`bi bi-${action.icon} me-1`}></i>}
            {action.label}
          </button>
        ))}
        {onClearSelection && (
          <button className="btn btn-sm btn-secondary" onClick={onClearSelection}>
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
