import { useState } from "react";
import { useThemeBuilder } from "../../context/theme.context";

// Shopify theme section structure
const themeSections = [
  {
    title: "Colors",
    sections: [
      { name: "Primary Palette" },
      { name: "Secondary Palette" },
      { name: "Semantic Colors" },
    ],
  },
  {
    title: "Header",
    sections: [{ name: "Logo & navigation" }],
  },
  {
    title: "Homepage",
    sections: [
      { name: "Hero Banner" },
      { name: "Featured Products" },
      { name: "Image with text" },
      { name: "Testimonials" },
      { name: "Newsletter" },
    ],
  },
  {
    title: "Footer",
    sections: [{ name: "Footer" }],
  },
  {
    title: "Product Page",
    sections: [
      { name: "Gallery", subsections: ["Thumbnails", "Zoom View"] },
      { name: "Details", subsections: ["Title", "Price", "Description"] },
      { name: "Reviews" },
    ],
  },
];

export const ThemeSectionNavigator = () => {
  const [openSections, setOpenSections] = useState({});
  const {
    selectedGroup,
    setSelectedGroup,
    selectedSectionName,
    setSelectedSectionName,
    selectedSubsectionName,
    setSelectedSubsectionName,
  } = useThemeBuilder();

  const toggleSection = (title) => {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const handleSectionClick = (groupTitle, sectionName) => {
    setSelectedGroup(groupTitle);
    setSelectedSectionName(sectionName);
    setSelectedSubsectionName(null);
  };

  const handleSubsectionClick = (groupTitle, sectionName, subsectionName) => {
    setSelectedGroup(groupTitle);
    setSelectedSectionName(sectionName);
    setSelectedSubsectionName(subsectionName);
  };

  return (
    <div
      style={{
        width: "17rem",
        background: "white",
        padding: "0.75rem 0.75rem 0.5rem",
        borderRadius: "0.75rem",
        border: "1px solid #e5e7eb",
      }}
    >
      <s-heading>Theme sections</s-heading>
      <ul style={{ listStyle: "none", padding: 0, margin: "0.5rem 0 0", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        {themeSections.map((group) => {
          const isOpen = openSections[group.title] ?? group.title === selectedGroup;

          return (
            <li key={group.title}>
              <button
                type="button"
                onClick={() => {
                  toggleSection(group.title);
                  setSelectedGroup(group.title);
                }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  textAlign: "left",
                  padding: "0.3rem 0.5rem",
                  borderRadius: "0.6rem",
                  border:
                    selectedGroup === group.title
                      ? "2px solid #1463ff"
                      : "1px solid transparent",
                  background:
                    selectedGroup === group.title
                      ? "rgba(20, 99, 255, 0.06)"
                      : "transparent",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                  color: "#111827",
                }}
              >
                <span>{group.title}</span>
                <span style={{ fontSize: "0.7rem", color: "#6b7280" }}>
                  {isOpen ? "▲" : "▼"}
                </span>
              </button>
              {isOpen && (
                <ul style={{ listStyle: "none", paddingLeft: "0.75rem", marginTop: "0.25rem", display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                  {group.sections.map((section) => {
                    const sectionActive =
                      selectedGroup === group.title &&
                      selectedSectionName === section.name &&
                      !selectedSubsectionName;

                    return (
                      <li key={section.name}>
                        <button
                          type="button"
                          onClick={() =>
                            handleSectionClick(group.title, section.name)
                          }
                          style={{
                            width: "100%",
                            textAlign: "left",
                            padding: "0.25rem 0.5rem",
                            borderRadius: "0.5rem",
                            border: sectionActive
                              ? "1px solid #1463ff"
                              : "1px solid transparent",
                            background: sectionActive
                              ? "rgba(20, 99, 255, 0.06)"
                              : "transparent",
                            cursor: "pointer",
                            fontSize: "0.78rem",
                            color: "#374151",
                          }}
                        >
                          {section.name}
                        </button>
                        {section.subsections && (
                          <ul style={{ listStyle: "none", paddingLeft: "0.75rem", marginTop: "0.15rem", display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                            {section.subsections.map((sub) => {
                              const isSubActive =
                                selectedGroup === group.title &&
                                selectedSectionName === section.name &&
                                selectedSubsectionName === sub;

                              return (
                                <li key={sub}>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleSubsectionClick(
                                        group.title,
                                        section.name,
                                        sub,
                                      )
                                    }
                                    style={{
                                      width: "100%",
                                      textAlign: "left",
                                      padding: "0.2rem 0.5rem",
                                      borderRadius: "0.5rem",
                                      border: isSubActive
                                        ? "1px solid #1463ff"
                                        : "1px solid transparent",
                                      background: isSubActive
                                        ? "rgba(20, 99, 255, 0.06)"
                                        : "transparent",
                                      cursor: "pointer",
                                      fontSize: "0.76rem",
                                      color: "#6b7280",
                                    }}
                                  >
                                    {sub}
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
