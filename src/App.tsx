import { Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import ForgotPassword from './pages/auth/ForgotPassword';
import Dashboard from './pages/admin/Dashboard';
import ComponentShowcase from './pages/admin/ComponentShowcase';
import Users from './pages/admin/Users';
import Roles from './pages/admin/Roles';
import Clients from './pages/admin/Clients';
import Products from './pages/admin/Products';
import Customers from './pages/admin/Customers';
import Billing from './pages/admin/Billing';
import SalesReports from './pages/admin/SalesReports';
import VoiceCommands from './pages/admin/VoiceCommands';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" replace />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/components"
        element={
          <PrivateRoute>
            <ComponentShowcase />
          </PrivateRoute>
        }
      />
      <Route
        path="/users"
        element={
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        }
      />
      <Route
        path="/roles"
        element={
          <PrivateRoute>
            <Roles />
          </PrivateRoute>
        }
      />
      <Route
        path="/clients"
        element={
          <PrivateRoute>
            <Clients />
          </PrivateRoute>
        }
      />
      <Route
        path="/products"
        element={
          <PrivateRoute>
            <Products />
          </PrivateRoute>
        }
      />
      <Route
        path="/customers"
        element={
          <PrivateRoute>
            <Customers />
          </PrivateRoute>
        }
      />
      <Route
        path="/billing"
        element={
          <PrivateRoute>
            <Billing />
          </PrivateRoute>
        }
      />
      <Route
        path="/sales-reports"
        element={
          <PrivateRoute>
            <SalesReports />
          </PrivateRoute>
        }
      />
      <Route
        path="/voice-commands"
        element={
          <PrivateRoute>
            <VoiceCommands />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
