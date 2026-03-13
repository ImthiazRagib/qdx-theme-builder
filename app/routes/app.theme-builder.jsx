import { boundary } from "@shopify/shopify-app-react-router/server";
import { AppProvider as PolarisAppProvider } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import { authenticate } from "../shopify.server";
import { ThemeCreatorPolaris } from "../components/theme/theme-builder-polaris";

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  return null;
};

export default function ThemeBuilderPage() {
  return (
    <PolarisAppProvider i18n={enTranslations}>
      <ThemeCreatorPolaris />
    </PolarisAppProvider>
  );
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};

export const handle = {
  wideLayout: true,
};
