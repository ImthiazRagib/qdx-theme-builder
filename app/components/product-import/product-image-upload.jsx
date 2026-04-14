import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { useThemeBuilder } from "../../context/theme.context";

// ── Design tokens (match select-product-source) ───────────────────────────────
const T = {
  border: "1px solid #e5e7eb",
  radius: "0.625rem",
  radiusSm: "0.4rem",
  shadow: "0 1px 3px rgba(0,0,0,0.06)",
};

// ── Step bar (shared style) ───────────────────────────────────────────────────
const STEPS = [
  { id: 1, label: "Source" },
  { id: 2, label: "Images" },
  { id: 3, label: "Review" },
];

function StepBar({ current = 2 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "1.75rem" }}>
      {STEPS.map((step, i) => {
        const done = step.id < current;
        const active = step.id === current;
        return (
          <div key={step.id} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : undefined }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.3rem" }}>
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  background: done ? "#059669" : active ? "#3b82f6" : "#f3f4f6",
                  color: done || active ? "#fff" : "#9ca3af",
                  border: active ? "2px solid #93c5fd" : "2px solid transparent",
                  boxShadow: active ? "0 0 0 3px rgba(59,130,246,0.15)" : "none",
                  transition: "all 0.2s",
                }}
              >
                {done ? (
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M2 6.5l3.5 3.5L11 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : step.id}
              </div>
              <span style={{ fontSize: "0.68rem", fontWeight: active ? 700 : 500, color: active ? "#1d4ed8" : done ? "#059669" : "#9ca3af", whiteSpace: "nowrap" }}>
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{ flex: 1, height: 2, margin: "0 0.5rem", marginBottom: "1.2rem", background: done ? "#059669" : "#e5e7eb", borderRadius: 1, transition: "background 0.3s" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function ProductImageUpload() {
  const { productGalleryImages, setProductGalleryImages, previewProduct } = useThemeBuilder();
  const fileInputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    if (previewProduct?.images?.length && productGalleryImages.length === 0) {
      setProductGalleryImages([...previewProduct.images]);
    }
  }, [previewProduct?.id]);

  const handleFileChange = (e) => {
    const valid = Array.from(e.target.files || []).filter((f) => f.type.startsWith("image/"));
    const newUrls = valid.map((f) => URL.createObjectURL(f));
    setProductGalleryImages((prev) => [...prev, ...newUrls]);
    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const valid = Array.from(e.dataTransfer.files || []).filter((f) => f.type.startsWith("image/"));
    const newUrls = valid.map((f) => URL.createObjectURL(f));
    setProductGalleryImages((prev) => [...prev, ...newUrls]);
  };

  const removeImage = (index) => {
    const url = productGalleryImages[index];
    if (url?.startsWith("blob:")) URL.revokeObjectURL(url);
    setProductGalleryImages((prev) => prev.filter((_, i) => i !== index));
  };

  const images = productGalleryImages || [];

  return (
    <div style={{ maxWidth: 580, margin: "0 auto" }}>

      {/* Step bar */}
      <StepBar current={2} />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "#0f172a" }}>
            Manage product images
          </h2>
          <p style={{ margin: "0.2rem 0 0", fontSize: "0.78rem", color: "#64748b" }}>
            {images.length} image{images.length !== 1 ? "s" : ""} in gallery
            {previewProduct ? ` — ${previewProduct.title}` : ""}
          </p>
        </div>
        <Link
          to="/app/product-import/review"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.3rem",
            padding: "0.45rem 1rem",
            fontSize: "0.8rem",
            fontWeight: 600,
            borderRadius: T.radius,
            background: "#3b82f6",
            color: "#fff",
            textDecoration: "none",
          }}
        >
          Next
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      {/* Upload area */}
      <div
        style={{
          background: "#fff",
          border: T.border,
          borderRadius: T.radius,
          padding: "1rem 1.125rem",
          marginBottom: "1rem",
          boxShadow: T.shadow,
        }}
      >
        <p style={{ margin: "0 0 0.75rem", fontSize: "0.78rem", fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Add images
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        {/* Drop zone */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onClick={() => fileInputRef.current?.click()}
          style={{
            padding: "2rem 1rem",
            border: dragOver ? "2px dashed #3b82f6" : "2px dashed #d1d5db",
            borderRadius: T.radius,
            background: dragOver ? "#eff6ff" : "#f8fafc",
            textAlign: "center",
            cursor: "pointer",
            transition: "all 0.15s",
            marginBottom: "0.75rem",
          }}
        >
          <div style={{ marginBottom: "0.5rem" }}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ margin: "0 auto", display: "block" }}>
              <rect x="4" y="8" width="28" height="20" rx="3" fill={dragOver ? "#dbeafe" : "#f3f4f6"} />
              <path d="M4 22l8-8 6 6 4-4 10 10" stroke={dragOver ? "#3b82f6" : "#d1d5db"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="13" cy="15" r="2.5" fill={dragOver ? "#3b82f6" : "#d1d5db"} />
              <path d="M18 4v8M14 8l4-4 4 4" stroke={dragOver ? "#3b82f6" : "#9ca3af"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p style={{ margin: 0, fontSize: "0.82rem", fontWeight: 600, color: dragOver ? "#2563eb" : "#374151" }}>
            {dragOver ? "Drop images here" : "Drag & drop images"}
          </p>
          <p style={{ margin: "0.2rem 0 0.75rem", fontSize: "0.73rem", color: "#9ca3af" }}>
            PNG, JPG, WEBP up to 10 MB each
          </p>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
            style={{
              padding: "0.4rem 1rem",
              fontSize: "0.78rem",
              fontWeight: 600,
              borderRadius: T.radiusSm,
              border: "1.5px solid #d1d5db",
              background: "#fff",
              cursor: "pointer",
              color: "#374151",
            }}
          >
            Browse files
          </button>
        </div>

        {/* Quick actions */}
        {images.length > 0 && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>
              {images.length} image{images.length !== 1 ? "s" : ""} uploaded
            </span>
            <button
              type="button"
              onClick={() => {
                images.forEach((url) => { if (url?.startsWith("blob:")) URL.revokeObjectURL(url); });
                setProductGalleryImages([]);
              }}
              style={{ fontSize: "0.73rem", color: "#dc2626", background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Image gallery */}
      <div
        style={{
          background: "#fff",
          border: T.border,
          borderRadius: T.radius,
          padding: "1rem 1.125rem",
          marginBottom: "1rem",
          boxShadow: T.shadow,
        }}
      >
        <p style={{ margin: "0 0 0.75rem", fontSize: "0.78rem", fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Gallery
        </p>

        {images.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: "0.6rem" }}>
            {images.map((url, index) => (
              <div
                key={`${url}-${index}`}
                style={{
                  position: "relative",
                  aspectRatio: "1",
                  borderRadius: T.radiusSm,
                  overflow: "hidden",
                  border: index === 0 ? "2px solid #3b82f6" : T.border,
                  background: "#f8fafc",
                  boxShadow: T.shadow,
                }}
              >
                {index === 0 && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: 4,
                      left: 4,
                      padding: "1px 6px",
                      borderRadius: "999px",
                      background: "#3b82f6",
                      color: "#fff",
                      fontSize: "0.6rem",
                      fontWeight: 700,
                      letterSpacing: "0.04em",
                      zIndex: 1,
                    }}
                  >
                    COVER
                  </span>
                )}
                <img
                  src={url}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  aria-label="Remove image"
                  style={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    border: "none",
                    background: "rgba(0,0,0,0.55)",
                    color: "#fff",
                    cursor: "pointer",
                    fontSize: "0.8rem",
                    lineHeight: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              padding: "2rem",
              border: "1.5px dashed #e5e7eb",
              borderRadius: T.radius,
              textAlign: "center",
              color: "#9ca3af",
              fontSize: "0.8rem",
              lineHeight: 1.6,
            }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ margin: "0 auto 0.5rem", display: "block" }}>
              <rect x="2" y="6" width="24" height="16" rx="3" stroke="#d1d5db" strokeWidth="1.5" />
              <path d="M2 18l6-6 5 5 3-3 8 8" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="9" cy="12" r="2" fill="#d1d5db" />
            </svg>
            No images yet — add some above or select a product with images on step 1.
          </div>
        )}
      </div>

      {/* Bottom navigation */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.25rem" }}>
        <Link
          to="/app/product-import"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.8rem", color: "#6b7280", textDecoration: "none" }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M11 7H3M7 3L3 7l4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to source
        </Link>
        <div style={{ display: "flex", gap: "0.625rem" }}>
          <Link
            to="/app/theme-builder"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem",
              padding: "0.5rem 1rem",
              fontSize: "0.8rem",
              fontWeight: 600,
              borderRadius: T.radius,
              border: T.border,
              background: "#fff",
              color: "#374151",
              textDecoration: "none",
            }}
          >
            Open in theme builder
          </Link>
          <Link
            to="/app/product-import/review"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem",
              padding: "0.5rem 1.125rem",
              fontSize: "0.8rem",
              fontWeight: 600,
              borderRadius: T.radius,
              background: "#3b82f6",
              color: "#fff",
              textDecoration: "none",
            }}
          >
            Continue to review
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
