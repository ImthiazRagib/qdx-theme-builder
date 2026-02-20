import { useAppBridge } from "@shopify/app-bridge-react";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";
import ThemeBuilderProvider from "../providers/theme-builder.provider.jsx";
import ThemePreview from "../components/theme/theme.preview.jsx";
import ThemeControls from "../components/theme/theme.controls.jsx";

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
    <ThemeBuilderProvider>
      <s-page heading="Theme builder">
        <s-section heading="Live preview">
          <ThemePreview />
        </s-section>

        <s-section slot="aside" heading="Theme controls">
          <ThemeControls onSave={handleSave} />
        </s-section>
      </s-page>
    </ThemeBuilderProvider>
  );
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
