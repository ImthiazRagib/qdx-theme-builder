import { Outlet } from "react-router";

export default function AppLayout() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <main
        style={{
          flex: 1,
          padding: "1rem",
          marginLeft: 0,
        }}
      >
        <div
          style={{
            padding: "0.5rem 1rem",
            textAlign: "right",
          }}
        >
          <button
            type="button"
            style={{
              padding: "0.25rem 0.5rem",
              fontSize: "0.75rem",
              fontWeight: 500,
              borderRadius: "4px",
              border: "1px solid #111",
              background: "#000",
              color: "#fff",
              cursor: "pointer",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            }}
          >
            Upgrade to Pro
          </button>
        </div>
        <Outlet />
      </main>
    </div>
  );
}
