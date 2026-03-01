import { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import CrudManager from '../../components/CrudManager';
import { userSchema } from '../../models/User';
import useApi from '../../hooks/useApi';

export default function Users() {
  const [schema, setSchema] = useState(userSchema);
  const { Get } = useApi();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const result = await Get('permission');
        const roles = result.results || [];
        const roleOptions = roles.map((role: any) => ({
          value: String(role.id),
          label: role.name
        }));

        const updatedSchema = {
          ...userSchema,
          createField: userSchema.createField.map(field => 
            field.name === 'groups' ? { ...field, options: roleOptions } : field
          ),
          editField: userSchema.editField.map(field => 
            field.name === 'groups' ? { ...field, options: roleOptions } : field
          )
        };
        setSchema(updatedSchema);
      } catch (err) {
        console.error('Failed to fetch roles:', err);
      }
    };

    fetchRoles();
  }, []);

  return (
    <AdminLayout>
      <h1 className="mb-4">User Management</h1>
      <CrudManager
        data={schema}
        createFormTitle="Create New User"
        updateFormTitle="Update User"
        actionBtnName="Add User"
        createRequired={true}
        editRequired={true}
        searchRequired={true}
        hideDelete={false}
      />
    </AdminLayout>
  );
}
