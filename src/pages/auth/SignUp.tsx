import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthLayout from '../../layouts/AuthLayout';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Toast from '../../components/Toast';
import global from '../../../config/Global.json';

export default function SignUp() {
  const [username, setUsername] = useState('');
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
    
    if (password !== confirmPassword) {
      showToast('Passwords do not match', 'danger');
      return;
    }

    if (password.length < 6) {
      showToast('Password must be at least 6 characters', 'danger');
      return;
    }

    setLoading(true);
    
    try {
      await axios.post(`${global.api.host}/api/v1/user/`, {
        username,
        email,
        password,
        groups: []
      });
      
      showToast('Registration successful! Please login.', 'success');
      setTimeout(() => navigate('/signin'), 2000);
    } catch (error: any) {
      const errorMessage = error.response?.data?.username?.[0] || 
                          error.response?.data?.error || 
                          'Registration failed. Please try again.';
      showToast(errorMessage, 'danger');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Card title="Sign Up" className="shadow">
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            label="Username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            type="email"
            label="Email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            label="Password"
            placeholder="Enter password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            type="password"
            label="Confirm Password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="primary" className="w-100 mb-3" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </Button>
          <div className="text-center">
            <Link to="/signin">
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </Card>
      <Toast
        show={toastState.show}
        onClose={() => setToastState({ ...toastState, show: false })}
        message={toastState.message}
        variant={toastState.variant}
      />
    </AuthLayout>
  );
}
