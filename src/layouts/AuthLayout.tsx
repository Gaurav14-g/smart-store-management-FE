interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-vh-100 d-flex" style={{ background: '#f8fafc', overflowY: 'auto' }}>
      {/* Left branding panel */}
      <div
        className="d-none d-lg-flex flex-column justify-content-between p-5"
        style={{ width: '42%', background: '#0f172a', color: '#fff', flexShrink: 0 }}
      >
        <div className="d-flex align-items-center gap-2">
          <div className="rounded-2 d-flex align-items-center justify-content-center"
            style={{ width: 36, height: 36, background: '#2563eb' }}>
            <i className="bi bi-shop text-white" style={{ fontSize: 18 }}></i>
          </div>
          <span className="fw-bold fs-5 text-white">Smart Store</span>
        </div>

        <div>
          <h2 className="fw-bold mb-3" style={{ fontSize: '2rem', lineHeight: 1.3 }}>
            Manage your store<br />smarter, faster.
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.7 }}>
            All-in-one POS and inventory management system. Track products, manage customers, and generate bills with ease.
          </p>

          <div className="d-flex flex-column gap-3 mt-4">
            {[
              { icon: 'box-seam', text: 'Real-time inventory tracking' },
              { icon: 'receipt', text: 'Fast & accurate billing' },
              { icon: 'graph-up', text: 'Sales reports & analytics' },
            ].map(({ icon, text }) => (
              <div key={text} className="d-flex align-items-center gap-3">
                <div className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{ width: 36, height: 36, background: '#1e3a5f' }}>
                  <i className={`bi bi-${icon}`} style={{ color: '#60a5fa', fontSize: 16 }}></i>
                </div>
                <span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <p style={{ color: '#475569', fontSize: '0.8rem' }}>
          © 2025 Smart Store · Built by Gaurav
        </p>
      </div>

      {/* Right form panel */}
      <div className="flex-grow-1 d-flex align-items-center justify-content-center p-4" style={{ overflowY: 'auto', minHeight: '100vh' }}>
        <div style={{ width: '100%', maxWidth: 420 }}>
          {/* Mobile logo */}
          <div className="d-flex d-lg-none align-items-center gap-2 mb-4 justify-content-center">
            <div className="rounded-2 d-flex align-items-center justify-content-center"
              style={{ width: 32, height: 32, background: '#2563eb' }}>
              <i className="bi bi-shop text-white" style={{ fontSize: 16 }}></i>
            </div>
            <span className="fw-bold fs-5">Smart Store</span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
