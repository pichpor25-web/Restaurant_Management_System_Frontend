import React, { useState, useRef, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaCamera,
  FaShieldAlt,
  FaSave,
  FaSpinner,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import PageHeader from "../../components/common/PageHeader.jsx";
import { api } from "../../services/api.js";
import { imageUrl } from "../../utils/imageUrl.js";
import { useAuth } from "../../hooks/useAuth.js"; // ត្រូវប្រាកដថានាំចូល

const ProfilePage = () => {
  // ទាញយក Function updateUser ពី AuthContext
  const { updateUser } = useAuth();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    role: "Super Administrator",
    avatar: null,
    avatarPreview: null,
  });

  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // ១. ទាញយកទិន្នន័យ User
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/profile");
        const user = res.data ? res.data : res;

        setProfile({
          name: user.name || "",
          email: user.email || "",
          role: user.role || "Admin",
          avatar: null,
          avatarPreview:
            user.avatar_url || (user.avatar ? imageUrl(user.avatar) : null),
        });
      } catch (error) {
        setMessage({
          type: "error",
          text: error.message || "មិនអាចទាញយកព័ត៌មានបានទេ។",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleProfileChange = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });
  const handlePasswordChange = (e) =>
    setPasswords({ ...passwords, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({
        ...profile,
        avatar: file,
        avatarPreview: URL.createObjectURL(file),
      });
    }
  };

  // ២. Update ព័ត៌មានផ្ទាល់ខ្លួន
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsSavingProfile(true);
    setMessage({ type: "", text: "" });

    try {
      const formData = new FormData();
      formData.append("name", profile.name);
      formData.append("email", profile.email);
      if (profile.avatar) formData.append("avatar", profile.avatar);

      const res = await api.post("/profile/update", formData);
      const updatedUser = res.user || res;

      // *** ចំណុចសំខាន់៖ Update ទិន្នន័យទៅ AuthContext ដើម្បីឱ្យ Sidebar ដឹងភ្លាម ***
      if (updateUser && updatedUser) {
        updateUser(updatedUser);
      }

      if (updatedUser?.avatar_url) {
        setProfile((prev) => ({
          ...prev,
          avatar: null,
          avatarPreview: updatedUser.avatar_url,
        }));
      }

      setMessage({ type: "success", text: "ព័ត៌មានត្រូវបានកែប្រែដោយជោគជ័យ!" });
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "មានបញ្ហាក្នុងការកែប្រែ។",
      });
    } finally {
      setIsSavingProfile(false);
    }
  };

  // ៣. Update Password
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      return setMessage({
        type: "error",
        text: "Password ថ្មីទាំងពីរមិនដូចគ្នាទេ!",
      });
    }
    setIsSavingPassword(true);
    setMessage({ type: "", text: "" });

    try {
      await api.post("/profile/update-password", {
        current_password: passwords.current,
        new_password: passwords.new,
        new_password_confirmation: passwords.confirm,
      });
      setMessage({ type: "success", text: "Password ត្រូវបានប្តូរដោយជោគជ័យ!" });
      setPasswords({ current: "", new: "", confirm: "" });
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Password ចាស់មិនត្រឹមត្រូវ។",
      });
    } finally {
      setIsSavingPassword(false);
    }
  };

  if (isLoading)
    return (
      <div className="p-10 text-center text-white">Loading Profile...</div>
    );

  return (
    <div className="min-h-screen transition-colors duration-300 max-w-5xl mx-auto pb-10">
      <PageHeader
        title="My Profile"
        subtitle="Manage your personal information."
      />

      {message.text && (
        <div
          className={`mt-4 p-4 rounded-xl flex items-center gap-3 text-sm font-medium ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
              : "bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
          }`}
        >
          {message.type === "success" ? (
            <FaCheckCircle className="text-lg" />
          ) : (
            <FaExclamationTriangle className="text-lg" />
          )}
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* ផ្នែក Profile រូបភាព */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center transition-colors">
            <div
              className="relative group cursor-pointer mb-4"
              onClick={() => fileInputRef.current.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />

              {profile.avatarPreview ? (
                <img
                  src={profile.avatarPreview}
                  alt="Profile"
                  className="size-28 rounded-full object-cover border-4 border-white dark:border-[#0B1120] shadow-lg"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${profile.name || "Admin"}&background=random`;
                  }}
                />
              ) : (
                <div className="size-28 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-rose-600 dark:text-rose-400 text-4xl font-bold border-4 border-white dark:border-[#0B1120] shadow-lg">
                  {profile.name?.charAt(0) || "A"}
                </div>
              )}

              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <FaCamera className="text-white text-xl" />
              </div>
            </div>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {profile.name || "Admin"}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {profile.email || "No email"}
            </p>
            <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-semibold rounded-full flex items-center gap-1.5">
              <FaShieldAlt /> {profile.role}
            </span>
          </div>
        </div>

        {/* ផ្នែក Form ព័ត៌មាន និង Password */}
        <div className="lg:col-span-2 space-y-6">
          <form
            onSubmit={handleUpdateProfile}
            className="bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm transition-colors"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FaUser className="text-rose-500" /> Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500/50 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500/50 outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="mt-5 flex justify-end">
              <button
                type="submit"
                disabled={isSavingProfile}
                className="flex items-center gap-2 px-6 py-2.5 bg-rose-600 hover:bg-rose-700 disabled:opacity-70 text-white text-sm font-semibold rounded-xl shadow-sm transition-colors"
              >
                {isSavingProfile ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <FaSave />
                )}
                {isSavingProfile ? "Saving..." : "Save Info"}
              </button>
            </div>
          </form>

          <form
            onSubmit={handleUpdatePassword}
            className="bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm transition-colors"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FaLock className="text-rose-500" /> Change Password
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  name="current"
                  value={passwords.current}
                  onChange={handlePasswordChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500/50 outline-none"
                  placeholder="••••••••"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="new"
                    value={passwords.new}
                    onChange={handlePasswordChange}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500/50 outline-none"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    name="confirm"
                    value={passwords.confirm}
                    onChange={handlePasswordChange}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500/50 outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>
            <div className="mt-5 flex justify-end">
              <button
                type="submit"
                disabled={isSavingPassword}
                className="flex items-center gap-2 px-6 py-2.5 bg-slate-800 dark:bg-white hover:bg-slate-900 dark:hover:bg-gray-100 disabled:opacity-70 text-white dark:text-slate-900 text-sm font-semibold rounded-xl shadow-sm transition-colors"
              >
                {isSavingPassword ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <FaLock />
                )}
                {isSavingPassword ? "Updating..." : "Update Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
