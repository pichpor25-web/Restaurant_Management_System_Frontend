// src/features/admin/SalesChart.jsx
import { useTheme } from '../../context/ThemeContext.jsx'

const SalesChart = ({ title, data }) => {
  const { isDark } = useTheme()

  return (
    // បន្ថែម dark:bg-[#1E293B] និង dark:border-slate-700 នៅទីនេះ
    <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-slate-700 rounded-xl p-4 shadow-sm w-full transition-colors">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        {title}
      </h3>
      
      {/* ប្រអប់សម្រាប់ក្រាហ្វ (បើអ្នកប្រើ Recharts ឬ Chart.js សូមដាក់នៅទីនេះ) */}
      <div className="h-64 flex items-center justify-center text-gray-400 dark:text-gray-500">
         {/* ឧទាហរណ៍៖ បើអ្នកមាន Recharts វានឹងបង្ហាញនៅទីនេះ */}
         Chart Data Placeholder
      </div>
    </div>
  )
}

export default SalesChart