import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import AuthContext from '../context/AuthContext';

interface NavbarProps {
  onToggleSidebar?: () => void;
}

interface DecodedToken {
  user: {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    is_staff: boolean;
    is_superuser: boolean;
  };
  roles: string[];
}

export default function Navbar({ onToggleSidebar }: NavbarProps) {
  const { logOutUser, authToken } = useContext(AuthContext);
  const navigate = useNavigate();

  let userInfo = null;
  let userRoles = [];

  if (authToken?.access) {
    try {
      const decoded: DecodedToken = jwtDecode(authToken.access);
      userInfo = decoded.user;
      userRoles = decoded.roles || [];
    } catch (error) {
      console.error('Failed to decode token:', error);
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {onToggleSidebar && (
          <button
            className="navbar-toggler me-2"
            type="button"
            onClick={onToggleSidebar}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        )}
        <span className="navbar-brand mb-0 h1">OnTime</span>
        <div className="ms-auto d-flex align-items-center gap-3">
          {userInfo && (
            <div className="d-none d-md-block">
              <small className="d-block text-white">{userInfo.username}</small>
              <small className="d-block" style={{ color: '#adb5bd' }}>{userRoles.join(', ')}</small>
            </div>
          )}
          <div className="dropdown">
            <button
              className="btn btn-dark dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-person-circle me-1"></i>
              {userInfo?.username || 'Profile'}
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              {userInfo && (
                <>
                  <li className="px-3 py-2">
                    <div className="small text-muted">Signed in as</div>
                    <div className="fw-bold">{userInfo.username}</div>
                    <div className="small text-muted">{userInfo.email}</div>
                    <div className="small">
                      <span className="badge bg-primary mt-1">{userRoles.join(', ')}</span>
                    </div>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                </>
              )}
              <li>
                <button className="dropdown-item" onClick={() => navigate('/settings')}>
                  <i className="bi bi-gear me-2"></i>Settings
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={() => navigate('/profile')}>
                  <i className="bi bi-person me-2"></i>Profile
                </button>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button className="dropdown-item text-danger" onClick={() => logOutUser()}>
                  <i className="bi bi-box-arrow-right me-2"></i>Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
