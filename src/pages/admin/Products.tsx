import AdminLayout from '../../layouts/AdminLayout';
import CrudManager from '../../components/CrudManager';

const Products = () => {
  const dataSchema = {
    api: 'product',
    createField: [
      { name: 'product_name', label: 'Product Name', type: 'text', required: true },
      { name: 'price', label: 'Price', type: 'number', required: true, min: 0.01, step: 0.01 },
      { name: 'quantity', label: 'Quantity', type: 'number', required: true, min: 0 },
    ],
    editField: [
      { name: 'product_name', label: 'Product Name', type: 'text', required: true },
      { name: 'price', label: 'Price', type: 'number', required: true, min: 0.01, step: 0.01 },
      { name: 'quantity', label: 'Quantity', type: 'number', required: true, min: 0 },
    ],
    showField: [
      { key: 'product_name', label: 'Product Name' },
      { key: 'price', label: 'Price' },
      { key: 'quantity', label: 'Stock' },
    ],
  };

  return (
    <AdminLayout>
      <CrudManager
        data={dataSchema}
        createFormTitle="Create Product"
        updateFormTitle="Update Product"
        actionBtnName="Add Product"
      />
    </AdminLayout>
  );
};

export default Products;
