import AdminLayout from '../../layouts/AdminLayout';
import CrudManager from '../../components/CrudManager';
import VoiceCommandButton from '../../components/VoiceCommandButton';

const Products = () => {
  const voiceCommands = [
    {
      command: 'add product',
      action: () => alert('Click the "Add Product" button to create a new product')
    },
    {
      command: 'check stock',
      action: (data: any) => alert(`Low Stock Items: ${data.low_stock_count}\n${data.products.map((p: any) => `${p.name}: ${p.quantity}`).join('\n')}`)
    }
  ];

  const dataSchema = {
    api: 'product',
    createField: [
      { name: 'product_name', label: 'Product Name', type: 'text', required: true },
      { name: 'upc', label: 'UPC Code', type: 'text', required: false },
      { name: 'price', label: 'Price', type: 'number', required: true, min: 0.01, step: 'any' },
      { name: 'quantity', label: 'Quantity', type: 'number', required: true, min: 0 },
    ],
    editField: [
      { name: 'product_name', label: 'Product Name', type: 'text', required: true },
      { name: 'upc', label: 'UPC Code', type: 'text', required: false },
      { name: 'price', label: 'Price', type: 'number', required: true, min: 0.01, step: 'any' },
      { name: 'quantity', label: 'Quantity', type: 'number', required: true, min: 0 },
    ],
    showField: [
      { key: 'product_name', label: 'Product Name' },
      { key: 'upc', label: 'UPC' },
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
      <VoiceCommandButton commands={voiceCommands} />
    </AdminLayout>
  );
};

export default Products;
