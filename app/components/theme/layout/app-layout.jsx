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
        <Outlet />
      </main>
    </div>
  );
}
