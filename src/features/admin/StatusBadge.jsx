// src/features/admin/StatusBadge.jsx
import { ORDER_STATUS } from "../../utils/constants.js";

const StatusBadge = ({ status }) => {
  // កំណត់ពណ៌តាម Status
  const styles = {
    [ORDER_STATUS.PENDING]:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    [ORDER_STATUS.CONFIRMED]:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
    [ORDER_STATUS.CANCELLED]:
      "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    [ORDER_STATUS.COMPLETED]:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  };

  const currentStyle =
    styles[status] ||
    "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";

  return (
    <span
      className={`px-2.5 py-1 text-xs font-medium rounded-full ${currentStyle}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
