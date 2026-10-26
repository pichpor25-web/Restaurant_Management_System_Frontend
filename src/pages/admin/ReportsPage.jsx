import { useState, useEffect } from "react";
import PageHeader from "../../components/common/PageHeader.jsx";
import StatCard from "../../features/admin/StatCard.jsx";
import Loader from "../../components/ui/Loader.jsx";
import ErrorMessage from "../../components/common/ErrorMessage.jsx";
import { formatCurrency } from "../../utils/formatCurrency.js";
import { api } from "../../services/api.js"; // នាំចូល api

const ReportsPage = () => {
  // ប្តូរពី Mock Data មកជា State សម្រាប់ទិន្នន័យពិត
  const [reportsData, setReportsData] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    dailyReports: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ទាញយកទិន្នន័យពី API ពេលបើកទំព័រ
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await api.get("/reports/summary");
        setReportsData(res);
      } catch (err) {
        setError(err.message || "មិនអាចទាញយករបាយការណ៍បានទេ។");
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  const { totalRevenue, totalOrders, dailyReports } = reportsData;
  const avgOrderValue = totalOrders ? totalRevenue / totalOrders : 0;

  return (
    <div className="min-h-screen transition-colors duration-300">
      <PageHeader title="Reports" subtitle="Daily & monthly sales reports" />

      {/* កាតសង្ខេប (ប្រើទិន្នន័យពិត) */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard label="Total Revenue" value={formatCurrency(totalRevenue)} />
        <StatCard label="Total Orders" value={totalOrders} />
        <StatCard
          label="Avg. Order Value"
          value={formatCurrency(avgOrderValue)}
        />
        <StatCard label="Best Seller" value="N/A" hint="Coming soon" />
      </div>

      {/* តារាងរបាយការណ៍ */}
      <div className="bg-white dark:bg-[#1E293B] rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-[#0F172A]">
            <tr>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Total Sales</th>
              <th className="px-6 py-4">Orders</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
            {dailyReports.length > 0 ? (
              dailyReports.map((report, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <td className="px-6 py-4 text-gray-900 dark:text-gray-200">
                    {report.date}
                  </td>
                  <td className="px-6 py-4 text-gray-900 dark:text-gray-200">
                    {formatCurrency(report.totalSales)}
                  </td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-400">
                    {report.orders}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-8 text-center text-gray-500">
                  No reports found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsPage;
