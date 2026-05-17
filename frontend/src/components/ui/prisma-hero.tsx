import { motion, useInView } from "framer-motion";
import { ArrowRight, BarChart2, Clock, TrendingUp, FileText } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";

/* ---------------- WordsPullUp ---------------- */
interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: React.CSSProperties;
}

export const WordsPullUp = ({
  text,
  className = "",
  showAsterisk = false,
  style,
}: WordsPullUpProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block relative"
            style={{ marginRight: isLast ? 0 : "0.25em" }}
          >
            {word}
            {showAsterisk && isLast && (
              <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</span>
            )}
          </motion.span>
        );
      })}
    </div>
  );
};

/* ---------------- WordsPullUpMultiStyle ---------------- */
interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
  style?: React.CSSProperties;
}

export const WordsPullUpMultiStyle = ({
  segments,
  className = "",
  style,
}: WordsPullUpMultiStyleProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const words: { word: string; className?: string }[] = [];
  segments.forEach((seg) => {
    seg.text.split(" ").forEach((w) => {
      if (w) words.push({ word: w, className: seg.className });
    });
  });

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${className}`} style={style}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-block ${w.className ?? ""}`}
          style={{ marginRight: "0.25em" }}
        >
          {w.word}
        </motion.span>
      ))}
    </div>
  );
};

/* ---------------- Stats data ---------------- */
const stats = [
  { icon: Clock,      label: "Daily Usage",    value: "4.5h",     color: "text-white" },
  { icon: BarChart2,  label: "Addiction Level", value: "Moderate", color: "text-emerald-400" },
  { icon: TrendingUp, label: "Productivity",   value: "72%",      color: "text-white" },
  { icon: FileText,   label: "Weekly Reports", value: "12",       color: "text-white" },
];

/* ---------------- Feature pills ---------------- */
const features = ["Addiction Analytics", "Real-Time Dashboard", "Historical Tracking"];

/* ---------------- PrismaHero ---------------- */
const PrismaHero = () => {
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

        {/* Gradient overlay — stronger at top & bottom */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/80" />

        {/* ── Top Navbar ── */}
        <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 md:px-10 md:py-5">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xl font-bold tracking-tight md:text-2xl" style={{ color: "#E1E0CC" }}>
              InstaMind
            </span>
          </motion.div>

          {/* Nav links */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:flex items-center gap-8"
          >
            {["Our story", "Collective", "Workshops", "Programs"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm transition-colors"
                style={{ color: "rgba(225, 224, 204, 0.7)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#E1E0CC")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(225, 224, 204, 0.7)")}
              >
                {item}
              </a>
            ))}
          </motion.div>

          {/* Auth buttons */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3"
          >
            <Link
              to="/login"
              className="text-sm font-medium transition-colors"
              style={{ color: "rgba(225, 224, 204, 0.8)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#E1E0CC")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(225, 224, 204, 0.8)")}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-full bg-emerald-500 hover:bg-emerald-400 px-4 py-1.5 text-sm font-semibold text-white transition-colors"
            >
              Get Started
            </Link>
          </motion.div>

        </nav>

        {/* ── Bottom content ── */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 md:px-10 md:pb-8">
          <div className="grid grid-cols-12 items-end gap-6">

            {/* Left — Big title */}
            <div className="col-span-12 lg:col-span-7">
              <h1
                className="font-medium leading-[0.85] tracking-[-0.07em] text-[22vw] sm:text-[20vw] md:text-[18vw] lg:text-[16vw] xl:text-[15vw]"
                style={{ color: "#E1E0CC" }}
              >
                <WordsPullUp text="Prisma" showAsterisk />
              </h1>
            </div>

            {/* Right — InstaMind content */}
            <div className="col-span-12 lg:col-span-5 flex flex-col gap-5 pb-2 lg:pb-4">

              {/* Headline */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl">
                  Track Your{" "}
                  <span className="text-emerald-400">Instagram Habits</span>
                </h2>
                <p className="mt-2 text-xs leading-relaxed sm:text-sm" style={{ color: "rgba(225,224,204,0.75)" }}>
                  InstaMind helps users analyze Instagram addiction patterns,
                  screen time behavior, and digital wellness through
                  intelligent analytics dashboards.
                </p>
              </motion.div>

              {/* Stats grid */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-2 gap-2"
              >
                {stats.map(({ icon: Icon, label, value, color }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5"
                    style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <Icon className="h-4 w-4 shrink-0" style={{ color: "rgba(225,224,204,0.5)" }} />
                    <div>
                      <p className="text-[10px]" style={{ color: "rgba(225,224,204,0.5)" }}>{label}</p>
                      <p className={`text-base font-bold leading-tight ${color}`}>{value}</p>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Feature pills */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap gap-2"
              >
                {features.map((f) => (
                  <span
                    key={f}
                    className="rounded-full px-3 py-1 text-[10px] font-medium sm:text-xs"
                    style={{ background: "rgba(16,185,129,0.15)", color: "#6ee7b7", border: "1px solid rgba(16,185,129,0.3)" }}
                  >
                    {f}
                  </span>
                ))}
              </motion.div>

              {/* CTA buttons */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3"
              >
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-400 px-5 py-2 text-sm font-semibold text-white transition-all"
                >
                  Start Assessment
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/login"
                  className="rounded-full px-5 py-2 text-sm font-medium transition-all"
                  style={{ background: "rgba(255,255,255,0.1)", color: "#E1E0CC", border: "1px solid rgba(255,255,255,0.15)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.18)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)"; }}
                >
                  Login
                </Link>
              </motion.div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export { PrismaHero };
