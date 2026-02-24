import { useState } from "react";

export default function ProductImageSelector({ images = [], onSelectionChange }) {
  const [selected, setSelected] = useState(() =>
    new Set(images.map((_, i) => i))
  );

  const toggle = (index) => {
    const next = new Set(selected);
    if (next.has(index)) {
      next.delete(index);
    } else {
      next.add(index);
    }
    setSelected(next);
    onSelectionChange?.(images.filter((_, i) => next.has(i)));
  };

  if (!images?.length) return null;

  return (
    <div style={{ marginBottom: "1rem" }}>
      <p style={{ fontSize: "0.8125rem", color: "#71717a", margin: "0 0 0.5rem 0" }}>
        Product images (select to use)
      </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        {images.map((url, index) => (
          <label
            key={`${url}-${index}`}
            style={{
              position: "relative",
              cursor: "pointer",
              display: "block",
            }}
          >
            <input
              type="checkbox"
              checked={selected.has(index)}
              onChange={() => toggle(index)}
              style={{
                position: "absolute",
                top: "0.5rem",
                left: "0.5rem",
                width: "1rem",
                height: "1rem",
                accentColor: "#18181b",
              }}
            />
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "6px",
                border: selected.has(index) ? "2px solid #18181b" : "1px solid #e5e7eb",
                overflow: "hidden",
                background: "#f4f4f5",
              }}
            >
              <img
                src={url}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
