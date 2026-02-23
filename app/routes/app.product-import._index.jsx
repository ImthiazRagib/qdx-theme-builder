import { authenticate } from "../shopify.server";
import SelectProductSource from "../components/product-import/select-product-source";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
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
