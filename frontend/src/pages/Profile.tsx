import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, ShieldCheck, Layers, LogOut } from "lucide-react";
import Layout from "../components/Layout";
import api from "../services/api";

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

export default function Profile() {
  const [user, setUser] = useState({ username: "", email: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    api
      .get("profile/", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => setUser(r.data))
      .catch(console.log);
  }, []);

  const initials = user.username
    ? user.username.slice(0, 2).toUpperCase()
    : "—";

  return (
    <Layout>
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        className="space-y-6 max-w-2xl"
      >
        {/* Header */}
        <motion.div variants={cardVariant}>
          <p className="text-xs font-medium uppercase tracking-widest mb-1" style={{ color: "rgba(225,224,204,0.4)" }}>
            Account
          </p>
          <h1 className="text-4xl font-bold" style={{ color: "#E1E0CC" }}>
            Profile
          </h1>
        </motion.div>

        {/* Avatar card */}
        <motion.div variants={cardVariant} style={glassCard} className="p-7">
          <div className="flex items-center gap-6">
            {/* Avatar circle */}
            <div
              className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full text-2xl font-bold"
              style={{
                background: "linear-gradient(135deg, #10b981, #38bdf8)",
                color: "#000",
                boxShadow: "0 0 0 4px rgba(16,185,129,0.2)",
              }}
            >
              {initials}
            </div>

            <div>
              <h2 className="text-2xl font-bold" style={{ color: "#E1E0CC" }}>
                {user.username || "—"}
              </h2>
              <p className="text-sm mt-0.5" style={{ color: "rgba(225,224,204,0.5)" }}>
                {user.email || "—"}
              </p>
              <span
                className="mt-2 inline-block rounded-full px-2.5 py-1 text-xs font-medium"
                style={{ background: "rgba(16,185,129,0.15)", color: "#34d399", border: "1px solid rgba(16,185,129,0.25)" }}
              >
                Active Member
              </span>
            </div>
          </div>
        </motion.div>

        {/* Info grid */}
        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.07 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {[
            { icon: User,        label: "Username",       value: user.username || "—",    accent: "#34d399" },
            { icon: Mail,        label: "Email",          value: user.email || "—",        accent: "#38bdf8" },
            { icon: ShieldCheck, label: "Account Status", value: "Active",                 accent: "#34d399" },
            { icon: Layers,      label: "Platform",       value: "InstaMind User",         accent: "#818cf8" },
          ].map(({ icon: Icon, label, value, accent }) => (
            <motion.div key={label} variants={cardVariant} style={glassCard} className="p-5 flex items-center gap-4">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                style={{ background: `${accent}18` }}
              >
                <Icon className="h-4 w-4" style={{ color: accent }} />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-medium" style={{ color: "rgba(225,224,204,0.45)" }}>{label}</p>
                <p className="text-sm font-semibold truncate mt-0.5" style={{ color: "#E1E0CC" }}>{value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Logout */}
        <motion.div variants={cardVariant}>
          <button
            onClick={() => { localStorage.removeItem("token"); window.location.href = "/login"; }}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all"
            style={{ background: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.2)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.1)"; }}
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </motion.div>

      </motion.div>
    </Layout>
  );
}