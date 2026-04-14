import { useState } from "react";
import { Link, useLoaderData } from "react-router";
import { useThemeBuilder } from "../../context/theme.context";

// ── Design tokens ─────────────────────────────────────────────────────────────
const T = {
  border: "1px solid #e5e7eb",
  borderBlue: "2px solid #3b82f6",
  radius: "0.625rem",
  radiusSm: "0.4rem",
  shadow: "0 1px 3px rgba(0,0,0,0.06)",
  shadowFocus: "0 0 0 3px rgba(59,130,246,0.15)",
};

const labelSt = {
  fontSize: "0.8rem",
  fontWeight: 600,
  color: "#374151",
  marginBottom: "0.4rem",
  display: "block",
};
const hintSt = { margin: "0 0 0.5rem", fontSize: "0.73rem", color: "#6b7280", lineHeight: 1.5 };
const inputSt = {
  width: "100%",
  padding: "0.5rem 0.75rem",
  borderRadius: T.radiusSm,
  border: T.border,
  fontSize: "0.8125rem",
  background: "#fff",
  boxSizing: "border-box",
  outline: "none",
};

// ── Step indicator ────────────────────────────────────────────────────────────
const STEPS = [
  { id: 1, label: "Source" },
  { id: 2, label: "Images" },
  { id: 3, label: "Review" },
];

