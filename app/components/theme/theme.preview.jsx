import { useState } from "react";
import { useThemeBuilder } from "../../context/theme.context";
import Header from "./header/header";
import Sidebar from "./sidebar/sidebar";

const ThemePreview = () => {
    const {
        template,
        primaryColor,
        secondaryColor,
        sections,
        selectedGroup,
    } = useThemeBuilder();

    const hero = sections?.heroBanner || {};
    const heading = hero.heading || "";
    const subheading = hero.subheading || "";
    const body = hero.body || "";
    const bannerImageUrl = hero.bannerImageUrl || "";

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen((p) => !p);
    const closeSidebar = () => setSidebarOpen(false);

    const containerStyle = {
        borderRadius: "1rem",
        overflow: "hidden",
        border: "1px solid #d0d4db",
        background: "white",
        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
        position: "relative",
    };

    const heroBackground =
        bannerImageUrl && bannerImageUrl.trim().length > 0
            ? `linear-gradient(135deg, rgba(15, 23, 42, 0.6), rgba(15, 23, 42, 0.8)), url(${bannerImageUrl})`
            : `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`;

    const renderHero = () => {
        if (template === "modern") {
            return (
                <div
                    style={{
                        padding: "2.25rem 2rem",
                        backgroundImage:
                            bannerImageUrl && bannerImageUrl.trim().length > 0
                                ? `linear-gradient(135deg, rgba(249, 250, 251, 0.92), rgba(249, 250, 251, 0.96)), url(${bannerImageUrl})`
                                : "none",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        display: "grid",
                        gridTemplateColumns: "1.4fr 1fr",
                        gap: "1.75rem",
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
                            Homepage · Hero Banner
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
                        <div
                            style={{
                                marginTop: "1.25rem",
                                display: "flex",
                                gap: "0.75rem",
                            }}
                        >
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
                            <span
                                style={{
                                    fontSize: "0.8rem",
                                    opacity: 0.8,
                                }}
                            >
                                Featured product
                            </span>
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
            );
        }

        if (template === "minimal") {
            return (
                <div
                    style={{
                        padding: "1.75rem 1.75rem 1.75rem 1.5rem",
                        display: "flex",
                        borderLeft: `6px solid ${primaryColor}`,
                        backgroundImage: heroBackground,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div
                        style={{
                            flex: 1,
                            backgroundColor: "rgba(255, 255, 255, 0.96)",
                        }}
                    >
                        <p
                            style={{
                                fontSize: "0.75rem",
                                textTransform: "uppercase",
                                letterSpacing: "0.08em",
                                color: "#9ca3af",
                                marginBottom: "0.5rem",
                            }}
                        >
                            Homepage · Hero Banner
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

        // classic / default
        return (
            <div
                style={{
                    padding: "2.25rem 2rem",
                    backgroundImage: heroBackground,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
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
                    Homepage · Hero Banner
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
                <div
                    style={{
                        marginTop: "1.25rem",
                        display: "flex",
                        gap: "0.75rem",
                    }}
                >
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
                                {hero.primaryCtaText || "Shop the collection"}
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
                                {hero.secondaryCtaText || "Learn more"}
                            </button>
                </div>
            </div>
        );
    };

    const renderFeaturedProducts = () => {
        const fp = sections?.featuredProducts || {};
        const fpHeading = fp.heading || heading;
        const fpSubheading = fp.subheading || subheading;
        const cols = fp.columnsDesktop || 4;
        return (
        <div>
            <div
                style={{
                    padding: "1.75rem 1.75rem 1.5rem",
                    backgroundImage:
                        bannerImageUrl && bannerImageUrl.trim().length > 0
                            ? `linear-gradient(135deg, rgba(17, 24, 39, 0.7), rgba(15, 23, 42, 0.9)), url(${bannerImageUrl})`
                            : `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
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
                    Homepage · Featured Products
                </p>
                <h2
                    style={{
                        fontSize: "1.4rem",
                        lineHeight: 1.3,
                        margin: 0,
                    }}
                >
                    {fpHeading}
                </h2>
                <p
                    style={{
                        marginTop: "0.65rem",
                        fontSize: "0.9rem",
                        maxWidth: "28rem",
                    }}
                >
                    {fpSubheading}
                </p>
            </div>
            <div
                style={{
                    padding: "1.5rem 1.75rem",
                    background: "white",
                }}
            >
                <div
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                    gap: "1rem",
                }}
            >
                {Array.from({ length: Math.min(fp.productsToShow || 8, 8) }).map((_, index) => (
                        <div
                            key={index}
                            style={{
                                borderRadius: "0.75rem",
                                border: "1px solid #e5e7eb",
                                padding: "0.85rem",
                            }}
                        >
                            <div
                                style={{
                                    height: "5rem",
                                    borderRadius: "0.5rem",
                                    background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                                    marginBottom: "0.6rem",
                                }}
                            />
                            <div
                                style={{
                                    width: "50%",
                                    height: "0.35rem",
                                    borderRadius: "999px",
                                    background: "#d1d5db",
                                }}
                            />
                            <div
                                style={{
                                    width: "70%",
                                    height: "0.35rem",
                                    borderRadius: "999px",
                                    background: "#e5e7eb",
                                    marginTop: "0.25rem",
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
        );
    };

    const renderTestimonials = () => {
        const t = sections?.testimonials || {};
        const tHeading = t.heading || heading;
        const tSubheading = t.subheading || subheading;
        const items = t.items || [];
        return (
        <div>
            <div
                style={{
                    padding: "2rem 2rem 1.5rem",
                    background: "#f9fafb",
                }}
            >
                <p
                    style={{
                        fontSize: "0.75rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "#6b7280",
                        marginBottom: "0.75rem",
                    }}
                >
                    Homepage · Testimonials
                </p>
                <h2
                    style={{
                        fontSize: "1.4rem",
                        lineHeight: 1.3,
                        margin: 0,
                        color: "#111827",
                    }}
                >
                    {tHeading}
                </h2>
                <p
                    style={{
                        marginTop: "0.6rem",
                        fontSize: "0.9rem",
                        color: "#4b5563",
                        maxWidth: "30rem",
                    }}
                >
                    {tSubheading}
                </p>
            </div>
            <div
                style={{
                    padding: "1.5rem 1.75rem 1.75rem",
                    background: "white",
                    display: "grid",
                    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                    gap: "1rem",
                }}
            >
                {(items.length ? items : [{ quote: body, author: "" }]).slice(0, 3).map((item, index) => (
                    <div
                        key={index}
                        style={{
                            borderRadius: "0.75rem",
                            border: "1px solid #e5e7eb",
                            padding: "1rem",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                marginBottom: "0.7rem",
                            }}
                        >
                            <span
                                style={{
                                    width: "2rem",
                                    height: "2rem",
                                    borderRadius: "999px",
                                    background: primaryColor,
                                    opacity: 0.9,
                                }}
                            />
                            <span style={{ fontSize: "0.8rem", fontWeight: 500 }}>{item.author}</span>
                        </div>
                        <p
                            style={{
                                fontSize: "0.85rem",
                                color: "#4b5563",
                                lineHeight: 1.5,
                            }}
                        >
                            {item.quote}
                        </p>
                    </div>
                ))}
            </div>
        </div>
        );
    };

    const renderNewsletter = () => {
        const n = sections?.newsletter || {};
        return (
        <div>
            <div
                style={{
                    padding: "2.25rem 2rem 2rem",
                    backgroundImage:
                        bannerImageUrl && bannerImageUrl.trim().length > 0
                            ? `linear-gradient(135deg, rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.9)), url(${bannerImageUrl})`
                            : `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
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
                    Homepage · Newsletter
                </p>
                <h2
                    style={{
                        fontSize: "1.6rem",
                        lineHeight: 1.25,
                        margin: 0,
                    }}
                >
                    {n.heading || heading}
                </h2>
                <p
                    style={{
                        marginTop: "0.7rem",
                        fontSize: "0.95rem",
                        maxWidth: "30rem",
                    }}
                >
                    {n.subheading || subheading}
                </p>
                <div
                    style={{
                        marginTop: "1.1rem",
                        display: "flex",
                        gap: "0.6rem",
                    }}
                >
                    <input
                        placeholder={n.placeholder || "Enter your email"}
                        style={{
                            flex: 1,
                            padding: "0.55rem 0.75rem",
                            borderRadius: "999px",
                            border: "none",
                            fontSize: "0.85rem",
                        }}
                    />
                    <button
                        type="button"
                        style={{
                            padding: "0.55rem 1.25rem",
                            borderRadius: "999px",
                            border: "none",
                            background: "#f9fafb",
                            color: "#111827",
                            fontSize: "0.85rem",
                            cursor: "pointer",
                        }}
                    >
                        {n.buttonText || "Subscribe"}
                    </button>
                </div>
            </div>
            <div
                style={{
                    padding: "1.25rem 1.75rem",
                    background: "white",
                }}
            >
                <p
                    style={{
                        margin: 0,
                        fontSize: "0.85rem",
                        color: "#6b7280",
                    }}
                >
                    {n.body || body}
                </p>
            </div>
        </div>
        );
    };

    const renderImageWithText = () => {
        const iwt = sections?.imageWithText || {};
        const imgEl = (
            <div style={{ flex: 1, minHeight: 200, background: iwt.imageUrl ? `url(${iwt.imageUrl}) center/cover` : `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`, borderRadius: "0.5rem" }} />
        );
        const textEl = (
            <div style={{ flex: 1, padding: "1.5rem" }}>
                <h3 style={{ fontSize: "1.25rem", margin: "0 0 0.5rem 0", color: "#111827" }}>{iwt.heading || "Image with text"}</h3>
                <p style={{ fontSize: "0.9rem", color: "#4b5563", margin: "0 0 1rem 0", lineHeight: 1.5 }}>{iwt.body || ""}</p>
                <button type="button" style={{ padding: "0.5rem 1rem", borderRadius: "999px", border: "none", background: primaryColor, color: "white", fontSize: "0.85rem", cursor: "pointer" }}>{iwt.buttonText || "Learn more"}</button>
            </div>
        );
        return (
            <div style={{ padding: "1.5rem 1.75rem", background: "#fff", display: "flex", gap: "1.5rem", alignItems: "stretch" }}>
                {iwt.imagePosition === "right" ? [textEl, imgEl] : [imgEl, textEl]}
            </div>
        );
    };

    const renderFooter = () => {
        const f = sections?.footer || {};
        return (
            <div style={{ padding: "1.5rem 1.75rem", background: "#111827", color: "#f9fafb" }}>
                <div style={{ display: "flex", gap: "1.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                    {(f.menuItems || []).map((item, i) => (
                        <a key={i} href={item.link} style={{ fontSize: "0.85rem", color: "#9ca3af" }}>{item.title}</a>
                    ))}
                </div>
                <p style={{ margin: 0, fontSize: "0.8rem", color: "#6b7280" }}>{f.copyrightText || "© 2025 Your Store"}</p>
            </div>
        );
    };

    const renderHomepage = () => (
        <div style={containerStyle}>
            <Header onMenuClick={toggleSidebar} sidebarOpen={sidebarOpen} />
            <Sidebar open={sidebarOpen} onClose={closeSidebar} previewMode />
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.25rem",
                }}
            >
                {renderHero()}
                {renderFeaturedProducts()}
                {renderImageWithText()}
                {renderTestimonials()}
                {renderNewsletter()}
                {renderFooter()}
            </div>
        </div>
    );

    const renderProductPage = () => (
        <div style={containerStyle}>
            <Header onMenuClick={toggleSidebar} sidebarOpen={sidebarOpen} />
            <Sidebar open={sidebarOpen} onClose={closeSidebar} previewMode />
            <div
                style={{
                    padding: "1.75rem 1.75rem 1.5rem",
                    background: "#f9fafb",
                }}
            >
                <p
                    style={{
                        fontSize: "0.75rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "#6b7280",
                        marginBottom: "0.75rem",
                    }}
                >
                    Product Page
                </p>
                <h2
                    style={{
                        fontSize: "1.4rem",
                        lineHeight: 1.3,
                        margin: 0,
                        color: "#111827",
                    }}
                >
                    Product page layout
                </h2>
            </div>
            <div
                style={{
                    padding: "1.5rem 1.75rem 1.75rem",
                    background: "white",
                    display: "grid",
                    gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1.1fr)",
                    gap: "1.5rem",
                }}
            >
                <div>
                    <div
                        style={{
                            height: "10rem",
                            borderRadius: "0.75rem",
                            backgroundImage:
                                bannerImageUrl && bannerImageUrl.trim().length > 0
                                    ? `url(${bannerImageUrl})`
                                    : `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            marginBottom: "0.75rem",
                        }}
                    />
                    <div
                        style={{
                            display: "flex",
                            gap: "0.5rem",
                        }}
                    >
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div
                                key={index}
                                style={{
                                    flex: 1,
                                    height: "3rem",
                                    borderRadius: "0.5rem",
                                    background: "#e5e7eb",
                                }}
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <h3
                        style={{
                            fontSize: "1.1rem",
                            fontWeight: 600,
                            margin: "0 0 0.35rem 0",
                            color: "#111827",
                        }}
                    >
                        {sections?.productDetails?.productTitle || "Product name"}
                    </h3>
                    <div
                        style={{
                            width: "40%",
                            height: "0.45rem",
                            borderRadius: "999px",
                            background: primaryColor,
                            marginBottom: "0.8rem",
                        }}
                    />
                    <p
                        style={{
                            fontSize: "0.9rem",
                            color: "#4b5563",
                            marginBottom: "0.9rem",
                        }}
                    >
                        {sections?.productDetails?.productDescription || body}
                    </p>
                    <div
                        style={{
                            display: "flex",
                            gap: "0.75rem",
                            marginBottom: "0.9rem",
                        }}
                    >
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
                            Add to cart
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
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    if (selectedGroup === "Homepage") {
        return renderHomepage();
    }

    if (selectedGroup === "Product Page") {
        return renderProductPage();
    }

    if (selectedGroup === "Colors") {
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                }}
            >
                {renderHomepage()}
            </div>
        );
    }

    // Fallback: show homepage
    return renderHomepage();
};

export default ThemePreview;
