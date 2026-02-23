import { useRef } from "react";
import { Link } from "react-router";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

const cardStyle = {
  background: "white",
  borderRadius: "0.75rem",
  border: "1px solid #e5e7eb",
  padding: "1.25rem",
  flex: 1,
  minWidth: 0,
};

const labelStyle = {
  fontSize: "0.8rem",
  color: "#6b7280",
  margin: 0,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};

const valueStyle = {
  fontSize: "1.75rem",
  fontWeight: 700,
  color: "#111827",
  margin: "0.25rem 0 0",
};

const chartContainerStyle = {
  background: "white",
  borderRadius: "0.75rem",
  border: "1px solid #e5e7eb",
  padding: "1.25rem",
  minHeight: 220,
};

// Placeholder data for dashboard (replace with real API later)
const STATS = {
  productCount: 1247,
  earnings: "12,840",
  sells: 389,
};

const METRIC_CARDS = [
  { id: "ai-store", label: "AI store revenue", value: "$8,420", icon: "🤖" },
  { id: "bundler", label: "Bundler revenue", value: "$3,120", icon: "📦" },
  { id: "cart-upsell", label: "Cart upsell", value: "$1,298", icon: "🛒" },
  { id: "milestones", label: "Milestones", value: "12", icon: "🏆" },
];

const THEMES_DESIGNED = [
  { id: "1", name: "Dawn Refresh", designedAt: "Feb 15, 2025" },
  { id: "2", name: "Minimal Commerce", designedAt: "Feb 10, 2025" },
  { id: "3", name: "Bold Storefront", designedAt: "Feb 5, 2025" },
  { id: "4", name: "Clean Lines", designedAt: "Jan 28, 2025" },
  { id: "5", name: "Dark Mode Pro", designedAt: "Jan 20, 2025" },
];

const EXPLORE_TOOLS = [
  {
    id: "theme-builder",
    title: "Theme builder",
    description: "Customize colors, sections, and preview your store.",
    cta: "Open theme builder",
    to: "/app/theme-builder",
    preview: "gradient",
    accent: "#7c3aed",
  },
  {
    id: "product-import",
    title: "Product import",
    description: "Import products from URL and manage images.",
    cta: "Import products",
    to: "/app/product-import",
    preview: "gradient",
    accent: "#059669",
  },
  {
    id: "bundles",
    title: "Bundles & quantity breaks",
    description: "Create bundle offers and tiered pricing.",
    cta: "Create bundles",
    to: "/app/bundle-deals",
    preview: "gradient",
    accent: "#d97706",
  },
  {
    id: "ai-photos",
    title: "AI product photos",
    description: "Generate and enhance product imagery.",
    cta: "Create AI photos",
    to: "/app/ai-photos",
    preview: "gradient",
    accent: "#2563eb",
  },
];

const BAR_DATA = [65, 48, 72, 55, 88, 62, 75];
const LINE_DATA = [30, 45, 35, 55, 45, 60, 50, 70];

