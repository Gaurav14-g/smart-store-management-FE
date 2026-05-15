import { useRef, useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import CrudManager from '../../components/CrudManager';
import useApi from '../../hooks/useApi';
import Toast from '../../components/Toast';

const Products = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [toast, setToast] = useState({ show: false, message: '', variant: 'primary' as const });
  const [refreshKey, setRefreshKey] = useState(0);
  const { PostForm, getAPI } = useApi();

  const handleCSVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await PostForm(getAPI('product') + 'upload-csv/', formData);
      setToast({ show: true, message: `Imported ${res.created} products. ${res.errors.length ? `${res.errors.length} rows failed.` : ''}`, variant: res.errors.length ? 'warning' : 'success' });
      setRefreshKey(k => k + 1);
    } catch {
      setToast({ show: true, message: 'CSV upload failed', variant: 'danger' });
    }
    e.target.value = '';
  };

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
      <div className="d-flex justify-content-end mb-2">
        <input ref={fileInputRef} type="file" accept=".csv" className="d-none" onChange={handleCSVUpload} />
        <button className="btn btn-outline-success btn-sm" onClick={() => fileInputRef.current?.click()}>
          <i className="bi bi-upload me-1"></i> Import CSV
        </button>
      </div>
      <CrudManager
        key={refreshKey}
        data={dataSchema}
        createFormTitle="Create Product"
        updateFormTitle="Update Product"
        actionBtnName="Add Product"
      />
      <Toast show={toast.show} onClose={() => setToast({ ...toast, show: false })} message={toast.message} variant={toast.variant} />
    </AdminLayout>
  );
};

export default Products;
