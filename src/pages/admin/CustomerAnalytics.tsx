import { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { Card, Button } from '../../components';
import useApi from '../../hooks/useApi';

interface CustomerAnalytics {
  customer_id: string;
  customer_name: string;
  total_spent: number;
  total_purchases: number;
  avg_purchase_value: number;
  last_purchase_date: string;
  top_products: any[];
  purchase_frequency: string;
}

interface TopCustomer {
  id: string;
  name: string;
  phone: string;
  total_spent: number;
  purchase_count: number;
}

const CustomerAnalytics = () => {
  const { Get } = useApi();
  const [topCustomers, setTopCustomers] = useState<TopCustomer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopCustomers();
  }, []);

  const fetchTopCustomers = async () => {
    setLoading(true);
    try {
      const response = await Get('customer/top_customers/?limit=10');
      const data = Array.isArray(response) ? response : response.results || [];
      setTopCustomers(data);
    } catch (error) {
      console.error('Failed to fetch top customers', error);
      setTopCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomerAnalytics = async (customerId: string) => {
    try {
      const response = await Get(`customer/${customerId}/analytics/`);
      setSelectedCustomer(response);
    } catch (error) {
      console.error('Failed to fetch analytics', error);
    }
  };

  return (
    <AdminLayout>
      <div className="row g-3">
        <div className="col-lg-8">
          <Card>
            <div className="p-3 border-bottom bg-dark text-white">
              <h5 className="mb-0">Top Customers by Spending</h5>
            </div>
            {loading ? (
              <div className="p-5 text-center text-muted">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : topCustomers.length === 0 ? (
              <div className="p-5 text-center text-muted">
                <p>No customer data available</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th>Customer Name</th>
                      <th>Phone</th>
                      <th>Total Spent</th>
                      <th>Purchases</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topCustomers.map((customer) => (
                      <tr key={customer.id}>
                        <td className="fw-bold">{customer.name}</td>
                        <td>{customer.phone}</td>
                        <td className="text-success fw-bold">${customer.total_spent.toFixed(2)}</td>
                        <td>{customer.purchase_count}</td>
                        <td>
                          <Button
                            onClick={() => fetchCustomerAnalytics(customer.id)}
                            variant="primary"
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>

        <div className="col-lg-4">
          {selectedCustomer ? (
            <Card>
              <div className="p-3 border-bottom bg-dark text-white">
                <h5 className="mb-0">{selectedCustomer.customer_name}</h5>
              </div>
              <div className="p-3">
                <div className="mb-3 pb-3 border-bottom">
                  <small className="text-muted d-block">Total Spent</small>
                  <p className="h4 text-success mb-0">${selectedCustomer.total_spent.toFixed(2)}</p>
                </div>
                <div className="mb-3 pb-3 border-bottom">
                  <small className="text-muted d-block">Total Purchases</small>
                  <p className="h5 mb-0">{selectedCustomer.total_purchases}</p>
                </div>
                <div className="mb-3 pb-3 border-bottom">
                  <small className="text-muted d-block">Avg Purchase Value</small>
                  <p className="h5 mb-0">${selectedCustomer.avg_purchase_value.toFixed(2)}</p>
                </div>
                <div className="mb-3 pb-3 border-bottom">
                  <small className="text-muted d-block">Status</small>
                  <p className="mb-0">
                    <span className={`badge bg-${selectedCustomer.purchase_frequency === 'Very Active' ? 'success' : selectedCustomer.purchase_frequency === 'Active' ? 'info' : 'warning'}`}>
                      {selectedCustomer.purchase_frequency}
                    </span>
                  </p>
                </div>
                {selectedCustomer.last_purchase_date && (
                  <div className="mb-3">
                    <small className="text-muted d-block">Last Purchase</small>
                    <p className="mb-0">{new Date(selectedCustomer.last_purchase_date).toLocaleDateString()}</p>
                  </div>
                )}

                {selectedCustomer.top_products.length > 0 && (
                  <div className="mt-4 pt-3 border-top">
                    <h6 className="mb-3">Top Products</h6>
                    {selectedCustomer.top_products.map((product, idx) => (
                      <div key={idx} className="mb-2 pb-2 border-bottom">
                        <small className="d-block fw-bold">{product.product__product_name}</small>
                        <small className="text-muted">Qty: {product.qty} | Spent: ${parseFloat(product.spent).toFixed(2)}</small>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          ) : (
            <Card>
              <div className="p-5 text-center text-muted">
                <i className="bi bi-person-check" style={{ fontSize: '3rem' }}></i>
                <p className="mt-3">Select a customer to view details</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default CustomerAnalytics;
