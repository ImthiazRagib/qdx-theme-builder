import { Link } from "react-router";
import { authenticate } from "../shopify.server";
import ProductImageUpload from "../components/product-import/product-image-upload";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function ProductImportImagesPage() {
  return (
    <s-page heading="Product images">
      <s-section heading="Upload and arrange images">
        <div
          style={{
            marginBottom: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            to="/app/product-import"
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
            Back to product source
          </Link>
        </div>
        <ProductImageUpload />
      </s-section>
    </s-page>
  );
}
