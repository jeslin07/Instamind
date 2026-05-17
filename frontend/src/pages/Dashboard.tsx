import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart2,
  ClipboardList,
  TrendingUp,
  Award,
  ArrowRight,
  Activity,
} from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../services/api";

interface Stats {
  latest_score: number;
  latest_level: string;
  total_assessments: number;
  average_score: number;
}

const glassCard = {
  background: "rgba(0,0,0,0.45)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(225,224,204,0.1)",
  borderRadius: "1.25rem",
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    latest_score: 0,
    latest_level: "—",
    total_assessments: 0,
    average_score: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    api
      .get("dashboard/", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => setStats(r.data))
      .catch(console.log);
  }, []);

  const statCards = [
    {
      icon: Award,
      label: "Latest Score",
      value: String(stats.latest_score),
      accent: "#34d399",
      sub: "Your most recent assessment",
    },
    {
      icon: Activity,
      label: "Addiction Level",
      value: stats.latest_level || "—",
      accent: stats.latest_level === "High" ? "#f87171" : stats.latest_level === "Moderate" ? "#fbbf24" : "#34d399",
      sub: "Based on latest result",
    },
    {
      icon: ClipboardList,
      label: "Total Assessments",
      value: String(stats.total_assessments),
      accent: "#818cf8",
      sub: "Completed so far",
    },
    {
      icon: TrendingUp,
      label: "Average Score",
      value: String(stats.average_score),
      accent: "#38bdf8",
      sub: "Across all assessments",
    },
  ];

  return (
    <Layout>
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        className="space-y-8"
      >
        {/* ── Header ── */}
        <motion.div variants={cardVariant}>
          <p className="text-xs font-medium uppercase tracking-widest mb-1" style={{ color: "rgba(225,224,204,0.4)" }}>
            Overview
          </p>
          <h1 className="text-4xl font-bold" style={{ color: "#E1E0CC" }}>
            Dashboard
          </h1>
          <p className="mt-1 text-sm" style={{ color: "rgba(225,224,204,0.5)" }}>
            Your Instagram wellness metrics at a glance.
          </p>
        </motion.div>

        {/* ── Stat Cards ── */}
        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
        >
          {statCards.map(({ icon: Icon, label, value, accent, sub }) => (
            <motion.div
              key={label}
              variants={cardVariant}
              style={glassCard}
              className="p-5 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium" style={{ color: "rgba(225,224,204,0.5)" }}>
                  {label}
                </p>
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-xl"
                  style={{ background: `${accent}22` }}
                >
                  <Icon className="h-4 w-4" style={{ color: accent }} />
                </span>
              </div>
              <p className="text-3xl font-bold" style={{ color: accent }}>
                {value}
              </p>
              <p className="text-xs" style={{ color: "rgba(225,224,204,0.35)" }}>
                {sub}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Quick Actions ── */}
        <motion.div variants={cardVariant}>
          <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: "rgba(225,224,204,0.4)" }}>
            Quick Actions
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { to: "/assessment", icon: ClipboardList, label: "Start Assessment", sub: "Take a new evaluation", accent: "#34d399" },
              { to: "/analytics", icon: BarChart2, label: "View Analytics", sub: "Deep dive into charts", accent: "#818cf8" },
              { to: "/history", icon: TrendingUp, label: "View History", sub: "Past assessment records", accent: "#38bdf8" },
            ].map(({ to, icon: Icon, label, sub, accent }) => (
              <Link
                key={to}
                to={to}
                className="group flex items-center justify-between p-5 transition-all"
                style={glassCard}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.border = `1px solid ${accent}44`)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.border = "1px solid rgba(225,224,204,0.1)")}
              >
                <div className="flex items-center gap-4">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-xl shrink-0"
                    style={{ background: `${accent}22` }}
                  >
                    <Icon className="h-5 w-5" style={{ color: accent }} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#E1E0CC" }}>{label}</p>
                    <p className="text-xs mt-0.5" style={{ color: "rgba(225,224,204,0.4)" }}>{sub}</p>
                  </div>
                </div>
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1 shrink-0"
                  style={{ color: "rgba(225,224,204,0.3)" }}
                />
              </Link>
            ))}
          </div>
        </motion.div>

        {/* ── Wellness Tip ── */}
        <motion.div
          variants={cardVariant}
          className="p-5"
          style={glassCard}
        >
          <div className="flex items-start gap-4">
            <span
              className="flex h-10 w-10 items-center justify-center rounded-xl shrink-0"
              style={{ background: "rgba(251,191,36,0.15)" }}
            >
              <Activity className="h-5 w-5" style={{ color: "#fbbf24" }} />
            </span>
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: "#E1E0CC" }}>
                Digital Wellness Tip
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(225,224,204,0.55)" }}>
                Try setting a daily Instagram time limit of 30 minutes. Reducing screen time by just 20% can significantly improve focus, sleep quality, and overall mental wellbeing.
              </p>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </Layout>
  );
}