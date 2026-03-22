import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminLayout from '../../layouts/AdminLayout';
import global from '../../../config/Global.json';

const ProductScan = () => {
  const { barcode } = useParams<{ barcode: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      if (!barcode) return;

      try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
          navigate('/signin');
          return;
        }

        const token = JSON.parse(authToken).access;
        const response = await axios.get(
          `${global.api.host}/api/v1/product/scan/${barcode}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }
        );

        setProduct(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Product not found');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [barcode, navigate]);

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/products')}>
          Back to Products
        </button>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="card">
        <div className="card-header">
          <h4>Product Details</h4>
        </div>
        <div className="card-body">
          {product && (
            <div>
              <p><strong>Name:</strong> {product.product_name}</p>
              <p><strong>UPC:</strong> {product.upc}</p>
              <p><strong>Price:</strong> ${product.price}</p>
              <p><strong>Stock:</strong> {product.quantity}</p>
            </div>
          )}
        </div>
        <div className="card-footer">
          <button className="btn btn-primary" onClick={() => navigate('/products')}>
            Back to Products
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProductScan;
