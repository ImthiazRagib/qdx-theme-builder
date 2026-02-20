import { useState } from "react";
import ThemeBuilderContext from "../context/theme.context";

export default function ThemeBuilderProvider(props) {
  const { children } = props;
  const [template, setTemplate] = useState("classic");
  const [primaryColor, setPrimaryColor] = useState("#1463ff");
  const [secondaryColor, setSecondaryColor] = useState("#111827");
  const [selectedGroup, setSelectedGroup] = useState("Homepage");
  const [selectedSectionName, setSelectedSectionName] = useState("Hero Banner");
  const [selectedSubsectionName, setSelectedSubsectionName] = useState(null);
  const [heading, setHeading] = useState("Welcome to your Shopify store");
  const [subheading, setSubheading] = useState(
    "Pick a template, change the colors, and edit this content live.",
  );
  const [body, setBody] = useState(
    "Use this theme builder to experiment with hero sections before publishing them to your theme.",
  );
  const [bannerImageUrl, setBannerImageUrl] = useState("");

  const value = {
    template,
    setTemplate,
    primaryColor,
    setPrimaryColor,
    secondaryColor,
    setSecondaryColor,
    selectedGroup,
    setSelectedGroup,
    selectedSectionName,
    setSelectedSectionName,
    selectedSubsectionName,
    setSelectedSubsectionName,
    heading,
    setHeading,
    subheading,
    setSubheading,
    body,
    setBody,
    bannerImageUrl,
    setBannerImageUrl,
  };

  return (
    <ThemeBuilderContext.Provider value={value}>
      {children}
    </ThemeBuilderContext.Provider> 
  );
}
