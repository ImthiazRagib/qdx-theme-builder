import { useState, useRef } from "react";
import { Link } from "react-router";

const border = "1px solid #e5e7eb";
const radius = "6px";

function addFilesToImages(files, setImages) {
  const valid = Array.from(files || []).filter((f) => f.type.startsWith("image/"));
  const newUrls = valid.map((f) => URL.createObjectURL(f));
  setImages((prev) => [...prev, ...newUrls]);
}

export default function ProductImageUpload() {
  const [images, setImages] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    addFilesToImages(e.target.files, setImages);
    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    addFilesToImages(e.dataTransfer.files, setImages);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const removeImage = (index) => {
    const url = images[index];
    setImages((prev) => prev.filter((_, i) => i !== index));
    if (url) URL.revokeObjectURL(url);
  };

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      {/* Add images: button + drag-and-drop zone */}
      <div style={{ marginBottom: "1.25rem" }}>
        <label
          style={{
            fontSize: "0.8125rem",
            fontWeight: 500,
            color: "#374151",
            marginBottom: "0.25rem",
            display: "block",
          }}
        >
          Upload product images
        </label>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            style={{
              padding: "0.5rem 0.75rem",
              fontSize: "0.8125rem",
              fontWeight: 500,
              borderRadius: radius,
              border,
              background: "#fff",
              cursor: "pointer",
              color: "#374151",
            }}
          >
            Add images
          </button>
          <span style={{ fontSize: "0.8125rem", color: "#64748b" }}>
            {images.length} image{images.length !== 1 ? "s" : ""} in gallery
          </span>
        </div>
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          style={{
            marginTop: "0.75rem",
            padding: "1.25rem",
            border: `2px dashed ${dragOver ? "#3b82f6" : "#e2e8f0"}`,
            borderRadius: radius,
            background: dragOver ? "#eff6ff" : "#f8fafc",
            textAlign: "center",
            fontSize: "0.8125rem",
            color: "#64748b",
            cursor: "pointer",
          }}
        >
          {dragOver ? "Drop images here" : "Or drag and drop multiple images here"}
        </div>
      </div>

      {/* Gallery: horizontal product images */}
      <div style={{ marginTop: "1rem" }}>
        <div
          style={{
            fontSize: "0.8125rem",
            fontWeight: 500,
            color: "#374151",
            marginBottom: "0.5rem",
            display: "block",
          }}
        >
          Gallery
        </div>
        {images.length > 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "0.75rem",
              overflowX: "auto",
              paddingBottom: "0.5rem",
              minHeight: 140,
              alignItems: "center",
            }}
          >
            {images.map((url, index) => (
              <div
                key={`${url}-${index}`}
                style={{
                  flex: "0 0 auto",
                  position: "relative",
                  width: 120,
                  height: 120,
                  borderRadius: radius,
                  overflow: "hidden",
                  border,
                  background: "#f8fafc",
                }}
              >
                <img
                  src={url}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(index);
                  }}
                  aria-label="Remove image"
                  style={{
                    position: "absolute",
                    top: "0.25rem",
                    right: "0.25rem",
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    border: "none",
                    background: "rgba(0,0,0,0.6)",
                    color: "#fff",
                    cursor: "pointer",
                    fontSize: "0.875rem",
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
              padding: "1.5rem",
              border: "1px solid #e5e7eb",
              borderRadius: radius,
              background: "#f8fafc",
              textAlign: "center",
              fontSize: "0.8125rem",
              color: "#94a3b8",
            }}
          >
            No images in gallery yet. Add images above to see them here.
          </div>
        )}
      </div>
      <div
          style={{
            marginTop: "1.5rem",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Link
            to="/app/theme-builder"
            style={{
              width: "100%",
              textAlign: "center",
              padding: "0.5rem 1.25rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              borderRadius: "6px",
              border: "none",
              background: "#374151",
              color: "#fff",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Next
          </Link>
        </div>
    </div>
  );
}
