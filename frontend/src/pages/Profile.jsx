import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Profile({ theme }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const isLight = theme === "light";
  const initial = user?.email?.charAt(0).toUpperCase() || "U";

  return (
    <div
  className={`relative min-h-screen overflow-hidden px-8 py-10 transition-colors duration-300 ${
    isLight
      ? "bg-[#f8fafc] text-slate-900"
      : "bg-[#03050a] text-white"
  }`}
>
  <div className="pointer-events-none absolute inset-0">
  <div className="absolute -top-44 left-10 h-96 w-96 rounded-full bg-purple-500/20 blur-[120px]" />
  <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-cyan-500/15 blur-[150px]" />
</div>
      {/* Back Button */}
      <div className="relative z-10">
      <button
        onClick={() => navigate(-1)}
        className={`mb-8 rounded-xl px-5 py-2 transition ${
  isLight
    ? "border border-slate-300 bg-white hover:bg-slate-100"
    : "border border-white/10 bg-white/5 hover:bg-white/10"
}`}
      >
        ← Back
      </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className={`mx-auto max-w-3xl rounded-[2rem] p-10 backdrop-blur-2xl transition-all duration-300 ${
  isLight
    ? "border border-slate-200/80 bg-white/75 shadow-[0_24px_80px_rgba(15,23,42,0.08)]"
    : "border border-white/10 bg-white/[0.04] shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
}`}
      >
        <div className="flex flex-col items-center">

          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 text-5xl font-bold text-white shadow-[0_0_60px_rgba(168,85,247,0.45)]">
            {initial}
          </div>

          <h1 className="mt-6 text-3xl font-bold">
            {user?.displayName || "User"}
          </h1>
          <p className="mt-2 text-sm uppercase tracking-[0.25em] text-purple-400">
  Manipulens AI Member
</p>

          <p className="mt-2 text-slate-400">
            {user?.email}
          </p>

        </div>

        <div className="mt-12 grid gap-6">

          <div
  className={`rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] ${
  isLight
    ? "bg-slate-100 hover:bg-white"
    : "bg-white/5 hover:bg-white/10"
}`}
>
            <p className={`text-sm ${
  isLight ? "text-slate-500" : "text-slate-400"
}`}>Display Name</p>
            <h2 className="text-xl mt-1">
              {user?.displayName || "Not Set"}
            </h2>
          </div>

          <div
  className={`rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] ${
  isLight
    ? "bg-slate-100 hover:bg-white"
    : "bg-white/5 hover:bg-white/10"
}`}
>
            <p className={`text-sm ${
  isLight ? "text-slate-500" : "text-slate-400"
}`}>Email Address</p>
            <h2 className="text-xl mt-1">
              {user?.email}
            </h2>
          </div>

          <div
  className={`rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] ${
  isLight
    ? "bg-slate-100 hover:bg-white"
    : "bg-white/5 hover:bg-white/10"
}`}
>
            <p className={`text-sm ${
  isLight ? "text-slate-500" : "text-slate-400"
}`}>Account Status</p>
            <h2 className="text-xl mt-1 text-green-400">
              Active
            </h2>
          </div>
          <div
  className={`rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] ${
    isLight
      ? "bg-slate-100 hover:bg-white"
      : "bg-white/5 hover:bg-white/10"
  }`}
>
  <p className={isLight ? "text-sm text-slate-500" : "text-sm text-slate-400"}>
    Member Since
  </p>

  <h2 className="mt-1 text-xl">
    July 2026
  </h2>
</div>

        </div>
      </motion.div>
    </div>
  );
}