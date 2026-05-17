import { PrismaHero } from "@/components/ui/prisma-hero";
import { useState, useRef, useEffect } from "react";
import type { KeyboardEvent } from "react";

/* ─────────────────────────────────────────────────────────────
   Chatbot – zero extra dependencies
   All styles are inline so nothing leaks into global CSS.
───────────────────────────────────────────────────────────── */

interface Message {
  role: "user" | "bot";
  text: string;
}

const BOT_NAME = "MindBot";

/* Simple rule-based response engine */
function getBotReply(input: string): string {
  const q = input.toLowerCase().trim();

  if (/hi|hello|hey/.test(q))
    return "Hey there! 👋 I'm MindBot, your digital wellness guide. Ask me anything about Instagram habits, screen time, or how InstaMind can help you.";

  if (/what.*instamind|what is this|about/.test(q))
    return "InstaMind is an Instagram addiction analytics platform. It tracks your screen time, addiction level, and productivity so you can build healthier digital habits. 📊";

  if (/screen.?time|how.?long|usage/.test(q))
    return "The average InstaMind user spends 4.5 hours daily on Instagram. Our dashboard breaks this down by hour and day so you can spot your peak usage patterns. ⏱️";

  if (/addiction|addicted/.test(q))
    return "Addiction scores are calculated from session frequency, late-night usage, and involuntary check-ins. Most users fall in the Moderate range. Want to find yours? Take the Assessment! 🎯";

  if (/analytics|dashboard|chart/.test(q))
    return "Our Real-Time Dashboard shows live session data, weekly trend charts, and a wellness score — all updated every minute. 📈";

  if (/report|history/.test(q))
    return "InstaMind generates up to 12 weekly reports per account, letting you compare your progress over time. Head to the History page to see yours!";

  if (/register|sign.?up|get started/.test(q))
    return "Getting started is free! Click **Get Started** in the top right corner to create your account in under a minute. 🚀";

  if (/login|sign.?in/.test(q))
    return "You can log in with your email and password via the **Login** button in the navbar. Already have an account? See you inside! 🔑";

  if (/assessment|test|quiz/.test(q))
    return "Our Instagram Addiction Assessment takes about 3 minutes and gives you a personalised wellness score plus actionable tips. Give it a try! ✅";

  if (/productivity|focus|work/.test(q))
    return "Productivity on InstaMind averages 72% for users who actively monitor their usage. Setting daily time limits is the #1 tip from our data. 💡";

  if (/feature|offer|can you do/.test(q))
    return "InstaMind offers: \n• Addiction Analytics\n• Real-Time Dashboard\n• Historical Tracking\n• Weekly Reports\n• Personalised Assessments";

  if (/bye|goodbye|see you/.test(q))
    return "Goodbye! 👋 Remember to take breaks and stay mindful of your screen time. See you soon!";

  if (/thank/.test(q))
    return "You're welcome! 😊 Feel free to ask anything else.";

  if (/help/.test(q))
    return "I can answer questions about InstaMind features, screen time, Instagram addiction, assessments, and more. What would you like to know?";

  return "That's a great question! I'm still learning. For detailed queries, try our Assessment page or reach out via the contact form. 😊";
}

