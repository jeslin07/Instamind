import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import Layout from "../components/Layout";
import api from "../services/api";

const questions = [
  {
    category: "Usage Habit",
    question: "How often do you check Instagram immediately after waking up?",
    options: ["Never", "Occasionally", "Sometimes", "Frequently", "Almost Always"],
  },
  {
    category: "Screen Time",
    question: "How many hours per day do you spend on Instagram?",
    options: ["Less than 30 minutes", "30 min – 1 hour", "1 – 3 hours", "3 – 5 hours", "More than 5 hours"],
  },
  {
    category: "Attention Span",
    question: "How often do you lose track of time while scrolling reels or posts?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Constantly"],
  },
  {
    category: "Productivity",
    question: "How frequently does Instagram interrupt your studies or work?",
    options: ["Never", "Rarely", "Occasionally", "Frequently", "Very Frequently"],
  },
  {
    category: "Emotional Dependency",
    question: "How do you feel when unable to access Instagram?",
    options: ["No difference", "Slightly bored", "Restless", "Anxious", "Very uncomfortable"],
  },
  {
    category: "Sleep Pattern",
    question: "How late do you usually use Instagram before sleeping?",
    options: ["I don't use it before bed", "Less than 15 minutes", "15–30 minutes", "30–60 minutes", "More than 1 hour"],
  },
  {
    category: "Social Comparison",
    question: "How often do Instagram posts negatively affect your mood or self-esteem?",
    options: ["Never", "Rarely", "Sometimes", "Frequently", "Very Frequently"],
  },
  {
    category: "Impulse Control",
    question: "How often do you open Instagram without consciously deciding to?",
    options: ["Never", "Occasionally", "Sometimes", "Frequently", "Almost Always"],
  },
  {
    category: "Mental Fatigue",
    question: "How often do you feel mentally drained after prolonged scrolling?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Almost Every Day"],
  },
  {
    category: "Behavioral Control",
    question: "How difficult is it for you to stop scrolling once you start?",
    options: ["Very Easy", "Easy", "Moderate", "Difficult", "Very Difficult"],
  },
];

const glassCard = {
  background: "rgba(0,0,0,0.55)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(225,224,204,0.12)",
  borderRadius: "1.75rem",
};

