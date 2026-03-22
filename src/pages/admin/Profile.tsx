import { useEffect, useState, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import AdminLayout from '../../layouts/AdminLayout';
import useApi from '../../hooks/useApi';
import AuthContext from '../../context/AuthContext';

export default function Profile() {
  const { authToken } = useContext(AuthContext);
  const { Get, Patch, getHost } = useApi();

  const [user, setUser]         = useState<any>(null);
  const [loading, setLoading]   = useState(true);
  const [editing, setEditing]   = useState(false);
  const [form, setForm]         = useState({ first_name: '', last_name: '', email: '' });
  const [saving, setSaving]     = useState(false);
  const [msg, setMsg]           = useState<{ text: string; ok: boolean } | null>(null);
  const decoded   = authToken?.access ? (jwtDecode(authToken.access) as any) : null;
  const userId    = decoded?.user_id;
  const currentRole = localStorage.getItem('role') || 'staff';

  const fetchUser = () =>
    Get(`${getHost()}/api/v1/user/${userId}/`).then(data => {
      setUser(data);
      setForm({ first_name: data.first_name || '', last_name: data.last_name || '', email: data.email || '' });
    });

  useEffect(() => {
    if (!userId) return;
    fetchUser().finally(() => setLoading(false));
  }, [userId]);

  const handleSave = async () => {
    if (!userId) return;
    setSaving(true); setMsg(null);
    try {
      await Patch('users', userId, form);
      await fetchUser();
      setEditing(false);
      setMsg({ text: 'Profile updated successfully', ok: true });
    } catch {
      setMsg({ text: 'Failed to update profile', ok: false });
    } finally { setSaving(false); }
  };

  const roleColors: Record<string, string> = {
    Owner: 'danger', Manager: 'warning', Cashier: 'info',
    Employee: 'secondary', superuser: 'dark', staff: 'primary',
  };

  const accessMap: Record<string, Record<string, string>> = {
    superuser: { Products: 'Full', Customers: 'Full', Billing: 'Full', Reports: 'Full', Users: 'Full', Roles: 'Full' },
    Owner:     { Products: 'Full', Customers: 'Full', Billing: 'Full', Reports: 'Full', Users: 'Full', Roles: 'Full' },
    Manager:   { Products: 'Full', Customers: 'Full', Billing: 'Full', Reports: 'Full', Users: 'View', Roles: 'None' },
    Cashier:   { Products: 'View', Customers: 'Limited', Billing: 'Full', Reports: 'None', Users: 'None', Roles: 'None' },
    Employee:  { Products: 'View', Customers: 'View', Billing: 'View', Reports: 'None', Users: 'None', Roles: 'None' },
    staff:     { Products: 'View', Customers: 'View', Billing: 'Full', Reports: 'None', Users: 'None', Roles: 'None' },
  };

  const badgeColor = (a: string) =>
    a === 'Full' ? 'success' : a === 'Limited' ? 'warning' : a === 'View' ? 'info' : 'danger';

  if (loading) return (
    <AdminLayout>
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 300 }}>
        <div className="spinner-border text-primary" />
      </div>
    </AdminLayout>
  );

  return (
    <AdminLayout>
      <div className="row g-4" style={{ maxWidth: 960, margin: '0 auto' }}>

        {/* ── Left card ── */}
        <div className="col-md-4">
          <div className="card text-center p-4 h-100">
            <div className="mx-auto mb-3 rounded-circle bg-dark text-white d-flex align-items-center justify-content-center"
              style={{ width: 90, height: 90, fontSize: 36 }}>
              {user?.username?.[0]?.toUpperCase() || '?'}
            </div>
            <h5 className="mb-1">{user?.first_name} {user?.last_name}</h5>
            <p className="text-muted small mb-2">@{user?.username}</p>

            {/* role badges */}
            <div className="d-flex flex-wrap justify-content-center gap-1 mb-3">
              {user?.groups_detail?.length > 0
                ? user.groups_detail.map((g: any) => (
                    <span key={g.id} className={`badge bg-${roleColors[g.name] || 'primary'}`}>{g.name}</span>
                  ))
                : <span className="badge bg-secondary">No Role</span>
              }
            </div>

            <div className="d-flex justify-content-center gap-3 text-muted small">
              <div><div className="fw-bold text-dark">{user?.groups_detail?.length || 0}</div><div>Roles</div></div>
              <div><div className={`fw-bold text-${user?.is_active ? 'success' : 'danger'}`}>{user?.is_active ? 'Active' : 'Inactive'}</div><div>Status</div></div>
              <div><div className="fw-bold text-dark">{user?.is_staff ? 'Yes' : 'No'}</div><div>Staff</div></div>
            </div>
          </div>
        </div>

        {/* ── Right cards ── */}
        <div className="col-md-8 d-flex flex-column gap-4">

          {msg && (
            <div className={`alert alert-${msg.ok ? 'success' : 'danger'} py-2 small mb-0`}>{msg.text}</div>
          )}

          {/* Basic Info */}
          <div className="card p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="mb-0 fw-bold"><i className="bi bi-person me-2"></i>Basic Information</h6>
              {!editing
                ? <button className="btn btn-sm btn-outline-primary" onClick={() => setEditing(true)}>
                    <i className="bi bi-pencil me-1"></i>Edit
                  </button>
                : <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-success" onClick={handleSave} disabled={saving}>
                      {saving ? <span className="spinner-border spinner-border-sm" /> : <><i className="bi bi-check me-1"></i>Save</>}
                    </button>
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => setEditing(false)}>Cancel</button>
                  </div>
              }
            </div>
            <div className="row g-3">
              {(['first_name','last_name','email'] as const).map(key => (
                <div className="col-sm-6" key={key}>
                  <label className="form-label small text-muted mb-1">
                    {key === 'first_name' ? 'First Name' : key === 'last_name' ? 'Last Name' : 'Email'}
                  </label>
                  {editing
                    ? <input className="form-control form-control-sm" autoComplete="off"
                        value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} />
                    : <div className="fw-semibold">{user?.[key] || <span className="text-muted">—</span>}</div>
                  }
                </div>
              ))}
              <div className="col-sm-6">
                <label className="form-label small text-muted mb-1">Username</label>
                <div className="fw-semibold">@{user?.username}</div>
              </div>
            </div>
          </div>

          {/* Assigned Roles */}
          <div className="card p-4">
            <h6 className="fw-bold mb-3"><i className="bi bi-shield-lock me-2"></i>Assigned Roles</h6>

            {user?.groups_detail?.length > 0 ? (
              <div className="d-flex flex-wrap gap-2">
                {user.groups_detail.map((g: any) => (
                  <span key={g.id} className={`badge bg-${roleColors[g.name] || 'primary'}`}
                    style={{ fontSize: 13, padding: '6px 12px' }}>
                    <i className="bi bi-person-badge me-1"></i>{g.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-muted small mb-0">No roles assigned</p>
            )}
          </div>

          {/* Permissions */}
          <div className="card p-4">
            <h6 className="fw-bold mb-3"><i className="bi bi-key me-2"></i>Permissions</h6>

            {user?.user_permissions_detail?.length > 0 ? (
              <div className="d-flex flex-wrap gap-1 mb-3">
                {user.user_permissions_detail.map((p: any) => (
                  <span key={p.id} className="badge bg-light text-dark border" style={{ fontSize: 11 }}>
                    {p.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-muted small mb-3">
                {user?.groups_detail?.length > 0
                  ? 'Permissions are inherited from assigned roles.'
                  : 'No permissions — assign a role first.'}
              </p>
            )}

            {/* Access grid */}
            <hr className="my-2" />
            <p className="small text-muted mb-2">Access level summary:</p>
            <div className="row g-2">
              {Object.entries(accessMap[currentRole] || accessMap['staff']).map(([label, access]) => (
                <div className="col-6 col-md-4" key={label}>
                  <div className="d-flex align-items-center gap-2 p-2 rounded border">
                    <i className={`bi bi-${
                      label==='Products'?'box-seam':label==='Customers'?'people':
                      label==='Billing'?'receipt':label==='Reports'?'graph-up':
                      label==='Users'?'person-gear':'shield-lock'
                    } text-${badgeColor(access)}`}></i>
                    <div>
                      <div className="small fw-semibold">{label}</div>
                      <span className={`badge bg-${badgeColor(access)}`} style={{ fontSize: 10 }}>{access}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}
