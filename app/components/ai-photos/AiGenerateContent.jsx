import { useState } from "react";

const border = "1px solid #e5e7eb";
const radius = "6px";

const inputStyle = {
  padding: "0.5rem 0.75rem",
  fontSize: "0.875rem",
  borderRadius: radius,
  border,
  background: "#fff",
  color: "#374151",
  width: "100%",
  boxSizing: "border-box",
};

const cardStyle = {
  background: "#f9fafb",
  borderRadius: radius,
  border,
  padding: "1rem",
  minHeight: 120,
};

function GeneratePhotosPanel() {
  const [prompt, setPrompt] = useState("");
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
    <div style={{ maxWidth: 640 }}>
      <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.75rem" }}>
        Describe the product or scene. AI will generate product-ready images.
      </p>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. Leather wallet on marble surface, soft lighting"
          style={{ ...inputStyle, flex: "1", minWidth: 200 }}
          aria-label="Photo prompt"
        />
        <button
          type="button"
          onClick={handleGenerate}
          disabled={generating || !prompt.trim()}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "0.875rem",
            fontWeight: 500,
            borderRadius: radius,
            border: "none",
            background: "#2563eb",
            color: "#fff",
            cursor: generating ? "wait" : "pointer",
            opacity: generating || !prompt.trim() ? 0.7 : 1,
          }}
        >
          {generating ? "Generating…" : "Generate photos"}
        </button>
      </div>
      <div style={cardStyle}>
        {resultUrls.length > 0 ? (
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {resultUrls.map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`Generated ${i + 1}`}
                style={{ width: 120, height: 120, objectFit: "cover", borderRadius: radius }}
              />
            ))}
          </div>
        ) : (
          <p style={{ fontSize: "0.875rem", color: "#9ca3af", margin: 0 }}>
            Generated photos will appear here. Enter a prompt and click Generate.
          </p>
        )}
      </div>
    </div>
  );
}

function GenerateVideosPanel() {
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [resultUrl, setResultUrl] = useState(null);

  const handleGenerate = () => {
    setGenerating(true);
    setResultUrl(null);
    setTimeout(() => {
      setGenerating(false);
      setResultUrl("https://placehold.co/640x360?text=AI+video+placeholder");
    }, 2000);
  };

  return (
    <div style={{ maxWidth: 640 }}>
      <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.75rem" }}>
        Describe the product video you want. AI will create a short clip for listings or ads.
      </p>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. Product rotating 360° on white background"
          style={{ ...inputStyle, flex: "1", minWidth: 200 }}
          aria-label="Video prompt"
        />
        <button
          type="button"
          onClick={handleGenerate}
          disabled={generating || !prompt.trim()}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "0.875rem",
            fontWeight: 500,
            borderRadius: radius,
            border: "none",
            background: "#2563eb",
            color: "#fff",
            cursor: generating ? "wait" : "pointer",
            opacity: generating || !prompt.trim() ? 0.7 : 1,
          }}
        >
          {generating ? "Generating…" : "Generate video"}
        </button>
      </div>
      <div style={cardStyle}>
        {resultUrl ? (
          <div
            style={{
              width: "100%",
              maxWidth: 400,
              aspectRatio: "16/9",
              background: "#e5e7eb",
              borderRadius: radius,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#6b7280",
              fontSize: "0.875rem",
            }}
          >
            Video ready (placeholder)
          </div>
        ) : (
          <p style={{ fontSize: "0.875rem", color: "#9ca3af", margin: 0 }}>
            Generated video will appear here. Enter a prompt and click Generate.
          </p>
        )}
      </div>
    </div>
  );
}

function ProductDescriptionPanel() {
  const [productName, setProductName] = useState("");
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
    <div style={{ maxWidth: 640 }}>
      <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.75rem" }}>
        Add product name and optional keywords. AI will write a compelling description.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1rem" }}>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Product name"
          style={inputStyle}
          aria-label="Product name"
        />
        <input
          type="text"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="Keywords (optional) e.g. organic, handmade, luxury"
          style={inputStyle}
          aria-label="Keywords"
        />
        <button
          type="button"
          onClick={handleGenerate}
          disabled={generating || !productName.trim()}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "0.875rem",
            fontWeight: 500,
            borderRadius: radius,
            border: "none",
            background: "#2563eb",
            color: "#fff",
            cursor: generating ? "wait" : "pointer",
            opacity: generating || !productName.trim() ? 0.7 : 1,
            alignSelf: "flex-start",
          }}
        >
          {generating ? "Generating…" : "Generate description"}
        </button>
      </div>
      <div style={cardStyle}>
        {description ? (
          <p style={{ fontSize: "0.875rem", color: "#374151", margin: 0, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
            {description}
          </p>
        ) : (
          <p style={{ fontSize: "0.875rem", color: "#9ca3af", margin: 0 }}>
            Generated description will appear here. Enter a product name and click Generate.
          </p>
        )}
      </div>
    </div>
  );
}

export default function AiGenerateContent({ activeTab }) {
  return (
    <>
      {activeTab === "photos" && <GeneratePhotosPanel />}
      {activeTab === "videos" && <GenerateVideosPanel />}
      {activeTab === "description" && <ProductDescriptionPanel />}
    </>
  );
}
