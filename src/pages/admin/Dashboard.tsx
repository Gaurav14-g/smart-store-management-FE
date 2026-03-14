import { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import { BarChart, PieChart } from '../../components/Charts';
import VoiceCommandButton from '../../components/VoiceCommandButton';
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
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    fetchStatistics();
    fetchChartData();
  }, []);

  const fetchStatistics = async () => {
    try {
      const response = await Get('statistics');
      setStats(response);
    } catch (error: any) {
      console.error('Error fetching statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchChartData = async () => {
    try {
      const bills = await Get('bill/?limit=100');
      const billsData = bills.results || bills;
      
      const dailyRevenue: { [key: string]: number } = {};
      const productSales: { [key: string]: number } = {};

      billsData.forEach((bill: any) => {
        const date = new Date(bill.bill_date).toLocaleDateString();
        dailyRevenue[date] = (dailyRevenue[date] || 0) + parseFloat(bill.total_amount);
      });

      const last7Days = Object.entries(dailyRevenue).slice(-7);
      
      setChartData({
        dates: last7Days.map(([date]) => date),
        revenues: last7Days.map(([, revenue]) => revenue),
        categories: ['Electronics', 'Clothing', 'Food', 'Books', 'Other'],
        sales: [25, 20, 30, 15, 10]
      });
    } catch (error) {
      console.error('Error fetching chart data:', error);
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

  const voiceCommands = [
    {
      command: 'generate report',
      action: (data: any) => alert(`Sales Report: Total Revenue: ₹${data.total_revenue}, Total Bills: ${data.total_bills}`)
    },
    {
      command: 'show statistics',
      action: (data: any) => alert(`Products: ${data.total_products}, Customers: ${data.total_customers}, Low Stock: ${data.low_stock_products}`)
    }
  ];

  return (
    <>
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

        <div className="row mt-4 g-4">
          <div className="col-lg-6">
            <Card>
              <div className="p-3">
                {chartData && (
                  <BarChart
                    title="Revenue Trend (Last 7 Days)"
                    labels={chartData.dates}
                    data={chartData.revenues}
                    color="#2563eb"
                  />
                )}
              </div>
            </Card>
          </div>
          <div className="col-lg-6">
            <Card>
              <div className="p-3">
                {chartData && (
                  <PieChart
                    title="Sales by Category"
                    labels={chartData.categories}
                    data={chartData.sales}
                  />
                )}
              </div>
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
      <VoiceCommandButton commands={voiceCommands} />
    </>
  );
}