export default function Assessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(0));
  const [loading, setLoading] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
  const [result, setResult] = useState<{
    score: number;
    level: string;
    insight: string;
    recommendations: string[];
  } | null>(null);

  const handleAnswer = (value: number) => {
    const updated = [...answers];
    updated[currentQuestion] = value;
    setAnswers(updated);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setDirection(1);
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setDirection(-1);
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitAssessment = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const totalScore = answers.reduce((sum, value) => sum + value, 0);

    let level = "";
    let insight = "";
    let recommendations: string[] = [];

    if (totalScore <= 20) {
      level = "Balanced Digital Usage";
      insight = "Your digital behavior appears balanced with healthy engagement patterns and good behavioral control.";
      recommendations = [
        "Maintain healthy screen boundaries",
        "Continue mindful social media usage",
        "Schedule regular offline breaks",
      ];
    } else if (totalScore <= 35) {
      level = "Emerging Dependency Indicators";
      insight = "Your assessment suggests increasing dependency tendencies and reduced attention stability during prolonged usage.";
      recommendations = [
        "Reduce late-night scrolling",
        "Enable screen-time reminders",
        "Avoid opening Instagram during focus sessions",
        "Try scheduled detox periods",
      ];
    } else {
      level = "High Behavioral Dependency Risk";
      insight = "Strong compulsive scrolling patterns and dopamine-reward dependency indicators detected. Your productivity and sleep quality may be affected.";
      recommendations = [
        "Limit Instagram usage after 10 PM",
        "Use app blockers during work/study",
        "Reduce reel consumption frequency",
        "Practice intentional social media usage",
        "Track emotional triggers before opening Instagram",
      ];
    }

    try {
      await api.post(
        "assessment/",
        { q1: answers[0], q2: answers[1], q3: answers[2], q4: answers[3], q5: answers[4], q6: answers[5], q7: answers[6], q8: answers[7], q9: answers[8], q10: answers[9] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResult({ score: totalScore, level, insight, recommendations });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const levelAccent =
    result?.level === "High Behavioral Dependency Risk"
      ? "#f87171"
      : result?.level === "Emerging Dependency Indicators"
      ? "#fbbf24"
      : "#34d399";

  return (
    <Layout>
      <div className="min-h-[85vh] flex items-center justify-center py-8">
        <div className="w-full max-w-2xl">

          {!result ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              style={glassCard}
              className="p-8 md:p-10"
            >
              {/* Header row */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span
                    className="inline-block rounded-full px-3 py-1 text-xs font-semibold mb-2"
                    style={{ background: "rgba(16,185,129,0.15)", color: "#34d399", border: "1px solid rgba(16,185,129,0.25)" }}
                  >
                    {questions[currentQuestion].category}
                  </span>
                  <p className="text-xs" style={{ color: "rgba(225,224,204,0.45)" }}>
                    Question {currentQuestion + 1} of {questions.length}
                  </p>
                </div>
                <div
                  className="flex items-center justify-center w-14 h-14 rounded-full font-bold text-lg"
                  style={{
                    background: "rgba(16,185,129,0.12)",
                    border: "2px solid rgba(16,185,129,0.3)",
                    color: "#34d399",
                  }}
                >
                  {Math.round(progress)}%
                </div>
              </div>

              {/* Progress bar */}
              <div
                className="w-full h-1.5 rounded-full mb-8 overflow-hidden"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, #34d399, #38bdf8)" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>

              {/* Question */}
              <AnimatePresence mode="wait">
                <motion.h2
                  key={currentQuestion}
                  initial={{ opacity: 0, x: direction * 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -30 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="text-xl font-bold leading-snug mb-8 md:text-2xl"
                  style={{ color: "#E1E0CC" }}
                >
                  {questions[currentQuestion].question}
                </motion.h2>
              </AnimatePresence>

              {/* Options */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion + "-options"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  {questions[currentQuestion].options.map((option, index) => {
                    const selected = answers[currentQuestion] === index + 1;
                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index + 1)}
                        className="w-full text-left px-5 py-4 rounded-xl text-sm font-medium transition-all duration-200"
                        style={{
                          background: selected ? "rgba(16,185,129,0.18)" : "rgba(255,255,255,0.04)",
                          border: selected ? "1px solid rgba(16,185,129,0.5)" : "1px solid rgba(225,224,204,0.1)",
                          color: selected ? "#34d399" : "rgba(225,224,204,0.75)",
                        }}
                        onMouseEnter={(e) => {
                          if (!selected) {
                            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
                            (e.currentTarget as HTMLElement).style.borderColor = "rgba(225,224,204,0.2)";
                            (e.currentTarget as HTMLElement).style.color = "#E1E0CC";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!selected) {
                            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                            (e.currentTarget as HTMLElement).style.borderColor = "rgba(225,224,204,0.1)";
                            (e.currentTarget as HTMLElement).style.color = "rgba(225,224,204,0.75)";
                          }
                        }}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                            style={{
                              background: selected ? "rgba(16,185,129,0.3)" : "rgba(255,255,255,0.08)",
                              color: selected ? "#34d399" : "rgba(225,224,204,0.4)",
                            }}
                          >
                            {String.fromCharCode(65 + index)}
                          </span>
                          {option}
                        </span>
                      </button>
                    );
                  })}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8">
                <button
                  onClick={previousQuestion}
                  disabled={currentQuestion === 0}
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all disabled:opacity-30"
                  style={{ background: "rgba(255,255,255,0.07)", color: "rgba(225,224,204,0.7)", border: "1px solid rgba(225,224,204,0.12)" }}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </button>

                {currentQuestion < questions.length - 1 ? (
                  <button
                    onClick={nextQuestion}
                    disabled={!answers[currentQuestion]}
                    className="group inline-flex items-center justify-between rounded-full py-2.5 pl-6 pr-2 text-sm font-semibold transition-all disabled:opacity-40"
                    style={{ background: "#10b981", color: "#fff" }}
                  >
                    Next
                    <span className="ml-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/25 transition-transform group-hover:scale-110">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={submitAssessment}
                    disabled={loading || !answers[currentQuestion]}
                    className="group inline-flex items-center justify-between rounded-full py-2.5 pl-6 pr-2 text-sm font-semibold transition-all disabled:opacity-40"
                    style={{ background: "#10b981", color: "#fff" }}
                  >
                    {loading ? "Analyzing…" : "Generate Insights"}
                    <span className="ml-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/25 transition-transform group-hover:scale-110">
                      <Sparkles className="h-4 w-4" />
                    </span>
                  </button>
                )}
              </div>
            </motion.div>

          ) : (

            /* ── Result Card ── */
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={glassCard}
              className="p-8 md:p-10"
            >
              {/* Result header */}
              <div className="flex items-start justify-between gap-6 mb-8">
                <div>
                  <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: "rgba(225,224,204,0.4)" }}>
                    Behavioral Analysis Result
                  </p>
                  <h1 className="text-2xl font-bold leading-tight md:text-3xl" style={{ color: "#E1E0CC" }}>
                    {result.level}
                  </h1>
                </div>

                <div
                  className="shrink-0 flex h-20 w-20 flex-col items-center justify-center rounded-full"
                  style={{
                    border: `4px solid ${levelAccent}`,
                    background: `${levelAccent}18`,
                  }}
                >
                  <span className="text-2xl font-bold" style={{ color: levelAccent }}>
                    {result.score}
                  </span>
                  <span className="text-[9px] font-medium" style={{ color: `${levelAccent}99` }}>
                    SCORE
                  </span>
                </div>
              </div>

              {/* Insight */}
              <div
                className="rounded-xl p-5 mb-5"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(225,224,204,0.1)" }}
              >
                <h2 className="text-sm font-semibold mb-2" style={{ color: "rgba(225,224,204,0.6)" }}>
                  Behavioral Insight
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(225,224,204,0.8)" }}>
                  {result.insight}
                </p>
              </div>

              {/* Recommendations */}
              <div
                className="rounded-xl p-5"
                style={{ background: `${levelAccent}0f`, border: `1px solid ${levelAccent}33` }}
              >
                <h2 className="text-sm font-semibold mb-4" style={{ color: levelAccent }}>
                  Recommended Improvements
                </h2>
                <ul className="space-y-2.5">
                  {result.recommendations.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm" style={{ color: "rgba(225,224,204,0.75)" }}>
                      <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" style={{ color: levelAccent }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Retake */}
              <button
                onClick={() => { setResult(null); setCurrentQuestion(0); setAnswers(Array(questions.length).fill(0)); }}
                className="mt-6 w-full rounded-full py-3 text-sm font-medium transition-all"
                style={{ background: "rgba(255,255,255,0.06)", color: "rgba(225,224,204,0.6)", border: "1px solid rgba(225,224,204,0.12)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; }}
              >
                Retake Assessment
              </button>
            </motion.div>
          )}

        </div>
      </div>
    </Layout>
  );
}