import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import api from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await api.post("register/", formData);
      setIsError(false);
      setMessage("Registration successful! Redirecting to login…");
      setTimeout(() => navigate("/login"), 1500);
    } catch {
      setIsError(true);
      setMessage("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(225,224,204,0.15)",
    color: "#E1E0CC",
  };

  const focusIn = (e: React.FocusEvent<HTMLInputElement>) =>
    (e.currentTarget.style.borderColor = "rgba(16,185,129,0.5)");
  const focusOut = (e: React.FocusEvent<HTMLInputElement>) =>
    (e.currentTarget.style.borderColor = "rgba(225,224,204,0.15)");

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
              Already have an account?
            </span>
            <Link
              to="/login"
              className="rounded-full px-4 py-1.5 text-sm font-semibold transition-colors"
              style={{ background: "rgba(255,255,255,0.1)", color: "#E1E0CC", border: "1px solid rgba(255,255,255,0.15)" }}
            >
              Sign In
            </Link>
          </motion.div>
        </nav>

        {/* ── Centered Register Card ── */}
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
                Join the platform
              </p>
              <h1 className="text-3xl font-bold leading-tight" style={{ color: "#E1E0CC" }}>
                Create your<br />
                <span className="text-emerald-400">InstaMind account</span>
              </h1>
              <p className="mt-2 text-sm" style={{ color: "rgba(225,224,204,0.55)" }}>
                Start tracking your Instagram habits and digital wellness today.
              </p>
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Username */}
              <motion.div
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
              >
                <label className="block text-xs font-medium mb-1.5" style={{ color: "rgba(225,224,204,0.6)" }}>
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Choose a username"
                  onChange={handleChange}
                  value={formData.username}
                  required
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all placeholder:opacity-40"
                  style={inputStyle}
                  onFocus={focusIn}
                  onBlur={focusOut}
                />
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.49, ease: [0.16, 1, 0.3, 1] }}
              >
                <label className="block text-xs font-medium mb-1.5" style={{ color: "rgba(225,224,204,0.6)" }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  value={formData.email}
                  required
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all placeholder:opacity-40"
                  style={inputStyle}
                  onFocus={focusIn}
                  onBlur={focusOut}
                />
              </motion.div>

              {/* Password */}
              <motion.div
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.56, ease: [0.16, 1, 0.3, 1] }}
              >
                <label className="block text-xs font-medium mb-1.5" style={{ color: "rgba(225,224,204,0.6)" }}>
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a password"
                    onChange={handleChange}
                    value={formData.password}
                    required
                    className="w-full rounded-xl px-4 py-3 pr-11 text-sm outline-none transition-all placeholder:opacity-40"
                    style={inputStyle}
                    onFocus={focusIn}
                    onBlur={focusOut}
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

              {/* Feedback message */}
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm"
                  style={{ color: isError ? "#f87171" : "#34d399" }}
                >
                  {!isError && <CheckCircle2 className="h-4 w-4 shrink-0" />}
                  <span>{message}</span>
                </motion.div>
              )}

              {/* Submit */}
              <motion.div
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.63, ease: [0.16, 1, 0.3, 1] }}
                className="pt-2"
              >
                <button
                  type="submit"
                  disabled={loading}
                  className="group w-full inline-flex items-center justify-between rounded-full py-3 pl-6 pr-2 text-sm font-semibold transition-all disabled:opacity-60"
                  style={{ background: "rgba(16,185,129,1)", color: "#fff" }}
                >
                  <span>{loading ? "Creating account…" : "Create Account"}</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/25 transition-transform group-hover:scale-110">
                    <ArrowRight className="h-4 w-4 text-white" />
                  </span>
                </button>
              </motion.div>

            </form>

            {/* Footer */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.72 }}
              className="mt-6 text-center text-xs"
              style={{ color: "rgba(225,224,204,0.4)" }}
            >
              Already have an account?{" "}
              <Link to="/login" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
                Sign in
              </Link>
            </motion.p>

          </motion.div>
        </div>

        {/* ── Bottom watermark ── */}
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