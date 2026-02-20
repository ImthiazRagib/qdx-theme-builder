import TemplatePill from "./theme.pils";
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

    const palettes = [
        {
            id: "ocean",
            label: "Ocean",
            primary: "#0ea5e9",
            secondary: "#1e293b",
        },
        {
            id: "sunset",
            label: "Sunset",
            primary: "#f97316",
            secondary: "#7c2d12",
        },
        {
            id: "forest",
            label: "Forest",
            primary: "#16a34a",
            secondary: "#064e3b",
        },
        {
            id: "rose",
            label: "Rose",
            primary: "#e11d48",
            secondary: "#4a044e",
        },
        {
            id: "slate",
            label: "Slate",
            primary: "#0f172a",
            secondary: "#6b7280",
        },
    ];

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

            <div>
                <s-heading>Color palettes</s-heading>
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.5rem",
                        marginTop: "0.5rem",
                    }}
                >
                    {palettes.map((palette) => {
                        const active =
                            primaryColor === palette.primary &&
                            secondaryColor === palette.secondary;

                        return (
                            <button
                                key={palette.id}
                                type="button"
                                onClick={() => {
                                    setPrimaryColor(palette.primary);
                                    setSecondaryColor(palette.secondary);
                                }}
                                style={{
                                    padding: "0.35rem 0.6rem",
                                    borderRadius: "999px",
                                    border: active
                                        ? "2px solid #1463ff"
                                        : "1px solid #d0d4db",
                                    background: "white",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.4rem",
                                    fontSize: "0.75rem",
                                }}
                            >
                                <span
                                    style={{
                                        display: "inline-flex",
                                        width: "1.8rem",
                                        height: "0.7rem",
                                        borderRadius: "999px",
                                        background: `linear-gradient(90deg, ${palette.primary}, ${palette.secondary})`,
                                    }}
                                />
                                <span
                                    style={{
                                        textTransform: "capitalize",
                                        color: "#111827",
                                    }}
                                >
                                    {palette.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

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
