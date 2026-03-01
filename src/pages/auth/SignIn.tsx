import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout';
import Card from '../../components/Card';
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
  };

  return (
    <AuthLayout>
      <Card title="Sign In" className="shadow">
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
            type="password"
            label="Password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember me
            </label>
          </div>
          <Button type="submit" variant="primary" className="w-100 mb-3">
            Sign In
          </Button>
          <div className="text-center">
            <Link to="/forgot-password" className="d-block mb-2">
              Forgot password?
            </Link>
            <Link to="/signup">
              Don't have an account? Sign up
            </Link>
          </div>
        </form>
      </Card>
    </AuthLayout>
  );
}
