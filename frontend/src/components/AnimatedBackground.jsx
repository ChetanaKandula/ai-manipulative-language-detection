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

export default function AnimatedBackground({ theme }) {
  const isLight = theme === "light"

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

      <div
        className={
          isLight
            ? "absolute inset-0 bg-[linear-gradient(180deg,rgba(248,250,252,0.12),rgba(226,232,240,0.24)_30%,rgba(241,245,249,0.9))]"
            : "absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.1),rgba(2,6,23,0.34)_30%,rgba(2,6,23,0.88))]"
        }
      />
      <div
        className={
          isLight
            ? "absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:120px_120px] opacity-20"
            : "absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:120px_120px] opacity-20"
        }
      />

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