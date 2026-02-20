
import { useThemeBuilder } from "../../context/theme.context.jsx";

const ThemePreview = () => {
    const { template, primaryColor, secondaryColor, heading, subheading, body } =
        useThemeBuilder();

    const containerStyle = {
        borderRadius: "1rem",
        overflow: "hidden",
        border: "1px solid #d0d4db",
        background: "white",
        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
    };

    if (template === "modern") {
        return (
            <div style={containerStyle}>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1.4fr 1fr",
                        gap: "1.75rem",
                        padding: "2.25rem 2rem",
                    }}
                >
                    <div>
                        <p
                            style={{
                                fontSize: "0.75rem",
                                textTransform: "uppercase",
                                letterSpacing: "0.08em",
                                color: "#6b7280",
                                marginBottom: "0.75rem",
                            }}
                        >
                            Live theme preview
                        </p>
                        <h2
                            style={{
                                fontSize: "1.6rem",
                                lineHeight: 1.25,
                                margin: 0,
                                color: "#111827",
                            }}
                        >
                            {heading}
                        </h2>
                        <p
                            style={{
                                marginTop: "0.75rem",
                                fontSize: "0.95rem",
                                color: "#4b5563",
                            }}
                        >
                            {subheading}
                        </p>
                        <div style={{ marginTop: "1.25rem", display: "flex", gap: "0.75rem" }}>
                            <button
                                type="button"
                                style={{
                                    padding: "0.55rem 1.2rem",
                                    borderRadius: "999px",
                                    border: "none",
                                    background: primaryColor,
                                    color: "white",
                                    fontSize: "0.85rem",
                                    cursor: "pointer",
                                }}
                            >
                                Primary action
                            </button>
                            <button
                                type="button"
                                style={{
                                    padding: "0.55rem 1.2rem",
                                    borderRadius: "999px",
                                    border: `1px solid ${secondaryColor}`,
                                    background: "transparent",
                                    color: secondaryColor,
                                    fontSize: "0.85rem",
                                    cursor: "pointer",
                                }}
                            >
                                Secondary action
                            </button>
                        </div>
                    </div>
                    <div
                        style={{
                            borderRadius: "0.9rem",
                            padding: "1.2rem",
                            background:
                                "radial-gradient(circle at 0% 0%, rgba(17, 24, 39, 0.9), rgba(17, 24, 39, 1))",
                            color: "white",
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.75rem",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <span style={{ fontSize: "0.8rem", opacity: 0.8 }}>Featured product</span>
                            <span
                                style={{
                                    width: "0.7rem",
                                    height: "0.7rem",
                                    borderRadius: "999px",
                                    background: primaryColor,
                                }}
                            />
                        </div>
                        <div
                            style={{
                                borderRadius: "0.8rem",
                                padding: "1rem",
                                background:
                                    "linear-gradient(135deg, rgba(31, 41, 55, 1), rgba(17, 24, 39, 1))",
                            }}
                        >
                            <div
                                style={{
                                    width: "100%",
                                    height: "8rem",
                                    borderRadius: "0.75rem",
                                    background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                                }}
                            />
                            <p
                                style={{
                                    marginTop: "0.8rem",
                                    fontSize: "0.9rem",
                                    opacity: 0.9,
                                }}
                            >
                                {body}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (template === "minimal") {
        return (
            <div
                style={{
                    ...containerStyle,
                    display: "flex",
                    borderLeft: `6px solid ${primaryColor}`,
                }}
            >
                <div style={{ padding: "1.75rem 1.75rem 1.75rem 1.5rem", flex: 1 }}>
                    <p
                        style={{
                            fontSize: "0.75rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            color: "#9ca3af",
                            marginBottom: "0.5rem",
                        }}
                    >
                        Announcement bar
                    </p>
                    <h2
                        style={{
                            fontSize: "1.4rem",
                            lineHeight: 1.3,
                            margin: 0,
                            color: "#111827",
                        }}
                    >
                        {heading}
                    </h2>
                    <p
                        style={{
                            marginTop: "0.65rem",
                            fontSize: "0.9rem",
                            color: "#4b5563",
                        }}
                    >
                        {subheading}
                    </p>
                    <p
                        style={{
                            marginTop: "0.9rem",
                            fontSize: "0.9rem",
                            color: "#6b7280",
                        }}
                    >
                        {body}
                    </p>
                </div>
                <div
                    style={{
                        width: "5.5rem",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.4rem",
                        borderLeft: "1px solid #e5e7eb",
                        background: "#f9fafb",
                    }}
                >
                    <span
                        style={{
                            width: "2.4rem",
                            height: "0.4rem",
                            borderRadius: "999px",
                            background: primaryColor,
                        }}
                    />
                    <span
                        style={{
                            width: "1.8rem",
                            height: "0.4rem",
                            borderRadius: "999px",
                            background: secondaryColor,
                        }}
                    />
                </div>
            </div>
        );
    }

    return (
        <div style={containerStyle}>
            <div
                style={{
                    padding: "2.25rem 2rem",
                    background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                    color: "white",
                }}
            >
                <p
                    style={{
                        fontSize: "0.75rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        opacity: 0.9,
                        marginBottom: "0.75rem",
                    }}
                >
                    Hero banner
                </p>
                <h2
                    style={{
                        fontSize: "1.8rem",
                        lineHeight: 1.25,
                        margin: 0,
                    }}
                >
                    {heading}
                </h2>
                <p
                    style={{
                        marginTop: "0.85rem",
                        fontSize: "0.95rem",
                        maxWidth: "30rem",
                        opacity: 0.95,
                    }}
                >
                    {subheading}
                </p>
                <div style={{ marginTop: "1.25rem", display: "flex", gap: "0.75rem" }}>
                    <button
                        type="button"
                        style={{
                            padding: "0.6rem 1.35rem",
                            borderRadius: "999px",
                            border: "none",
                            background: "#f9fafb",
                            color: "#111827",
                            fontSize: "0.85rem",
                            cursor: "pointer",
                        }}
                    >
                        Shop the collection
                    </button>
                    <button
                        type="button"
                        style={{
                            padding: "0.6rem 1.35rem",
                            borderRadius: "999px",
                            border: "1px solid rgba(249, 250, 251, 0.7)",
                            background: "transparent",
                            color: "white",
                            fontSize: "0.85rem",
                            cursor: "pointer",
                        }}
                    >
                        Learn more
                    </button>
                </div>
            </div>
            <div
                style={{
                    padding: "1.5rem 1.75rem",
                    background: "white",
                }}
            >
                <p
                    style={{
                        margin: 0,
                        fontSize: "0.9rem",
                        color: "#4b5563",
                    }}
                >
                    {body}
                </p>
            </div>
        </div>
    );
};

export default ThemePreview;