export default function Dashboard() {
  const maxBar = Math.max(...BAR_DATA);
  const maxLine = Math.max(...LINE_DATA);
  const toolsScrollRef = useRef(null);

  const scrollTools = (dir) => {
    const el = toolsScrollRef.current;
    if (!el) return;
    const step = 320;
    el.scrollBy({ left: dir === "next" ? step : -step, behavior: "smooth" });
  };

  return (
    <s-page heading="Dashboard">
      <s-section heading="Overview">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          <div style={cardStyle}>
            <p style={labelStyle}>Products</p>
            <p style={valueStyle}>{STATS.productCount.toLocaleString()}</p>
          </div>
          <div style={cardStyle}>
            <p style={labelStyle}>Earnings</p>
            <p style={valueStyle}>${STATS.earnings}</p>
          </div>
          <div style={cardStyle}>
            <p style={labelStyle}>Sells</p>
            <p style={valueStyle}>{STATS.sells}</p>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          {METRIC_CARDS.map(({ id, label, value, icon }) => (
            <div key={id} style={cardStyle}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                <span style={{ fontSize: "1.25rem" }}>{icon}</span>
                <p style={labelStyle}>{label}</p>
              </div>
              <p style={valueStyle}>{value}</p>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.25rem",
          }}
        >
          <div style={chartContainerStyle}>
            <p style={{ ...labelStyle, marginBottom: "1rem" }}>Sales (last 7 days)</p>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "0.5rem",
                height: 160,
              }}
            >
              {BAR_DATA.map((val, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    background: "linear-gradient(180deg, #3b82f6 0%, #2563eb 100%)",
                    borderRadius: "0.35rem 0.35rem 0 0",
                    height: `${(val / maxBar) * 100}%`,
                    minHeight: 4,
                  }}
                  title={String(val)}
                />
              ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "0.5rem",
                fontSize: "0.7rem",
                color: "#9ca3af",
              }}
            >
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>

          <div style={chartContainerStyle}>
            <p style={{ ...labelStyle, marginBottom: "1rem" }}>Revenue trend</p>
            <svg
              viewBox="0 0 400 160"
              style={{ width: "100%", height: 160 }}
              preserveAspectRatio="none"
            >
              <polyline
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
                points={LINE_DATA.map((val, i) => {
                  const x = (i / (LINE_DATA.length - 1)) * 380 + 10;
                  const y = 150 - (val / maxLine) * 130;
                  return `${x},${y}`;
                }).join(" ")}
              />
              <polygon
                fill="rgba(16, 185, 129, 0.12)"
                points={
                  LINE_DATA.map((val, i) => {
                    const x = (i / (LINE_DATA.length - 1)) * 380 + 10;
                    const y = 150 - (val / maxLine) * 130;
                    return `${x},${y}`;
                  }).join(" ") + " 390,150 10,150"
                }
              />
            </svg>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "0.25rem",
                fontSize: "0.7rem",
                color: "#9ca3af",
              }}
            >
              <span>Week 1</span>
              <span>Week 2</span>
            </div>
          </div>
        </div>
      </s-section>

      <s-section>
        <div
          style={{
            background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
            borderRadius: "1rem",
            padding: "1.5rem 1.5rem 0",
            marginBottom: "1rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
              marginBottom: "1.25rem",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "1.35rem",
                fontWeight: 700,
                color: "#f8fafc",
                letterSpacing: "-0.02em",
              }}
            >
              Explore store tools
            </h2>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.4rem 0.75rem",
                background: "rgba(193, 193, 193, 0.1)",
                borderRadius: "9999px",
                fontSize: "0.8rem",
                color: "#cbd5e1",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#22c55e",
                  boxShadow: "0 0 8px #22c55e",
                }}
              />
              Revenue this month: <strong style={{ color: "#f8fafc" }}>$24,891</strong>
            </div>
          </div>

          <div
            ref={toolsScrollRef}
            style={{
              display: "flex",
              gap: "1rem",
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              paddingBottom: "1rem",
            }}
          >
            {EXPLORE_TOOLS.map((tool) => (
              <div
                key={tool.id}
                style={{
                  flex: "0 0 300px",
                  scrollSnapAlign: "start",
                  background: "#fff",
                  borderRadius: "0.75rem",
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    height: 120,
                    background: `linear-gradient(145deg, ${tool.accent}22 0%, ${tool.accent}44 100%)`,
                    borderLeft: `4px solid ${tool.accent}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2.5rem",
                  }}
                >
                  {tool.id === "theme-builder" && "🎨"}
                  {tool.id === "product-import" && "📦"}
                  {tool.id === "bundles" && "🛒"}
                  {tool.id === "ai-photos" && "✨"}
                </div>
                <div style={{ padding: "1rem 1.25rem", flex: 1 }}>
                  <h3
                    style={{
                      margin: "0 0 0.35rem",
                      fontSize: "1.05rem",
                      fontWeight: 600,
                      color: "#0f172a",
                    }}
                  >
                    {tool.title}
                  </h3>
                  <p
                    style={{
                      margin: "0 0 1rem",
                      fontSize: "0.85rem",
                      color: "#64748b",
                      lineHeight: 1.4,
                    }}
                  >
                    {tool.description}
                  </p>
                  <Link
                    to={tool.to}
                    style={{
                      display: "inline-block",
                      padding: "0.5rem 1rem",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      borderRadius: "0.5rem",
                      background: tool.id === "theme-builder" ? tool.accent : "transparent",
                      color: tool.id === "theme-builder" ? "#fff" : tool.accent,
                      border: `2px solid ${tool.accent}`,
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                  >
                    {tool.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.75rem 0 1rem",
              borderTop: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div style={{ display: "flex", gap: "0.35rem" }}>
              <button
                type="button"
                onClick={() => scrollTools("prev")}
                aria-label="Previous"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "0.5rem",
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: "rgba(255,255,255,0.05)",
                  color: "#cbd5e1",
                  cursor: "pointer",
                  fontSize: "1rem",
                  lineHeight: 1,
                }}
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => scrollTools("next")}
                aria-label="Next"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "0.5rem",
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: "rgba(255,255,255,0.05)",
                  color: "#cbd5e1",
                  cursor: "pointer",
                  fontSize: "1rem",
                  lineHeight: 1,
                }}
              >
                ›
              </button>
            </div>
            <button
              type="button"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.4rem 0.75rem",
                fontSize: "0.8rem",
                borderRadius: "0.5rem",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "transparent",
                color: "#94a3b8",
                cursor: "pointer",
              }}
            >
              <span style={{ fontSize: "1rem" }}>💡</span>
              Suggest a feature
            </button>
          </div>
        </div>
      </s-section>

      <s-section heading="Themes designed">
        <div
          style={{
            background: "white",
            borderRadius: "0.75rem",
            border: "1px solid #e5e7eb",
            overflow: "hidden",
          }}
        >
          <ul
            style={{
              margin: 0,
              padding: 0,
              listStyle: "none",
            }}
          >
            {THEMES_DESIGNED.map((theme, index) => (
              <li
                key={theme.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.85rem 1.25rem",
                  borderBottom:
                    index < THEMES_DESIGNED.length - 1
                      ? "1px solid #f3f4f6"
                      : "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "0.5rem",
                      background: "linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1rem",
                    }}
                  >
                    🎨
                  </span>
                  <div>
                    <span style={{ fontWeight: 600, color: "#111827" }}>{theme.name}</span>
                    <span style={{ display: "block", fontSize: "0.8rem", color: "#6b7280" }}>
                      Designed {theme.designedAt}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  style={{
                    padding: "0.4rem 0.75rem",
                    fontSize: "0.8rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #e5e7eb",
                    background: "white",
                    cursor: "pointer",
                    color: "#374151",
                  }}
                >
                  View
                </button>
              </li>
            ))}
          </ul>
        </div>
        
      </s-section>
    </s-page>
  );
}
