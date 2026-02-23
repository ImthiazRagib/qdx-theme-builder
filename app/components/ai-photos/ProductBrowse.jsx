const cardStyle = {
  background: "#fff",
  borderRadius: "6px",
  border: "1px solid #e5e7eb",
  padding: "0.75rem 1rem",
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
};

export default function ProductBrowse({ products = [], error, onSelectProduct }) {
  if (error) {
    return (
      <p style={{ fontSize: "0.8125rem", color: "#b91c1c", margin: 0 }}>
        {error}
      </p>
    );
  }

  if (products.length === 0) {
    return (
      <p style={{ fontSize: "0.8125rem", color: "#71717a", margin: 0 }}>
        No products in your store yet.
      </p>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "0.5rem",
        maxHeight: 320,
        overflowY: "auto",
      }}
    >
      {products.map((product) => (
        <button
          key={product.id}
          type="button"
          onClick={() => onSelectProduct?.(product)}
          style={{
            ...cardStyle,
            width: "100%",
            textAlign: "left",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "6px",
              background: "#f4f4f5",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#a1a1aa",
                  fontSize: "0.75rem",
                }}
              >
                —
              </div>
            )}
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div
              style={{
                fontSize: "0.8125rem",
                fontWeight: 500,
                color: "#18181b",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {product.title}
            </div>
            {product.handle && (
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "#71717a",
                  marginTop: "0.125rem",
                }}
              >
                {product.handle}
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
