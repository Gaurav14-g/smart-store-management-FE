import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Alert from '../../components/Alert';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAlert(true);
  };

  return (
    <AuthLayout>
      <Card title="Forgot Password" className="shadow">
        {showAlert && (
          <Alert variant="success" dismissible onClose={() => setShowAlert(false)}>
            Password reset link sent to your email!
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" variant="primary" className="w-100 mb-3">
            Reset Password
          </Button>
          <div className="text-center">
            <Link to="/signin">
              Back to Sign In
            </Link>
          </div>
        </form>
      </Card>
    </AuthLayout>
  );
}
