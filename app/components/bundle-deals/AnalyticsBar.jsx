const border = "1px solid #e5e7eb";
const radius = "6px";

export default function AnalyticsBar() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.75rem 1rem",
        background: "#f8fafc",
        borderRadius: radius,
        border,
      }}
    >
      <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#374151" }}>
        Analytics
      </span>
      <span style={{ fontSize: "0.75rem", color: "#64748b" }}>Bundle deals metrics</span>
    </div>
  );
}
