import AdminLayout from '../../layouts/AdminLayout';
import CrudManager from '../../components/CrudManager';

const Customers = () => {
  const dataSchema = {
    api: 'customer',
    createField: [
      { name: 'name', label: 'Customer Name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: false },
      { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
    ],
    editField: [
      { name: 'name', label: 'Customer Name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: false },
      { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
    ],
    showField: [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Phone' },
    ],
  };

  return (
    <AdminLayout>
      <CrudManager
        data={dataSchema}
        createFormTitle="Create Customer"
        updateFormTitle="Update Customer"
        actionBtnName="Add Customer"
      />
    </AdminLayout>
  );
};

export default Customers;
