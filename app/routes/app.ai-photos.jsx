import { useState } from "react";
import { authenticate } from "../shopify.server";
import AiGenerateTabs from "../components/ai-photos/AiGenerateTabs";
import AiGenerateContent from "../components/ai-photos/AiGenerateContent";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function AiPhotosPage() {
  const [activeTab, setActiveTab] = useState("photos");

  return (
    <s-page heading="AI Photos">
      <s-section heading="Generate">
        <AiGenerateTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <AiGenerateContent activeTab={activeTab} />
      </s-section>
    </s-page>
  );
}
