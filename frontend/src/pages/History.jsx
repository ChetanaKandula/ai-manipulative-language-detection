import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getHistory } from "../services/firestore";

export default function History() {
    const { user } = useAuth();
const [history, setHistory] = useState([]);
const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
  async function fetchHistory() {
    if (!user) return;

    try {
      const data = await getHistory(user.uid);
      console.log(data);
      setHistory(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  fetchHistory();
}, [user]);
const totalAnalyses = history.length;

const highRiskCount = history.filter(
  (item) => (item.riskScore || 0) >= 70
).length;

const averageRisk =
  totalAnalyses > 0
    ? Math.round(
        history.reduce((sum, item) => sum + (item.riskScore || 0), 0) /
          totalAnalyses
      )
    : 0;
const getDominantPrediction = (summary) => {
  if (!summary) return "Unknown";

  return Object.entries(summary).reduce((max, current) =>
    current[1] > max[1] ? current : max
  )[0];
};
  return (
    <motion.div
  whileHover={{
    y: -4,
    scale: 1.01,
  }}
  transition={{ duration: 0.2 }} className="relative min-h-screen overflow-hidden bg-[#03050a] px-8 py-10 text-white">
      <motion.div
  whileHover={{
    y: -4,
    scale: 1.01,
  }}
  transition={{ duration: 0.2 }} className="pointer-events-none absolute inset-0">
  <motion.div
  whileHover={{
    y: -4,
    scale: 1.01,
  }}
  transition={{ duration: 0.2 }} className="absolute -top-44 left-10 h-96 w-96 rounded-full bg-purple-500/20 blur-[120px]" />
  <motion.div
  whileHover={{
    y: -4,
    scale: 1.01,
  }}
  transition={{ duration: 0.2 }} className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-cyan-500/15 blur-[150px]" />
</motion.div>

<motion.div
  whileHover={{
    y: -4,
    scale: 1.01,
  }}
  transition={{ duration: 0.2 }} className="relative z-10"></motion.div>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-8 rounded-xl border border-white/10 bg-white/5 px-5 py-2 hover:bg-white/10 transition"
      >
        ← Back
      </button>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
      >
        <h1 className="text-4xl font-bold tracking-tight">
  Analysis History
</h1>

<p className="mt-3 text-slate-400 text-lg">
  Track every AI conversation you've analyzed.
</p>
<motion.div
  whileHover={{
    y: -4,
    scale: 1.01,
  }}
  transition={{ duration: 0.2 }} className="mt-10 grid gap-6 md:grid-cols-3">

  <motion.div
    whileHover={{ scale: 1.03 }}
    className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
  >
    <p className="text-slate-400 text-sm">Total Analyses</p>
    <h2 className="mt-2 text-4xl font-bold text-purple-400">
      {totalAnalyses}
    </h2>
  </motion.div>

  <motion.div
    whileHover={{ scale: 1.03 }}
    className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
  >
    <p className="text-slate-400 text-sm">High Risk Chats</p>
    <h2 className="mt-2 text-4xl font-bold text-red-400">
      {highRiskCount}
    </h2>
  </motion.div>

  <motion.div
    whileHover={{ scale: 1.03 }}
    className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
  >
    <p className="text-slate-400 text-sm">Average Risk Score</p>
    <h2 className="mt-2 text-4xl font-bold text-cyan-400">
      {averageRisk}%
    </h2>
  </motion.div>

</motion.div>

        <motion.div
  whileHover={{
    y: -4,
    scale: 1.01,
  }}
  transition={{ duration: 0.2 }} className="mt-8 space-y-5">

  {loading ? (
    <p className="text-center text-slate-400">
      Loading...
    </p>
  ) : history.length === 0 ? (
    <motion.div
  whileHover={{
    y: -4,
    scale: 1.01,
  }}
  transition={{ duration: 0.2 }} className="rounded-2xl border border-dashed border-white/10 p-12 text-center">
      <p className="text-slate-400">
        No analyses yet.
      </p>
    </motion.div>
  ) : (
    history.map((item) => (
      <motion.div
  whileHover={{
    y: -4,
    scale: 1.01,
  }}
  transition={{ duration: 0.2 }}
        key={item.id}
        className="rounded-2xl border border-white/10 bg-white/5 p-6"
      >
        <motion.div
  whileHover={{
    y: -4,
    scale: 1.01,
  }}
  transition={{ duration: 0.2 }} className="flex items-center justify-between">

          <motion.div
  whileHover={{
    y: -4,
    scale: 1.01,
  }}
  transition={{ duration: 0.2 }}>
            <h2 className="flex items-center gap-2 text-2xl font-bold text-purple-400">
  🧠 {getDominantPrediction(item.result?.summary)}
</h2>

            <p className="mt-2 text-sm text-slate-400">
  📅 {item.date}
</p>
          </motion.div>

          <motion.div
  whileHover={{
    y: -4,
    scale: 1.01,
  }}
  transition={{ duration: 0.2 }}
  className={`rounded-full px-4 py-2 text-sm font-semibold ${
    item.riskScore >= 70
      ? "bg-red-500/20 text-red-300"
      : item.riskScore >= 40
      ? "bg-yellow-500/20 text-yellow-300"
      : "bg-green-500/20 text-green-300"
  }`}
>
  {item.riskScore >= 70
    ? "High Risk"
    : item.riskScore >= 40
    ? "Medium Risk"
    : "Low Risk"}
</motion.div>

        </motion.div>

        <p className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-slate-300 line-clamp-3">
          {item.chat}
        </p>
        <div className="mt-5 flex items-center gap-2">
  <span className="text-slate-400">
    Risk Score:
  </span>

  <span className="font-bold text-cyan-400">
    {item.riskScore}%
  </span>
</div>
      </motion.div>
      
    ))
  )}

</motion.div>
        </motion.div>
    </motion.div>
    );
}