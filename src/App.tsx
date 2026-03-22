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
import CustomerAnalytics from './pages/admin/CustomerAnalytics';
import Billing from './pages/admin/Billing';
import SalesReports from './pages/admin/SalesReports';
import VoiceCommands from './pages/admin/VoiceCommands';
import ProductScan from './pages/admin/ProductScan';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';
import Settings from './pages/admin/Settings';
import Profile from './pages/admin/Profile';
import RoleRoute from './components/RoleRoute';

const OWNER_ONLY   = ['superuser', 'Owner'];
const MANAGEMENT   = ['superuser', 'Owner', 'Manager'];
const REPORTS      = ['superuser', 'Owner', 'Manager'];

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
      <Route path="/settings" element={<PrivateRoute><RoleRoute allowed={['superuser', 'Owner', 'Manager']}><Settings /></RoleRoute></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route
        path="/users"
        element={
          <PrivateRoute>
            <RoleRoute allowed={MANAGEMENT}>
              <Users />
            </RoleRoute>
          </PrivateRoute>
        }
      />
      <Route
        path="/roles"
        element={
          <PrivateRoute>
            <RoleRoute allowed={OWNER_ONLY}>
              <Roles />
            </RoleRoute>
          </PrivateRoute>
        }
      />
      <Route
        path="/clients"
        element={
          <PrivateRoute>
            <RoleRoute allowed={MANAGEMENT}>
              <Clients />
            </RoleRoute>
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
        path="/customer-analytics"
        element={
          <PrivateRoute>
            <CustomerAnalytics />
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
            <RoleRoute allowed={REPORTS}>
              <SalesReports />
            </RoleRoute>
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
      <Route
        path="/product/scan/:barcode"
        element={
          <PrivateRoute>
            <ProductScan />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
