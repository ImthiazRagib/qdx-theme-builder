import { useRef } from "react";
import { Link } from "react-router";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

// ── Design tokens ──────────────────────────────────────────────────────────────
const T = {
  radius: "0.75rem",
  radiusSm: "0.5rem",
  border: "1px solid #e5e7eb",
  borderMuted: "1px solid #f0f0f0",
  shadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
  shadowMd: "0 4px 16px rgba(0,0,0,0.08)",
  gap: "1rem",
};

const card = (extra = {}) => ({
  background: "#fff",
  borderRadius: T.radius,
  border: T.border,
  boxShadow: T.shadow,
  ...extra,
});

// ── Static data ────────────────────────────────────────────────────────────────
const STATS = [
  {
    id: "products",
    label: "Total Products",
    value: "1,247",
    trend: "+8%",
    up: true,
    color: "#2563eb",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="6" width="16" height="11" rx="2" stroke="#2563eb" strokeWidth="1.6" />
        <path d="M6 6V5a4 4 0 0 1 8 0v1" stroke="#2563eb" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "earnings",
    label: "Total Earnings",
    value: "$12,840",
    trend: "+14%",
    up: true,
    color: "#059669",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8" stroke="#059669" strokeWidth="1.6" />
        <path d="M10 6v8M7.5 8.5c0-1.1.9-2 2.5-2s2.5.9 2.5 2c0 2.5-5 2.5-5 5 0 1.1.9 2 2.5 2s2.5-.9 2.5-2" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "sells",
    label: "Total Sells",
    value: "389",
    trend: "+5%",
    up: true,
    color: "#7c3aed",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M2 3h2l2.4 9.4a2 2 0 0 0 2 1.6h6.5a2 2 0 0 0 2-1.6L18 7H5" stroke="#7c3aed" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="8" cy="17" r="1.2" fill="#7c3aed" />
        <circle cx="15" cy="17" r="1.2" fill="#7c3aed" />
      </svg>
    ),
  },
];

const METRICS = [
  { id: "ai-store", label: "AI store revenue", value: "$8,420", change: "+12.4%", up: true, accent: "#2563eb" },
  { id: "bundler", label: "Bundler revenue", value: "$3,120", change: "+6.1%", up: true, accent: "#059669" },
  { id: "cart-upsell", label: "Cart upsell", value: "$1,298", change: "-2.3%", up: false, accent: "#d97706" },
  { id: "milestones", label: "Milestones reached", value: "12", change: "+3", up: true, accent: "#7c3aed" },
];

const TOOLS = [
  {
    id: "theme-builder",
    title: "Theme Builder",
    description: "Customize colors, sections, and export a production-ready Shopify theme.",
    cta: "Open Builder",
    to: "/app/theme-builder",
    accent: "#7c3aed",
    bg: "#f5f3ff",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" fill="#7c3aed" opacity=".2"/>
        <path d="M12 6v6l4 2" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="2" fill="#7c3aed"/>
      </svg>
    ),
  },
  {
    id: "product-import",
    title: "Product Import",
    description: "Import products from any source, manage images and preview on your theme.",
    cta: "Import Products",
    to: "/app/product-import",
    accent: "#059669",
    bg: "#ecfdf5",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="8" width="18" height="13" rx="2" fill="#059669" opacity=".15"/>
        <path d="M3 8l9-5 9 5" stroke="#059669" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M12 21V11m-3 3 3-3 3 3" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "bundles",
    title: "Bundles & Breaks",
    description: "Create bundle offers and quantity-break pricing to boost average order value.",
    cta: "Create Bundles",
    to: "/app/bundle-deals",
    accent: "#d97706",
    bg: "#fffbeb",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="7" width="20" height="14" rx="2" fill="#d97706" opacity=".15"/>
        <path d="M16 7V5a2 2 0 0 0-4 0v2M8 7V5a2 2 0 0 0-4 0v2" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M2 12h20" stroke="#d97706" strokeWidth="1.6"/>
      </svg>
    ),
  },
  {
    id: "ai-photos",
    title: "AI Product Photos",
    description: "Generate and enhance stunning product images using AI models in bulk.",
    cta: "Generate Photos",
    to: "/app/ai-photos",
    accent: "#2563eb",
    bg: "#eff6ff",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="3" fill="#2563eb" opacity=".12"/>
        <path d="M3 15l5-5 4 4 3-3 6 6" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="8.5" cy="8.5" r="1.5" fill="#2563eb"/>
      </svg>
    ),
  },
];

