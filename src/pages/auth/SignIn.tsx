import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout';
import Input from '../../components/Input';
import Button from '../../components/Button';
import AuthContext from '../../context/AuthContext';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { loginUser } = useContext(AuthContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginUser(e);
    setPassword('');
  };

  return (
    <AuthLayout>
      <div>
        <h4 className="fw-bold mb-1" style={{ color: '#0f172a' }}>Welcome back</h4>
        <p className="text-muted mb-4" style={{ fontSize: '0.9rem' }}>Sign in to your account to continue</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold" style={{ fontSize: '0.85rem', color: '#374151' }}>
              Username
            </label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0" style={{ borderColor: '#d1d5db' }}>
                <i className="bi bi-person text-muted"></i>
              </span>
              <input
                type="text"
                name="username"
                className="form-control border-start-0 ps-0"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="off"
                style={{ borderColor: '#d1d5db', boxShadow: 'none' }}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold" style={{ fontSize: '0.85rem', color: '#374151' }}>
              Password
            </label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0" style={{ borderColor: '#d1d5db' }}>
                <i className="bi bi-lock text-muted"></i>
              </span>
              <input
                type="password"
                name="password"
                className="form-control border-start-0 ps-0"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                style={{ borderColor: '#d1d5db', boxShadow: 'none' }}
              />
            </div>
          </div>

          <div className="d-flex align-items-center justify-content-between mb-4">
            <div className="form-check mb-0">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label className="form-check-label text-muted" htmlFor="rememberMe" style={{ fontSize: '0.85rem' }}>
                Remember me
              </label>
            </div>
            <Link to="/forgot-password" style={{ fontSize: '0.85rem', color: '#2563eb', textDecoration: 'none' }}>
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="btn w-100 fw-semibold mb-4"
            style={{ background: '#2563eb', color: '#fff', padding: '10px', fontSize: '0.95rem', border: 'none', borderRadius: 8 }}
          >
            Sign In
          </button>

          <p className="text-center text-muted mb-0" style={{ fontSize: '0.875rem' }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 600 }}>
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}
