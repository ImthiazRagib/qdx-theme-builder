const TABS = [
  { id: "photos", label: "Photos" },
  { id: "videos", label: "Videos" },
  { id: "description", label: "Description" },
];

export default function AiGenerateTabs({ activeTab, onTabChange }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "0.5rem",
        marginBottom: "1.5rem",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onTabChange(tab.id)}
          style={{
            padding: "0.5rem 0",
            fontSize: "0.8125rem",
            fontWeight: 500,
            background: "none",
            border: "none",
            borderBottom: activeTab === tab.id ? "2px solid #18181b" : "2px solid transparent",
            marginBottom: "-1px",
            color: activeTab === tab.id ? "#18181b" : "#71717a",
            cursor: "pointer",
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
