const border = "1px solid #e5e7eb";
const radius = "6px";

export default function BundleDealsTabs({ activeTab, onTabChange }) {
  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "analytics", label: "Analytics" },
  ];
  return (
    <div style={{ display: "flex", gap: "0.25rem", marginBottom: "1.25rem" }}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onTabChange(tab.id)}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "0.875rem",
            fontWeight: 500,
            borderRadius: radius,
            border,
            background: activeTab === tab.id ? "#374151" : "#fff",
            color: activeTab === tab.id ? "#fff" : "#374151",
            cursor: "pointer",
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
