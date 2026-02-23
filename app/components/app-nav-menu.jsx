import { Link } from "react-router";

/**
 * App nav menu (Shopify admin left nav / TitleBar dropdown).
 * Add new pages here and in the sidebar NAV_LINKS to show them in app navigation.
 */
export default function AppNavMenu() {
  return (
    <s-app-nav>
      <Link to="/app" rel="home">
        Dashboard
      </Link>
      <Link to="/app/additional">Additional page</Link>
      <Link to="/app/product-import">Product import</Link>
      <Link to="/app/settings">Settings</Link>
      <Link to="/app/help">Help</Link>
    </s-app-nav>
  );
}
