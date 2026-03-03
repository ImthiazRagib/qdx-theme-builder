import { authenticate } from "../shopify.server";
import SelectProductSource from "../components/product-import/select-product-source";

const PRODUCTS_QUERY = `#graphql
  query products($first: Int!) {
    products(first: $first) {
      nodes {
        id
        title
        handle
        descriptionHtml
        featuredImage {
          url
        }
        priceRangeV2 {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        media(first: 20) {
          nodes {
            ... on MediaImage {
              image {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  let products = [];
  try {
    const response = await admin.graphql(PRODUCTS_QUERY, { variables: { first: 50 } });
    const json = await response.json();
    if (json.data?.products?.nodes) {
      products = json.data.products.nodes.map((p) => {
        const mediaUrls = (p.media?.nodes ?? []).map((n) => n.image?.url).filter(Boolean);
        const imageUrl = p.featuredImage?.url ?? mediaUrls[0] ?? null;
        const images = mediaUrls.length > 0 ? mediaUrls : (imageUrl ? [imageUrl] : []);
        const price = p.priceRangeV2?.minVariantPrice;
        const priceStr = price
          ? `${price.currencyCode === "USD" ? "$" : price.currencyCode + " "}${Number(price.amount).toFixed(2)}`
          : null;
        return {
          id: p.id,
          title: p.title,
          handle: p.handle,
          descriptionHtml: p.descriptionHtml || "",
          imageUrl,
          images,
          price: priceStr,
        };
      });
    }
  } catch (e) {
    console.error("Failed to load products:", e);
  }
  return { products };
};

export default function ProductImportIndex() {
  return (
    <s-page heading="Import from storefront">
      <s-section>
        <SelectProductSource />
      </s-section>
    </s-page>
  );
}
