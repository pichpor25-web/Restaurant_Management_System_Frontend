import { useState, useEffect, useRef } from "react";
import { FaTimes, FaImage } from "react-icons/fa";
import { imageUrl } from "../../utils/imageUrl.js";

const MenuForm = ({ initial = {}, categories = [], onSubmit, submitting }) => {
  const [form, setForm] = useState({
    name: initial.name || "",
    price: initial.price || "",
    description: initial.description || "",
    category_id: initial.category_id || "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const fileInputRef = useRef(null);

  // ពេល Form បើកមក (Edit), ទាញយករូបភាពពី Server មកបង្ហាញ
  useEffect(() => {
    const imgValue = initial.image || initial.image_url;
    if (imgValue) {
      setPreview(imageUrl(imgValue));
    } else {
      setPreview(null);
    }
  }, [initial]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file)); // បង្ហាញរូបភាពថ្មីភ្លាមៗ
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ១. ចំណងជើង (Name) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500/50 outline-none transition-all"
            placeholder="e.g. Coca-Cola"
          />
        </div>

        {/* ២. តម្លៃ (Price) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Price
          </label>
          <input
            type="number"
            step="0.01"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500/50 outline-none transition-all"
            placeholder="0.00"
          />
        </div>

        {/* ៣. រូបភាព (Image Upload & Preview) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Image
          </label>
          <div className="flex items-center gap-4">
            {/* ប្រអប់ Preview */}
            <div
              className={`relative size-24 rounded-xl overflow-hidden border-2 border-dashed border-gray-300 dark:border-slate-600 flex items-center justify-center bg-gray-50 dark:bg-[#0F172A] ${
                preview ? "cursor-pointer group border-solid" : ""
              }`}
              onClick={() => preview && setIsImageModalOpen(true)}
            >
              {preview ? (
                <>
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentElement.innerHTML =
                        '<span class="text-xs text-rose-500 text-center px-1">Image Error</span>';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs text-white font-medium">View</span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-400">
                  <FaImage className="text-2xl mb-1" />
                  <span className="text-[10px]">No image</span>
                </div>
              )}
            </div>

            {/* ប៊ូតុង Choose File */}
            <div className="flex flex-col gap-1.5">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="px-4 py-2 rounded-xl bg-white dark:bg-[#1E293B] border border-gray-300 dark:border-slate-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
              >
                Choose File
              </button>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                JPG, PNG or WebP, max 2 MB
              </span>
            </div>
          </div>
        </div>

        {/* ៤. ការពិពណ៌នា (Description) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500/50 outline-none transition-all"
            placeholder="Short description..."
          />
        </div>

        {/* ៥. ប្រភេទ (Category) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Category
          </label>
          <select
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500/50 outline-none transition-all appearance-none"
          >
            <option value="">Select...</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* ៦. ប៊ូតុង Save */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-70 text-white font-bold text-sm shadow-md transition-all"
          >
            {submitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>

      {/* Modal សម្រាប់ពង្រីករូបភាព */}
      {isImageModalOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div className="relative max-w-3xl w-full max-h-[90vh]">
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-rose-400 transition-colors"
            >
              <FaTimes className="text-3xl" />
            </button>
            <img
              src={preview}
              alt="Zoomed"
              className="w-full h-full object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MenuForm;
