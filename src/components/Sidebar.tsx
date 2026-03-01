import { Link } from 'react-router-dom';
import sidebarConfig from '../../config/sidebar.json';

interface SidebarProps {
  isOpen: boolean;
}

interface MenuItem {
  label: string;
  url: string;
  icon: string;
  section: string;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const role = localStorage.getItem('role') || 'staff';
  const menuItems: MenuItem[] = sidebarConfig.menu[role as keyof typeof sidebarConfig.menu] || sidebarConfig.menu.staff;
  
  const sections = Array.from(new Set(menuItems.map(item => item.section)));

  return (
    <>
      {isOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-lg-none"
          style={{ zIndex: 999 }}
          onClick={() => {}}
        ></div>
      )}
      
      <div
        className={`bg-dark text-white ${isOpen ? 'd-block' : 'd-none'} d-lg-block`}
        style={{
          minHeight: '100vh',
          width: '250px',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 1000
        }}
      >
        <div className="p-3">
          <h5 className="text-white mb-3">Smart Store</h5>
          <hr className="text-white" />
          
          {sections.map(section => (
            <div key={section} className="mb-3">
              <div className="text-uppercase small mb-2" style={{ fontSize: '0.75rem', letterSpacing: '0.5px', color: '#adb5bd' }}>
                {section}
              </div>
              <ul className="nav flex-column">
                {menuItems
                  .filter(item => item.section === section)
                  .map(item => (
                    <li key={item.url} className="nav-item">
                      <Link to={item.url} className="nav-link d-flex align-items-center" style={{ color: '#dee2e6' }}>
                        <i className={`bi bi-${item.icon} me-2`}></i>
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
