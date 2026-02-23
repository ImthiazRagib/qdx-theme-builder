import { useState } from "react";
import { Link } from "react-router";

const PRODUCT_SOURCES = [
  { id: "shopify", label: "Shopify", icon: "🛒", color: "#22c55e" },
  { id: "aliexpress", label: "AliExpress", icon: "🔴", color: "#ef4444" },
  { id: "amazon", label: "Amazon", icon: "a", color: "#171717" },
  { id: "alibaba", label: "Alibaba", icon: "A", color: "#ea580c" },
  { id: "etsy", label: "Etsy", icon: "E", color: "#ea580c" },
  { id: "custom", label: "Custom website", icon: "🌐", color: "#64748b" },
];

const border = "1px solid #e5e7eb";
const borderActive = "1px solid #3b82f6";
const radius = "6px";
const gap = "0.75rem";
const labelStyle = {
  fontSize: "0.8125rem",
  fontWeight: 500,
  color: "#374151",
  marginBottom: "0.25rem",
  display: "block",
};
const inputStyle = {
  width: "100%",
  padding: "0.5rem 0.625rem",
  borderRadius: radius,
  border,
  fontSize: "0.8125rem",
  background: "#fff",
};

export default function SelectProductSource() {
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [storeLanguage, setStoreLanguage] = useState("english");
  const [researchContext, setResearchContext] = useState("none");
  const [themeMethod, setThemeMethod] = useState("template-library");
  const [templateSelected, setTemplateSelected] = useState("");
  const [productSource, setProductSource] = useState("aliexpress");
  const [productUrl, setProductUrl] = useState("");

  const sourceLabel = PRODUCT_SOURCES.find((s) => s.id === productSource)?.label ?? productSource;

  return (
    <div style={{ maxWidth: 560, margin: "0 auto" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <Link
          to="/app"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
            fontSize: "0.875rem",
            color: "#374151",
            textDecoration: "none",
          }}
        >
          <span style={{ fontSize: "1rem" }}>←</span>
          Select product source
        </Link>
        <Link
          to="/app/product-import/images"
          style={{
            padding: "0.4rem 1rem",
            fontSize: "0.8125rem",
            fontWeight: 500,
            borderRadius: radius,
            border,
            background: "#fff",
            color: "#374151",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          Proceed
        </Link>
      </div>

      {/* Info banner */}
      {!bannerDismissed && (
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: gap,
            padding: "0.625rem 0.75rem",
            background: "#f8fafc",
            border,
            borderRadius: radius,
            marginBottom: gap,
          }}
        >
          <span
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "#94a3b8",
              color: "#fff",
              fontSize: "0.6875rem",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            i
          </span>
          <p style={{ margin: 0, fontSize: "0.8125rem", color: "#475569", flex: 1 }}>
            Multi-product store generations are currently only available by using the
            Shopify product source.
          </p>
          <button
            type="button"
            onClick={() => setBannerDismissed(true)}
            aria-label="Dismiss"
            style={{
              background: "none",
              border: "none",
              color: "#94a3b8",
              cursor: "pointer",
              fontSize: "0.875rem",
              padding: 0,
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>
      )}

      <p style={{ margin: `0 0 ${gap}`, fontSize: "0.8125rem", color: "#64748b" }}>
        If you have products from other sources, please upload them to shopify first,
        then you will be able to generate a multi product store.
      </p>

      {/* Store language */}
      <div style={{ marginBottom: "1rem" }}>
        <label style={labelStyle}>Store language</label>
        <select
          value={storeLanguage}
          onChange={(e) => setStoreLanguage(e.target.value)}
          style={inputStyle}
        >
          <option value="english">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
        </select>
      </div>

      {/* Research context */}
      <div style={{ marginBottom: "1rem" }}>
        <label style={labelStyle}>Research context (Optional)</label>
        <p style={{ margin: "0 0 0.25rem", fontSize: "0.75rem", color: "#64748b" }}>
          Add ICP research to generate highly targeted direct response copy
        </p>
        <select
          value={researchContext}
          onChange={(e) => setResearchContext(e.target.value)}
          style={inputStyle}
        >
          <option value="none">None - Use auto-generated ICP</option>
          <option value="custom">Custom ICP</option>
        </select>
      </div>

      {/* Theme selection method */}
      <div style={{ marginBottom: "1rem" }}>
        <label style={labelStyle}>Theme selection method</label>
        <div style={{ display: "flex", gap: gap, flexWrap: "wrap" }}>
          <label
            style={{
              flex: "1 1 240px",
              padding: "0.75rem",
              borderRadius: radius,
              border: themeMethod === "template-library" ? borderActive : border,
              background: "#fff",
              cursor: "pointer",
              display: "flex",
              gap: "0.5rem",
              alignItems: "flex-start",
            }}
          >
            <input
              type="radio"
              name="themeMethod"
              checked={themeMethod === "template-library"}
              onChange={() => setThemeMethod("template-library")}
              style={{ marginTop: "0.15rem" }}
            />
            <div>
              <span style={{ fontSize: "0.8125rem", fontWeight: 500, color: "#111827" }}>
                Select from Template Library
              </span>
              <p style={{ margin: "0.2rem 0 0", fontSize: "0.75rem", color: "#64748b" }}>
                Select a template from the library to quickly set up your design
                foundation and visual layout.
              </p>
            </div>
          </label>
          <label
            style={{
              flex: "1 1 240px",
              padding: "0.75rem",
              borderRadius: radius,
              border: themeMethod === "existing-themes" ? borderActive : border,
              background: "#fff",
              cursor: "pointer",
              display: "flex",
              gap: "0.5rem",
              alignItems: "flex-start",
            }}
          >
            <input
              type="radio"
              name="themeMethod"
              checked={themeMethod === "existing-themes"}
              onChange={() => setThemeMethod("existing-themes")}
              style={{ marginTop: "0.15rem" }}
            />
            <div>
              <span style={{ fontSize: "0.8125rem", fontWeight: 500, color: "#111827" }}>
                Generate based on existing themes
              </span>
              <p style={{ margin: "0.2rem 0 0", fontSize: "0.75rem", color: "#64748b" }}>
                The layout and styles will carry over, while the content will be
                updated for your new product.
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Atlas theme template */}
      <div style={{ marginBottom: "1rem" }}>
        <label style={labelStyle}>Select an Atlas theme template</label>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <input
            type="text"
            placeholder="No template selected yet"
            value={templateSelected}
            onChange={(e) => setTemplateSelected(e.target.value)}
            style={{ ...inputStyle, flex: 1 }}
          />
          <button
            type="button"
            style={{
              padding: "0.5rem 0.75rem",
              fontSize: "0.8125rem",
              fontWeight: 500,
              borderRadius: radius,
              border,
              background: "#fff",
              cursor: "pointer",
              color: "#374151",
              whiteSpace: "nowrap",
            }}
          >
            Browse templates
          </button>
        </div>
      </div>

      {/* Select product source */}
      <div style={{ marginBottom: "1rem" }}>
        <label style={labelStyle}>Select product source:</label>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0.5rem",
          }}
        >
          {PRODUCT_SOURCES.map((src) => (
            <label
              key={src.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.5rem 0.625rem",
                borderRadius: radius,
                border: productSource === src.id ? borderActive : border,
                background: "#fff",
                cursor: "pointer",
              }}
            >
              <input
                type="radio"
                name="productSource"
                value={src.id}
                checked={productSource === src.id}
                onChange={() => setProductSource(src.id)}
              />
              <span
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "4px",
                  background: src.color,
                  color: "#fff",
                  fontSize: "0.6875rem",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 600,
                }}
              >
                {src.icon}
              </span>
              <span style={{ fontSize: "0.8125rem", fontWeight: 500, color: "#374151" }}>
                {src.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Product URL (dynamic by selected source) */}
      <div style={{ marginBottom: "1rem" }}>
        <label style={labelStyle}>{sourceLabel} product link:</label>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <input
            type="url"
            placeholder={`Paste a valid ${sourceLabel} product link`}
            value={productUrl}
            onChange={(e) => setProductUrl(e.target.value)}
            style={{ ...inputStyle, flex: 1 }}
          />
          <button
            type="button"
            style={{
              padding: "0.5rem 0.75rem",
              fontSize: "0.8125rem",
              fontWeight: 500,
              borderRadius: radius,
              border,
              background: "#fff",
              cursor: "pointer",
              color: "#374151",
              whiteSpace: "nowrap",
            }}
          >
            Import
          </button>
        </div>
      </div>
    </div>
  );
}
