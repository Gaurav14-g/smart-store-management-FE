import { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import useApi from '../../hooks/useApi';

interface SalesBill {
  id: number;
  bill_date: string;
  customer_name: string;
  user_name: string;
  items_count: number;
  total_amount: number;
}

interface ReportSummary {
  total_sales: number;
  total_bills: number;
}

interface Report {
  summary: ReportSummary;
  bills: SalesBill[];
}

const SalesReports = () => {
  const { Get, getAPI } = useApi();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchReport = async () => {
    if (!startDate || !endDate) {
      setError('Please select both start and end dates.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const url = `${getAPI('salesReport')}?start_date=${startDate}&end_date=${endDate}`;
      const response = await Get(url);
      setReport(response);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch report');
    } finally {
      setLoading(false);
    }
  };

  const totalSales = report?.summary?.total_sales ?? 0;
  const totalBills = report?.summary?.total_bills ?? 0;
  const avgOrder = totalBills > 0 ? totalSales / totalBills : 0;

  return (
    <AdminLayout>
      {/* Header */}
      <div className="d-flex align-items-center gap-2 mb-4">
        <i className="bi bi-graph-up-arrow fs-4 text-primary"></i>
        <h4 className="mb-0">Sales Reports</h4>
      </div>

      {/* Filter Card */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3 align-items-end">
            <div className="col-md-4">
              <label className="form-label small text-muted mb-1">Start Date</label>
              <input
                type="date"
                className="form-control"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label small text-muted mb-1">End Date</label>
              <input
                type="date"
                className="form-control"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <button
                className="btn btn-primary w-100"
                onClick={fetchReport}
                disabled={loading}
              >
                {loading
                  ? <><span className="spinner-border spinner-border-sm me-2" />Generating...</>
                  : <><i className="bi bi-search me-2" />Generate Report</>
                }
              </button>
            </div>
          </div>
          {error && <div className="alert alert-danger mt-3 mb-0 py-2 small">{error}</div>}
        </div>
      </div>

      {/* Summary Cards */}
      {report && (
        <>
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <div className="card border-0 bg-primary bg-opacity-10 h-100">
                <div className="card-body d-flex align-items-center gap-3">
                  <div className="rounded-circle bg-primary bg-opacity-25 d-flex align-items-center justify-content-center"
                    style={{ width: 48, height: 48 }}>
                    <i className="bi bi-currency-dollar fs-5 text-primary"></i>
                  </div>
                  <div>
                    <div className="small text-muted">Total Sales</div>
                    <div className="fs-4 fw-bold text-primary">${Number(totalSales).toFixed(2)}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 bg-success bg-opacity-10 h-100">
                <div className="card-body d-flex align-items-center gap-3">
                  <div className="rounded-circle bg-success bg-opacity-25 d-flex align-items-center justify-content-center"
                    style={{ width: 48, height: 48 }}>
                    <i className="bi bi-receipt fs-5 text-success"></i>
                  </div>
                  <div>
                    <div className="small text-muted">Total Bills</div>
                    <div className="fs-4 fw-bold text-success">{totalBills}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 bg-warning bg-opacity-10 h-100">
                <div className="card-body d-flex align-items-center gap-3">
                  <div className="rounded-circle bg-warning bg-opacity-25 d-flex align-items-center justify-content-center"
                    style={{ width: 48, height: 48 }}>
                    <i className="bi bi-calculator fs-5 text-warning"></i>
                  </div>
                  <div>
                    <div className="small text-muted">Avg Order Value</div>
                    <div className="fs-4 fw-bold text-warning">${avgOrder.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bills Table */}
          <div className="card">
            <div className="card-header bg-dark text-white d-flex align-items-center justify-content-between">
              <span className="fw-semibold"><i className="bi bi-table me-2"></i>Bill Details</span>
              <span className="badge bg-secondary">{report.bills.length} records</span>
            </div>
            {report.bills.length === 0 ? (
              <div className="card-body text-center text-muted py-5">
                <i className="bi bi-inbox fs-1 d-block mb-2"></i>
                No sales data found for the selected period
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover table-sm align-middle mb-0">
                  <thead className="table-light">
                    <tr style={{ fontSize: '0.8rem' }}>
                      <th>#</th>
                      <th>Date</th>
                      <th>Customer</th>
                      <th>Staff</th>
                      <th className="text-center">Items</th>
                      <th className="text-end">Amount</th>
                    </tr>
                  </thead>
                  <tbody style={{ fontSize: '0.85rem' }}>
                    {report.bills.map((bill, i) => (
                      <tr key={bill.id}>
                        <td className="text-muted">{i + 1}</td>
                        <td>{new Date(bill.bill_date).toLocaleDateString()}</td>
                        <td>{bill.customer_name || <span className="text-muted">Walk-in</span>}</td>
                        <td>{bill.user_name}</td>
                        <td className="text-center">
                          <span className="badge bg-secondary">{bill.items_count}</span>
                        </td>
                        <td className="text-end fw-semibold text-success">
                          ${Number(bill.total_amount).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="table-light">
                    <tr style={{ fontSize: '0.85rem' }}>
                      <td colSpan={5} className="text-end fw-bold">Total</td>
                      <td className="text-end fw-bold text-primary">${Number(totalSales).toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default SalesReports;
