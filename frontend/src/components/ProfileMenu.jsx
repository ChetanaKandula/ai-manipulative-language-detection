import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  History,
  Settings,
  Brain,
  LogOut,
  ChevronRight,
} from "lucide-react";

export default function ProfileMenu({
  user,
  logout,
  navigate,
  isLight,
}) {
    const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initial = user?.email?.charAt(0).toUpperCase() || "U";

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setOpen(!open)}
        className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold text-lg flex items-center justify-center shadow-lg hover:scale-105 transition"
      >
        {initial}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute right-0 mt-3 w-72 rounded-3xl border backdrop-blur-2xl shadow-2xl overflow-hidden z-50 ${
              isLight
                ? "bg-white border-slate-200"
                : "bg-[#111827]/90 border-white/10"
            }`}
          >
            <div className="p-6 text-center">
  {/* Avatar */}
  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-3xl font-bold text-white shadow-lg">
    {initial}
  </div>

  {/* Name */}
  <h3
    className={`mt-4 text-xl font-semibold ${
      isLight ? "text-slate-900" : "text-white"
    }`}
  >
    {user?.displayName || "User"}
  </h3>

  {/* Email */}
  <p
    className={`mt-1 text-sm ${
      isLight ? "text-slate-500" : "text-slate-400"
    }`}
  >
    {user?.email}
  </p>
</div>

<hr className={isLight ? "border-slate-200" : "border-white/10"} />
<div className="p-2">

  {/* My Profile */}
  <button
    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition ${
      isLight
        ? "hover:bg-slate-100 text-slate-800"
        : "hover:bg-white/10 text-white"
    }`}
    onClick={() => {
  setOpen(false);
  navigate("/profile");
}}
  >
    <User size={18} />
<span className="flex-1 text-left">My Profile</span>
<ChevronRight size={16} className="opacity-50" />
  </button>

  {/* Analysis History */}
<button
  onClick={() => {
    setOpen(false);
    navigate("/history");
  }}
  className={`mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 transition ${
    isLight
      ? "hover:bg-slate-100 text-slate-800"
      : "hover:bg-white/10 text-white"
  }`}
>
  <History size={18} />
  <span className="flex-1 text-left">Analysis History</span>
  <ChevronRight size={16} className="opacity-50" />
</button>

  {/* Settings */}
  <button
  onClick={() => {
    setOpen(false);
    navigate("/settings");
  }}
  className={`mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 transition ${
    isLight
      ? "hover:bg-slate-100 text-slate-800"
      : "hover:bg-white/10 text-white"
  }`}
>
  <Settings size={18} />
  <span className="flex-1 text-left">Settings</span>
  <ChevronRight size={16} className="opacity-50" />
</button>

  {/* Analyze Chat */}
  <button
    onClick={() => {
      navigate("/analyze");
      setOpen(false);
    }}
    className={`mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 transition ${
      isLight
        ? "hover:bg-slate-100 text-slate-800"
        : "hover:bg-white/10 text-white"
    }`}
  >
    <Brain size={18} />
<span className="flex-1 text-left">Analyze Chat</span>
  </button>

  <hr className={`my-2 ${isLight ? "border-slate-200" : "border-white/10"}`} />

  {/* Logout */}
  <button
    onClick={async () => {
      await logout();
      navigate("/");
    }}
    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-500 transition hover:bg-red-500/10"
  >
    <LogOut size={18} />
<span className="flex-1 text-left">Logout</span>
  </button>

</div>
            </motion.div>
        )}
        </AnimatePresence>
    </div>
    );
}