/* Typing indicator dots */
function TypingDots() {
  return (
    <span style={{ display: "inline-flex", gap: 4, alignItems: "center" }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#6ee7b7",
            animation: "mindbot-bounce 1.2s infinite",
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </span>
  );
}

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hi! I'm MindBot 🧠 Ask me about InstaMind, screen time, or Instagram habits." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* Auto-scroll to latest message */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing, open]);

  /* Focus input when opening */
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  function sendMessage() {
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { role: "bot", text: getBotReply(text) }]);
    }, 900 + Math.random() * 500);
  }

  function handleKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") sendMessage();
  }

  /* ── Styles ── */
  const glass = {
    background: "rgba(10, 14, 20, 0.75)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    border: "1px solid rgba(255,255,255,0.10)",
  } as React.CSSProperties;

  return (
    <>
      {/* Keyframes injected once */}
      <style>{`
        @keyframes mindbot-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes mindbot-slide-up {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)  scale(1);    }
        }
        @keyframes mindbot-pulse-ring {
          0%   { transform: scale(1);    opacity: 0.6; }
          70%  { transform: scale(1.55); opacity: 0;   }
          100% { transform: scale(1.55); opacity: 0;   }
        }
      `}</style>

      {/* ── FAB Button ── */}
      <div
        style={{
          position: "fixed",
          bottom: 28,
          right: 28,
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 12,
        }}
      >
        {/* Tooltip */}
        {!open && (
          <div
            style={{
              ...glass,
              padding: "6px 12px",
              borderRadius: 20,
              fontSize: 12,
              color: "rgba(225,224,204,0.85)",
              whiteSpace: "nowrap",
              pointerEvents: "none",
            }}
          >
            Chat with MindBot 🧠
          </div>
        )}

        {/* FAB */}
        <button
          aria-label="Toggle chatbot"
          onClick={() => setOpen((o) => !o)}
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #10b981, #059669)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 32px rgba(16,185,129,0.45)",
            position: "relative",
            transition: "transform 0.2s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1.1)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1)")}
        >
          {/* Pulse ring */}
          {!open && (
            <span
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: "2px solid rgba(16,185,129,0.6)",
                animation: "mindbot-pulse-ring 2s ease-out infinite",
              }}
            />
          )}
          {/* Icon */}
          {open ? (
            /* X icon */
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            /* Chat bubble icon */
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          )}
        </button>
      </div>

      {/* ── Chat Window ── */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 100,
            right: 28,
            zIndex: 9998,
            width: "min(380px, calc(100vw - 40px))",
            height: 480,
            borderRadius: 20,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            animation: "mindbot-slide-up 0.3s ease forwards",
            boxShadow: "0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)",
            ...glass,
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "14px 18px",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(16,185,129,0.12)",
              display: "flex",
              alignItems: "center",
              gap: 12,
              flexShrink: 0,
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #10b981, #059669)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                flexShrink: 0,
              }}
            >
              🧠
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: "#E1E0CC", fontWeight: 700, fontSize: 15, margin: 0 }}>{BOT_NAME}</p>
              <p style={{ color: "#6ee7b7", fontSize: 11, margin: 0, display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#34d399", display: "inline-block" }} />
                Online · InstaMind Assistant
              </p>
            </div>
            <button
              aria-label="Clear chat"
              title="Clear chat"
              onClick={() => setMessages([{ role: "bot", text: "Hi again! 👋 How can I help you today?" }])}
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 8,
                color: "rgba(225,224,204,0.6)",
                cursor: "pointer",
                padding: "4px 8px",
                fontSize: 11,
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.14)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)")}
            >
              Clear
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "14px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(255,255,255,0.1) transparent",
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "82%",
                    padding: "10px 14px",
                    borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                    background:
                      msg.role === "user"
                        ? "linear-gradient(135deg, #10b981, #059669)"
                        : "rgba(255,255,255,0.07)",
                    color: msg.role === "user" ? "#fff" : "rgba(225,224,204,0.9)",
                    fontSize: 13.5,
                    lineHeight: 1.55,
                    border: msg.role === "bot" ? "1px solid rgba(255,255,255,0.08)" : "none",
                    whiteSpace: "pre-line",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: "18px 18px 18px 4px",
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <TypingDots />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggested questions */}
          <div
            style={{
              padding: "6px 12px",
              display: "flex",
              gap: 6,
              overflowX: "auto",
              scrollbarWidth: "none",
              flexShrink: 0,
            }}
          >
            {["What is InstaMind?", "Take Assessment", "Show features"].map((q) => (
              <button
                key={q}
                onClick={() => {
                  setInput(q);
                  setTimeout(() => {
                    setMessages((prev) => [...prev, { role: "user", text: q }]);
                    setInput("");
                    setTyping(true);
                    setTimeout(() => {
                      setTyping(false);
                      setMessages((prev) => [...prev, { role: "bot", text: getBotReply(q) }]);
                    }, 900);
                  }, 0);
                }}
                style={{
                  background: "rgba(16,185,129,0.1)",
                  border: "1px solid rgba(16,185,129,0.25)",
                  borderRadius: 20,
                  color: "#6ee7b7",
                  fontSize: 11,
                  padding: "5px 11px",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "background 0.2s",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(16,185,129,0.2)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(16,185,129,0.1)")}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div
            style={{
              padding: "12px 14px",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              gap: 8,
              alignItems: "center",
              flexShrink: 0,
              background: "rgba(0,0,0,0.2)",
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask something…"
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12,
                padding: "9px 14px",
                color: "#E1E0CC",
                fontSize: 13.5,
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(16,185,129,0.5)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
            />
            <button
              aria-label="Send message"
              onClick={sendMessage}
              disabled={!input.trim() || typing}
              style={{
                width: 38,
                height: 38,
                borderRadius: 11,
                border: "none",
                cursor: input.trim() && !typing ? "pointer" : "not-allowed",
                background: input.trim() && !typing
                  ? "linear-gradient(135deg, #10b981, #059669)"
                  : "rgba(255,255,255,0.07)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.25s, transform 0.15s",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                if (input.trim() && !typing)
                  (e.currentTarget as HTMLElement).style.transform = "scale(1.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default function Home() {
  return (
    <>
      <PrismaHero />
      <ChatWidget />
    </>
  );
}