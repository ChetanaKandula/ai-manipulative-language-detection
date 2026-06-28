import { useState, useEffect, useRef } from "react"
import { motion, animate } from "framer-motion"
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip
} from "recharts"
import API from "../services/api"
import { jsPDF } from "jspdf"

const particleField = [
  { top: "8%", left: "12%", size: 14, dx: "22px", dy: "-18px", duration: "14s", delay: "-2s", opacity: 0.42, glow: "rgba(168, 85, 247, 0.95)" },
  { top: "14%", left: "74%", size: 10, dx: "-26px", dy: "18px", duration: "16s", delay: "-6s", opacity: 0.34, glow: "rgba(59, 130, 246, 0.95)" },
  { top: "22%", left: "48%", size: 18, dx: "18px", dy: "24px", duration: "18s", delay: "-8s", opacity: 0.3, glow: "rgba(147, 51, 234, 0.9)" },
  { top: "31%", left: "88%", size: 8, dx: "-16px", dy: "22px", duration: "12s", delay: "-4s", opacity: 0.24, glow: "rgba(14, 165, 233, 0.9)" },
  { top: "38%", left: "18%", size: 12, dx: "28px", dy: "-12px", duration: "15s", delay: "-10s", opacity: 0.44, glow: "rgba(168, 85, 247, 0.95)" },
  { top: "45%", left: "63%", size: 20, dx: "-20px", dy: "16px", duration: "20s", delay: "-3s", opacity: 0.25, glow: "rgba(59, 130, 246, 0.85)" },
  { top: "56%", left: "30%", size: 9, dx: "16px", dy: "-20px", duration: "13s", delay: "-7s", opacity: 0.28, glow: "rgba(196, 181, 253, 0.95)" },
  { top: "66%", left: "82%", size: 16, dx: "-18px", dy: "18px", duration: "17s", delay: "-11s", opacity: 0.31, glow: "rgba(14, 165, 233, 0.9)" },
  { top: "72%", left: "8%", size: 11, dx: "24px", dy: "-14px", duration: "19s", delay: "-5s", opacity: 0.33, glow: "rgba(168, 85, 247, 0.92)" },
  { top: "82%", left: "52%", size: 15, dx: "-12px", dy: "20px", duration: "21s", delay: "-9s", opacity: 0.29, glow: "rgba(59, 130, 246, 0.9)" },
  { top: "88%", left: "76%", size: 9, dx: "18px", dy: "-16px", duration: "15s", delay: "-1s", opacity: 0.3, glow: "rgba(217, 70, 239, 0.9)" },
  { top: "18%", left: "92%", size: 13, dx: "-22px", dy: "12px", duration: "17s", delay: "-13s", opacity: 0.28, glow: "rgba(96, 165, 250, 0.9)" }
]

function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1,
      onUpdate(latest) {
        setDisplay(Math.round(latest))
      }
    })

    return () => controls.stop()
  }, [value])

  return <>{display}</>
}
const quickPrompts = {
  Gaslighting: `That never happened.
You're imagining things.
Nobody else remembers it that way.
You always exaggerate.
You're too sensitive.`,

  "Emotional Blackmail": `If you loved me, you'd do this.
After everything I've done for you.
You owe me this much.
Don't disappoint me.
You'll regret leaving.`,

  "Love Bombing": `You're the most amazing person I've ever met.
Nobody understands me like you.
We're meant to be together forever.
I can't stop thinking about you.
You're absolutely perfect.`,

  Normal: `Hey, how was your day?
I finished my work.
Let's meet tomorrow.
Did you have lunch?
See you soon.`
}
const detectionTypes = [
  "🟣 Gaslighting",
  "🔴 Emotional Blackmail",
  "🩷 Love Bombing",
  "🟠 Guilt Tripping",
  "🟢 Normal Conversation"
]

