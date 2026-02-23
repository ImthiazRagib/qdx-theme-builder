const border = "1px solid #e5e7eb";
const radius = "6px";

const DAILY_REVENUE = [
  { day: "Mon", value: 420 },
  { day: "Tue", value: 380 },
  { day: "Wed", value: 510 },
  { day: "Thu", value: 460 },
  { day: "Fri", value: 590 },
  { day: "Sat", value: 720 },
  { day: "Sun", value: 640 },
];

const maxVal = Math.max(...DAILY_REVENUE.map((d) => d.value));

export default function DailyAddedRevenue() {
  return (
    <div
      style={{
        padding: "1rem",
        background: "#fff",
        borderRadius: radius,
        border,
      }}
    >
      <p style={{ margin: "0 0 0.75rem", fontSize: "0.8125rem", fontWeight: 600, color: "#374151" }}>
        Daily added revenue
      </p>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "0.5rem", height: 120 }}>
        {DAILY_REVENUE.map((d) => (
          <div
            key={d.day}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.35rem",
            }}
          >
            <div
              style={{
                width: "100%",
                height: `${(d.value / maxVal) * 100}%`,
                minHeight: 4,
                background: "linear-gradient(180deg, #3b82f6 0%, #60a5fa 100%)",
                borderRadius: "4px 4px 0 0",
              }}
            />
            <span style={{ fontSize: "0.7rem", color: "#64748b" }}>{d.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
