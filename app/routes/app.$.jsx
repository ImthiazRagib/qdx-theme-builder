import { authenticate } from "../shopify.server";
import NotFoundPage from "../components/not-found-page";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function AppSplat() {
  return <NotFoundPage />;
}
