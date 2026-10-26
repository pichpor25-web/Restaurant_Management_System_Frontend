// src/features/admin/TableGrid.jsx (ឧទាហរណ៍)
const TableGrid = ({ tables }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {tables.map((table) => (
        <div 
          key={table.id} 
          className="bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-slate-700 rounded-xl p-4 flex flex-col items-center justify-center shadow-sm transition-colors"
        >
          {/* បន្ថែម dark:text-white ឬពណ៌ផ្សេងៗតាម Status */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Table {table.number}
          </h3>
          
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            table.status === 'available' 
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' 
              : table.status === 'occupied'
              ? 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400'
              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
          }`}>
            {table.status}
          </span>
        </div>
      ))}
    </div>
  )
}
export default TableGrid