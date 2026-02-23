import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function MyPage() {
  return (
    <s-page heading="My page">
      <s-section heading="My page">
        <s-paragraph>
          This is your custom page. It appears in the app navigation via the nav
          menu in <code>app/routes/app.jsx</code> and in the sidebar.
        </s-paragraph>
        <s-paragraph>
          You can edit <code>app/routes/app.my-page.jsx</code> to change this
          content.
        </s-paragraph>
      </s-section>
    </s-page>
  );
}
