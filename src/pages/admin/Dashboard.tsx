import { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import useApi from '../../hooks/useApi';
import Spinner from '../../components/Spinner';

interface Statistics {
  total_products: number;
  total_customers: number;
  total_bills: number;
  total_revenue: number;
  low_stock_products: number;
  recent_bills: Array<{
    id: string;
    bill_date: string;
    total_amount: string;
    customer__name: string | null;
  }>;
}

export default function Dashboard() {
  const { Get } = useApi();
  const [stats, setStats] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const response = await Get('statistics');
      setStats(response);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
          <Spinner />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <h1 className="mb-4">Dashboard</h1>
      <div className="row g-4">
        <div className="col-12 col-md-3">
          <Card className="bg-primary text-white">
            <h5 className="card-title">Total Products</h5>
            <p className="card-text display-4">{stats?.total_products || 0}</p>
            {stats && stats.low_stock_products > 0 && (
              <Badge variant="warning">{stats.low_stock_products} low stock</Badge>
            )}
          </Card>
        </div>
        <div className="col-12 col-md-3">
          <Card className="bg-success text-white">
            <h5 className="card-title">Total Customers</h5>
            <p className="card-text display-4">{stats?.total_customers || 0}</p>
          </Card>
        </div>
        <div className="col-12 col-md-3">
          <Card className="bg-info text-white">
            <h5 className="card-title">Total Bills</h5>
            <p className="card-text display-4">{stats?.total_bills || 0}</p>
          </Card>
        </div>
        <div className="col-12 col-md-3">
          <Card className="bg-warning text-white">
            <h5 className="card-title">Total Revenue</h5>
            <p className="card-text display-4">₹{stats?.total_revenue.toFixed(2) || '0.00'}</p>
          </Card>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <Card title="Recent Bills">
            {stats?.recent_bills && stats.recent_bills.length > 0 ? (
              <div className="list-group list-group-flush">
                {stats.recent_bills.map((bill) => (
                  <div key={bill.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <i className="bi bi-receipt me-2 text-primary"></i>
                      {bill.customer__name || 'Walk-in Customer'} - ₹{parseFloat(bill.total_amount).toFixed(2)}
                    </div>
                    <small className="text-muted">
                      {new Date(bill.bill_date).toLocaleDateString()}
                    </small>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted">No recent bills</p>
            )}
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
