import { Outlet, useMatches } from "react-router";

export default function AppLayout() {
  const matches = useMatches();
  const is404 = matches.some((m) => m.handle?.notFound === true);
  const isWideLayout = matches.some((m) => m.handle?.wideLayout === true);
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#fafafa",
      }}
    >
      <main
        style={{
          flex: 1,
          padding: "1.5rem 1.5rem 2rem",
          marginLeft: 0,
          maxWidth: isWideLayout ? 1440 : 1200,
          marginRight: "auto",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {!is404 && (
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "0.5rem" }}>
            <button
              type="button"
              style={{
                padding: "0.375rem 0.75rem",
                fontSize: "0.8125rem",
                fontWeight: 500,
                borderRadius: "6px",
                border: "none",
                background: "#18181b",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Upgrade to Pro
            </button>
          </div>
        )}
        <Outlet />
      </main>
    </div>
  );
}