const THEMES = [
  { id: "1", name: "Dawn Refresh", date: "Feb 15, 2025", status: "Published", accent: "#7c3aed" },
  { id: "2", name: "Minimal Commerce", date: "Feb 10, 2025", status: "Draft", accent: "#059669" },
  { id: "3", name: "Bold Storefront", date: "Feb 5, 2025", status: "Published", accent: "#d97706" },
  { id: "4", name: "Clean Lines", date: "Jan 28, 2025", status: "Draft", accent: "#2563eb" },
  { id: "5", name: "Dark Mode Pro", date: "Jan 20, 2025", status: "Published", accent: "#e11d48" },
];

const BAR_DATA = [65, 48, 72, 55, 88, 62, 75];
const LINE_DATA = [30, 45, 35, 55, 45, 60, 50, 70];
const BAR_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function Dashboard() {
  const maxBar = Math.max(...BAR_DATA);
  const maxLine = Math.max(...LINE_DATA);
  const toolsRef = useRef(null);

  const scroll = (dir) => {
    const el = toolsRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "next" ? 316 : -316, behavior: "smooth" });
  };

  return (
    <s-page heading="Dashboard">

      {/* ── KPI stats ─────────────────────────────────────────────────────── */}
      <s-section heading="Overview">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: T.gap,
            marginBottom: "1.25rem",
          }}
        >
          {STATS.map((s) => (
            <div key={s.id} style={{ ...card(), padding: "1.25rem", borderLeft: `4px solid ${s.color}` }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {s.label}
                </span>
                <span style={{ width: 36, height: 36, borderRadius: "0.5rem", background: `${s.color}12`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {s.icon}
                </span>
              </div>
              <div style={{ fontSize: "1.875rem", fontWeight: 700, color: "#0f172a", lineHeight: 1 }}>{s.value}</div>
              <div style={{ marginTop: "0.5rem", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 600, color: s.up ? "#059669" : "#dc2626" }}>
                  {s.up ? "▲" : "▼"} {s.trend}
                </span>
                <span style={{ fontSize: "0.7rem", color: "#9ca3af" }}>vs last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Revenue metrics ─────────────────────────────────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: T.gap,
            marginBottom: "1.25rem",
          }}
        >
          {METRICS.map((m) => (
            <div key={m.id} style={{ ...card(), padding: "1rem 1.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.4rem" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: m.accent, flexShrink: 0 }} />
                <span style={{ fontSize: "0.75rem", color: "#6b7280", fontWeight: 500 }}>{m.label}</span>
              </div>
              <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#0f172a" }}>{m.value}</div>
              <div style={{ marginTop: "0.25rem", fontSize: "0.72rem", fontWeight: 600, color: m.up ? "#059669" : "#dc2626" }}>
                {m.up ? "+" : ""}{m.change} this month
              </div>
            </div>
          ))}
        </div>

        {/* ── Charts ──────────────────────────────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: T.gap }}>
          {/* Bar chart */}
          <div style={{ ...card(), padding: "1.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#374151" }}>Sales — Last 7 Days</span>
              <span style={{ fontSize: "0.7rem", color: "#9ca3af", background: "#f3f4f6", borderRadius: "999px", padding: "2px 8px" }}>
                This week
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "0.4rem", height: 140, position: "relative" }}>
              {/* Grid lines */}
              {[0.25, 0.5, 0.75, 1].map((p) => (
                <div
                  key={p}
                  style={{
                    position: "absolute",
                    bottom: `${p * 100}%`,
                    left: 0,
                    right: 0,
                    borderTop: "1px dashed #f3f4f6",
                    pointerEvents: "none",
                  }}
                />
              ))}
              {BAR_DATA.map((val, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, height: "100%", justifyContent: "flex-end" }}>
                  <span style={{ fontSize: "0.6rem", color: "#9ca3af" }}>{val}</span>
                  <div
                    style={{
                      width: "100%",
                      background: val === maxBar
                        ? "linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%)"
                        : "linear-gradient(180deg, #93c5fd 0%, #60a5fa 100%)",
                      borderRadius: "0.3rem 0.3rem 0 0",
                      height: `${(val / maxBar) * 120}px`,
                    }}
                  />
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
              {BAR_DAYS.map((d) => (
                <span key={d} style={{ flex: 1, textAlign: "center", fontSize: "0.65rem", color: "#9ca3af" }}>{d}</span>
              ))}
            </div>
          </div>

          {/* Area chart */}
          <div style={{ ...card(), padding: "1.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#374151" }}>Revenue Trend</span>
              <span style={{ fontSize: "0.7rem", color: "#9ca3af", background: "#f3f4f6", borderRadius: "999px", padding: "2px 8px" }}>
                2 weeks
              </span>
            </div>
            <svg viewBox="0 0 380 130" style={{ width: "100%", height: 140, overflow: "visible" }} preserveAspectRatio="none">
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              {/* Grid lines */}
              {[25, 50, 75, 100].map((y) => (
                <line key={y} x1="0" y1={y} x2="380" y2={y} stroke="#f3f4f6" strokeDasharray="4 4" />
              ))}
              {/* Area fill */}
              <polygon
                fill="url(#areaGrad)"
                points={
                  LINE_DATA.map((val, i) => {
                    const x = (i / (LINE_DATA.length - 1)) * 370 + 5;
                    const y = 120 - (val / maxLine) * 110;
                    return `${x},${y}`;
                  }).join(" ") + " 375,120 5,120"
                }
              />
              {/* Line */}
              <polyline
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={LINE_DATA.map((val, i) => {
                  const x = (i / (LINE_DATA.length - 1)) * 370 + 5;
                  const y = 120 - (val / maxLine) * 110;
                  return `${x},${y}`;
                }).join(" ")}
              />
              {/* Dots */}
              {LINE_DATA.map((val, i) => {
                const x = (i / (LINE_DATA.length - 1)) * 370 + 5;
                const y = 120 - (val / maxLine) * 110;
                return <circle key={i} cx={x} cy={y} r="3" fill="#10b981" stroke="#fff" strokeWidth="1.5" />;
              })}
            </svg>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.25rem" }}>
              <span style={{ fontSize: "0.65rem", color: "#9ca3af" }}>Week 1</span>
              <span style={{ fontSize: "0.65rem", color: "#9ca3af" }}>Week 2</span>
            </div>
          </div>
        </div>
      </s-section>

      {/* ── Explore tools ──────────────────────────────────────────────────────── */}
      <s-section>
        <div
          style={{
            background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
            borderRadius: "1rem",
            padding: "1.5rem 1.5rem 0",
          }}
        >
          {/* Header row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.75rem" }}>
            <div>
              <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 700, color: "#f8fafc", letterSpacing: "-0.02em" }}>
                Explore Store Tools
              </h2>
              <p style={{ margin: "0.25rem 0 0", fontSize: "0.8rem", color: "#94a3b8" }}>
                Everything you need to build and grow your Shopify store
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 0.875rem", background: "rgba(255,255,255,0.07)", borderRadius: "9999px", border: "1px solid rgba(255,255,255,0.12)" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e" }} />
              <span style={{ fontSize: "0.78rem", color: "#cbd5e1" }}>
                Revenue: <strong style={{ color: "#f1f5f9" }}>$24,891</strong>
              </span>
            </div>
          </div>

          {/* Cards */}
          <div
            ref={toolsRef}
            style={{ display: "flex", gap: "0.875rem", overflowX: "auto", scrollSnapType: "x mandatory", scrollbarWidth: "none", paddingBottom: "1.25rem" }}
          >
            {TOOLS.map((tool) => (
              <div
                key={tool.id}
                style={{
                  flex: "0 0 290px",
                  scrollSnapAlign: "start",
                  background: "#fff",
                  borderRadius: "0.75rem",
                  overflow: "hidden",
                  boxShadow: T.shadowMd,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    height: 96,
                    background: tool.bg,
                    borderBottom: `3px solid ${tool.accent}20`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ width: 56, height: 56, borderRadius: "1rem", background: `${tool.accent}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {tool.icon}
                  </span>
                </div>
                <div style={{ padding: "1rem 1.125rem 1.125rem", flex: 1, display: "flex", flexDirection: "column" }}>
                  <h3 style={{ margin: "0 0 0.35rem", fontSize: "0.95rem", fontWeight: 700, color: "#0f172a" }}>
                    {tool.title}
                  </h3>
                  <p style={{ margin: "0 0 0.875rem", fontSize: "0.8rem", color: "#64748b", lineHeight: 1.5, flex: 1 }}>
                    {tool.description}
                  </p>
                  <Link
                    to={tool.to}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      padding: "0.5rem 1rem",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      borderRadius: "0.5rem",
                      background: tool.accent,
                      color: "#fff",
                      textDecoration: "none",
                      alignSelf: "flex-start",
                    }}
                  >
                    {tool.cta}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Footer nav */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 0 1rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ display: "flex", gap: "0.35rem" }}>
              {["prev", "next"].map((dir) => (
                <button
                  key={dir}
                  type="button"
                  onClick={() => scroll(dir)}
                  aria-label={dir === "prev" ? "Previous" : "Next"}
                  style={{ width: 32, height: 32, borderRadius: "0.5rem", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.06)", color: "#e2e8f0", cursor: "pointer", fontSize: "1rem", lineHeight: 1 }}
                >
                  {dir === "prev" ? "‹" : "›"}
                </button>
              ))}
            </div>
            <button
              type="button"
              style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.4rem 0.75rem", fontSize: "0.78rem", borderRadius: "0.5rem", border: "1px solid rgba(255,255,255,0.15)", background: "transparent", color: "#94a3b8", cursor: "pointer" }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
              Suggest a feature
            </button>
          </div>
        </div>
      </s-section>

      {/* ── Themes designed ────────────────────────────────────────────────────── */}
      <s-section heading="Themes designed">
        <div style={{ ...card(), overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.875rem 1.25rem", borderBottom: T.border }}>
            <span style={{ fontSize: "0.8rem", color: "#6b7280" }}>{THEMES.length} themes saved</span>
            <Link
              to="/app/theme-builder"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.8rem", fontWeight: 600, color: "#7c3aed", textDecoration: "none" }}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>
              New theme
            </Link>
          </div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {THEMES.map((theme, i) => (
              <li
                key={theme.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.875rem 1.25rem",
                  borderBottom: i < THEMES.length - 1 ? T.borderMuted : "none",
                  transition: "background 0.15s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                  <span
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: "0.625rem",
                      background: `linear-gradient(135deg, ${theme.accent}22 0%, ${theme.accent}44 100%)`,
                      border: `1.5px solid ${theme.accent}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 4h12M2 8h8M2 12h5" stroke={theme.accent} strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </span>
                  <div>
                    <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#111827" }}>{theme.name}</span>
                    <span style={{ display: "block", fontSize: "0.75rem", color: "#6b7280", marginTop: "0.1rem" }}>
                      Designed {theme.date}
                    </span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                  <span
                    style={{
                      padding: "0.2rem 0.6rem",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      borderRadius: "999px",
                      background: theme.status === "Published" ? "#dcfce7" : "#f3f4f6",
                      color: theme.status === "Published" ? "#166534" : "#6b7280",
                    }}
                  >
                    {theme.status}
                  </span>
                  <button
                    type="button"
                    style={{ padding: "0.35rem 0.75rem", fontSize: "0.78rem", fontWeight: 500, borderRadius: "0.5rem", border: T.border, background: "#fff", cursor: "pointer", color: "#374151" }}
                  >
                    View
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </s-section>

    </s-page>
  );
}
