// src/components/ui/DataTable.jsx
const DataTable = ({ rows = [], columns = [], empty = "No data" }) => {
  if (!rows.length) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-400">
        {empty}
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-700">
      <table className="w-full text-sm text-left">
        {/* កែ Thead ឱ្យទៅជាពណ៌ខ្មៅងងឹតនៅពេល Dark Mode */}
        <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-[#0F172A]">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-6 py-4 font-semibold">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        
        {/* កែ Tbody និង Row ឱ្យប្តូរពណ៌ */}
        <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
          {rows.map((row, rowIndex) => (
            <tr 
              key={row.id || rowIndex} 
              className="bg-white dark:bg-[#1E293B] hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              {columns.map((col) => (
                <td key={col.key} className="px-6 py-4 text-gray-900 dark:text-gray-200">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;