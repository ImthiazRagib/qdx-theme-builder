import { useState } from "react";

const border = "1px solid #e5e7eb";
const radius = "6px";

function InfoIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="8" cy="8" r="7" />
      <path d="M8 6v4" />
      <circle cx="8" cy="5" r="1.25" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TooltipIcon({ onMouseEnter, onMouseLeave }) {
  return (
    <span
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 14,
        height: 14,
        borderRadius: "50%",
        // background: "#e2e8f0",
        color: "#111827",
        cursor: "help",
        marginLeft: "0.25rem",
        verticalAlign: "middle",
      }}
      aria-label="More info"
    >
      <InfoIcon />
    </span>
  );
}

const DEMO_CARDS = [
  { id: "1", title: "Bundles created", value: "12", tooltip: "Total bundle offers created in the last 30 days." },
  { id: "2", title: "Conversion rate", value: "4.2%", tooltip: "Share of visitors who checkout after viewing a bundle." },
  { id: "3", title: "Avg. order value", value: "$89", tooltip: "Average order total when at least one bundle is in the cart." },
];

export default function AnalyticsDemoCards() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: "1rem",
      }}
    >
      {DEMO_CARDS.map((card) => (
        <div
          key={card.id}
          style={{
            position: "relative",
            padding: "1rem",
            background: "#fff",
            borderRadius: radius,
            border,
          }}
          // onMouseEnter={() => setHoveredId(card.id)}
          // onMouseLeave={() => setHoveredId(null)}
        >
          <p style={{ margin: 0, fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.04em", display: "flex", alignItems: "center" }}>
            {card.title}
            <TooltipIcon
              onMouseEnter={() => setHoveredId(card.id)}
              onMouseLeave={() => setHoveredId(null)}
            />
          </p>
          <p style={{ margin: "0.25rem 0 0", fontSize: "1.25rem", fontWeight: 600, color: "#111827" }}>
            {card.value}
          </p>
          {hoveredId === card.id && (
            <div
              role="tooltip"
              style={{
                position: "absolute",
                bottom: "100%",
                left: "50%",
                transform: "translateX(-50%) translateY(-0.5rem)",
                padding: "0.4rem 0.65rem",
                background: "#1e293b",
                color: "#fff",
                fontSize: "0.75rem",
                borderRadius: "4px",
                maxWidth: 200,
                zIndex: 10,
                lineHeight: 1.3,
              }}
            >
              {card.tooltip}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
