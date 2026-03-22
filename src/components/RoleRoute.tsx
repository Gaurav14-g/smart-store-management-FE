import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  allowed: string[];  // e.g. ['superuser', 'Owner', 'Manager']
}

export default function RoleRoute({ children, allowed }: Props) {
  const role = localStorage.getItem('role') || '';
  if (!allowed.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
}
