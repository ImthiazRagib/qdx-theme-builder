import ThemeColorPalettes from "./_colors";
import { useThemeBuilder } from "../../context/theme.context";

const ThemeControls = (props) => {
    const { onSave } = props;
    const { primaryColor, setPrimaryColor, secondaryColor, setSecondaryColor } =
        useThemeBuilder();

    return (
        <s-stack direction="block" gap="base">
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

            <s-button onClick={onSave}>Save theme</s-button>
        </s-stack>
    );
};

export default ThemeControls;
