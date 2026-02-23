import { Outlet, useLoaderData, useRouteError } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { AppProvider } from "@shopify/shopify-app-react-router/react";
import { authenticate } from "../shopify.server";
import ThemeBuilderProvider from "../providers/theme-builder.provider";
import AppLayout from "../components/theme/layout/app-layout";

export const loader = async ({ request }) => {
  const session = await authenticate.admin(request);

  // eslint-disable-next-line no-undef
  return { apiKey: process.env.SHOPIFY_API_KEY || "", session };
};

export default function App() {
  const { apiKey } = useLoaderData();

  return (
    <ThemeBuilderProvider>
      <AppProvider embedded apiKey={apiKey}>
        <AppLayout />
      </AppProvider>
    </ThemeBuilderProvider>
  );
}

// Shopify needs React Router to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
