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
      <Link to="/app/your-stores">Your stores</Link>
      <Link to="/app/sales-channels">Sales channels</Link>
      <Link to="/app/bundle-deals">Bundle Deals</Link>
      <Link to="/app/ai-photos">AI Photos</Link>
      <Link to="/app/settings">Settings</Link>
      <Link to="/app/help">Help</Link>
    </s-app-nav>
  );
}
