import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthLayout from '../../layouts/AuthLayout';
import Toast from '../../components/Toast';
import global from '../../../config/Global.json';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [toastState, setToastState] = useState({ show: false, message: '', variant: 'primary' as const });
  const navigate = useNavigate();

  const showToast = (message: string, variant: 'primary' | 'success' | 'danger' | 'warning' | 'info' = 'primary') => {
    setToastState({ show: true, message, variant });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) { showToast('Passwords do not match', 'danger'); return; }
    if (password.length < 6) { showToast('Password must be at least 6 characters', 'danger'); return; }
    setLoading(true);
    try {
      await axios.post(`${global.api.host}/api/v1/user/`, {
        username, first_name: firstName, last_name: lastName, email, password, groups: []
      });
      showToast('Registration successful! Please login.', 'success');
      setTimeout(() => navigate('/signin'), 2000);
    } catch (error: any) {
      showToast(error.response?.data?.username?.[0] || error.response?.data?.error || 'Registration failed.', 'danger');
    } finally {
      setLoading(false);
    }
  };

  const field = (
    label: string, icon: string, type: string, placeholder: string,
    value: string, onChange: (v: string) => void, required = false
  ) => (
    <div className="mb-3">
      <label className="form-label fw-semibold" style={{ fontSize: '0.85rem', color: '#374151' }}>{label}</label>
      <div className="input-group">
        <span className="input-group-text bg-white border-end-0" style={{ borderColor: '#d1d5db' }}>
          <i className={`bi bi-${icon} text-muted`}></i>
        </span>
        <input
          type={type}
          className="form-control border-start-0 ps-0"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          style={{ borderColor: '#d1d5db', boxShadow: 'none' }}
        />
      </div>
    </div>
  );

  return (
    <AuthLayout>
      <div>
        <h4 className="fw-bold mb-1" style={{ color: '#0f172a' }}>Create an account</h4>
        <p className="text-muted mb-4" style={{ fontSize: '0.9rem' }}>Fill in the details below to get started</p>

        <form onSubmit={handleSubmit}>
          {field('Username', 'person', 'text', 'Enter username', username, setUsername, true)}

          <div className="row g-2 mb-0">
            <div className="col-6">
              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ fontSize: '0.85rem', color: '#374151' }}>First Name</label>
                <input
                  type="text" className="form-control" placeholder="First name"
                  value={firstName} onChange={(e) => setFirstName(e.target.value)}
                  style={{ borderColor: '#d1d5db', boxShadow: 'none' }}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ fontSize: '0.85rem', color: '#374151' }}>Last Name</label>
                <input
                  type="text" className="form-control" placeholder="Last name"
                  value={lastName} onChange={(e) => setLastName(e.target.value)}
                  style={{ borderColor: '#d1d5db', boxShadow: 'none' }}
                />
              </div>
            </div>
          </div>

          {field('Email', 'envelope', 'email', 'Enter email', email, setEmail, true)}
          {field('Password', 'lock', 'password', 'Min 6 characters', password, setPassword, true)}
          {field('Confirm Password', 'lock-fill', 'password', 'Repeat password', confirmPassword, setConfirmPassword, true)}

          <button
            type="submit"
            className="btn w-100 fw-semibold mb-4 mt-1"
            disabled={loading}
            style={{ background: '#2563eb', color: '#fff', padding: '10px', fontSize: '0.95rem', border: 'none', borderRadius: 8 }}
          >
            {loading ? (
              <><span className="spinner-border spinner-border-sm me-2"></span>Creating Account...</>
            ) : 'Create Account'}
          </button>

          <p className="text-center text-muted mb-0" style={{ fontSize: '0.875rem' }}>
            Already have an account?{' '}
            <Link to="/signin" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 600 }}>
              Sign in
            </Link>
          </p>
        </form>
      </div>

      <Toast
        show={toastState.show}
        onClose={() => setToastState({ ...toastState, show: false })}
        message={toastState.message}
        variant={toastState.variant}
      />
    </AuthLayout>
  );
}
