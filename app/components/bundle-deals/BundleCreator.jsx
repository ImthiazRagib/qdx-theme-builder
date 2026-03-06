import { useState } from "react";
import { useLoaderData } from "react-router";

const border = "1px solid #e5e7eb";
const borderActive = "1px solid #3b82f6";
const radius = "6px";
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

const MIN_PRODUCTS = 3;

const parsePrice = (str) => {
  if (!str || typeof str !== "string") return 0;
  const num = parseFloat(str.replace(/[^0-9.]/g, "")) || 0;
  return num;
};

const formatPrice = (num) => (Number.isFinite(num) ? `$${num.toFixed(2)}` : "$0.00");

export default function BundleCreator() {
  const { products = [] } = useLoaderData() ?? {};
  const [step, setStep] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const [bundlePrices, setBundlePrices] = useState({});
  const [bundleTotalPrice, setBundleTotalPrice] = useState("");

  const selected = products.filter((p) => selectedIds.includes(p.id));
  const canProceed = selectedIds.length >= MIN_PRODUCTS;
  const combinedOriginal = selected.reduce((sum, p) => sum + parsePrice(p.price), 0);

  const toggleProduct = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const setProductPrice = (id, value) => {
    setBundlePrices((prev) => ({ ...prev, [id]: value }));
  };

  const getProductPrice = (product) => {
    const override = bundlePrices[product.id];
    if (override !== undefined && override !== "") return parsePrice(override);
    return parsePrice(product.price);
  };

  const totalFromIndividual = selected.reduce((sum, p) => sum + getProductPrice(p), 0);
  const displayBundlePrice =
    bundleTotalPrice !== "" ? parsePrice(bundleTotalPrice) : totalFromIndividual;
  const savings = combinedOriginal - displayBundlePrice;
  const savingsPercent =
    combinedOriginal > 0 ? ((savings / combinedOriginal) * 100).toFixed(0) : 0;

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "8px",
        border: "1px solid #e5e7eb",
        padding: "1.5rem",
        maxWidth: 640,
      }}
    >
      {/* Stepper */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "1.5rem",
        }}
      >
        {[1, 2, 3].map((s) => (
          <div key={s} style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <button
              type="button"
              onClick={() => setStep(s)}
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: step === s ? borderActive : border,
                background: step >= s ? (step === s ? "#3b82f6" : "#eff6ff") : "#fff",
                color: step >= s ? (step === s ? "#fff" : "#3b82f6") : "#9ca3af",
                fontWeight: 600,
                fontSize: "0.875rem",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              {s}
            </button>
            {s < 3 && (
              <div
                style={{
                  flex: 1,
                  height: 2,
                  background: step > s ? "#3b82f6" : "#e5e7eb",
                  margin: "0 0.5rem",
                }}
              />
            )}
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "0.75rem",
          color: "#64748b",
          marginTop: "-0.5rem",
          marginBottom: "1rem",
        }}
      >
        <span>Select products</span>
        <span>Update prices</span>
        <span>Preview</span>
      </div>

      {/* Step 1: Select products */}
      {step === 1 && (
        <>
          <p style={{ ...labelStyle, marginBottom: "0.75rem" }}>
            Select at least {MIN_PRODUCTS} products from your Shopify store
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
              gap: "0.5rem",
              maxHeight: 280,
              overflowY: "auto",
              padding: "0.5rem",
              border,
              borderRadius: radius,
              background: "#fafafa",
            }}
          >
            {products.map((product) => {
              const isSelected = selectedIds.includes(product.id);
              return (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => toggleProduct(product.id)}
                  style={{
                    padding: 0,
                    border: isSelected ? borderActive : border,
                    borderRadius: radius,
                    overflow: "hidden",
                    background: "#fff",
                    cursor: "pointer",
                    textAlign: "left",
                    position: "relative",
                  }}
                >
                  {isSelected && (
                    <span
                      style={{
                        position: "absolute",
                        top: 4,
                        right: 4,
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        background: "#3b82f6",
                        color: "#fff",
                        fontSize: "0.7rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1,
                      }}
                    >
                      ✓
                    </span>
                  )}
                  <div
                    style={{
                      height: 80,
                      background: product.imageUrl
                        ? `url(${product.imageUrl}) center/cover`
                        : "#e5e7eb",
                    }}
                  />
                  <div style={{ padding: "0.35rem 0.5rem", fontSize: "0.75rem", color: "#374151" }}>
                    {product.title}
                  </div>
                </button>
              );
            })}
          </div>
          {products.length === 0 ? (
            <p style={{ fontSize: "0.8125rem", color: "#64748b", marginTop: "0.5rem" }}>
              No products in your store yet.
            </p>
          ) : (
            <p style={{ fontSize: "0.8125rem", color: "#64748b", marginTop: "0.5rem" }}>
              {selectedIds.length} selected (minimum {MIN_PRODUCTS})
            </p>
          )}
        </>
      )}

      {/* Step 2: Update prices */}
      {step === 2 && (
        <>
          <p style={{ ...labelStyle, marginBottom: "0.75rem" }}>
            Set individual prices or a single bundle price
          </p>
          <div style={{ marginBottom: "1rem" }}>
            <label style={labelStyle}>Bundle total price (optional)</label>
            <input
              type="text"
              placeholder={formatPrice(totalFromIndividual)}
              value={bundleTotalPrice}
              onChange={(e) => setBundleTotalPrice(e.target.value)}
              style={inputStyle}
            />
            <p style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "0.25rem" }}>
              Leave blank to use sum of individual prices
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {selected.map((product) => (
              <div
                key={product.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.5rem",
                  border,
                  borderRadius: radius,
                  background: "#fff",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: radius,
                    background: product.imageUrl
                      ? `url(${product.imageUrl}) center/cover`
                      : "#e5e7eb",
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: "0.8125rem",
                      fontWeight: 500,
                      color: "#111827",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {product.title}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#64748b" }}>
                    Original: {product.price || "$0.00"}
                  </div>
                </div>
                <input
                  type="text"
                  placeholder={product.price || "0.00"}
                  value={bundlePrices[product.id] ?? ""}
                  onChange={(e) => setProductPrice(product.id, e.target.value)}
                  style={{ ...inputStyle, width: 90, margin: 0 }}
                />
              </div>
            ))}
          </div>
        </>
      )}

      {/* Step 3: Preview */}
      {step === 3 && (
        <>
          <p style={{ ...labelStyle, marginBottom: "0.75rem" }}>Bundle preview</p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
              gap: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            {selected.map((product) => (
              <div
                key={product.id}
                style={{
                  border,
                  borderRadius: radius,
                  overflow: "hidden",
                  background: "#fff",
                }}
              >
                <div
                  style={{
                    height: 100,
                    background: product.imageUrl
                      ? `url(${product.imageUrl}) center/cover`
                      : "#e5e7eb",
                  }}
                />
                <div style={{ padding: "0.5rem" }}>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      color: "#111827",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {product.title}
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "#64748b", marginTop: "0.125rem" }}>
                    {formatPrice(getProductPrice(product))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              padding: "1rem",
              background: "#f8fafc",
              borderRadius: radius,
              border,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "0.8125rem", color: "#64748b" }}>
                Original total:
              </span>
              <span style={{ fontSize: "0.8125rem", textDecoration: "line-through", color: "#94a3b8" }}>
                {formatPrice(combinedOriginal)}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#111827" }}>
                Bundle price:
              </span>
              <span style={{ fontSize: "1.125rem", fontWeight: 700, color: "#059669" }}>
                {formatPrice(displayBundlePrice)}
              </span>
            </div>
            {savings > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "0.8125rem", color: "#64748b" }}>You save:</span>
                <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#059669" }}>
                  {formatPrice(savings)} ({savingsPercent}%)
                </span>
              </div>
            )}
          </div>
        </>
      )}

      {/* Navigation */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1.5rem",
          paddingTop: "1rem",
          borderTop: border,
        }}
      >
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={step === 1}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "0.875rem",
            fontWeight: 500,
            borderRadius: radius,
            border,
            background: "#fff",
            color: step === 1 ? "#9ca3af" : "#374151",
            cursor: step === 1 ? "not-allowed" : "pointer",
          }}
        >
          Back
        </button>
        {step < 3 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            disabled={step === 1 && !canProceed}
            style={{
              padding: "0.5rem 1rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              borderRadius: radius,
              border: "none",
              background: step === 1 && !canProceed ? "#e5e7eb" : "#3b82f6",
              color: step === 1 && !canProceed ? "#9ca3af" : "#fff",
              cursor: step === 1 && !canProceed ? "not-allowed" : "pointer",
            }}
          >
            {step === 1 ? "Proceed to prices" : "Preview bundle"}
          </button>
        ) : (
          <button
            type="button"
            style={{
              padding: "0.5rem 1rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              borderRadius: radius,
              border: "none",
              background: "#059669",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Save bundle
          </button>
        )}
      </div>
    </div>
  );
}
