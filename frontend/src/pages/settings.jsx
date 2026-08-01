import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Settings, Moon, Info } from "lucide-react";

export default function SettingsPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#03050a] text-white">

      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Purple Glow */}
        <div className="absolute -top-32 -left-20 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />

        {/* Cyan Glow */}
        <div className="absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />

        {/* Pink Glow */}
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-pink-500/10 blur-3xl" />
      </div>

      {/* Page Content */}
      <div className="relative z-10 px-8 py-10">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 rounded-xl border border-white/10 bg-white/5 px-5 py-2 transition hover:bg-white/10"
        >
          ← Back
        </button>

        {/* Settings Container */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
        >

          {/* Header */}
          <div className="mb-8 flex items-center gap-3">
            <Settings size={30} />

            <div>
              <h1 className="text-3xl font-bold">
                Settings
              </h1>

              <p className="mt-1 text-sm text-slate-400">
                Customize your Manipulens AI experience.
              </p>
            </div>
          </div>

          {/* Theme */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className="mb-5 rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <div className="flex items-center gap-4">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                <Moon size={22} />
              </div>

              <div>
                <h2 className="text-lg font-semibold">
                  Theme
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Theme can be changed directly from the navigation bar.
                </p>
              </div>

            </div>
          </motion.div>

          {/* About */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                <Info size={22} />
              </div>

              <div>
                <h2 className="text-lg font-semibold">
                  About Manipulens AI
                </h2>

                <p className="mt-2 text-sm text-slate-400">
                  Version 1.0.0
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  AI-powered manipulative language detection using Machine
                  Learning.
                </p>
              </div>

            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}