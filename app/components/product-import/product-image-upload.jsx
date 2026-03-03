import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { useThemeBuilder } from "../../context/theme.context";

const border = "1px solid #e5e7eb";
const radius = "6px";

export default function ProductImageUpload() {
  const { productGalleryImages, setProductGalleryImages, previewProduct } = useThemeBuilder();
  const fileInputRef = useRef(null);

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
    const valid = Array.from(e.dataTransfer.files || []).filter((f) => f.type.startsWith("image/"));
    const newUrls = valid.map((f) => URL.createObjectURL(f));
    setProductGalleryImages((prev) => [...prev, ...newUrls]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const removeImage = (index) => {
    const url = productGalleryImages[index];
    if (url?.startsWith("blob:")) {
      URL.revokeObjectURL(url);
    }
    setProductGalleryImages((prev) => prev.filter((_, i) => i !== index));
  };

  const images = productGalleryImages || [];

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
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
          Product images
        </label>
        <p style={{ fontSize: "0.75rem", color: "#64748b", margin: "0 0 0.5rem 0" }}>
          Add or remove images. These will appear in featured products and on the product page.
        </p>
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
            Add more images
          </button>
          <span style={{ fontSize: "0.8125rem", color: "#64748b" }}>
            {images.length} image{images.length !== 1 ? "s" : ""} in gallery
          </span>
        </div>
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
          style={{
            marginTop: "0.75rem",
            padding: "1.25rem",
            border: "2px dashed #e2e8f0",
            borderRadius: radius,
            background: "#f8fafc",
            textAlign: "center",
            fontSize: "0.8125rem",
            color: "#64748b",
            cursor: "pointer",
          }}
        >
          Or drag and drop images here
        </div>
      </div>

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
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
              gap: "0.75rem",
            }}
          >
            {images.map((url, index) => (
              <div
                key={`${url}-${index}`}
                style={{
                  position: "relative",
                  aspectRatio: "1",
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
              border,
              borderRadius: radius,
              background: "#f8fafc",
              textAlign: "center",
              fontSize: "0.8125rem",
              color: "#94a3b8",
            }}
          >
            No images yet. Add images above or select a product from the product source page first.
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
          View in theme builder
        </Link>
      </div>
    </div>
  );
}
