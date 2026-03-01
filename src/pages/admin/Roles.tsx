import { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import CrudManager from '../../components/CrudManager';
import { roleSchema } from '../../models/Role';
import useApi from '../../hooks/useApi';
import Spinner from '../../components/Spinner';

export default function Roles() {
  const [schema, setSchema] = useState(roleSchema);
  const [loading, setLoading] = useState(true);
  const { Get } = useApi();

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await Get('permissions');
        const permissions = response.results || response;
        const permissionOptions = permissions.map((perm: any) => ({
          value: String(perm.id),
          label: perm.name,
        }));

        setSchema({
          ...roleSchema,
          createField: roleSchema.createField.map((field) =>
            field.name === 'permissions' ? { ...field, options: permissionOptions } : field
          ),
          editField: roleSchema.editField.map((field) =>
            field.name === 'permissions' ? { ...field, options: permissionOptions } : field
          ),
        });
      } catch (error) {
        console.error('Failed to fetch permissions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPermissions();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <Spinner fullScreen />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <h1 className="mb-4">Role Management</h1>
      <CrudManager
        data={schema}
        createFormTitle="Create New Role"
        updateFormTitle="Update Role"
        actionBtnName="Add Role"
        createRequired={true}
        editRequired={true}
        searchRequired={true}
        hideDelete={false}
      />
    </AdminLayout>
  );
}
