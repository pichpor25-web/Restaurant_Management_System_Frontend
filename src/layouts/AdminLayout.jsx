// src/layouts/AdminLayout.jsx
import { NavLink, Outlet, useNavigate, Link } from "react-router-dom";
import { FaSun, FaMoon, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth.js";
import { useTheme } from "../context/ThemeContext.jsx";
import { imageUrl } from "../utils/imageUrl.js";

const links = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/orders", label: "Orders" },
  { to: "/admin/menu", label: "Menu" },
  { to: "/admin/categories", label: "Categories" },
  { to: "/admin/inventory", label: "Inventory / Stock" },
  { to: "/admin/tables", label: "Tables" },
  { to: "/admin/payments", label: "Payments" },
  { to: "/admin/reports", label: "Reports" },
  { to: "/admin/users", label: "Staff" },
];

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/"); // ប្តូរពី "/login" មកជា "/" វិញ ដើម្បីទៅ Home Page
  };

  const avatarSrc =
    user?.avatar_url || (user?.avatar ? imageUrl(user.avatar) : null);

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <aside className="hidden w-64 shrink-0 flex-col justify-between border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1E293B] p-4 md:flex transition-colors duration-300">
        {/* ... (Logo និង Menu) ... */}
        <div>
          <p className="mb-8 px-3 text-lg font-black text-rose-600 dark:text-rose-500">
            Restaurant Admin
          </p>
          <nav className="grid gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-rose-600 text-white shadow-md"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* ... (Profile, Theme, Logout) ... */}
        <div className="mt-6 border-t border-slate-200 dark:border-slate-700 pt-4 space-y-4">
          <Link
            to="/admin/profile"
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
          >
            {avatarSrc ? (
              <img
                src={avatarSrc}
                alt="Profile"
                className="size-10 rounded-full object-cover border border-rose-200 dark:border-rose-800/50 group-hover:scale-105 transition-transform"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://ui-avatars.com/api/?name=${user?.name || "Admin"}&background=random`;
                }}
              />
            ) : (
              <div className="size-10 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-rose-600 dark:text-rose-400 font-bold border border-rose-200 dark:border-rose-800/50 group-hover:scale-105 transition-transform">
                {user?.name?.charAt(0) || "A"}
              </div>
            )}
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-bold text-slate-900 dark:text-white truncate">
                {user?.name || "Admin User"}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {user?.email || "admin@restaurant.com"}
              </span>
            </div>
          </Link>

          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <span className="text-sm font-medium">Appearance</span>
            {isDark ? (
              <FaSun className="text-yellow-400 text-lg" />
            ) : (
              <FaMoon className="text-indigo-500 text-lg" />
            )}
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-rose-600 dark:text-rose-500 bg-rose-50 dark:bg-rose-900/10 hover:bg-rose-100 dark:hover:bg-rose-900/30 transition-colors"
          >
            <FaSignOutAlt className="text-base" />
            Logout
          </button>
        </div>
      </aside>

      {/* ... (Header និង Content) ... */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-[#1E293B]/50 backdrop-blur-md px-6 py-3 transition-colors duration-300 sticky top-0 z-10">
          <span className="text-sm text-slate-500 dark:text-slate-400">
            Signed in as{" "}
            <b className="text-slate-900 dark:text-slate-100">
              {user?.name ?? "Admin"}
            </b>
          </span>
        </header>
        <main className="flex-1 p-6 bg-slate-50 dark:bg-[#0B1120] transition-colors duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
