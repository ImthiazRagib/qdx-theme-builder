import TemplatePill from "./theme.pils";
import ThemeColorPalettes from "./_colors";
import { useThemeBuilder } from "../../context/theme.context";

const ThemeControls = (props) => {
    const { onSave } = props;
    const {
        template,
        setTemplate,
        primaryColor,
        setPrimaryColor,
        secondaryColor,
        setSecondaryColor,
        heading,
        setHeading,
        subheading,
        setSubheading,
        body,
        setBody,
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

    return (
        <s-stack direction="block" gap="base">
            <div>
                <s-heading>Template</s-heading>
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                    <TemplatePill
                        label="classic"
                        active={template === "classic"}
                        onClick={() => setTemplate("classic")}
                    />
                    <TemplatePill
                        label="modern"
                        active={template === "modern"}
                        onClick={() => setTemplate("modern")}
                    />
                    <TemplatePill
                        label="minimal"
                        active={template === "minimal"}
                        onClick={() => setTemplate("minimal")}
                    />
                </div>
            </div>

            <div style={{ display: "flex", gap: "0.75rem" }}>
                <div style={{ flex: 1 }}>
                    <label
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            fontSize: "0.8rem",
                            marginBottom: "0.25rem",
                        }}
                    >
                        <span>Primary color</span>
                        <input
                            type="color"
                            value={primaryColor}
                            onChange={(event) => setPrimaryColor(event.target.value)}
                            style={{
                                width: "2.25rem",
                                height: "1.5rem",
                                border: "none",
                                padding: 0,
                                background: "transparent",
                                cursor: "pointer",
                            }}
                        />
                    </label>
                </div>
                <div style={{ flex: 1 }}>
                    <label
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            fontSize: "0.8rem",
                            marginBottom: "0.25rem",
                        }}
                    >
                        <span>Secondary color</span>
                        <input
                            type="color"
                            value={secondaryColor}
                            onChange={(event) => setSecondaryColor(event.target.value)}
                            style={{
                                width: "2.25rem",
                                height: "1.5rem",
                                border: "none",
                                padding: 0,
                                background: "transparent",
                                cursor: "pointer",
                            }}
                        />
                    </label>
                </div>
            </div>
            <ThemeColorPalettes />

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                }}
            >
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
            </div>

            <s-button onClick={onSave}>Save theme</s-button>
        </s-stack>
    );
};

export default ThemeControls;
