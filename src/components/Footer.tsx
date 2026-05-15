import { useState } from 'react';
import Modal from './Modal';
import Button from './Button';

export default function Footer() {
  const [modal, setModal] = useState<'terms' | 'privacy' | null>(null);

  return (
    <>
      <footer className="bg-dark text-white mt-auto py-3" style={{ fontSize: '0.82rem', marginLeft: '250px', paddingRight: '110px' }}>
        <div className="container-fluid px-4">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-white-50">
              © 2026 <span className="text-white fw-semibold">Smart Store</span>. Built by <span className="text-white fw-semibold">Gaurav</span>. All rights reserved.
            </span>
            <div className="d-flex gap-3">
              <button className="btn btn-link btn-sm text-white-50 p-0 text-decoration-none" onClick={() => setModal('terms')}>
                Terms of Use
              </button>
              <span className="text-white-50">·</span>
              <button className="btn btn-link btn-sm text-white-50 p-0 text-decoration-none" onClick={() => setModal('privacy')}>
                Privacy Policy
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Terms of Use */}
      <Modal isOpen={modal === 'terms'} onClose={() => setModal(null)} title="Terms of Use" size="lg"
        footer={<Button variant="dark" onClick={() => setModal(null)}>Close</Button>}>
        <div style={{ fontSize: '0.88rem', lineHeight: 1.7 }}>
          <p className="text-muted mb-3">Last updated: January 1, 2025</p>

          <h6 className="fw-semibold">1. Acceptance of Terms</h6>
          <p>By accessing or using Smart Store, you agree to be bound by these Terms of Use. If you do not agree, you may not use this system.</p>

          <h6 className="fw-semibold">2. Permitted Use</h6>
          <p>This system is intended solely for authorised personnel of the organisation. Unauthorised access, sharing of credentials, or misuse of data is strictly prohibited.</p>

          <h6 className="fw-semibold">3. User Responsibilities</h6>
          <p>You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. Report any suspected unauthorised access immediately to the administrator.</p>

          <h6 className="fw-semibold">4. Data Accuracy</h6>
          <p>Users are responsible for ensuring that data entered into the system (products, billing, customer records) is accurate and up to date. The system owner is not liable for decisions made based on incorrect data.</p>

          <h6 className="fw-semibold">5. Intellectual Property</h6>
          <p>All software, design, and content within Smart Store is the intellectual property of Gaurav. Reproduction, redistribution, or reverse engineering without written permission is prohibited.</p>

          <h6 className="fw-semibold">6. Termination</h6>
          <p>Access may be revoked at any time for violation of these terms or at the discretion of the administrator.</p>

          <h6 className="fw-semibold">7. Limitation of Liability</h6>
          <p>Smart Store is provided "as is". The developer is not liable for any loss of data, revenue, or business arising from use or inability to use the system.</p>
        </div>
      </Modal>

      {/* Privacy Policy */}
      <Modal isOpen={modal === 'privacy'} onClose={() => setModal(null)} title="Privacy Policy" size="lg"
        footer={<Button variant="dark" onClick={() => setModal(null)}>Close</Button>}>
        <div style={{ fontSize: '0.88rem', lineHeight: 1.7 }}>
          <p className="text-muted mb-3">Last updated: January 1, 2025</p>

          <h6 className="fw-semibold">1. Information We Collect</h6>
          <p>Smart Store collects information you provide directly — including usernames, product data, customer records, and billing transactions — solely to operate the system.</p>

          <h6 className="fw-semibold">2. How We Use Your Data</h6>
          <p>Data is used exclusively for store management operations such as inventory tracking, billing, and sales reporting. It is never sold or shared with third parties.</p>

          <h6 className="fw-semibold">3. Data Storage</h6>
          <p>All data is stored on your configured database server. You are responsible for securing your server environment and database credentials.</p>

          <h6 className="fw-semibold">4. Access Control</h6>
          <p>Access to data is role-based. Admins have full access; staff access is limited. Ensure user roles are assigned appropriately within your organisation.</p>

          <h6 className="fw-semibold">5. Data Retention</h6>
          <p>Data is retained as long as the system is in use. Deletion of records can be performed by authorised administrators through the system interface.</p>

          <h6 className="fw-semibold">6. Security</h6>
          <p>Smart Store uses JWT-based authentication with short-lived access tokens. You are responsible for keeping your deployment environment secure.</p>

          <h6 className="fw-semibold">7. Contact</h6>
          <p>For any privacy-related concerns, contact your system administrator or the developer, Gaurav.</p>
        </div>
      </Modal>
    </>
  );
}
