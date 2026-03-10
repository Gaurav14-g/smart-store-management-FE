import { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="d-flex flex-column min-vh-100" style={{ background: '#f5f5f5' }}>
      <Navbar onToggleSidebar={toggleSidebar} />
      <div className="d-flex flex-grow-1">
        <Sidebar isOpen={sidebarOpen} />
        <main className="flex-grow-1 p-4" style={{ marginLeft: '0', background: '#f5f5f5' }}>
          <div className="container-fluid">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
