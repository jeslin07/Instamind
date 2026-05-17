type Props = {
  title: string;
  value: string;
  accent?: string;
};

const glassCard = {
  background: "rgba(0,0,0,0.45)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(225,224,204,0.1)",
  borderRadius: "1.25rem",
};

export default function StatCard({ title, value, accent = "#34d399" }: Props) {
  return (
    <div style={glassCard} className="p-5 flex flex-col gap-2">
      <p className="text-xs font-medium" style={{ color: "rgba(225,224,204,0.5)" }}>
        {title}
      </p>
      <h2 className="text-3xl font-bold" style={{ color: accent }}>
        {value || "—"}
      </h2>
    </div>
  );
}