import { useState } from "react";
import { authenticate } from "../shopify.server";
import BundleDealsTabs from "../components/bundle-deals/BundleDealsTabs";
import BundleCreator from "../components/bundle-deals/BundleCreator";
import DashboardTab from "../components/bundle-deals/DashboardTab";
import AnalyticsTab from "../components/bundle-deals/AnalyticsTab";

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

export default function BundleDealsPage() {
  const [activeTab, setActiveTab] = useState("create");

  return (
    <s-page heading="Bundle Deals">
      <s-section heading="Bundle Deals">
        <BundleDealsTabs activeTab={activeTab} onTabChange={setActiveTab} />
        {activeTab === "create" && <BundleCreator />}
        {activeTab === "dashboard" && <DashboardTab />}
        {activeTab === "analytics" && <AnalyticsTab />}
      </s-section>
    </s-page>
  );
}
