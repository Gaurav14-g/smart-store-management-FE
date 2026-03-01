import { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { Button, Card, DatePicker, Toast, PaginatedTable } from '../../components';
import useApi from '../../hooks/useApi';
import { SalesReport } from '../../models';

const SalesReports = () => {
  const { Get } = useApi();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [report, setReport] = useState<SalesReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', variant: 'success' as const });

  const showToast = (message: string, variant: 'success' | 'danger' = 'success') => {
    setToast({ show: true, message, variant });
  };

  const fetchReport = async () => {
    setLoading(true);
    try {
      const params = [];
      if (startDate) params.push(`start_date=${startDate}`);
      if (endDate) params.push(`end_date=${endDate}`);
      const url = params.length > 0 ? `salesReport?${params.join('&')}` : 'salesReport';

      const response = await Get(url);
      setReport(response);
    } catch (error: any) {
      showToast(error.response?.data?.error || 'Failed to fetch report', 'danger');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { key: 'bill_date', label: 'Date', render: (value: string) => new Date(value).toLocaleDateString() },
    { key: 'customer_name', label: 'Customer', render: (value: string) => value || 'Walk-in' },
    { key: 'user_name', label: 'Staff' },
    { key: 'items_count', label: 'Items' },
    { key: 'total_amount', label: 'Amount', render: (value: number) => `$${value.toFixed(2)}` },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <Card>
          <h2 className="text-2xl font-bold mb-6">Sales Reports</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Start Date</label>
              <DatePicker
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">End Date</label>
              <DatePicker
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={fetchReport} variant="primary" fullWidth disabled={loading}>
                {loading ? 'Loading...' : 'Generate Report'}
              </Button>
            </div>
          </div>

          {report && report.summary && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Total Sales</p>
                <p className="text-2xl font-bold text-blue-600">${Number(report.summary.total_sales).toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Bills</p>
                <p className="text-2xl font-bold text-blue-600">{report.summary.total_bills}</p>
              </div>
            </div>
          )}
        </Card>

        {report && report.bills.length > 0 && (
          <Card>
            <h3 className="text-xl font-bold mb-4">Bill Details</h3>
            <PaginatedTable
              data={report.bills}
              columns={columns}
              searchable={false}
            />
          </Card>
        )}

        {report && report.bills.length === 0 && (
          <Card>
            <p className="text-center text-gray-500 py-8">No sales data found for the selected period</p>
          </Card>
        )}
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

export default SalesReports;
