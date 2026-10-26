// src/components/ui/Modal.jsx
const Modal = ({ open, title, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      {/* បន្ថែម dark:bg-[#1E293B] និង dark:border-slate-700 នៅទីនេះ */}
      <div className="bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-slate-700 rounded-2xl shadow-xl w-full max-w-md overflow-hidden transition-colors">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-slate-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
