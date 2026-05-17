import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import api from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await api.post("login/", formData);
      localStorage.setItem("token", response.data.access);
      navigate("/dashboard");
    } catch {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="h-screen w-full">
      <div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-[2rem]">

        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
        />

        {/* Noise overlay */}
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />

        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80" />

        {/* ── Top Navbar ── */}
        <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 md:px-10 md:py-5">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link to="/" className="text-xl font-bold tracking-tight md:text-2xl" style={{ color: "#E1E0CC" }}>
              InstaMind
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3"
          >
            <span className="text-sm" style={{ color: "rgba(225,224,204,0.6)" }}>
              Don't have an account?
            </span>
            <Link
              to="/register"
              className="rounded-full bg-emerald-500 hover:bg-emerald-400 px-4 py-1.5 text-sm font-semibold text-white transition-colors"
            >
              Get Started
            </Link>
          </motion.div>
        </nav>

        {/* ── Centered Login Card ── */}
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md"
            style={{
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(225,224,204,0.12)",
              borderRadius: "1.5rem",
              padding: "2.5rem",
            }}
          >
            {/* Header */}
            <motion.div
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8"
            >
              <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: "rgba(225,224,204,0.45)" }}>
                Welcome back
              </p>
              <h1 className="text-3xl font-bold leading-tight" style={{ color: "#E1E0CC" }}>
                Sign in to<br />
                <span className="text-emerald-400">InstaMind</span>
              </h1>
              <p className="mt-2 text-sm" style={{ color: "rgba(225,224,204,0.55)" }}>
                Track your Instagram habits and digital wellness.
              </p>
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Username */}
              <motion.div
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <label className="block text-xs font-medium mb-1.5" style={{ color: "rgba(225,224,204,0.6)" }}>
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  onChange={handleChange}
                  value={formData.username}
                  required
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all placeholder:opacity-40 focus:ring-1 focus:ring-emerald-500/50"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(225,224,204,0.15)",
                    color: "#E1E0CC",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(16,185,129,0.5)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(225,224,204,0.15)")}
                />
              </motion.div>

              {/* Password */}
              <motion.div
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
              >
                <label className="block text-xs font-medium mb-1.5" style={{ color: "rgba(225,224,204,0.6)" }}>
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    onChange={handleChange}
                    value={formData.password}
                    required
                    className="w-full rounded-xl px-4 py-3 pr-11 text-sm outline-none transition-all placeholder:opacity-40"
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(225,224,204,0.15)",
                      color: "#E1E0CC",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(16,185,129,0.5)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(225,224,204,0.15)")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-100"
                    style={{ color: "rgba(225,224,204,0.4)" }}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </motion.div>

              {/* Error */}
              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-red-400"
                >
                  {error}
                </motion.p>
              )}

              {/* Submit */}
              <motion.div
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="pt-2"
              >
                <button
                  type="submit"
                  disabled={loading}
                  className="group w-full inline-flex items-center justify-between rounded-full py-3 pl-6 pr-2 text-sm font-semibold transition-all disabled:opacity-60"
                  style={{ background: "rgba(16,185,129,1)", color: "#fff" }}
                >
                  <span>{loading ? "Signing in…" : "Sign In"}</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/25 transition-transform group-hover:scale-110">
                    <ArrowRight className="h-4 w-4 text-white" />
                  </span>
                </button>
              </motion.div>

            </form>

            {/* Footer link */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-6 text-center text-xs"
              style={{ color: "rgba(225,224,204,0.4)" }}
            >
              New to InstaMind?{" "}
              <Link to="/register" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
                Create an account
              </Link>
            </motion.p>

          </motion.div>
        </div>

        {/* ── Bottom brand stamp ── */}
        <div className="absolute bottom-0 left-0 px-6 pb-4 md:px-10 md:pb-6 pointer-events-none select-none">
          <h2
            className="font-medium leading-none tracking-[-0.07em] text-[18vw] sm:text-[15vw] md:text-[12vw] lg:text-[10vw]"
            style={{ color: "rgba(225,224,204,0.08)" }}
          >
            InstaMind
          </h2>
        </div>

      </div>
    </section>
  );
}