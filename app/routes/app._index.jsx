import { useAppBridge } from "@shopify/app-bridge-react";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";
import ThemePreview from "../components/theme/theme.preview";
import ThemeControls from "../components/theme/theme.controls";
import { ThemeSectionNavigator } from "../components/theme/theme.customize";
import SectionFields from "../components/theme/theme.section-fields";
import { useThemeBuilder } from "../context/theme.context";
import Header from "../components/theme/header/header";
import Sidebar from "../components/theme/sidebar/sidebar";
import { useState } from "react";

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  return null;
};

export default function Index() {
  const shopify = useAppBridge();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);
  const {
    selectedGroup,
    // selectedSectionName,
    // selectedSubsectionName,
    // template,
    // primaryColor,
    // secondaryColor,
  } = useThemeBuilder();

  // console.log("ThemeBuilder state", {
  //   selectedGroup,
  //   selectedSectionName,
  //   selectedSubsectionName,
  //   template,
  //   primaryColor,
  //   secondaryColor,
  // });

  const handleSave = () => {
    shopify?.toast?.show("Theme settings updated");
  };

  const isColors = selectedGroup === "Colors";
  const gridTemplateColumns = isColors
    ? "minmax(0, 1.8fr) minmax(0, 1.5fr) minmax(0, 2.2fr)"
    : "minmax(0, 2fr) minmax(0, 3fr)";

  return (
    <s-page heading="Theme builder">
      <Header onMenuClick={toggleSidebar} sidebarOpen={sidebarOpen} />
      <Sidebar open={sidebarOpen} onClose={closeSidebar} />
      <s-section heading="Customize theme">
        <div
          style={{
            display: "grid",
            gridTemplateColumns,
            gap: "1.25rem",
            alignItems: "flex-start",
          }}
        >
          <s-stack direction="block" gap="base">
            <ThemeSectionNavigator />
            {!isColors && <SectionFields />}
          </s-stack>
          {isColors && (
            <s-stack direction="block" gap="base">
              <ThemeControls onSave={handleSave} />
            </s-stack>
          )}
          <ThemePreview />
        </div>
      </s-section>
    </s-page>
  );
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
