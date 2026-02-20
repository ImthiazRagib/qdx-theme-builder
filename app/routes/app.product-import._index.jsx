import { Form, useNavigation, useSearchParams } from "react-router";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  const url = new URL(request.url);
  const lastUrl = url.searchParams.get("url") || "";

  return { lastUrl };
};

export const action = async ({ request }) => {
  await authenticate.admin(request);

  const formData = await request.formData();
  const url = (formData.get("url") || "").toString().trim();

  const search = new URLSearchParams();
  if (url) search.set("url", url);

  // Let the review route handle the actual fetching/parsing
  return Response.redirect(`/app/product-import/review?${search.toString()}`, 302);
};

export default function ProductImportIndex() {
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const lastUrl = searchParams.get("url") || "";

  const isSubmitting = navigation.state === "submitting";

  return (
    <s-page heading="Import from storefront">
      <s-section heading="Paste a product or collection URL">
        <div
          style={{
            maxWidth: "34rem",
            background: "white",
            borderRadius: "0.9rem",
            border: "1px solid #e5e7eb",
            padding: "1.25rem 1.25rem 1.5rem",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "0.85rem",
              color: "#4b5563",
            }}
          >
            Paste a URL from your ecommerce storefront (product, collection, or
            landing page). We&apos;ll fetch the page and show detected product
            details and images on the next step.
          </p>

          <Form method="post" style={{ marginTop: "0.9rem" }}>
            <label
              style={{
                fontSize: "0.8rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.35rem",
              }}
            >
              <span style={{ fontWeight: 500 }}>Storefront URL</span>
              <input
                name="url"
                defaultValue={lastUrl}
                placeholder="https://your-store.com/products/awesome-product"
                style={{
                  width: "100%",
                  padding: "0.55rem 0.7rem",
                  borderRadius: "0.55rem",
                  border: "1px solid #d1d5db",
                  fontSize: "0.85rem",
                }}
                required
              />
            </label>

            <div
              style={{
                marginTop: "0.9rem",
                display: "flex",
                justifyContent: "flex-end",
                gap: "0.5rem",
              }}
            >
              <s-button variant="primary" loading={isSubmitting}>
                Fetch products
              </s-button>
            </div>
          </Form>
        </div>
      </s-section>
    </s-page>
  );
}

