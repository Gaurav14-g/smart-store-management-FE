import { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { LineChart } from '../../components/Charts';
import VoiceCommandButton from '../../components/VoiceCommandButton';
import useApi from '../../hooks/useApi';

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

const Skeleton = ({ width = '100%', height = 24 }: { width?: string | number; height?: number }) => (
  <div
    className="rounded"
    style={{
      width,
      height,
      background: 'linear-gradient(90deg, #e8e8e8 25%, #f5f5f5 50%, #e8e8e8 75%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.4s infinite',
    }}
  />
);

export default function Dashboard() {
  const { Get } = useApi();
  const [stats, setStats] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<{ dates: string[]; revenues: number[] } | null>(null);
  const role = localStorage.getItem('role') || 'staff';
  const username = localStorage.getItem('username') || 'User';

  useEffect(() => {
    fetchStatistics();
    fetchChartData();
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

  const fetchChartData = async () => {
    try {
      const bills = await Get('bill');
      const billsData: any[] = bills.results || bills;
      const dailyRevenue: Record<string, number> = {};
      billsData.forEach((bill) => {
        const date = new Date(bill.bill_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        dailyRevenue[date] = (dailyRevenue[date] || 0) + parseFloat(bill.total_amount);
      });
      const entries = Object.entries(dailyRevenue).slice(-7);
      setChartData({
        dates: entries.map(([d]) => d),
        revenues: entries.map(([, v]) => v),
      });
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  const statCards = [
    {
      label: 'Total Revenue',
      value: `$${Number(stats?.total_revenue ?? 0).toFixed(2)}`,
      icon: 'currency-dollar',
      color: '#2563eb',
      sub: 'All time earnings',
      subIcon: 'graph-up-arrow',
    },
    {
      label: 'Total Bills',
      value: stats?.total_bills ?? 0,
      icon: 'receipt',
      color: '#e11d48',
      sub: 'Transactions',
      subIcon: 'arrow-repeat',
    },
    {
      label: 'Total Customers',
      value: stats?.total_customers ?? 0,
      icon: 'people-fill',
      color: '#0891b2',
      sub: 'Registered',
      subIcon: 'person-check',
    },
    {
      label: 'Total Products',
      value: stats?.total_products ?? 0,
      icon: 'box-seam-fill',
      color: '#16a34a',
      sub: stats?.low_stock_products ? `⚠ ${stats.low_stock_products} low stock` : 'All stocked',
      subIcon: 'boxes',
    },
  ];

  const getTimeGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const avgBillValue = stats && stats.total_bills > 0
    ? (stats.total_revenue / stats.total_bills).toFixed(2)
    : '0.00';

  return (
    <>
      <style>{`
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        .stat-card { transition: transform 0.2s, box-shadow 0.2s; }
        .stat-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.10) !important; }
        .bill-row { transition: background 0.15s; }
        .bill-row:hover { background: #f1f5f9 !important; }
      `}</style>

      <AdminLayout>
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
          <div>
            <h4 className="mb-0 fw-bold">{getTimeGreeting()} 👋</h4>
            <p className="text-muted small mb-0">Here's what's happening in your store today.</p>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span className="badge rounded-pill px-3 py-2 bg-dark" style={{ fontSize: 13 }}>
              <i className="bi bi-shield-check me-1"></i>{role}
            </span>
            <span className="text-muted small">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="row g-3 mb-4">
          {statCards.map((card) => (
            <div className="col-6 col-xl-3" key={card.label}>
              <div className="card border-0 shadow-sm stat-card h-100" style={{ borderRadius: 16, overflow: 'hidden' }}>
                <div className="card-body p-0">
                  <div style={{ backgroundColor: card.color, padding: '20px 20px 14px' }}>
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <div className="rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: 42, height: 42, background: 'rgba(255,255,255,0.18)' }}>
                        <i className={`bi bi-${card.icon} text-white fs-5`}></i>
                      </div>
                      <i className={`bi bi-${card.subIcon} text-white opacity-50 fs-5`}></i>
                    </div>
                    <div className="text-white small" style={{ opacity: 0.85 }}>{card.label}</div>
                    <div className="text-white fw-bold mt-1" style={{ fontSize: 26, lineHeight: 1.2 }}>
                      {loading ? <Skeleton width={80} height={28} /> : card.value}
                    </div>
                  </div>
                  <div className="px-3 py-2 bg-white">
                    <small className="text-muted">{card.sub}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Metrics Row */}
        <div className="row g-3 mb-4">
          {[
            { label: 'Avg Bill Value', value: `$${avgBillValue}`, icon: 'calculator', color: '#2563eb' },
            { label: 'Low Stock Items', value: stats?.low_stock_products ?? 0, icon: 'exclamation-triangle', color: '#e11d48' },
            { label: 'Active Customers', value: stats?.total_customers ?? 0, icon: 'person-check', color: '#0891b2' },
            { label: 'Products Listed', value: stats?.total_products ?? 0, icon: 'tags', color: '#16a34a' },
          ].map((m) => (
            <div className="col-6 col-md-3" key={m.label}>
              <div className="card border-0 shadow-sm h-100" style={{ borderRadius: 12 }}>
                <div className="card-body d-flex align-items-center gap-3 py-3">
                  <div className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{ width: 40, height: 40, background: m.color + '20' }}>
                    <i className={`bi bi-${m.icon}`} style={{ color: m.color, fontSize: 18 }}></i>
                  </div>
                  <div>
                    <div className="text-muted" style={{ fontSize: 11 }}>{m.label}</div>
                    <div className="fw-bold fs-5 lh-1">
                      {loading ? <Skeleton width={50} height={20} /> : m.value}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chart + Recent Bills */}
        <div className="row g-3">
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm h-100" style={{ borderRadius: 16 }}>
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div>
                    <h6 className="fw-bold mb-0">Revenue Trend</h6>
                    <small className="text-muted">Last 7 days</small>
                  </div>
                  <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2" style={{ borderRadius: 20 }}>
                    <i className="bi bi-graph-up me-1"></i>Weekly
                  </span>
                </div>
                {chartData?.dates?.length ? (
                  <div style={{ width: '100%' }}>
                    <LineChart
                      title=""
                      labels={chartData.dates}
                      data={chartData.revenues}
                      color="#2563eb"
                    />
                  </div>
                ) : (
                  <div className="d-flex flex-column align-items-center justify-content-center text-muted py-5">
                    <i className="bi bi-graph-up fs-1 opacity-25 mb-2"></i>
                    <span className="small">No revenue data yet</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="card border-0 shadow-sm h-100" style={{ borderRadius: 16 }}>
              <div className="card-body d-flex flex-column">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div>
                    <h6 className="fw-bold mb-0">Recent Bills</h6>
                    <small className="text-muted">Latest transactions</small>
                  </div>
                  <span className="badge rounded-pill bg-success bg-opacity-10 text-success px-3 py-2">
                    {stats?.recent_bills?.length ?? 0} bills
                  </span>
                </div>

                {!stats?.recent_bills?.length ? (
                  <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-muted py-4">
                    <i className="bi bi-receipt fs-1 opacity-25 mb-2"></i>
                    <span className="small">No bills yet</span>
                  </div>
                ) : (
                  <div className="d-flex flex-column gap-2 overflow-auto" style={{ maxHeight: 320 }}>
                    {stats.recent_bills.map((bill, i) => (
                      <div key={bill.id} className="bill-row d-flex align-items-center gap-3 p-2 rounded-3"
                        style={{ background: i % 2 === 0 ? '#f8f9ff' : '#fff' }}>
                        <div className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                          style={{ width: 36, height: 36, background: '#2563eb' }}>
                          <i className="bi bi-receipt text-white" style={{ fontSize: 14 }}></i>
                        </div>
                        <div className="flex-grow-1 overflow-hidden">
                          <div className="fw-semibold text-truncate small">
                            {bill.customer__name || 'Walk-in Customer'}
                          </div>
                          <div className="text-muted" style={{ fontSize: 11 }}>
                            {new Date(bill.bill_date).toLocaleString('en-US', {
                              month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                            })}
                          </div>
                        </div>
                        <div className="fw-bold text-success small flex-shrink-0">
                          ${parseFloat(bill.total_amount).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>

      <VoiceCommandButton commands={[]} />
    </>
  );
}
