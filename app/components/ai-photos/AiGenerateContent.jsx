import { useState, useEffect } from "react";
import ProductImageSelector from "./ProductImageSelector";

const inputStyle = {
  padding: "0.5rem 0.75rem",
  fontSize: "0.8125rem",
  borderRadius: "6px",
  border: "1px solid #e5e7eb",
  background: "#fff",
  color: "#18181b",
  width: "100%",
  boxSizing: "border-box",
};

const cardStyle = {
  background: "#fff",
  borderRadius: "6px",
  border: "1px solid #e5e7eb",
  padding: "1.25rem",
  minHeight: 140,
};

const btnPrimary = {
  padding: "0.5rem 1rem",
  fontSize: "0.8125rem",
  fontWeight: 500,
  borderRadius: "6px",
  border: "none",
  background: "#18181b",
  color: "#fff",
  cursor: "pointer",
};

function GeneratePhotosPanel({ selectedProduct }) {
  const [prompt, setPrompt] = useState("");
  useEffect(() => {
    if (selectedProduct?.title) setPrompt(selectedProduct.title);
  }, [selectedProduct]);
  const [generating, setGenerating] = useState(false);
  const [resultUrls, setResultUrls] = useState([]);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setResultUrls((prev) => [...prev, "https://placehold.co/400x400?text=AI+photo"]);
    }, 1500);
  };

  return (
    <div style={{ maxWidth: 560 }}>
      {selectedProduct?.images?.length > 0 && (
        <ProductImageSelector
          key={selectedProduct.id}
          images={selectedProduct.images}
          onSelectionChange={() => {}}
        />
      )}
      <label style={{ display: "block", fontSize: "0.8125rem", color: "#71717a", marginBottom: "0.5rem" }}>
        Prompt
      </label>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. Leather wallet on marble, soft lighting"
          style={{ ...inputStyle, flex: 1 }}
          aria-label="Photo prompt"
        />
        <button
          type="button"
          onClick={handleGenerate}
          disabled={generating || !prompt.trim()}
          style={{
            ...btnPrimary,
            opacity: generating || !prompt.trim() ? 0.5 : 1,
            cursor: generating || !prompt.trim() ? "not-allowed" : "pointer",
          }}
        >
          {generating ? "…" : "Generate"}
        </button>
      </div>
      <div style={cardStyle}>
        {resultUrls.length > 0 ? (
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {resultUrls.map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`Generated ${i + 1}`}
                style={{ width: 100, height: 100, objectFit: "cover", borderRadius: "6px" }}
              />
            ))}
          </div>
        ) : (
          <p style={{ fontSize: "0.8125rem", color: "#a1a1aa", margin: 0 }}>
            Results will appear here.
          </p>
        )}
      </div>
    </div>
  );
}

function GenerateVideosPanel({ selectedProduct }) {
  const [prompt, setPrompt] = useState("");
  useEffect(() => {
    if (selectedProduct?.title) setPrompt(selectedProduct.title);
  }, [selectedProduct]);
  const [generating, setGenerating] = useState(false);
  const [resultUrl, setResultUrl] = useState(null);

  const handleGenerate = () => {
    setGenerating(true);
    setResultUrl(null);
    setTimeout(() => {
      setGenerating(false);
      setResultUrl(true);
    }, 2000);
  };

  return (
    <div style={{ maxWidth: 560 }}>
      {selectedProduct?.images?.length > 0 && (
        <ProductImageSelector
          key={selectedProduct.id}
          images={selectedProduct.images}
          onSelectionChange={() => {}}
        />
      )}
      <label style={{ display: "block", fontSize: "0.8125rem", color: "#71717a", marginBottom: "0.5rem" }}>
        Prompt
      </label>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. Product 360° on white"
          style={{ ...inputStyle, flex: 1 }}
          aria-label="Video prompt"
        />
        <button
          type="button"
          onClick={handleGenerate}
          disabled={generating || !prompt.trim()}
          style={{
            ...btnPrimary,
            opacity: generating || !prompt.trim() ? 0.5 : 1,
            cursor: generating || !prompt.trim() ? "not-allowed" : "pointer",
          }}
        >
          {generating ? "…" : "Generate"}
        </button>
      </div>
      <div style={cardStyle}>
        {resultUrl ? (
          <div
            style={{
              width: "100%",
              maxWidth: 360,
              aspectRatio: "16/9",
              background: "#f4f4f5",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#71717a",
              fontSize: "0.8125rem",
            }}
          >
            Video ready
          </div>
        ) : (
          <p style={{ fontSize: "0.8125rem", color: "#a1a1aa", margin: 0 }}>
            Results will appear here.
          </p>
        )}
      </div>
    </div>
  );
}

function ProductDescriptionPanel({ selectedProduct }) {
  const [productName, setProductName] = useState("");
  useEffect(() => {
    if (selectedProduct?.title) setProductName(selectedProduct.title);
  }, [selectedProduct]);
  const [keywords, setKeywords] = useState("");
  const [generating, setGenerating] = useState(false);
  const [description, setDescription] = useState("");

  const handleGenerate = () => {
    setGenerating(true);
    setDescription("");
    setTimeout(() => {
      setGenerating(false);
      setDescription(
        "Premium quality product designed for everyday use. Crafted with attention to detail and built to last. Perfect for gifting or personal use. Features durable materials and a timeless design that fits any style."
      );
    }, 1800);
  };

  return (
    <div style={{ maxWidth: 560 }}>
      {selectedProduct?.images?.length > 0 && (
        <ProductImageSelector
          key={selectedProduct.id}
          images={selectedProduct.images}
          onSelectionChange={() => {}}
        />
      )}
      <label style={{ display: "block", fontSize: "0.8125rem", color: "#71717a", marginBottom: "0.5rem" }}>
        Product name
      </label>
      <input
        type="text"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        placeholder="Enter product name"
        style={{ ...inputStyle, marginBottom: "0.75rem" }}
        aria-label="Product name"
      />
      <label style={{ display: "block", fontSize: "0.8125rem", color: "#71717a", marginBottom: "0.5rem" }}>
        Keywords (optional)
      </label>
      <input
        type="text"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        placeholder="e.g. organic, handmade"
        style={{ ...inputStyle, marginBottom: "1rem" }}
        aria-label="Keywords"
      />
      <button
        type="button"
        onClick={handleGenerate}
        disabled={generating || !productName.trim()}
        style={{
          ...btnPrimary,
          opacity: generating || !productName.trim() ? 0.5 : 1,
          cursor: generating || !productName.trim() ? "not-allowed" : "pointer",
          marginBottom: "1rem",
        }}
      >
        {generating ? "…" : "Generate"}
      </button>
      <div style={cardStyle}>
        {description ? (
          <p style={{ fontSize: "0.8125rem", color: "#18181b", margin: 0, lineHeight: 1.6 }}>
            {description}
          </p>
        ) : (
          <p style={{ fontSize: "0.8125rem", color: "#a1a1aa", margin: 0 }}>
            Results will appear here.
          </p>
        )}
      </div>
    </div>
  );
}

export default function AiGenerateContent({ activeTab, selectedProduct }) {
  return (
    <>
      {activeTab === "photos" && <GeneratePhotosPanel selectedProduct={selectedProduct} />}
      {activeTab === "videos" && <GenerateVideosPanel selectedProduct={selectedProduct} />}
      {activeTab === "description" && <ProductDescriptionPanel selectedProduct={selectedProduct} />}
    </>
  );
}
