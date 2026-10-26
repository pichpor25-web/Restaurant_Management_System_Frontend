// src/features/admin/TopSellingChart.jsx
const TopSellingChart = ({ data }) => {
  return (
    // បន្ថែម dark:bg-[#1E293B] និង dark:border-slate-700
    <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-slate-700 rounded-xl p-4 shadow-sm w-full transition-colors">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        Top selling items
      </h3>

      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col gap-1">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {item.name}
            </span>
            <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
              {/* ប្រអប់ពណ៌ក្រហមសម្រាប់បង្ហាញកម្រិត */}
              <div
                className="bg-rose-500 h-2 rounded-full"
                style={{ width: `${(item.value / 500) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TopSellingChart;
