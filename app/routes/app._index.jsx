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

const BAR_DATA = [65, 48, 72, 55, 88, 62, 75];
const LINE_DATA = [30, 45, 35, 55, 45, 60, 50, 70];

export default function Dashboard() {
  const maxBar = Math.max(...BAR_DATA);
  const maxLine = Math.max(...LINE_DATA);

  return (
    <s-page heading="Dashboard">
      <s-section heading="Overview">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1rem",
            marginBottom: "1.5rem",
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
    </s-page>
  );
}
