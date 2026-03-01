import { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import CrudManager from '../../components/CrudManager';
import { clientSchema } from '../../models/Client';
import useApi from '../../hooks/useApi';

export default function Clients() {
  const [schema, setSchema] = useState(clientSchema);
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
          ...clientSchema,
          createField: clientSchema.createField.map(field => 
            field.name === 'groups' ? { ...field, options: roleOptions } : field
          ),
          editField: clientSchema.editField.map(field => 
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
      <h1 className="mb-4">Client Management</h1>
      <CrudManager
        data={schema}
        createFormTitle="Create New Client"
        updateFormTitle="Update Client"
        actionBtnName="Add Client"
        createRequired={true}
        editRequired={true}
        searchRequired={true}
        hideDelete={false}
      />
    </AdminLayout>
  );
}
