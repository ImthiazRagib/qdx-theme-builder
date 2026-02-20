import { redirect, useLoaderData } from "react-router";
import { authenticate } from "../shopify.server";

const parseProductsFromHtml = (html, pageUrl) => {
  const products = [];

  // Try to detect a main product via Open Graph tags
  const ogTitleMatch =
    html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i) ||
    html.match(/<title>([^<]+)<\/title>/i);
  const ogDescMatch =
    html.match(
      /<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i,
    ) || html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i);

  const imageMatches = [
    ...html.matchAll(
      /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/gi,
    ),
  ];

  if (ogTitleMatch) {
    products.push({
      id: "primary",
      name: ogTitleMatch[1].trim(),
      description: ogDescMatch ? ogDescMatch[1].trim() : "",
      url: pageUrl,
      images: imageMatches.map((m) => m[1]),
    });
  }

  // If nothing detected, fall back to a single placeholder entry
  if (products.length === 0) {
    products.push({
      id: "fallback",
      name: "Unable to detect products",
      description:
        "We fetched the page but could not reliably detect product information. You can still use this as a starting point.",
      url: pageUrl,
      images: [],
    });
  }

  return products;
};

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  const url = new URL(request.url);
  const target = url.searchParams.get("url");

  if (!target) {
    throw redirect("/app/product-import");
  }

  let products = [];
  let error = null;

  try {
    const response = await fetch(target);
    if (!response.ok) {
      throw new Error(`Upstream response ${response.status}`);
    }
    const html = await response.text();
    products = parseProductsFromHtml(html, target);
  } catch (err) {
    error = "We couldn’t fetch that URL. Please check the link and try again.";
    products = [
      {
        id: "error",
        name: "Fetch failed",
        description: String(err),
        url: target,
        images: [],
      },
    ];
  }

  return { url: target, products, error };
};

export default function ProductImportReview() {
  const { url, products, error } = useLoaderData();

  return (
    <s-page heading="Imported products preview">
      <s-section
        heading="Detected products and media"
        actions={
          <s-button to="/app/product-import" variant="secondary">
            Back to URL input
          </s-button>
        }
      >
        <div
          style={{
            marginBottom: "0.9rem",
            fontSize: "0.8rem",
            color: "#4b5563",
          }}
        >
          <div>
            <span style={{ fontWeight: 500 }}>Source URL: </span>
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              style={{ color: "#1463ff", wordBreak: "break-all" }}
            >
              {url}
            </a>
          </div>
          {error && (
            <div style={{ marginTop: "0.4rem", color: "#b91c1c" }}>{error}</div>
          )}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1rem",
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                borderRadius: "0.9rem",
                border: "1px solid #e5e7eb",
                background: "white",
                padding: "0.9rem 0.9rem 1rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "0.8rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "#6b7280",
                    margin: 0,
                  }}
                >
                  Product
                </p>
                <h3
                  style={{
                    margin: "0.15rem 0 0",
                    fontSize: "0.98rem",
                    color: "#111827",
                  }}
                >
                  {product.name}
                </h3>
              </div>

              {product.description && (
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.8rem",
                    color: "#4b5563",
                  }}
                >
                  {product.description}
                </p>
              )}

              <div
                style={{
                  display: "flex",
                  gap: "0.4rem",
                  flexWrap: "wrap",
                  marginTop: "0.2rem",
                }}
              >
                {product.images.length > 0 ? (
                  product.images.map((src, index) => (
                    <div
                      key={src + index}
                      style={{
                        width: "4.25rem",
                        height: "4.25rem",
                        borderRadius: "0.5rem",
                        overflow: "hidden",
                        border: "1px solid #e5e7eb",
                        background: "#f3f4f6",
                      }}
                    >
                      <img
                        src={src}
                        alt={product.name || "Product image"}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    </div>
                  ))
                ) : (
                  <span
                    style={{
                      fontSize: "0.78rem",
                      color: "#9ca3af",
                    }}
                  >
                    No images detected
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </s-section>
    </s-page>
  );
}

