import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import VoiceCommandButton from '../components/VoiceCommandButton';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <style>{`
        @keyframes page-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .page-transition {
          animation: page-in 0.25s ease both;
        }
      `}</style>
      <div className="d-flex flex-column min-vh-100" style={{ background: '#f5f5f5', overflowX: 'hidden' }}>
        <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="d-flex flex-grow-1">
          <Sidebar isOpen={sidebarOpen} />
          <main className="flex-grow-1 p-4" style={{ background: '#f5f5f5', minWidth: 0, overflowX: 'hidden' }}>
            <div key={location.pathname} className="container-fluid page-transition">
              {children}
            </div>
          </main>
        </div>
        <Footer />
        <VoiceCommandButton />
      </div>
    </>
  );
}
