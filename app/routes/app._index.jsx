import { useAppBridge } from "@shopify/app-bridge-react";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";
import ThemePreview from "../components/theme/theme.preview";
import ThemeControls from "../components/theme/theme.controls";

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  return null;
};

export default function Index() {
  const shopify = useAppBridge();

  const handleSave = () => {
    shopify?.toast?.show("Theme settings updated");
  };

  return (
      <s-page heading="Theme builder">
        <s-section heading="Live preview">
          <ThemePreview />
        </s-section>

        <s-section slot="aside" heading="Theme controls">
          <ThemeControls onSave={handleSave} />
        </s-section>
      </s-page>
  );
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