function Analyzer({ theme }) {
  const isLight = theme === "light"
  const shellClass = isLight
    ? "relative min-h-screen overflow-hidden bg-[#eff3f8] text-slate-900"
    : "relative min-h-screen overflow-hidden bg-[#050816] text-white"
  const headerClass = isLight
    ? "glass-panel flex flex-col gap-6 rounded-[2rem] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] lg:flex-row lg:items-end lg:justify-between"
    : "glass-panel flex flex-col gap-6 rounded-[2rem] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] lg:flex-row lg:items-end lg:justify-between"
  const heroTitleClass = isLight
    ? "mt-5 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl"
    : "mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
  const bodyCopyClass = isLight
    ? "text-sm leading-7 text-slate-700 sm:text-base"
    : "text-sm leading-7 text-slate-300 sm:text-base"
  const panelClass = isLight
    ? "glass-panel rounded-[2rem] p-6 sm:p-7 shadow-[0_20px_70px_rgba(15,23,42,0.08)]"
    : "glass-panel rounded-[2rem] p-6 sm:p-7"
  const cardClass = isLight
    ? "rounded-[1.75rem] border border-slate-200/80 bg-white/75 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl transition hover:bg-white/90"
    : "rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl transition hover:bg-white/[0.06]"
  const softCardClass = isLight
    ? "rounded-2xl border border-slate-200/80 bg-white/75 p-4 shadow-[0_14px_40px_rgba(15,23,42,0.06)]"
    : "rounded-2xl border border-white/10 bg-white/5 p-4"
  const inputClass = isLight
    ? "mt-6 h-72 w-full rounded-[1.75rem] border border-slate-200 bg-white/85 p-5 text-[15px] leading-7 text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-purple-400/50 focus:bg-white"
    : "mt-6 h-72 w-full rounded-[1.75rem] border border-white/10 bg-white/5 p-5 text-[15px] leading-7 text-white outline-none transition placeholder:text-slate-500 focus:border-purple-400/50 focus:bg-white/[0.07]"
  const smallButtonClass = isLight
    ? "rounded-xl border border-slate-200 bg-white/80 px-4 py-2 text-sm text-slate-800 transition hover:bg-white hover:border-slate-300"
    : "rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
  const pillClass = isLight
    ? "rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-700"
    : "rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-300"
  const sectionTitleClass = isLight
    ? "mt-2 text-2xl font-semibold tracking-tight text-slate-950"
    : "mt-2 text-2xl font-semibold tracking-tight text-white"
  const mutedCopyClass = isLight ? "text-sm text-slate-600" : "text-sm text-slate-400"
  const insightCardClass = isLight
    ? "rounded-[1.35rem] border border-slate-200/80 bg-white/85 p-4"
    : "rounded-[1.35rem] border border-white/10 bg-white/5 p-4"
  const chartPanelClass = isLight
    ? "relative overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/80 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-2xl sm:p-6"
    : "relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#090b16]/75 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.26)] backdrop-blur-2xl sm:p-6"
  const placeholderCardClass = isLight
    ? "mx-auto mb-5 h-24 w-24 rounded-full border border-slate-200/80 bg-white/80 shadow-[0_0_30px_rgba(168,85,247,0.12)]"
    : "mx-auto mb-5 h-24 w-24 rounded-full border border-white/10 bg-white/[0.04] shadow-[0_0_30px_rgba(168,85,247,0.18)]"
  const footerClass = isLight
    ? "relative z-20 mt-16 border-t border-slate-200/80 py-14 text-center"
    : "relative z-20 mt-16 border-t border-white/10 py-14 text-center"
  const footerTitleClass = isLight
    ? "bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-5xl font-bold text-transparent"
    : "bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-5xl font-bold text-transparent"
  const footerLeadClass = isLight
    ? "mt-4 text-xl font-medium text-slate-800"
    : "mt-4 text-xl font-medium text-white"
  const footerBodyClass = isLight ? "mt-3 text-slate-600" : "mt-3 text-slate-400"
  const footerTagClass = isLight
    ? "rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm text-slate-700"
    : "rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-4 py-2 text-sm text-fuchsia-200"

  const [chat, setChat] = useState("")
  const [result, setResult] = useState(null)
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef(null)
  const [errorMessage, setErrorMessage] = useState("")
  const [loadingMessage, setLoadingMessage] = useState("")
  useEffect(() => {

  const savedHistory = localStorage.getItem("analysisHistory")

  if (savedHistory) {

    setHistory(JSON.parse(savedHistory))

  }

}, [])
  const loadDemoConversation = () => {
  setChat(`How was your day
You're imagining things again.
Nobody else thinks that happened.
If you loved me, you'd support me.
You're the most amazing person I've ever met.
Let's go out tomorrow.`)
}
const handleFileUpload = (event) => {

  const file = event.target.files[0]

  if (!file) return

  const reader = new FileReader()

  reader.onload = (e) => {

    setChat(e.target.result)

  }

  reader.readAsText(file)

}
const deleteHistoryItem = (id) => {

  const updatedHistory = history.filter(
    (item) => item.id !== id
  )

  setHistory(updatedHistory)

  localStorage.setItem(
    "analysisHistory",
    JSON.stringify(updatedHistory)
  )

}
  const copyResults = () => {
    if (!result) return
    const text = result.results
    .map(
      (item, index) =>
        `Message ${index + 1}
  Message: ${item.message}
  Prediction: ${item.prediction}
  Confidence: ${item.confidence}%`
    )
    .join("\n\n--------------------\n\n")

  navigator.clipboard.writeText(text)

  alert("Results copied!")
}
  const downloadReport = () => {
  if (!result) return

  const doc = new jsPDF()

  const currentDate = new Date().toLocaleString()
  doc.setFontSize(22)
  doc.setTextColor(88, 28, 135)
  doc.text("Manipulens AI", 20, 20)
  
  doc.setFontSize(16)
  doc.setTextColor(0, 0, 0)
  doc.text("Conversation Analysis Report", 20, 30)
  
  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  doc.text(`Generated On: ${currentDate}`, 20, 38)

  doc.setFillColor(245, 245, 245)
  doc.roundedRect(15, 48, 180, 22, 3, 3, "F")
  
  doc.setFontSize(14)
  doc.setTextColor(0, 0, 0)
  
  doc.text(`Risk Score: ${riskScore}%`, 20, 60)
  doc.text(`Risk Level: ${riskTier.label}`, 120, 60)

  doc.setDrawColor(220, 220, 220)
  doc.line(20, 80, 190, 80)
  
  doc.setFontSize(15)
  doc.text("Summary", 20, 92)
  
  let y = 102

  summaryEntries.forEach(([label, count]) => {
    doc.text(`${label}: ${count}`, 25, y)
    y += 10
  })
  y += 10
  
  doc.setDrawColor(220, 220, 220)
  doc.line(20, y, 190, y)
  
  y += 12
  
  doc.setFontSize(15)
  doc.text("AI Recommendation", 20, y)
  
  y += 10
  const recommendation = getRecommendation()
  const recommendationText =
    doc.splitTextToSize(recommendation, 160)
    
  doc.setFontSize(11)
  doc.text(recommendationText, 25, y)
  
  y += recommendationText.length * 7 + 12

  doc.setDrawColor(220, 220, 220)
  doc.line(20, y, 190, y)


  y += 12

  doc.setFontSize(15)
  doc.text("Message Analysis", 20, y)

  y += 10

  result.results.forEach((item, index) => {
    doc.text(`Message ${index + 1}`, 20, y)
    y += 8

    doc.text(`Prediction: ${item.prediction}`, 25, y)
    y += 8

    doc.text(`Confidence: ${item.confidence}%`, 25, y)
    y += 8

    const splitMessage = doc.splitTextToSize(
      `Message: ${item.message}`,
      160
    )

    doc.text(splitMessage, 25, y)

    y += splitMessage.length * 7 + 10

    if (y > 260) {
      doc.addPage()
      y = 20
    }
  })

  const pageCount = doc.internal.getNumberOfPages()

for (let i = 1; i <= pageCount; i++) {

  doc.setPage(i)

  doc.setFontSize(9)
  doc.setTextColor(120, 120, 120)

  doc.text(
    "Generated by Manipulens AI • AI-Powered Conversation Intelligence",
    20,
    285
  )

  doc.text(
    `Page ${i} of ${pageCount}`,
    170,
    285
  )
}

  doc.save("Manipulens_Report.pdf")
}
  const formatLabel = (label) => label.replace(/_/g, " ")

  const totalMessages = result?.results?.length ?? 0
  const summaryEntries = Object.entries(result?.summary ?? {})
  const normalCount = result?.summary?.Normal ?? 0
  const manipulativeCount = Math.max(totalMessages - normalCount, 0)
  const averageConfidence = totalMessages
    ? Math.round(
        result.results.reduce((sum, item) => sum + (item.confidence ?? 0), 0) / totalMessages
      )
    : 0

  const riskScore = totalMessages
    ? Math.min(
        100,
        Math.round((manipulativeCount / totalMessages) * 70 + (averageConfidence * 0.3))
      )
    : 0

  const riskTier = riskScore >= 75
    ? {
        label: "Critical",
        tone: "from-rose-500/20 to-orange-500/10 text-rose-200",
        ring: "ring-rose-400/40",
        hint: "Multiple manipulative patterns are present. Review the conversation carefully."
      }
    : riskScore >= 45
      ? {
          label: "Elevated",
          tone: "from-amber-500/20 to-orange-500/10 text-amber-200",
          ring: "ring-amber-400/40",
          hint: "There are notable pressure tactics. Context matters, but caution is warranted."
        }
      : {
          label: "Low",
          tone: "from-emerald-500/20 to-cyan-500/10 text-emerald-200",
          ring: "ring-emerald-400/40",
          hint: "The conversation appears mostly neutral, with limited manipulative signal."
        }

  const topLabel = summaryEntries.length
    ? [...summaryEntries].sort((a, b) => b[1] - a[1])[0]
    : null

  const summaryChartData = summaryEntries.map(([label, value]) => ({
    name: label,
    value
  }))

  const summaryTotal = summaryChartData.reduce((sum, item) => sum + item.value, 0)
  const summaryChartColors = {
    Normal: "#38bdf8",
    "Gaslighting": "#c084fc",
    "Guilt Tripping": "#f59e0b",
    "Emotional Blackmail": "#fb7185",
    "Love Bombing": "#8b5cf6"
  }

  const ringSize = 196
  const ringStroke = 14
  const ringRadius = (ringSize - ringStroke) / 2
  const ringCircumference = 2 * Math.PI * ringRadius
  const ringOffset = ringCircumference * (1 - riskScore / 100)

  const isSummaryLoading = loading && !result

  const aiInsightPattern = topLabel ? formatLabel(topLabel[0]) : "Awaiting analysis"
  const aiInsightRiskLevel = riskScore >= 75
    ? "High"
    : riskScore >= 45
      ? "Moderate"
      : "Low"
  const aiInsightSummary = topLabel?.[0] === "Gaslighting"
    ? "Several messages attempt to distort perception and induce self-doubt."
    : topLabel
      ? `Several messages indicate ${formatLabel(topLabel[0]).toLowerCase()} patterns and warrant closer review.`
      : "Upload a conversation to generate an AI insight summary."

  const getRecommendation = () => {

  if (!topLabel) {
    return "Upload a conversation to receive AI-powered recommendations."
  }

  switch (topLabel[0]) {

    case "Gaslighting":
      return "This conversation contains signs of gaslighting. Consider verifying facts independently and documenting important discussions to avoid confusion."

    case "Emotional Blackmail":
      return "This conversation contains emotional pressure tactics. Be cautious of guilt-based requests and maintain healthy personal boundaries."

    case "Love Bombing":
      return "The conversation shows excessive idealization. Evaluate whether actions consistently match words over time before making important decisions."

    case "Guilt Tripping":
      return "The conversation contains guilt-inducing language. Be aware of attempts to make you responsible for another person's emotions."

    default:
      return "No major manipulation patterns detected. The conversation appears generally healthy and neutral."
  }
}
  const labelPalette = {
    Normal: "from-sky-500/20 to-cyan-500/10 text-sky-200 border-sky-400/20",
    "Gaslighting": "from-fuchsia-500/20 to-violet-500/10 text-fuchsia-200 border-fuchsia-400/20",
    "Guilt Tripping": "from-amber-500/20 to-orange-500/10 text-amber-200 border-amber-400/20",
    "Emotional Blackmail": "from-rose-500/20 to-pink-500/10 text-rose-200 border-rose-400/20",
    "Love Bombing": "from-indigo-500/20 to-purple-500/10 text-indigo-200 border-indigo-400/20"
  }

  const resultThemes = {
    Normal: {
      emoji: "🟢",
      badge: "border-emerald-400/20 bg-emerald-500/10 text-emerald-100",
      card: "border-emerald-400/15 shadow-[0_0_0_1px_rgba(52,211,153,0.08),0_24px_70px_rgba(16,185,129,0.08)]",
      confidenceWrap: "border-emerald-400/15 bg-[linear-gradient(180deg,rgba(16,185,129,0.12),rgba(255,255,255,0.04))]",
      confidenceBar: "from-emerald-400 via-cyan-400 to-sky-400",
      glow: "rgba(16, 185, 129, 0.22)"
    },
    Gaslighting: {
      emoji: "🟣",
      badge: "border-fuchsia-400/20 bg-fuchsia-500/10 text-fuchsia-100",
      card: "border-fuchsia-400/15 shadow-[0_0_0_1px_rgba(217,70,239,0.08),0_24px_70px_rgba(168,85,247,0.14)]",
      confidenceWrap: "border-fuchsia-400/15 bg-[linear-gradient(180deg,rgba(168,85,247,0.14),rgba(255,255,255,0.04))]",
      confidenceBar: "from-fuchsia-400 via-violet-500 to-indigo-400",
      glow: "rgba(168, 85, 247, 0.28)"
    },
    "Emotional Blackmail": {
      emoji: "🔴",
      badge: "border-rose-400/20 bg-rose-500/10 text-rose-100",
      card: "border-rose-400/15 shadow-[0_0_0_1px_rgba(251,113,133,0.08),0_24px_70px_rgba(251,113,133,0.14)]",
      confidenceWrap: "border-rose-400/15 bg-[linear-gradient(180deg,rgba(251,113,133,0.14),rgba(255,255,255,0.04))]",
      confidenceBar: "from-rose-400 via-pink-500 to-fuchsia-400",
      glow: "rgba(251, 113, 133, 0.28)"
    },
    "Love Bombing": {
      emoji: "🩷",
      badge: "border-pink-400/20 bg-pink-500/10 text-pink-100",
      card: "border-pink-400/15 shadow-[0_0_0_1px_rgba(244,114,182,0.08),0_24px_70px_rgba(244,114,182,0.14)]",
      confidenceWrap: "border-pink-400/15 bg-[linear-gradient(180deg,rgba(244,114,182,0.14),rgba(255,255,255,0.04))]",
      confidenceBar: "from-pink-400 via-fuchsia-500 to-violet-400",
      glow: "rgba(244, 114, 182, 0.28)"
    },
    "Guilt Tripping": {
      emoji: "🟠",
      badge: "border-amber-400/20 bg-amber-500/10 text-amber-100",
      card: "border-amber-400/15 shadow-[0_0_0_1px_rgba(251,191,36,0.08),0_24px_70px_rgba(251,191,36,0.12)]",
      confidenceWrap: "border-amber-400/15 bg-[linear-gradient(180deg,rgba(251,191,36,0.14),rgba(255,255,255,0.04))]",
      confidenceBar: "from-amber-400 via-orange-500 to-rose-400",
      glow: "rgba(251, 191, 36, 0.26)"
    }
  }

  const pageVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05
      }
    }
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  }

  const analyzeChat = async () => {

  if (!chat.trim()) {
  setErrorMessage("Please enter at least one message to analyze.")
  return
}
  setErrorMessage("")
  setLoading(true)
    setLoadingMessage("🧠 Detecting manipulation patterns...")
    const stage1 = setTimeout(() =>{
      setLoadingMessage("📊 Calculating risk score...")
    }, 800)
    const stage2 = setTimeout(() => {
      setLoadingMessage("🤖 Generating AI insights...")
    }, 1600)
    const stage3 = setTimeout(() => {
      setLoadingMessage("⚡ Finalizing AI analysis...")
    }, 2400)
    try {

      const messages = chat
        .split("\n")
        .filter(msg => msg.trim())
      
      const startTime = Date.now()

const response = await API.post(
  "/analyze-chat",
  {
    messages
  }
)

const elapsed = Date.now() - startTime

if (elapsed < 2000) {
  await new Promise(resolve =>
    setTimeout(resolve, 2000 - elapsed)
  )
}

      const analysisResult = response.data

setResult(analysisResult)

const totalMessages = analysisResult.results.length

const normalCount =
  analysisResult.summary.Normal || 0

const manipulativeCount =
  totalMessages - normalCount

const averageConfidence = Math.round(
  analysisResult.results.reduce(
    (sum, item) => sum + item.confidence,
    0
  ) / totalMessages
)

const calculatedRiskScore = Math.min(
  100,
  Math.round(
    (manipulativeCount / totalMessages) * 70 +
    averageConfidence * 0.3
  )
)

const newAnalysis = {
  id: Date.now(),
  date: new Date().toLocaleString(),
  chat,
  result: analysisResult,
  riskScore: calculatedRiskScore
}

const updatedHistory = [
  newAnalysis,
  ...history
].slice(0, 5)

setHistory(updatedHistory)

localStorage.setItem(
  "analysisHistory",
  JSON.stringify(updatedHistory)
)
    } catch (error) {
      console.error(error)
      setErrorMessage(
        "Connection lost. Please ensure the AI backend is running."
      )
    } finally {
      clearTimeout(stage1)
      clearTimeout(stage2)
      clearTimeout(stage3)
      setLoading(false)
      setLoadingMessage("")

    }
  }

  return (
    <motion.div
      className={shellClass}
      initial="hidden"
      animate="show"
      variants={pageVariants}
    >

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="mesh-gradient absolute inset-0" />

        <motion.div
          className="floating-blob blob-one"
          animate={{ x: [0, 30, -12, 0], y: [0, -24, 16, 0], scale: [1, 1.08, 0.96, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="floating-blob blob-two"
          animate={{ x: [0, -20, 18, 0], y: [0, 18, -14, 0], scale: [1, 0.94, 1.05, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: -4 }}
        />

        <motion.div
          className="floating-blob blob-three"
          animate={{ x: [0, 16, -18, 0], y: [0, -16, 20, 0], scale: [1, 1.06, 0.98, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: -8 }}
        />

        {particleField.map((particle, index) => (
          <span
            key={`${particle.top}-${particle.left}-${index}`}
            className="particle-float absolute rounded-full blur-[1px]"
            style={{
              top: particle.top,
              left: particle.left,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animationDuration: particle.duration,
              animationDelay: particle.delay,
              ["--dx"]: particle.dx,
              ["--dy"]: particle.dy,
              background: `radial-gradient(circle, ${particle.glow} 0%, rgba(255, 255, 255, 0.18) 48%, rgba(255, 255, 255, 0) 72%)`,
              boxShadow: `0 0 18px ${particle.glow}, 0 0 42px ${particle.glow}`
            }}
          />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.22),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.16),_transparent_28%),radial-gradient(circle_at_bottom,_rgba(236,72,153,0.12),_transparent_24%)]" />

      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:72px_72px]" />

      <motion.div className="relative mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-8" variants={pageVariants}>

        <motion.header className={headerClass} variants={fadeUp}>

          <div className="max-w-3xl">
            <div className={pillClass}>
              AI Conversation Intelligence
            </div>

            <h1 className={heroTitleClass}>
              Premium manipulation analysis in a dark glass dashboard.
            </h1>

            <p className={`mt-4 max-w-2xl ${bodyCopyClass}`}>
              Paste a chat thread, run the model, and review the risk score, label distribution, and per-message findings in one view.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:min-w-[34rem]">
            <div className="metric-card">
              <span>Messages</span>
              <strong><AnimatedNumber value={totalMessages} /></strong>
            </div>
            <div className="metric-card">
              <span>Risk</span>
              <strong><AnimatedNumber value={riskScore} />%</strong>
            </div>
            <div className="metric-card">
              <span>Manipulative</span>
              <strong><AnimatedNumber value={manipulativeCount} /></strong>
            </div>
            <div className="metric-card">
              <span>Normal</span>
              <strong><AnimatedNumber value={normalCount} /></strong>
            </div>
          </div>
        </motion.header>

        <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <motion.div className={panelClass} variants={fadeUp}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className={sectionTitleClass}>Chat input</h2>
                <p className={`mt-2 ${mutedCopyClass}`}>Enter one message per line for best analysis fidelity.</p>
              </div>

              <div className={pillClass}>
                Glassmorphism UI
              </div>
            </div>

            <textarea
              value={chat}
              onChange={(e) => setChat(e.target.value)}
              className={inputClass}
              placeholder={`Example:\nI'm worried you misunderstood me.\nYou always do this to me.\nI just care about you so much.`}
            />
            <div className={`mt-3 flex justify-between text-sm ${isLight ? "text-slate-600" : "text-slate-400"}`}>
              <span>{chat.length} characters</span>

              <span>
                {
                chat
                .split("\n")
                .filter(msg => msg.trim()).length
                } messages
              </span>
            </div>
            <div className="mt-4 flex gap-3">
              <button
                onClick={loadDemoConversation}
                className={smallButtonClass}
              >
                🎭 Demo Conversation
              </button>
              <button
                onClick={() => {
                  setChat("")
                  setResult(null)
                }}
                className={smallButtonClass}
              >
                🧹Clear
              </button>
              <button
  onClick={() => fileInputRef.current.click()}
  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition"
>
  📄 Upload TXT
</button>

<input
  type="file"
  accept=".txt"
  ref={fileInputRef}
  onChange={handleFileUpload}
  className="hidden"
/>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {Object.entries(quickPrompts).map(([label, text]) => (
                <button
                 key={label}
                 onClick={() => setChat(text)}
                 className={isLight ? "rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-xs text-slate-800 transition hover:bg-white hover:border-slate-300" : "rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white transition hover:bg-white/10"}
                >
                  {label}
                  </button>
              ))}
              </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <motion.button
                onClick={analyzeChat}
                className="inline-flex flex-1 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-500 px-5 py-4 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(168,85,247,0.28)] transition hover:scale-[1.01] hover:shadow-[0_24px_50px_rgba(168,85,247,0.35)] disabled:cursor-not-allowed disabled:opacity-60"
                disabled={loading}
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
              >
                {loading ? loadingMessage : "Run AI Analysis"}
              </motion.button>

              <div className={isLight ? "flex flex-1 items-center justify-between rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-4 text-sm text-slate-700" : "flex flex-1 items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-300"}>
                <span>Input format</span>
                <span className={isLight ? "font-medium text-purple-700" : "font-medium text-purple-100"}>One message per line</span>
              </div>
            </div>
            {errorMessage && (
  <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-200">
    ⚠️ {errorMessage}
  </div>
)}
            <div className={isLight ? "mt-6 rounded-[1.5rem] border border-slate-200/80 bg-white/80 p-5 shadow-[0_14px_40px_rgba(15,23,42,0.06)]" : "mt-6 rounded-[1.5rem] border border-white/10 bg-white/5 p-5"}>
            <h3 className={isLight ? "text-sm font-semibold uppercase tracking-[0.2em] text-purple-700" : "text-sm font-semibold uppercase tracking-[0.2em] text-purple-200"}>
              Supported Detection Types
            </h3>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {detectionTypes.map((type) => (
                <div
                key={type}
                className={isLight ? "rounded-2xl border border-slate-200/80 bg-white/90 px-5 py-4 text-base font-medium text-slate-800 backdrop-blur-xl transition hover:bg-white hover:scale-[1.02] shadow-[0_10px_30px_rgba(15,23,42,0.05)]" : "rounded-2xl border border-purple-400/15 bg-white/5 px-5 py-4 text-base font-medium text-slate-100 backdrop-blur-xl transition hover:bg-white/10 hover:scale-[1.02]"}
              >
                ✓ {type}
              </div>
            ))}
          </div>
        </div>
          </motion.div>

          <div className="grid gap-6">
            <motion.div className={panelClass} variants={fadeUp}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className={isLight ? "text-sm uppercase tracking-[0.28em] text-purple-700/80" : "text-sm uppercase tracking-[0.28em] text-purple-200/80"}>Risk score</p>
                  <h2 className={sectionTitleClass}>Conversation threat level</h2>
                </div>
                <div className={`rounded-full border px-4 py-2 text-sm font-semibold ${riskTier.ring} bg-gradient-to-br ${riskTier.tone}`}>
                  {riskTier.label}
                </div>
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-[auto_1fr] lg:items-center">
                <div className="relative mx-auto flex items-center justify-center">
                  <div className="absolute h-[15.5rem] w-[15.5rem] rounded-full bg-[radial-gradient(circle,_rgba(168,85,247,0.28)_0%,_rgba(34,211,238,0.14)_45%,_transparent_72%)] blur-2xl" />

                  <motion.svg
                    key={riskScore}
                    viewBox={`0 0 ${ringSize} ${ringSize}`}
                    className="relative h-52 w-52 sm:h-56 sm:w-56"
                    initial={{ rotate: -90 }}
                    animate={{ rotate: -90 }}
                  >
                    <defs>
                      <linearGradient id="riskRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#a855f7" />
                        <stop offset="48%" stopColor="#22d3ee" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>

                      <filter id="riskRingGlow" x="-40%" y="-40%" width="180%" height="180%">
                        <feGaussianBlur stdDeviation="8" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    <circle
                      cx={ringSize / 2}
                      cy={ringSize / 2}
                      r={ringRadius}
                      fill="none"
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth={ringStroke}
                    />

                    <motion.circle
                      cx={ringSize / 2}
                      cy={ringSize / 2}
                      r={ringRadius}
                      fill="none"
                      stroke="url(#riskRingGradient)"
                      strokeWidth={ringStroke}
                      strokeLinecap="round"
                      strokeDasharray={ringCircumference}
                      strokeDashoffset={ringCircumference}
                      filter="url(#riskRingGlow)"
                      style={{ transformOrigin: "50% 50%" }}
                      animate={{ strokeDashoffset: ringOffset }}
                      transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
                    />

                    <circle
                      cx={ringSize / 2}
                      cy={ringSize / 2}
                      r={ringRadius - 19}
                      fill="rgba(9, 11, 22, 0.82)"
                      stroke="rgba(255,255,255,0.08)"
                    />
                  </motion.svg>

                  <div className="absolute text-center">
                    <motion.div
                      key={`${riskScore}-center`}
                      initial={{ opacity: 0, scale: 0.88 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className={isLight ? "text-5xl font-semibold tracking-tight text-slate-950 drop-shadow-[0_0_18px_rgba(168,85,247,0.35)] sm:text-6xl" : "text-5xl font-semibold tracking-tight text-white drop-shadow-[0_0_18px_rgba(168,85,247,0.5)] sm:text-6xl"}>
                        <AnimatedNumber value={riskScore} />
                      </div>
                      <div className={isLight ? "mt-1 text-[11px] uppercase tracking-[0.3em] text-slate-600" : "mt-1 text-[11px] uppercase tracking-[0.3em] text-slate-400"}>
                        Risk Score
                      </div>
                    </motion.div>
                  </div>
                </div>

                <div className="flex h-full flex-col justify-center">
                  <p className={bodyCopyClass}>
                    {riskTier.hint}
                  </p>

                  <div className={`mt-5 grid grid-cols-2 gap-3 text-sm ${isLight ? "text-slate-700" : "text-slate-300"}`}>
                    <div className={softCardClass}>
                      <span className={isLight ? "block text-slate-600" : "block text-slate-500"}>Top pattern</span>
                      <strong className={isLight ? "mt-1 block text-slate-950" : "mt-1 block text-white"}>{topLabel ? formatLabel(topLabel[0]) : "No pattern yet"}</strong>
                    </div>
                    <div className={softCardClass}>
                      <span className={isLight ? "block text-slate-600" : "block text-slate-500"}>Average confidence</span>
                      <strong className={isLight ? "mt-1 block text-slate-950" : "mt-1 block text-white"}>{averageConfidence}%</strong>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div className={panelClass} variants={fadeUp}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className={isLight ? "text-sm uppercase tracking-[0.28em] text-purple-700/80" : "text-sm uppercase tracking-[0.28em] text-purple-200/80"}>AI Insight</p>
                  <h2 className={sectionTitleClass}>Model summary</h2>
                </div>
                <div className={pillClass}>
                  Live from response data
                </div>
              </div>

              <div className={isLight ? "mt-6 rounded-[1.75rem] border border-purple-400/15 bg-[linear-gradient(180deg,rgba(168,85,247,0.08),rgba(255,255,255,0.82))] p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)]" : "mt-6 rounded-[1.75rem] border border-purple-400/15 bg-[linear-gradient(180deg,rgba(168,85,247,0.12),rgba(255,255,255,0.04))] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.22)]"}>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className={insightCardClass}>
                    <span className={isLight ? "block text-[11px] uppercase tracking-[0.24em] text-slate-600" : "block text-[11px] uppercase tracking-[0.24em] text-slate-400"}>Most detected pattern:</span>
                    <p className={isLight ? "mt-2 text-xl font-semibold text-slate-950" : "mt-2 text-xl font-semibold text-white"}>{aiInsightPattern}</p>
                  </div>

                  <div className={insightCardClass}>
                    <span className={isLight ? "block text-[11px] uppercase tracking-[0.24em] text-slate-600" : "block text-[11px] uppercase tracking-[0.24em] text-slate-400"}>Risk Level:</span>
                    <p className={isLight ? "mt-2 text-xl font-semibold text-slate-950" : "mt-2 text-xl font-semibold text-white"}>{aiInsightRiskLevel}</p>
                  </div>

                  <div className={insightCardClass}>
                    <span className={isLight ? "block text-[11px] uppercase tracking-[0.24em] text-slate-600" : "block text-[11px] uppercase tracking-[0.24em] text-slate-400"}>Summary:</span>
                    <p className={isLight ? "mt-2 text-sm leading-7 text-slate-700" : "mt-2 text-sm leading-7 text-slate-200"}>
                      {aiInsightSummary}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className={insightCardClass}>
                    <span className={isLight ? "block text-[11px] uppercase tracking-[0.24em] text-slate-600" : "block text-[11px] uppercase tracking-[0.24em] text-slate-400"}>Manipulative messages</span>
                    <p className={isLight ? "mt-2 text-3xl font-semibold text-slate-950" : "mt-2 text-3xl font-semibold text-white"}><AnimatedNumber value={manipulativeCount} /></p>
                  </div>
                  <div className={insightCardClass}>
                    <span className={isLight ? "block text-[11px] uppercase tracking-[0.24em] text-slate-600" : "block text-[11px] uppercase tracking-[0.24em] text-slate-400"}>Neutral messages</span>
                    <p className={isLight ? "mt-2 text-3xl font-semibold text-slate-950" : "mt-2 text-3xl font-semibold text-white"}><AnimatedNumber value={normalCount} /></p>
                  </div>
                </div>
                <div className={isLight ? "mt-5 rounded-[1.5rem] border border-cyan-400/20 bg-cyan-500/8 p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)]" : "mt-5 rounded-[1.5rem] border border-cyan-400/20 bg-cyan-500/5 p-5"}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🤖</span>
                </div>
                <h3 className={isLight ? "font-semibold text-cyan-800" : "font-semibold text-cyan-200"}>
                  AI Recommendation
                </h3>
                <p className={isLight ? "mt-2 text-sm leading-7 text-slate-700" : "mt-2 text-sm leading-7 text-slate-300"}>
                  {getRecommendation()}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        {/* Recent Analyses */}

<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
>
  <h2 className="text-2xl font-bold text-white">
    🕒 Recent Analyses
  </h2>

  <p className="mt-2 text-slate-400">
    Click any previous analysis to reopen it.
  </p>

  <div className="mt-6 space-y-4">

    {history.length === 0 ? (

      <p className="text-slate-500">
        No previous analyses yet.
      </p>

    ) : (

      history.map((item) => (

        <div
          key={item.id}
          onClick={() => {
            setChat(item.chat)
            setResult(item.result)
          }}
          className="cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-cyan-400 hover:bg-white/10"
        >
          <div className="flex items-center justify-between">

            <div>
              <p className="font-semibold text-white">
                Risk Score: {item.riskScore}%
              </p>

              <p className="text-sm text-slate-400">
                {item.date}
              </p>
            </div>

            <p className="text-cyan-300 text-sm">
              {item.result.results.length} messages
            </p>

            <button
  onClick={(e) => {
  e.stopPropagation()

  if (window.confirm("Delete this analysis?")) {
    deleteHistoryItem(item.id)
  }
}}
  className="rounded-lg px-3 py-1 text-sm text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
>
  🗑 Delete
</button>

          </div>
        </div>

      ))

    )}

  </div>
</motion.div>
        {result ? (
          <motion.section className={panelClass} variants={fadeUp}>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className={isLight ? "text-sm uppercase tracking-[0.28em] text-purple-700/80" : "text-sm uppercase tracking-[0.28em] text-purple-200/80"}>Summary chart</p>
                <h2 className={sectionTitleClass}>Conversation distribution</h2>
              </div>
              <p className={isLight ? "max-w-2xl text-sm leading-7 text-slate-600" : "max-w-2xl text-sm leading-7 text-slate-400"}>
                A donut chart showing how the model distributed the conversation across the detected patterns.
              </p>
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr] xl:items-center">
              <motion.div
                className={chartPanelClass}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.08),transparent_28%)]" />

                <div className="relative h-[22rem] sm:h-[24rem]">
                  {isSummaryLoading ? (
                    <div className="flex h-full items-center justify-center">
                      <div className="flex flex-col items-center gap-5">
                        <div className={isLight ? "relative h-36 w-36 rounded-full border border-slate-200/80 bg-white/80 shadow-[0_0_30px_rgba(168,85,247,0.12)]" : "relative h-36 w-36 rounded-full border border-white/10 bg-white/[0.04] shadow-[0_0_30px_rgba(168,85,247,0.22)]"}>
                          <div className="absolute inset-4 rounded-full border border-dashed border-purple-300/30 animate-spin [animation-duration:3.5s]" />
                          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.16),transparent_60%)] animate-pulse" />
                        </div>
                        <div className="text-center">
                          <p className={isLight ? "text-sm uppercase tracking-[0.28em] text-purple-700/70" : "text-sm uppercase tracking-[0.28em] text-purple-200/70"}>Loading chart</p>
                          <p className={isLight ? "mt-2 text-sm text-slate-600" : "mt-2 text-sm text-slate-400"}>Preparing summary distribution...</p>
                        </div>
                      </div>
                    </div>
                  ) : summaryTotal > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <defs>
                          <filter id="summaryGlow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="6" result="blur" />
                            <feMerge>
                              <feMergeNode in="blur" />
                              <feMergeNode in="SourceGraphic" />
                            </feMerge>
                          </filter>
                        </defs>

                        <Tooltip
                          cursor={false}
                          formatter={(value, name) => [value, formatLabel(name)]}
                          contentStyle={{
                            background: isLight ? "rgba(255,255,255,0.95)" : "rgba(8, 10, 22, 0.92)",
                            border: isLight ? "1px solid rgba(148,163,184,0.25)" : "1px solid rgba(255,255,255,0.12)",
                            borderRadius: "16px",
                            color: isLight ? "#0f172a" : "#fff",
                            boxShadow: isLight ? "0 20px 60px rgba(15,23,42,0.12)" : "0 20px 60px rgba(0,0,0,0.35)"
                          }}
                          labelStyle={{ color: isLight ? "#334155" : "#cbd5e1" }}
                          itemStyle={{ color: isLight ? "#0f172a" : "#fff" }}
                        />

                        <Pie
                          data={summaryChartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={86}
                          outerRadius={130}
                          paddingAngle={4}
                          dataKey="value"
                          isAnimationActive
                          animationBegin={100}
                          animationDuration={1200}
                          cornerRadius={12}
                        >
                          {summaryChartData.map((entry) => (
                            <Cell
                              key={entry.name}
                              fill={summaryChartColors[entry.name] ?? "#a855f7"}
                              stroke="rgba(255,255,255,0.08)"
                              strokeWidth={1}
                              filter="url(#summaryGlow)"
                            />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <div className="max-w-sm text-center">
                        <div className="mx-auto mb-5 h-24 w-24 rounded-full border border-white/10 bg-white/[0.04] shadow-[0_0_30px_rgba(168,85,247,0.18)]" />
                        <p className="text-sm uppercase tracking-[0.28em] text-purple-200/70">No summary yet</p>
                        <p className="mt-2 text-sm leading-7 text-slate-400">Run the analysis to populate the donut chart from `result.summary`.</p>
                      </div>
                    </div>
                  )}

                  {summaryTotal > 0 && (
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className={isLight ? "text-4xl font-semibold text-slate-950 drop-shadow-[0_0_18px_rgba(168,85,247,0.25)] sm:text-5xl" : "text-4xl font-semibold text-white drop-shadow-[0_0_18px_rgba(168,85,247,0.45)] sm:text-5xl"}>
                          {summaryTotal}
                        </div>
                        <div className={isLight ? "mt-2 text-[11px] uppercase tracking-[0.28em] text-slate-600" : "mt-2 text-[11px] uppercase tracking-[0.28em] text-slate-400"}>
                          total segments
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.div
                className="grid gap-3"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: 0.1 }}
              >
                {summaryEntries.map(([label, count], index) => (
                  <motion.div
                    key={label}
                    className={isLight ? `rounded-[1.4rem] border bg-gradient-to-br p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl ${labelPalette[label] ?? "from-white to-slate-50 text-slate-900 border-slate-200/80"}` : `rounded-[1.4rem] border bg-gradient-to-br p-4 shadow-[0_18px_50px_rgba(0,0,0,0.18)] backdrop-blur-xl ${labelPalette[label] ?? "from-white/10 to-white/[0.03] text-white border-white/10"}`}
                    initial={{ opacity: 0, x: 18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.45, delay: index * 0.05 }}
                    whileHover={{ x: 4, scale: 1.01 }}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs uppercase tracking-[0.24em] opacity-70">{formatLabel(label)}</span>
                      <span className={isLight ? "text-lg font-semibold text-slate-950" : "text-lg font-semibold text-white"}>{count}</span>
                    </div>
                    <div className={isLight ? "mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200" : "mt-3 h-1.5 overflow-hidden rounded-full bg-white/10"}>
                      <div
                        className={isLight ? "h-full rounded-full bg-slate-900 transition-all duration-700" : "h-full rounded-full bg-white/90 transition-all duration-700"}
                        style={{ width: `${summaryTotal ? (count / summaryTotal) * 100 : 0}%` }}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <div className="mt-8 grid gap-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className={isLight ? "text-sm uppercase tracking-[0.28em] text-purple-700/80" : "text-sm uppercase tracking-[0.28em] text-purple-200/80"}>Message analysis cards</p>
                  <h2 className={sectionTitleClass}>Per-message review</h2>
                </div>
              <div className="flex items-center gap-3">
                <button
                onClick={copyResults}
                className={smallButtonClass}
                >
                  📋 Copy Results
                </button>
                <button
                onClick={downloadReport}
                className={smallButtonClass}
                >
                  📄 Download Report
                </button>

                <div className={pillClass}>
                {totalMessages} items
                </div>
              </div>
            </div>

              <div className="grid gap-4">
                {result.results.map((item, index) => {
                  const isManipulative = item.prediction !== "Normal"
                  const riskWidth = Math.max(Math.min(item.confidence ?? 0, 100), 0)
                  const theme = resultThemes[item.prediction] ?? resultThemes.Normal

                  return (
                    <motion.article
                      key={`${item.message}-${index}`}
                      className={isLight ? `group rounded-[1.75rem] border bg-white/80 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl transition hover:bg-white ${theme.card}` : `group rounded-[1.75rem] border bg-white/[0.04] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl transition hover:bg-white/[0.06] ${theme.card}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.45, delay: index * 0.03 }}
                      whileHover={{ y: -3, scale: 1.01 }}
                      style={{ boxShadow: `0 0 0 1px ${theme.glow}, 0 24px 70px rgba(0,0,0,0.24), 0 0 42px ${theme.glow}` }}
                    >
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="max-w-4xl">
                          <div className="flex flex-wrap items-center gap-3">
                            <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] ${theme.badge}`}>
                              {theme.emoji} {formatLabel(item.prediction)}
                            </span>
                            <span className="text-xs uppercase tracking-[0.22em] text-slate-500">Message {index + 1}</span>
                          </div>

                          <p className={isLight ? "mt-4 text-lg leading-8 text-slate-800" : "mt-4 text-lg leading-8 text-white/90"}>
                            {item.message}
                          </p>
                        </div>

                        <div className={`min-w-[12rem] rounded-[1.5rem] border p-4 ${theme.confidenceWrap}`}>
                          <div className={isLight ? "flex items-center justify-between text-sm text-slate-600" : "flex items-center justify-between text-sm text-slate-400"}>
                            <span>Confidence</span>
                            <strong className={isLight ? "text-slate-950" : "text-white"}>{riskWidth}%</strong>
                          </div>
                          <div className="mt-3 space-y-2">
                            <div className={isLight ? "h-3 overflow-hidden rounded-full bg-slate-200 ring-1 ring-slate-300/80" : "h-3 overflow-hidden rounded-full bg-white/8 ring-1 ring-white/10"}>
                              <motion.div
                                className={`h-full rounded-full bg-gradient-to-r ${theme.confidenceBar}`}
                                initial={{ width: 0 }}
                                whileInView={{ width: `${riskWidth}%` }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: index * 0.03 }}
                                style={{ boxShadow: `0 0 18px ${theme.glow}` }}
                              />
                            </div>
                            <div className={isLight ? "font-mono text-[11px] uppercase tracking-[0.28em] text-slate-600" : "font-mono text-[11px] uppercase tracking-[0.28em] text-slate-300"}>
                              {"██████████░░░░"} {riskWidth}%
                            </div>
                          </div>
                          <p className={isLight ? "mt-4 text-xs uppercase tracking-[0.24em] text-slate-600" : "mt-4 text-xs uppercase tracking-[0.24em] text-slate-500"}>
                            {isManipulative ? "Manipulative pattern" : "Neutral pattern"}
                          </p>
                        </div>
                      </div>
                    </motion.article>
                  )
                })}
              </div>
            </div>
          </motion.section>
        ) : (
          <motion.section className={panelClass} variants={fadeUp}>
            <div className="text-center">
  <h2 className={isLight ? "text-3xl font-semibold text-slate-950" : "text-3xl font-semibold text-white"}>
    How Manipulens Works
  </h2>

  <p className={isLight ? "mt-3 text-slate-600" : "mt-3 text-slate-400"}>
    Analyze conversations in four simple steps
  </p>

  <div className="mt-8 flex flex-col items-center justify-center gap-4 md:flex-row">

    <div className={softCardClass}>
      <div className="text-4xl">📝</div>
      <h3 className={isLight ? "mt-3 font-semibold text-slate-950" : "mt-3 font-semibold text-white"}>
        Paste Conversation
      </h3>
      <p className={isLight ? "mt-2 text-sm text-slate-600" : "mt-2 text-sm text-slate-400"}>
        Enter messages one per line.
      </p>
    </div>
    <div className="hidden md:block text-5xl font-light text-cyan-400 animate-pulse">
      ⟶
    </div>

    <div className={softCardClass}>
      <div className="text-4xl">🤖</div>
      <h3 className={isLight ? "mt-3 font-semibold text-slate-950" : "mt-3 font-semibold text-white"}>
        Run AI Analysis
      </h3>
      <p className={isLight ? "mt-2 text-sm text-slate-600" : "mt-2 text-sm text-slate-400"}>
        Detect manipulation patterns.
      </p>
    </div>
    <div className="hidden md:block text-5xl font-light text-cyan-400 animate-pulse">
      ⟶
    </div>

    <div className={softCardClass}>
      <div className="text-4xl">📊</div>
      <h3 className={isLight ? "mt-3 font-semibold text-slate-950" : "mt-3 font-semibold text-white"}>
        Review Results
      </h3>
      <p className={isLight ? "mt-2 text-sm text-slate-600" : "mt-2 text-sm text-slate-400"}>
        View risk score and insights.
      </p>
    </div>
    <div className="hidden md:block text-5xl font-light text-cyan-400 animate-pulse">
      ⟶
    </div>

    <div className={softCardClass}>
      <div className="text-4xl">📄</div>
      <h3 className={isLight ? "mt-3 font-semibold text-slate-950" : "mt-3 font-semibold text-white"}>
        Export Report
      </h3>
      <p className={isLight ? "mt-2 text-sm text-slate-600" : "mt-2 text-sm text-slate-400"}>
        Download a professional PDF.
      </p>
    </div>

  </div>
</div>
          </motion.section>
        )}

      </motion.div>
    <footer className={footerClass}>

  <div className="mx-auto max-w-3xl">

    <h2 className={footerTitleClass}>
      Manipulens AI
    </h2>

    <p className={footerLeadClass}>
      Turning Conversations Into Insights
    </p>

    <p className={footerBodyClass}>
      Detect manipulation patterns, uncover hidden intent, and gain a deeper
      understanding of digital conversations through AI-powered analysis.
    </p>

    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">

      <span className={footerTagClass}>
        🟣 Gaslighting
      </span>

      <span className={isLight ? "rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm text-rose-700" : "rounded-full border border-rose-400/20 bg-rose-500/10 px-4 py-2 text-sm text-rose-200"}>
        🔴 Emotional Blackmail
      </span>

      <span className={isLight ? "rounded-full border border-pink-200 bg-pink-50 px-4 py-2 text-sm text-pink-700" : "rounded-full border border-pink-400/20 bg-pink-500/10 px-4 py-2 text-sm text-pink-200"}>
        🩷 Love Bombing
      </span>

      <span className={isLight ? "rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-700" : "rounded-full border border-amber-400/20 bg-amber-500/10 px-4 py-2 text-sm text-amber-200"}>
        🟠 Guilt Tripping
      </span>

    </div>

    <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

    <p className={isLight ? "mt-6 text-sm tracking-widest text-slate-600 uppercase" : "mt-6 text-sm tracking-widest text-slate-500 uppercase"}>
      AI-Powered Conversation Intelligence
    </p>

    <p className={isLight ? "mt-3 text-slate-600" : "mt-3 text-slate-500"}>
      © 2026 Manipulens AI • All Rights Reserved
    </p>

  </div>

</footer>
    </motion.div>
  )
}

export default Analyzer