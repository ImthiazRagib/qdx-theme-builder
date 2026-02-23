const border = "1px solid #e5e7eb";
const radius = "6px";

const TABS = [
  { id: "photos", label: "Generate photos", icon: "🖼️" },
  { id: "videos", label: "Generate videos", icon: "🎬" },
  { id: "description", label: "Product description", icon: "📝" },
];

export default function AiGenerateTabs({ activeTab, onTabChange }) {
  return (
    <div style={{ display: "flex", gap: "0.25rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
      {TABS.map((tab) => (
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
            background: activeTab === tab.id ? "#2563eb" : "#fff",
            color: activeTab === tab.id ? "#fff" : "#374151",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
          }}
        >
          <span>{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </div>
  );
}
