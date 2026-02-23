import { Link, useLocation } from "react-router";
import { useThemeBuilder } from "../../../context/theme.context";

const NAV_LINKS = [
  { to: "/app", label: "Dashboard" },
  { to: "/app/theme-builder", label: "Theme builder" },
  { to: "/app/my-page", label: "My page" },
  { to: "/app/additional", label: "Additional page" },
  { to: "/app/product-import", label: "Product import" },
  { to: "/app/settings", label: "Settings" },
  { to: "/app/help", label: "Help" },
];

export default function Sidebar({ open, onClose, previewMode = false }) {
  const { secondaryColor } = useThemeBuilder();
  const location = useLocation();

  const pos = previewMode ? "absolute" : "fixed";
  const backdropStyle = {
    position: pos,
    inset: 0,
    zIndex: 98,
    background: "rgba(0,0,0,0.35)",
    opacity: 1,
  };
  const asideStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 99,
    width: "min(280px, 85vw)",
    maxWidth: 280,
    height: previewMode ? "100%" : "100vh",
    background: "white",
    borderRight: `2px solid ${secondaryColor}`,
    boxShadow: open ? "4px 0 20px rgba(0,0,0,0.1)" : "none",
    transform: open ? "translateX(0)" : "translateX(-100%)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    overflowY: "auto",
  };

  const backdropStylePositioned = {
    ...backdropStyle,
    position: "absolute",
  };

  if (previewMode) {
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          zIndex: 97,
          pointerEvents: open ? "auto" : "none",
        }}
      >
        {open && (
          <div
            role="presentation"
            onClick={onClose}
            style={backdropStylePositioned}
            aria-hidden
          />
        )}
        <aside style={{ ...asideStyle, position: "absolute" }}>
          <div
            style={{
              padding: "1rem 0.75rem",
              borderBottom: `1px solid ${secondaryColor}30`,
              marginTop: "4rem",
            }}
          >
            <span
              style={{
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: secondaryColor,
                fontWeight: 600,
              }}
            >
              Menu
            </span>
          </div>
          <nav
            style={{
              padding: "0.75rem 0.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.2rem",
            }}
            aria-label="Sidebar navigation"
          >
            {NAV_LINKS.map(({ to, label }) => {
              const isActive =
                location.pathname === to ||
                (to !== "/app" && location.pathname.startsWith(to));
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={onClose}
                  style={linkStyle(isActive, secondaryColor)}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </aside>
      </div>
    );
  }

  return (
    <>
      {open && (
        <div
          role="presentation"
          onClick={onClose}
          style={backdropStyle}
          aria-hidden
        />
      )}

      <aside style={{ ...asideStyle, position: pos }}>
        <div
          style={{
            padding: "1rem 0.75rem",
            marginTop: "4rem",
            borderBottom: `1px solid ${secondaryColor}30`,
          }}
        >
          <span
            style={{
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: secondaryColor,
              fontWeight: 600,
            }}
          >
            Menu
          </span>
        </div>
        <nav
          style={{
            padding: "0.75rem 0.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.2rem",
          }}
          aria-label="Sidebar navigation"
        >
          {NAV_LINKS.map(({ to, label }) => {
            const isActive =
              location.pathname === to ||
              (to !== "/app" && location.pathname.startsWith(to));
            return (
              <Link
                key={to}
                to={to}
                onClick={onClose}
                style={linkStyle(isActive, secondaryColor)}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

function linkStyle(isActive, secondaryColor) {
  return {
    display: "block",
    padding: "0.6rem 0.85rem",
    borderRadius: "0.5rem",
    fontSize: "0.9rem",
    fontWeight: isActive ? 600 : 400,
    color: isActive ? secondaryColor : "#374151",
    background: isActive ? `${secondaryColor}14` : "transparent",
    textDecoration: "none",
    borderLeft: isActive ? `3px solid ${secondaryColor}` : "3px solid transparent",
  };
}
