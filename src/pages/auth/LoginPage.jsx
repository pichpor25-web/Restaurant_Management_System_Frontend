// src/pages/auth/LoginPage.jsx
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button.jsx";
import ErrorMessage from "../../components/common/ErrorMessage.jsx";
import { useAuth } from "../../context/authContext.js";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form);
      navigate(location.state?.from?.pathname ?? "/admin", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-[#0B1120] via-slate-900 to-indigo-950">
      {/* ពន្លឺពណ៌ស្វាយ និងខៀវ សម្រាប់បង្កើត Reflection លើកញ្ចក់ */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* ប្រអប់ Liquid Glass */}
      <div
        className="relative w-full max-w-md p-8 sm:p-10 rounded-[2rem] 
                      bg-white/5 
                      backdrop-blur-xl 
                      border border-white/10 
                      shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] 
                      ring-1 ring-white/5"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-400">Sign in to Restaurant Admin</p>
        </div>

        <form className="grid gap-5" onSubmit={submit}>
          {/* Label ត្រូវដាក់ពណ៌ស្រាល ដើម្បីឱ្យឃើញច្បាស់លើផ្ទៃងងឹត */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
              placeholder="admin@restaurant.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
              placeholder="••••••••"
            />
          </div>

          <ErrorMessage message={error} />

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full py-3.5 rounded-xl font-semibold text-white 
                       bg-gradient-to-r from-indigo-500 to-purple-600 
                       hover:from-indigo-400 hover:to-purple-500 
                       shadow-[0_0_20px_rgba(99,102,241,0.3)] 
                       hover:shadow-[0_0_25px_rgba(99,102,241,0.5)]
                       transition-all duration-300"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
