import { useState } from "react";

const border = "1px solid #e5e7eb";
const radius = "6px";

const OPTIONS = [
  { value: "all", label: "All bundles" },
  { value: "active", label: "Active" },
  { value: "draft", label: "Draft" },
  { value: "archived", label: "Archived" },
];

const inputStyle = {
  padding: "0.4rem 0.6rem",
  fontSize: "0.8125rem",
  borderRadius: radius,
  border,
  background: "#fff",
  color: "#374151",
};

export default function FilterBar() {
  const [option, setOption] = useState("all");
  const [date, setDate] = useState(() => {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        flexWrap: "wrap",
      }}
    >
      <select
        value={option}
        onChange={(e) => setOption(e.target.value)}
        style={inputStyle}
        aria-label="Filter by status"
      >
        {OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={inputStyle}
        aria-label="Filter by date"
      />
    </div>
  );
}
