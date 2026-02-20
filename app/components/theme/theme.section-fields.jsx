import { useThemeBuilder } from "../../context/theme.context";

const SectionFields = () => {
  const {
    template,
    setTemplate,
    heading,
    setHeading,
    subheading,
    setSubheading,
    body,
    setBody,
    bannerImageUrl,
    setBannerImageUrl,
    selectedGroup,
    selectedSectionName,
    selectedSubsectionName,
  } = useThemeBuilder();

  const textInputStyle = {
    width: "100%",
    marginTop: "0.25rem",
    padding: "0.4rem 0.55rem",
    borderRadius: "0.45rem",
    border: "1px solid #d0d4db",
    fontSize: "0.85rem",
    boxSizing: "border-box",
  };

  const textAreaStyle = {
    ...textInputStyle,
    minHeight: "5rem",
    resize: "vertical",
  };

  const sectionLabelParts = [
    selectedGroup,
    selectedSectionName,
    selectedSubsectionName,
  ].filter(Boolean);
  const sectionLabel = sectionLabelParts.join(" · ");

  return (
    <s-stack direction="block" gap="base">
      <div>
        <s-heading>Selected section</s-heading>
        <p
          style={{
            margin: "0.35rem 0 0",
            fontSize: "0.78rem",
            color: "#4b5563",
          }}
        >
          {sectionLabel}
        </p>
      </div>

      <div>
        <s-heading>Template style</s-heading>
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
          <button
            type="button"
            onClick={() => setTemplate("classic")}
            style={{
              padding: "0.35rem 0.75rem",
              borderRadius: "999px",
              border:
                template === "classic"
                  ? "2px solid #1463ff"
                  : "1px solid #d0d4db",
              background:
                template === "classic"
                  ? "rgba(20, 99, 255, 0.08)"
                  : "white",
              fontSize: "0.78rem",
              textTransform: "capitalize",
              cursor: "pointer",
            }}
          >
            classic
          </button>
          <button
            type="button"
            onClick={() => setTemplate("modern")}
            style={{
              padding: "0.35rem 0.75rem",
              borderRadius: "999px",
              border:
                template === "modern"
                  ? "2px solid #1463ff"
                  : "1px solid #d0d4db",
              background:
                template === "modern"
                  ? "rgba(20, 99, 255, 0.08)"
                  : "white",
              fontSize: "0.78rem",
              textTransform: "capitalize",
              cursor: "pointer",
            }}
          >
            modern
          </button>
          <button
            type="button"
            onClick={() => setTemplate("minimal")}
            style={{
              padding: "0.35rem 0.75rem",
              borderRadius: "999px",
              border:
                template === "minimal"
                  ? "2px solid #1463ff"
                  : "1px solid #d0d4db",
              background:
                template === "minimal"
                  ? "rgba(20, 99, 255, 0.08)"
                  : "white",
              fontSize: "0.78rem",
              textTransform: "capitalize",
              cursor: "pointer",
            }}
          >
            minimal
          </button>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <s-heading>Section content</s-heading>
        <label style={{ fontSize: "0.8rem" }}>
          Heading
          <input
            value={heading}
            onChange={(event) => setHeading(event.target.value)}
            style={textInputStyle}
          />
        </label>
        <label style={{ fontSize: "0.8rem" }}>
          Subheading
          <input
            value={subheading}
            onChange={(event) => setSubheading(event.target.value)}
            style={textInputStyle}
          />
        </label>
        <label style={{ fontSize: "0.8rem" }}>
          Body content
          <textarea
            value={body}
            onChange={(event) => setBody(event.target.value)}
            style={textAreaStyle}
          />
        </label>
        <label style={{ fontSize: "0.8rem" }}>
          Banner image URL
          <input
            value={bannerImageUrl}
            onChange={(event) => setBannerImageUrl(event.target.value)}
            placeholder="https://..."
            style={textInputStyle}
          />
        </label>
      </div>
    </s-stack>
  );
};

export default SectionFields;

