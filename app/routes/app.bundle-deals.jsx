import { useState } from "react";
import { authenticate } from "../shopify.server";
import BundleDealsTabs from "../components/bundle-deals/BundleDealsTabs";
import DashboardTab from "../components/bundle-deals/DashboardTab";
import AnalyticsTab from "../components/bundle-deals/AnalyticsTab";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function BundleDealsPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <s-page heading="Bundle Deals">
      <s-section heading="Bundle Deals">
        <BundleDealsTabs activeTab={activeTab} onTabChange={setActiveTab} />
        {activeTab === "dashboard" && <DashboardTab />}
        {activeTab === "analytics" && <AnalyticsTab />}
      </s-section>
    </s-page>
  );
}
