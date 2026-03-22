import { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import CrudManager from '../../components/CrudManager';
import { userSchema } from '../../models/User';
import { roleSchema } from '../../models/Role';
import useApi from '../../hooks/useApi';

type Tab = 'users' | 'roles';

export default function Settings() {
  const [activeTab, setActiveTab] = useState<Tab>('users');
  const [uSchema, setUSchema] = useState(userSchema);
  const [rSchema, setRSchema] = useState(roleSchema);
  const { Get } = useApi();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const result = await Get('permission');
        const roles = result.results || result;
        const roleOptions = roles.map((r: any) => ({ value: String(r.id), label: r.name }));
        setUSchema({
          ...userSchema,
          createField: userSchema.createField.map(f => f.name === 'groups' ? { ...f, options: roleOptions } : f),
          editField:   userSchema.editField.map(f =>   f.name === 'groups' ? { ...f, options: roleOptions } : f),
        });
      } catch (e) { console.error(e); }
    };

    const fetchPermissions = async () => {
      try {
        const result = await Get('permissions');
        const perms = result.results || result;
        const permOptions = perms.map((p: any) => ({ value: String(p.id), label: p.name }));
        setRSchema({
          ...roleSchema,
          createField: roleSchema.createField.map(f => f.name === 'permissions' ? { ...f, options: permOptions } : f),
          editField:   roleSchema.editField.map(f =>   f.name === 'permissions' ? { ...f, options: permOptions } : f),
        });
      } catch (e) { console.error(e); }
    };

    fetchRoles();
    fetchPermissions();
  }, []);

  const role = localStorage.getItem('role') || '';
  const canManageRoles = ['superuser', 'Owner'].includes(role);

  return (
    <AdminLayout>
      <div className="d-flex align-items-center gap-2 mb-4">
        <i className="bi bi-gear-fill fs-4"></i>
        <h4 className="mb-0">Settings</h4>
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link d-flex align-items-center gap-2 ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <i className="bi bi-people"></i> Users
          </button>
        </li>
        {canManageRoles && (
          <li className="nav-item">
            <button
              className={`nav-link d-flex align-items-center gap-2 ${activeTab === 'roles' ? 'active' : ''}`}
              onClick={() => setActiveTab('roles')}
            >
              <i className="bi bi-shield-lock"></i> Roles
            </button>
          </li>
        )}
      </ul>

      {/* Users tab */}
      {activeTab === 'users' && (
        <CrudManager
          data={uSchema}
          createFormTitle="Create New User"
          updateFormTitle="Update User"
          actionBtnName="Add User"
          createRequired
          editRequired
          searchRequired
          hideDelete={false}
        />
      )}

      {/* Roles tab */}
      {activeTab === 'roles' && canManageRoles && (
        <CrudManager
          data={rSchema}
          createFormTitle="Create New Role"
          updateFormTitle="Update Role"
          actionBtnName="Add Role"
          createRequired
          editRequired
          searchRequired
          hideDelete={false}
        />
      )}
    </AdminLayout>
  );
}
