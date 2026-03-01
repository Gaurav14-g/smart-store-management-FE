import { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { Button, Card, Select, Input, Toast } from '../../components';
import useApi from '../../hooks/useApi';
import { Product, Customer, Bill, BillItem } from '../../models';

const Billing = () => {
  const { Get, Post } = useApi();
  const [products, setProducts] = useState<Product[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [billItems, setBillItems] = useState<BillItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchProduct, setSearchProduct] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', variant: 'success' as const });

  const showToast = (message: string, variant: 'success' | 'danger' = 'success') => {
    setToast({ show: true, message, variant });
  };

  useEffect(() => {
    fetchProducts();
    fetchCustomers();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await Get('product');
      setProducts(response.results || response);
    } catch (error) {
      showToast('Failed to fetch products', 'danger');
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await Get('customer');
      setCustomers(response.results || response);
    } catch (error) {
      showToast('Failed to fetch customers', 'danger');
    }
  };

  const addProductToCart = (product: Product) => {
    const existing = billItems.find(item => item.product === product.id);
    if (existing) {
      updateItem(billItems.indexOf(existing), 'quantity', existing.quantity + 1);
    } else {
      setBillItems([...billItems, { product: product.id!, quantity: 1 }]);
    }
  };

  const updateItem = (index: number, field: keyof BillItem, value: any) => {
    const updated = [...billItems];
    updated[index] = { ...updated[index], [field]: value };
    setBillItems(updated);
  };

  const removeItem = (index: number) => {
    setBillItems(billItems.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    return billItems.reduce((total, item) => {
      const product = products.find(p => p.id === item.product);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  const handleSubmit = async () => {
    if (billItems.length === 0) {
      showToast('Please add at least one item', 'danger');
      return;
    }

    setLoading(true);
    try {
      const billData: Bill = {
        customer: selectedCustomer || undefined,
        items: billItems
      };
      
      await Post('bill', billData);
      showToast('Bill created successfully');
      setBillItems([]);
      setSelectedCustomer('');
      fetchProducts();
    } catch (error: any) {
      const errorMsg = error.response?.data?.items?.[0] || error.response?.data?.detail || 'Failed to create bill';
      showToast(errorMsg, 'danger');
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(p => 
    p.product_name.toLowerCase().includes(searchProduct.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="row g-3">
        {/* Left: Product Grid */}
        <div className="col-lg-7">
          <Card>
            <div className="p-3 border-bottom">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchProduct}
                onChange={(e) => setSearchProduct(e.target.value)}
              />
            </div>
            <div className="p-3" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
              <div className="row g-2">
                {filteredProducts.map(product => (
                  <div key={product.id} className="col-6 col-md-4">
                    <div 
                      className="card h-100 cursor-pointer" 
                      style={{ cursor: 'pointer' }}
                      onClick={() => addProductToCart(product)}
                    >
                      <div className="card-body p-3 text-center">
                        <div className="mb-2">
                          <i className="bi bi-box-seam" style={{ fontSize: '2rem', color: '#6c757d' }}></i>
                        </div>
                        <h6 className="card-title mb-1" style={{ fontSize: '0.9rem' }}>{product.product_name}</h6>
                        <p className="text-success fw-bold mb-1">${Number(product.price).toFixed(2)}</p>
                        <small className="text-muted">Stock: {product.quantity}</small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Right: Cart & Checkout */}
        <div className="col-lg-5">
          <Card className="h-100">
            <div className="p-3 border-bottom bg-dark text-white">
              <h5 className="mb-0">Current Order</h5>
            </div>
            
            <div className="p-3 border-bottom">
              <label className="form-label small mb-1">Customer</label>
              <Select
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
                options={[
                  { value: '', label: 'Walk-in Customer' },
                  ...customers.map(c => ({ value: c.id!, label: `${c.name} - ${c.phone}` }))
                ]}
              />
            </div>

            <div className="p-3" style={{ maxHeight: '40vh', overflowY: 'auto' }}>
              {billItems.length === 0 ? (
                <div className="text-center text-muted py-5">
                  <i className="bi bi-cart-x" style={{ fontSize: '3rem' }}></i>
                  <p className="mt-2">No items in cart</p>
                </div>
              ) : (
                <div className="list-group list-group-flush">
                  {billItems.map((item, index) => {
                    const product = products.find(p => p.id === item.product);
                    return (
                      <div key={index} className="list-group-item px-0">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div className="flex-grow-1">
                            <h6 className="mb-1">{product?.product_name}</h6>
                            <small className="text-muted">${Number(product?.price).toFixed(2)} each</small>
                          </div>
                          <button 
                            className="btn btn-sm btn-link text-danger p-0"
                            onClick={() => removeItem(index)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <button 
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => updateItem(index, 'quantity', Math.max(1, item.quantity - 1))}
                          >
                            <i className="bi bi-dash"></i>
                          </button>
                          <input
                            type="number"
                            className="form-control form-control-sm text-center"
                            style={{ width: '60px' }}
                            value={item.quantity}
                            onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 1)}
                            min={1}
                          />
                          <button 
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => updateItem(index, 'quantity', item.quantity + 1)}
                          >
                            <i className="bi bi-plus"></i>
                          </button>
                          <div className="ms-auto fw-bold">
                            ${((product?.price || 0) * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="mt-auto">
              <div className="p-3 border-top bg-light">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="h5 mb-0">Total:</span>
                  <span className="h4 mb-0 text-success">${calculateTotal().toFixed(2)}</span>
                </div>
                <Button 
                  onClick={handleSubmit} 
                  variant="success" 
                  fullWidth 
                  disabled={loading || billItems.length === 0}
                  style={{ padding: '12px', fontSize: '1.1rem' }}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-circle me-2"></i>
                      Complete Sale
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Toast
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        message={toast.message}
        variant={toast.variant}
      />
    </AdminLayout>
  );
};

export default Billing;
