// src/pages/admin/OrdersPage.jsx
import PageHeader from "../../components/common/PageHeader.jsx";
import OrderTable from "../../features/admin/OrderTable.jsx";
import Loader from "../../components/ui/Loader.jsx";
import ErrorMessage from "../../components/common/ErrorMessage.jsx";
import { useOrders } from "../../hooks/useOrders.js";
import { orderService } from "../../services/orderService.js";

const OrdersPage = () => {
  const { data, loading, error, reload } = useOrders({});

  const changeStatus = async (id, status) => {
    await orderService.updateStatus(id, status);
    reload();
  };

  return (
    <div className="min-h-screen transition-colors duration-300">
      <PageHeader title="Orders" subtitle="Confirm or cancel incoming orders" />
      <ErrorMessage message={error} />
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white dark:bg-[#1E293B] rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden transition-colors">
          <OrderTable
            orders={Array.isArray(data) ? data : []}
            onStatusChange={changeStatus}
          />
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
