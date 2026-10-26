// src/pages/admin/InventoryPage.jsx
import { useState, useEffect } from "react";
import PageHeader from "../../components/common/PageHeader.jsx";
import Loader from "../../components/ui/Loader.jsx";
import ErrorMessage from "../../components/common/ErrorMessage.jsx";
import { inventoryService } from "../../services/inventoryService.js";
import { FaBoxOpen, FaExclamationTriangle } from "react-icons/fa";

const InventoryPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await inventoryService.getAll();

        // ពិនិត្យមើលថាតើ Data មកពីណា (res ផ្ទាល់ ឬ res.data)
        const rawData = res.data ? res.data : res;

        // ប្រសិនបើវាមិនមែនជា Array ទេ សូមដាក់វាទទេ []
        setItems(Array.isArray(rawData) ? rawData : []);
      } catch (err) {
        console.error(err);
        setError("មិនអាចទាញយកទិន្នន័យ Inventory បានទេ។ សូមពិនិត្យ API។");
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen transition-colors duration-300">
      <PageHeader
        title="Inventory / Stock"
        subtitle="Track ingredient stock levels"
      />
      <ErrorMessage message={error} />

      {/* ប្រើ items.length ឥឡូវនេះវានឹងមិន Error ទេ ព្រោះយើងធានាថាវាជា Array */}
      {items.length === 0 && !error ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500 dark:text-gray-400">
          <FaBoxOpen className="text-6xl mb-4 opacity-50" />
          <p className="text-lg font-medium">No inventory items found.</p>
          <p className="text-sm mt-1">
            Please add some items from the database or API.
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#1E293B] rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-[#0F172A]">
              <tr>
                <th className="px-6 py-4">Item Name</th>
                <th className="px-6 py-4">Quantity</th>
                <th className="px-6 py-4">Unit</th>
                <th className="px-6 py-4">Unit Cost</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 text-gray-900 dark:text-gray-200">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                    {item.unit}
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                    ${Number(item.unit_cost || 0).toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    {item.is_low_stock ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400">
                        <FaExclamationTriangle /> Low Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                        In Stock
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InventoryPage;
