// src/components/common/PageHeader.jsx

const PageHeader = ({ title, subtitle, actions }) => {
  return (
    // ប្រើ flex ដើម្បីរុញ Title ទៅឆ្វេង និង Actions ទៅស្តាំ
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      {/* ផ្នែកខាងឆ្វេង៖ Title និង Subtitle */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 transition-colors">
            {subtitle}
          </p>
        )}
      </div>

      {/* ផ្នែកខាងស្តាំ៖ បង្ហាញប៊ូតុង (Actions) ប្រសិនបើមានផ្ញើមក */}
      {actions && (
        <div className="flex items-center gap-2 shrink-0">{actions}</div>
      )}
    </div>
  );
};

export default PageHeader;
