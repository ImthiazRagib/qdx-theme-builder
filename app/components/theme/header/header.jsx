import { useThemeBuilder } from "../../../context/theme.context";

const IconHamburger = ({ size = 20, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const IconWishlist = ({ size = 20, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const IconCheckout = ({ size = 20, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

export default function Header({ onMenuClick, sidebarOpen }) {
  const { secondaryColor } = useThemeBuilder();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.75rem 1rem",
        background: "white",
        borderBottom: `2px solid ${secondaryColor}`,
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <button
          type="button"
          onClick={onMenuClick}
          aria-label={sidebarOpen ? "Close menu" : "Open menu"}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "2.5rem",
            height: "2.5rem",
            padding: 0,
            border: "none",
            borderRadius: "0.5rem",
            background: "transparent",
            color: secondaryColor,
            cursor: "pointer",
          }}
        >
          <IconHamburger size={22} color={secondaryColor} />
        </button>
        <span
          style={{
            fontSize: "1.1rem",
            fontWeight: 600,
            color: secondaryColor,
          }}
        >
          Theme Builder
        </span>
      </div>

      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
        aria-label="Header actions"
      >
        <button
          type="button"
          aria-label="Wishlist"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "2.5rem",
            height: "2.5rem",
            padding: 0,
            border: "none",
            borderRadius: "0.5rem",
            background: "transparent",
            color: secondaryColor,
            cursor: "pointer",
          }}
        >
          <IconWishlist size={22} color={secondaryColor} />
        </button>
        <button
          type="button"
          aria-label="Checkout"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "2.5rem",
            height: "2.5rem",
            padding: 0,
            border: "none",
            borderRadius: "0.5rem",
            background: "transparent",
            color: secondaryColor,
            cursor: "pointer",
          }}
        >
          <IconCheckout size={22} color={secondaryColor} />
        </button>
      </nav>
    </header>
  );
}
