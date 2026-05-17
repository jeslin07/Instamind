import { motion } from "framer-motion";
import { BarChart2, Clock, TrendingUp, Zap } from "lucide-react";
import Layout from "../components/Layout";

const glassCard = {
  background: "rgba(0,0,0,0.45)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(225,224,204,0.1)",
  borderRadius: "1.25rem",
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0 },
};

const panels = [
  { icon: Clock,      label: "Peak Usage Time",    accent: "#34d399", desc: "Hours with highest Instagram activity" },
  { icon: Zap,        label: "Mood Correlation",   accent: "#fbbf24", desc: "Mood vs screen time relationship" },
  { icon: TrendingUp, label: "Screen Time Trends", accent: "#818cf8", desc: "Weekly usage pattern over time" },
  { icon: BarChart2,  label: "Productivity Impact",accent: "#38bdf8", desc: "How usage affects your productivity" },
];

export default function Analytics() {
  return (
    <Layout>
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        className="space-y-8"
      >
        {/* Header */}
        <motion.div variants={cardVariant}>
          <p className="text-xs font-medium uppercase tracking-widest mb-1" style={{ color: "rgba(225,224,204,0.4)" }}>
            Insights
          </p>
          <h1 className="text-4xl font-bold" style={{ color: "#E1E0CC" }}>
            Analytics
          </h1>
          <p className="mt-1 text-sm" style={{ color: "rgba(225,224,204,0.5)" }}>
            Deep dive into your Instagram usage patterns.
          </p>
        </motion.div>

        {/* Chart Grid */}
        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4"
        >
          {panels.map(({ icon: Icon, label, accent, desc }) => (
            <motion.div
              key={label}
              variants={cardVariant}
              style={glassCard}
              className="p-6"
            >
              {/* Card Header */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-xl shrink-0"
                  style={{ background: `${accent}22` }}
                >
                  <Icon className="h-4 w-4" style={{ color: accent }} />
                </span>
                <div>
                  <h2 className="text-sm font-semibold" style={{ color: "#E1E0CC" }}>
                    {label}
                  </h2>
                  <p className="text-xs" style={{ color: "rgba(225,224,204,0.4)" }}>
                    {desc}
                  </p>
                </div>
              </div>

              {/* Placeholder Chart Area */}
              <div
                className="h-52 rounded-xl flex flex-col items-center justify-center gap-2"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px dashed rgba(225,224,204,0.1)" }}
              >
                <Icon className="h-8 w-8" style={{ color: `${accent}44` }} />
                <p className="text-xs" style={{ color: "rgba(225,224,204,0.25)" }}>
                  Chart coming soon
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </motion.div>
    </Layout>
  );
}