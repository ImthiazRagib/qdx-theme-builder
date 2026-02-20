import { useThemeBuilder } from "../../../context/theme.context.jsx";

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

export default function ThemeColorPalettes() {
  const {
    primaryColor,
    setPrimaryColor,
    secondaryColor,
    setSecondaryColor,
  } = useThemeBuilder();

  return (
    <div>
      <s-heading>Colors</s-heading>
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          marginTop: "0.4rem",
          marginBottom: "0.65rem",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          <div
            style={{
              width: "1.9rem",
              height: "1.9rem",
              borderRadius: "0.5rem",
              background: primaryColor,
              border: "1px solid #d1d5db",
            }}
          />
          <span style={{ fontSize: "0.75rem", color: "#4b5563" }}>
            Primary
          </span>
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          <div
            style={{
              width: "1.9rem",
              height: "1.9rem",
              borderRadius: "0.5rem",
              background: secondaryColor,
              border: "1px solid #d1d5db",
            }}
          />
          <span style={{ fontSize: "0.75rem", color: "#4b5563" }}>
            Secondary
          </span>
        </div>
      </div>

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
                border: active ? "2px solid #1463ff" : "1px solid #d0d4db",
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
  );
}

