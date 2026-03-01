import { Link } from 'react-router-dom';
import Button from '../components/Button';

export default function NotFound() {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="text-center">
        <h1 className="display-1 fw-bold text-primary">404</h1>
        <p className="fs-3 text-muted">Page Not Found</p>
        <p className="lead">The page you're looking for doesn't exist.</p>
        <Link to="/dashboard">
          <Button variant="primary">
            <i className="bi bi-house me-2"></i>
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
