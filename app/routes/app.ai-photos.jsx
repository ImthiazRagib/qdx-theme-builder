import { useState } from "react";
import { useLoaderData } from "react-router";
import { authenticate } from "../shopify.server";
import AiGenerateTabs from "../components/ai-photos/AiGenerateTabs";
import AiGenerateContent from "../components/ai-photos/AiGenerateContent";
import ProductBrowse from "../components/ai-photos/ProductBrowse";

const PRODUCTS_QUERY = `#graphql
  query products($first: Int!) {
    products(first: $first) {
      nodes {
        id
        title
        handle
        featuredImage {
          url
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  let products = [];
  let error = null;
  try {
    const response = await admin.graphql(PRODUCTS_QUERY, {
      variables: { first: 50 },
    });
    const json = await response.json();
    if (json.data?.products?.nodes) {
      products = json.data.products.nodes.map((p) => ({
        id: p.id,
        title: p.title,
        handle: p.handle,
        imageUrl: p.featuredImage?.url ?? null,
      }));
    }
  } catch (e) {
    error = e?.message ?? "Failed to load products";
  }
  return { products, error };
};

export default function AiPhotosPage() {
  const [activeTab, setActiveTab] = useState("photos");
  const [showBrowse, setShowBrowse] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { products = [], error } = useLoaderData() ?? {};

  return (
    <s-page heading="AI Photos">
      <s-section heading="Generate">
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
          <button
            type="button"
            onClick={() => setShowBrowse((v) => !v)}
            style={{
              padding: "0.375rem 0.75rem",
              fontSize: "0.8125rem",
              fontWeight: 500,
              borderRadius: "6px",
              border: "1px solid #e5e7eb",
              background: "#fff",
              color: "#18181b",
              cursor: "pointer",
            }}
          >
            {showBrowse ? "Hide products" : "Browse products"}
          </button>
          {selectedProduct && (
            <span style={{ fontSize: "0.8125rem", color: "#71717a" }}>
              Selected: {selectedProduct.title}
            </span>
          )}
        </div>
        {showBrowse && (
          <div style={{ marginBottom: "1.5rem" }}>
            <p style={{ fontSize: "0.8125rem", color: "#71717a", margin: "0 0 0.5rem 0" }}>
              Select a product to use for generation
            </p>
            <ProductBrowse
              products={products}
              error={error}
              onSelectProduct={(p) => {
                setSelectedProduct(p);
                setShowBrowse(false);
              }}
            />
          </div>
        )}
        <AiGenerateTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <AiGenerateContent activeTab={activeTab} selectedProduct={selectedProduct} />
      </s-section>
    </s-page>
  );
}
