import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

const starParticles = [
  { top: "12%", left: "8%", size: 3, opacity: 0.55, delay: 0 },
  { top: "18%", left: "20%", size: 2, opacity: 0.4, delay: 1.2 },
  { top: "10%", left: "78%", size: 3, opacity: 0.5, delay: 0.8 },
  { top: "26%", left: "86%", size: 2, opacity: 0.35, delay: 1.6 },
  { top: "40%", left: "12%", size: 2, opacity: 0.45, delay: 2.2 },
  { top: "52%", left: "84%", size: 3, opacity: 0.5, delay: 0.4 },
  { top: "66%", left: "16%", size: 2, opacity: 0.4, delay: 1.8 },
  { top: "74%", left: "74%", size: 3, opacity: 0.45, delay: 1 },
  { top: "82%", left: "28%", size: 2, opacity: 0.34, delay: 2.4 },
  { top: "86%", left: "58%", size: 3, opacity: 0.42, delay: 0.6 }
]

const features = [
  {
    title: "Gaslighting Detection",
    copy: "Identify attempts to distort reality and manipulate perception.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
        <path d="M12 3v18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M5 8.5c1.8 1.8 4 2.7 7 2.7s5.2-.9 7-2.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M7.5 16.5c1.2-1 2.8-1.5 4.5-1.5s3.3.5 4.5 1.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  },
  {
    title: "Emotional Blackmail",
    copy: "Detect guilt-driven and coercive language patterns.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
        <path d="M12 3 3.5 8v8L12 21l8.5-5V8L12 3Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9.5 10.5h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M9.5 13.5h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  },
  {
    title: "Love Bombing",
    copy: "Recognize excessive affection used for manipulation.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
        <path d="M12 20.5 4.5 13A5 5 0 0 1 12 6.2 5 5 0 0 1 19.5 13L12 20.5Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 8.2v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  }
]

function NeonBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="mesh-gradient absolute inset-0" />

      <motion.div
        className="floating-blob blob-one"
        animate={{ x: [0, 50, -24, 0], y: [0, -30, 22, 0], scale: [1, 1.08, 0.98, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="floating-blob blob-two"
        animate={{ x: [0, -44, 30, 0], y: [0, 22, -18, 0], scale: [1, 0.96, 1.05, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: -5 }}
      />

      <motion.div
        className="floating-blob blob-three"
        animate={{ x: [0, 28, -20, 0], y: [0, -18, 26, 0], scale: [1, 1.05, 0.97, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: -9 }}
      />

      <svg
        className="absolute left-1/2 top-0 h-full w-[240vw] -translate-x-1/2 opacity-95 blur-[44px]"
        viewBox="0 0 2800 1200"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="heroWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
            <stop offset="16%" stopColor="#a855f7" stopOpacity="1" />
            <stop offset="48%" stopColor="#22d3ee" stopOpacity="1" />
            <stop offset="82%" stopColor="#ec4899" stopOpacity="1" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
          </linearGradient>

          <filter id="heroWaveBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="32" />
          </filter>
        </defs>

        <g filter="url(#heroWaveBlur)" opacity="0.95">
          <path
            d="M -300 240 C 140 100, 430 420, 820 250 S 1420 70, 1760 260 S 2380 420, 2840 240"
            fill="none"
            stroke="url(#heroWaveGradient)"
            strokeWidth="150"
            strokeLinecap="round"
          >
            <animateTransform attributeName="transform" type="translate" values="-240 0; 240 0; -240 0" dur="20s" repeatCount="indefinite" />
          </path>

          <path
            d="M -340 470 C 120 320, 460 660, 900 470 S 1510 220, 1890 430 S 2440 650, 2900 470"
            fill="none"
            stroke="url(#heroWaveGradient)"
            strokeWidth="110"
            strokeLinecap="round"
            opacity="0.76"
          >
            <animateTransform attributeName="transform" type="translate" values="200 0; -200 0; 200 0" dur="28s" repeatCount="indefinite" />
          </path>

          <path
            d="M -280 760 C 160 610, 520 900, 960 740 S 1540 480, 1940 660 S 2480 930, 2960 760"
            fill="none"
            stroke="url(#heroWaveGradient)"
            strokeWidth="92"
            strokeLinecap="round"
            opacity="0.54"
          >
            <animateTransform attributeName="transform" type="translate" values="-180 0; 180 0; -180 0" dur="34s" repeatCount="indefinite" />
          </path>

          <path
            d="M -240 900 C 220 760, 680 1060, 1080 890 S 1740 620, 2200 840 S 2620 1100, 3100 900"
            fill="none"
            stroke="url(#heroWaveGradient)"
            strokeWidth="70"
            strokeLinecap="round"
            opacity="0.42"
          >
            <animateTransform attributeName="transform" type="translate" values="150 0; -150 0; 150 0" dur="40s" repeatCount="indefinite" />
          </path>
        </g>
      </svg>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.1),rgba(2,6,23,0.34)_30%,rgba(2,6,23,0.88))]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:120px_120px] opacity-20" />

      {starParticles.map((particle, index) => (
        <span
          key={index}
          className="hero-star absolute rounded-full bg-white/80 shadow-[0_0_18px_rgba(255,255,255,0.8)]"
          style={{
            top: particle.top,
            left: particle.left,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}
    </div>
  )
}

function Home() {
  const navigate = useNavigate()

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#03050a] text-white">
      <NeonBackground />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.14),transparent_24%),radial-gradient(circle_at_15%_70%,rgba(34,211,238,0.08),transparent_20%),radial-gradient(circle_at_85%_75%,rgba(236,72,153,0.08),transparent_20%)]" />

      <nav className="relative z-20 mx-auto mt-5 flex w-[min(1120px,calc(100%-2rem))] items-center justify-between rounded-full border border-white/10 bg-white/[0.05] px-6 py-4 shadow-[0_20px_70px_rgba(0,0,0,0.38)] backdrop-blur-2xl transition duration-300 hover:border-white/20 hover:bg-white/[0.075]">
        <h1 className="text-lg font-semibold tracking-[0.18em] text-white/95 sm:text-xl">
          Manipulens AI
        </h1>

        <button
          onClick={() => navigate("/analyze")}
          className="rounded-full border border-cyan-400/20 bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(168,85,247,0.35),0_0_42px_rgba(34,211,238,0.2)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(168,85,247,0.48),0_0_52px_rgba(34,211,238,0.3)]"
        >
          Analyze Chat
        </button>
      </nav>

      <motion.section
        className="relative z-10 flex flex-col items-center px-8 pb-24 pt-24 text-center sm:pb-28 sm:pt-28"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.12)] backdrop-blur-xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.85)]" />
          AI Fraud Detection Platform
        </motion.div>

        <motion.h1
          className="max-w-6xl text-6xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-7xl lg:text-[6.5rem]"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
        >
          Detect
          <span className="bg-gradient-to-r from-violet-200 via-fuchsia-200 to-cyan-200 bg-clip-text text-transparent">
            {" "}Manipulation
          </span>
          <br />
          Before It Hurts
        </motion.h1>

        <motion.p
          className="mt-8 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.28 }}
        >
          AI-powered detection of Gaslighting,
          Love Bombing, Emotional Blackmail,
          and Guilt Tripping in conversations.
        </motion.p>

        <motion.div
          className="mt-10 flex gap-4"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.38 }}
        >
          <motion.button
            onClick={() => navigate("/analyze")}
            className="rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(168,85,247,0.98),rgba(79,70,229,0.94),rgba(34,211,238,0.94))] px-8 py-4 font-semibold text-white shadow-[0_16px_40px_rgba(168,85,247,0.35),0_0_42px_rgba(34,211,238,0.14)] transition"
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Analyze Conversation
          </motion.button>

          <motion.button
            className="rounded-2xl border border-white/10 bg-white/[0.03] px-8 py-4 font-semibold text-white/90 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/[0.07]"
            whileHover={{ y: -3, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            Learn More
          </motion.button>
        </motion.div>
      </motion.section>

      <section className="relative z-10 mx-auto max-w-6xl px-8 pb-20">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group rounded-3xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl transition hover:border-cyan-300/25 hover:bg-white/[0.065]"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, scale: 1.015 }}
            >
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.14)] transition group-hover:border-cyan-300/30 group-hover:shadow-[0_0_32px_rgba(168,85,247,0.2)]">
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold tracking-tight text-white">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                {feature.copy}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home