// src/features/admin/StatCard.jsx
const StatCard = ({ label, value, hint }) => {
  return (
    <div className="bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-slate-700 rounded-xl p-5 shadow-sm transition-colors duration-300">
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        {label}
      </p>
      <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
        {value}
      </p>
      {hint && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{hint}</p>
      )}
    </div>
  );
};
export default StatCard;
