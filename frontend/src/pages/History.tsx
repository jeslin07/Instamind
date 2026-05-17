import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Calendar, Award, ChevronUp, ChevronDown, Minus } from "lucide-react";
import Layout from "../components/Layout";
import api from "../services/api";
import ScoreChart from "../components/ScoreChart";

type Assessment = {
  id: number;
  score: number;
  level: string;
  created_at: string;
};

const glassCard = {
  background: "rgba(0,0,0,0.45)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(225,224,204,0.1)",
  borderRadius: "1.25rem",
};

const cardVariant = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

function levelAccent(level: string) {
  if (level.toLowerCase().includes("high")) return "#f87171";
  if (level.toLowerCase().includes("emerging")) return "#fbbf24";
  return "#34d399";
}

export default function History() {
  const [history, setHistory] = useState<Assessment[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    api
      .get("assessment/history/", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => setHistory(r.data))
      .catch(console.log);
  }, []);

  const latest = history[0];
  const previous = history[1];
  const scoreDelta = latest && previous ? latest.score - previous.score : null;

  return (
    <Layout>
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        className="space-y-6"
      >
        {/* Header */}
        <motion.div variants={cardVariant}>
          <p className="text-xs font-medium uppercase tracking-widest mb-1" style={{ color: "rgba(225,224,204,0.4)" }}>
            Records
          </p>
          <h1 className="text-4xl font-bold" style={{ color: "#E1E0CC" }}>
            Assessment History
          </h1>
          <p className="mt-1 text-sm" style={{ color: "rgba(225,224,204,0.5)" }}>
            Track your progress across all assessments.
          </p>
        </motion.div>

        {/* Summary row */}
        {history.length > 0 && (
          <motion.div
            variants={{ show: { transition: { staggerChildren: 0.07 } } }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {[
              {
                icon: Award,
                label: "Latest Score",
                value: String(latest?.score ?? "—"),
                accent: levelAccent(latest?.level ?? ""),
                sub: latest?.level ?? "",
              },
              {
                icon: TrendingUp,
                label: "Score Change",
                value: scoreDelta !== null ? (scoreDelta > 0 ? `+${scoreDelta}` : String(scoreDelta)) : "—",
                accent: scoreDelta === null ? "#818cf8" : scoreDelta < 0 ? "#34d399" : scoreDelta > 0 ? "#f87171" : "#818cf8",
                sub: "vs previous assessment",
              },
              {
                icon: Calendar,
                label: "Total Sessions",
                value: String(history.length),
                accent: "#818cf8",
                sub: "assessments completed",
              },
            ].map(({ icon: Icon, label, value, accent, sub }) => (
              <motion.div key={label} variants={cardVariant} style={glassCard} className="p-5 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium" style={{ color: "rgba(225,224,204,0.5)" }}>{label}</p>
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl" style={{ background: `${accent}22` }}>
                    <Icon className="h-4 w-4" style={{ color: accent }} />
                  </span>
                </div>
                <p className="text-3xl font-bold" style={{ color: accent }}>{value}</p>
                <p className="text-xs" style={{ color: "rgba(225,224,204,0.35)" }}>{sub}</p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Chart */}
        {history.length > 0 && (
          <motion.div variants={cardVariant} style={glassCard} className="p-6">
            <p className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: "rgba(225,224,204,0.4)" }}>
              Score Trend
            </p>
            <ScoreChart data={history} />
          </motion.div>
        )}

        {/* Table */}
        <motion.div variants={cardVariant} style={glassCard} className="overflow-hidden">
          <div className="px-6 pt-6 pb-3">
            <p className="text-xs font-medium uppercase tracking-widest" style={{ color: "rgba(225,224,204,0.4)" }}>
              All Assessments
            </p>
          </div>

          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <Calendar className="h-10 w-10" style={{ color: "rgba(225,224,204,0.15)" }} />
              <p className="text-sm" style={{ color: "rgba(225,224,204,0.3)" }}>No assessments yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(225,224,204,0.08)" }}>
                    {["#", "Score", "Level", "Date"].map((h) => (
                      <th
                        key={h}
                        className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider"
                        style={{ color: "rgba(225,224,204,0.35)" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {history.map((item, i) => {
                    const accent = levelAccent(item.level);
                    const prevScore = history[i + 1]?.score;
                    const delta = prevScore !== undefined ? item.score - prevScore : null;
                    return (
                      <motion.tr
                        key={item.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        style={{ borderBottom: "1px solid rgba(225,224,204,0.06)" }}
                        className="transition-colors"
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                      >
                        <td className="px-6 py-4 font-mono text-xs" style={{ color: "rgba(225,224,204,0.35)" }}>
                          {item.id}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-base" style={{ color: accent }}>{item.score}</span>
                            {delta !== null && (
                              <span className="flex items-center gap-0.5 text-xs" style={{ color: delta < 0 ? "#34d399" : delta > 0 ? "#f87171" : "rgba(225,224,204,0.3)" }}>
                                {delta < 0 ? <ChevronDown className="h-3 w-3" /> : delta > 0 ? <ChevronUp className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
                                {Math.abs(delta)}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className="inline-block rounded-full px-2.5 py-1 text-xs font-medium"
                            style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}33` }}
                          >
                            {item.level}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs" style={{ color: "rgba(225,224,204,0.45)" }}>
                          {new Date(item.created_at).toLocaleString()}
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

      </motion.div>
    </Layout>
  );
}