function StepBar({ current = 1 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "1.75rem" }}>
      {STEPS.map((step, i) => {
        const done = step.id < current;
        const active = step.id === current;
        return (
          <div key={step.id} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : undefined }}>
            {/* Circle */}
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
              <span
                style={{
                  fontSize: "0.68rem",
                  fontWeight: active ? 700 : 500,
                  color: active ? "#1d4ed8" : done ? "#059669" : "#9ca3af",
                  whiteSpace: "nowrap",
                }}
              >
                {step.label}
              </span>
            </div>
            {/* Connector */}
            {i < STEPS.length - 1 && (
              <div
                style={{
                  flex: 1,
                  height: 2,
                  margin: "0 0.5rem",
                  marginBottom: "1.2rem",
                  background: done ? "#059669" : "#e5e7eb",
                  borderRadius: 1,
                  transition: "background 0.3s",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Product source data ───────────────────────────────────────────────────────
const PRODUCT_SOURCES = [
  { id: "shopify", label: "Shopify", bg: "#f0fdf4", color: "#16a34a", abbr: "SH" },
  { id: "aliexpress", label: "AliExpress", bg: "#fff1f2", color: "#e11d48", abbr: "AE" },
  { id: "amazon", label: "Amazon", bg: "#fffbeb", color: "#b45309", abbr: "AMZ" },
  { id: "alibaba", label: "Alibaba", bg: "#fff7ed", color: "#ea580c", abbr: "ALI" },
  { id: "etsy", label: "Etsy", bg: "#fdf4ff", color: "#9333ea", abbr: "ETY" },
  { id: "custom", label: "Custom URL", bg: "#f8fafc", color: "#475569", abbr: "URL" },
];

export default function SelectProductSource() {
  const { products = [] } = useLoaderData() ?? {};
  const { setPreviewProduct, setProductGalleryImages, syncProductDetails, previewProduct } = useThemeBuilder();

  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [storeLanguage, setStoreLanguage] = useState("english");
  const [researchContext, setResearchContext] = useState("none");
  const [themeMethod, setThemeMethod] = useState("template-library");
  const [productSource, setProductSource] = useState("shopify");
  const [productUrl, setProductUrl] = useState("");
  const [productSearch, setProductSearch] = useState("");

  const sourceLabel = PRODUCT_SOURCES.find((s) => s.id === productSource)?.label ?? productSource;
  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 580, margin: "0 auto" }}>

      {/* Step bar */}
      <StepBar current={1} />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "#0f172a" }}>
            Select product source
          </h2>
          <p style={{ margin: "0.2rem 0 0", fontSize: "0.78rem", color: "#64748b" }}>
            Choose where to pull your product from
          </p>
        </div>
        <Link
          to="/app/product-import/images"
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

      {/* Info banner */}
      {!bannerDismissed && (
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "0.625rem",
            padding: "0.75rem 0.875rem",
            background: "#eff6ff",
            border: "1px solid #bfdbfe",
            borderRadius: T.radius,
            marginBottom: "1rem",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
            <circle cx="8" cy="8" r="7" stroke="#3b82f6" strokeWidth="1.4" />
            <path d="M8 5v4M8 11v.5" stroke="#3b82f6" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <p style={{ margin: 0, fontSize: "0.78rem", color: "#1d4ed8", flex: 1, lineHeight: 1.5 }}>
            Multi-product store generation is currently only available with the{" "}
            <strong>Shopify</strong> source. Upload external products to Shopify first.
          </p>
          <button
            type="button"
            onClick={() => setBannerDismissed(true)}
            style={{ background: "none", border: "none", color: "#93c5fd", cursor: "pointer", padding: 0, fontSize: "1rem", lineHeight: 1, flexShrink: 0 }}
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      )}

      {/* ── Section: Store config ── */}
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
        <p style={{ margin: "0 0 0.875rem", fontSize: "0.78rem", fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Store settings
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
          {/* Language */}
          <div>
            <label style={labelSt}>Store language</label>
            <select
              value={storeLanguage}
              onChange={(e) => setStoreLanguage(e.target.value)}
              style={inputSt}
            >
              <option value="english">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>

          {/* Research context */}
          <div>
            <label style={labelSt}>Research context</label>
            <select
              value={researchContext}
              onChange={(e) => setResearchContext(e.target.value)}
              style={inputSt}
            >
              <option value="none">Auto-generated ICP</option>
              <option value="custom">Custom ICP</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── Section: Theme method ── */}
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
          Theme selection method
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {[
            {
              id: "template-library",
              title: "Select from Template Library",
              desc: "Pick a ready-made template to set your design foundation.",
            },
            {
              id: "existing-themes",
              title: "Based on existing theme",
              desc: "Carry over your current layout and style with updated content.",
            },
          ].map((opt) => (
            <label
              key={opt.id}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.625rem",
                padding: "0.75rem",
                borderRadius: T.radiusSm,
                border: themeMethod === opt.id ? T.borderBlue : T.border,
                background: themeMethod === opt.id ? "#eff6ff" : "#fff",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              <input
                type="radio"
                name="themeMethod"
                checked={themeMethod === opt.id}
                onChange={() => setThemeMethod(opt.id)}
                style={{ marginTop: "0.2rem", accentColor: "#3b82f6" }}
              />
              <div>
                <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#111827" }}>{opt.title}</span>
                <p style={{ margin: "0.15rem 0 0", fontSize: "0.73rem", color: "#64748b" }}>{opt.desc}</p>
              </div>
            </label>
          ))}
        </div>

        {themeMethod === "template-library" && (
          <div style={{ marginTop: "0.75rem" }}>
            <label style={labelSt}>Atlas theme template</label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input
                type="text"
                placeholder="No template selected"
                style={{ ...inputSt, flex: 1 }}
                readOnly
              />
              <button
                type="button"
                style={{
                  padding: "0.5rem 0.875rem",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  borderRadius: T.radiusSm,
                  border: T.border,
                  background: "#fff",
                  cursor: "pointer",
                  color: "#374151",
                  whiteSpace: "nowrap",
                }}
              >
                Browse
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Section: Product source ── */}
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
          Product source
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0.5rem",
            marginBottom: productSource !== "shopify" ? 0 : "1rem",
          }}
        >
          {PRODUCT_SOURCES.map((src) => {
            const active = productSource === src.id;
            return (
              <label
                key={src.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.7rem 0.5rem",
                  borderRadius: T.radiusSm,
                  border: active ? T.borderBlue : T.border,
                  background: active ? "#eff6ff" : "#fafafa",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                <input
                  type="radio"
                  name="productSource"
                  value={src.id}
                  checked={active}
                  onChange={() => setProductSource(src.id)}
                  style={{ display: "none" }}
                />
                <span
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "0.5rem",
                    background: src.bg,
                    color: src.color,
                    fontSize: "0.65rem",
                    fontWeight: 800,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: active ? `1.5px solid ${src.color}40` : "1.5px solid transparent",
                  }}
                >
                  {src.abbr}
                </span>
                <span style={{ fontSize: "0.72rem", fontWeight: active ? 700 : 500, color: active ? "#1d4ed8" : "#374151" }}>
                  {src.label}
                </span>
                {active && (
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#3b82f6" }} />
                )}
              </label>
            );
          })}
        </div>

        {/* Shopify product picker */}
        {productSource === "shopify" && (
          <div>
            {previewProduct && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 0.75rem",
                  background: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                  borderRadius: T.radiusSm,
                  marginBottom: "0.75rem",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6" fill="#16a34a" />
                  <path d="M4 7l2 2 4-4" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ fontSize: "0.78rem", color: "#15803d", flex: 1 }}>
                  Selected: <strong>{previewProduct.title}</strong>
                </span>
                <Link to="/app/theme-builder" style={{ fontSize: "0.73rem", color: "#2563eb", textDecoration: "none", fontWeight: 600 }}>
                  Preview in builder →
                </Link>
              </div>
            )}

            {/* Search */}
            <div style={{ position: "relative", marginBottom: "0.5rem" }}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                style={{ position: "absolute", left: "0.625rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
              >
                <circle cx="6" cy="6" r="4.5" stroke="#9ca3af" strokeWidth="1.4" />
                <path d="M9.5 9.5l2.5 2.5" stroke="#9ca3af" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Search products…"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                style={{ ...inputSt, paddingLeft: "2rem" }}
              />
            </div>

            {/* Product grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                gap: "0.5rem",
                maxHeight: 220,
                overflowY: "auto",
                padding: "0.25rem",
              }}
            >
              {filteredProducts.length > 0 ? filteredProducts.map((product) => {
                const selected = previewProduct?.id === product.id;
                return (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => {
                      setPreviewProduct(product);
                      setProductGalleryImages(product.images || []);
                      syncProductDetails(product);
                    }}
                    style={{
                      padding: 0,
                      border: selected ? "2px solid #3b82f6" : T.border,
                      borderRadius: T.radiusSm,
                      overflow: "hidden",
                      background: "#fff",
                      cursor: "pointer",
                      textAlign: "left",
                      boxShadow: selected ? "0 0 0 3px rgba(59,130,246,0.15)" : T.shadow,
                      transition: "all 0.15s",
                      position: "relative",
                    }}
                  >
                    {selected && (
                      <span
                        style={{
                          position: "absolute",
                          top: 5,
                          right: 5,
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          background: "#3b82f6",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          zIndex: 1,
                        }}
                      >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    )}
                    <div
                      style={{
                        height: 76,
                        background: product.imageUrl ? `url(${product.imageUrl}) center/cover` : "#f3f4f6",
                        position: "relative",
                      }}
                    >
                      {!product.imageUrl && (
                        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <rect x="3" y="3" width="18" height="18" rx="3" stroke="#d1d5db" strokeWidth="1.5" />
                            <path d="M3 17l5-5 4 4 3-3 6 6" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div style={{ padding: "0.3rem 0.4rem" }}>
                      <p style={{ margin: 0, fontSize: "0.68rem", color: "#374151", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {product.title}
                      </p>
                      {product.price && (
                        <p style={{ margin: "0.1rem 0 0", fontSize: "0.65rem", color: "#6b7280" }}>{product.price}</p>
                      )}
                    </div>
                  </button>
                );
              }) : (
                <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "1.5rem", color: "#9ca3af", fontSize: "0.8rem" }}>
                  {products.length === 0 ? "No products in your store yet." : "No products match your search."}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Non-Shopify URL input */}
        {productSource !== "shopify" && (
          <div style={{ marginTop: "0.75rem" }}>
            <label style={labelSt}>{sourceLabel} product link</label>
            <p style={hintSt}>Paste a valid {sourceLabel} product URL to import product data</p>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input
                type="url"
                placeholder={`https://…`}
                value={productUrl}
                onChange={(e) => setProductUrl(e.target.value)}
                style={{ ...inputSt, flex: 1 }}
              />
              <button
                type="button"
                disabled={!productUrl.trim()}
                style={{
                  padding: "0.5rem 0.875rem",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  borderRadius: T.radiusSm,
                  border: "none",
                  background: productUrl.trim() ? "#3b82f6" : "#e5e7eb",
                  color: productUrl.trim() ? "#fff" : "#9ca3af",
                  cursor: productUrl.trim() ? "pointer" : "not-allowed",
                  whiteSpace: "nowrap",
                  transition: "all 0.15s",
                }}
              >
                Import
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.5rem" }}>
        <Link
          to="/app"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.8rem", color: "#6b7280", textDecoration: "none" }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M11 7H3M7 3L3 7l4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to dashboard
        </Link>
        <Link
          to="/app/product-import/images"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.3rem",
            padding: "0.5rem 1.25rem",
            fontSize: "0.8rem",
            fontWeight: 600,
            borderRadius: T.radius,
            background: "#3b82f6",
            color: "#fff",
            textDecoration: "none",
          }}
        >
          Continue to images
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
