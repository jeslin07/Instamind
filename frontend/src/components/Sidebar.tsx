import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart2,
  User,
  ClipboardList,
  History,
  LogOut,
} from "lucide-react";
import { motion } from "framer-motion";

const navLinks = [
  { to: "/dashboard",  label: "Dashboard",  icon: LayoutDashboard },
  { to: "/analytics",  label: "Analytics",  icon: BarChart2 },
  { to: "/assessment", label: "Assessment", icon: ClipboardList },
  { to: "/history",    label: "History",    icon: History },
  { to: "/profile",    label: "Profile",    icon: User },
];

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside
      className="flex flex-col w-60 min-h-screen shrink-0 py-6 px-4"
      style={{
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRight: "1px solid rgba(225,224,204,0.1)",
      }}
    >
      {/* Brand */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10 px-2"
      >
        <span className="text-2xl font-bold tracking-tight" style={{ color: "#E1E0CC" }}>
          InstaMind
        </span>
      </motion.div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-1">
        {navLinks.map(({ to, label, icon: Icon }, i) => {
          const active = pathname === to;
          return (
            <motion.div
              key={to}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.06 * i, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                to={to}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all"
                style={{
                  background: active ? "rgba(16,185,129,0.18)" : "transparent",
                  color: active ? "#34d399" : "rgba(225,224,204,0.6)",
                  border: active ? "1px solid rgba(16,185,129,0.25)" : "1px solid transparent",
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                    (e.currentTarget as HTMLElement).style.color = "#E1E0CC";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.color = "rgba(225,224,204,0.6)";
                  }
                }}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Logout */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all w-full"
        style={{ color: "rgba(225,224,204,0.45)" }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.12)";
          (e.currentTarget as HTMLElement).style.color = "#f87171";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "transparent";
          (e.currentTarget as HTMLElement).style.color = "rgba(225,224,204,0.45)";
        }}
      >
        <LogOut className="h-4 w-4 shrink-0" />
        Logout
      </motion.button>
    </aside>
  );
}