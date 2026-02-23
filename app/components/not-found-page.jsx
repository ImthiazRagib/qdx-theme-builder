import { Link } from "react-router";

const border = "1px solid #e5e7eb";
const radius = "6px";

function NotFoundIcon() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="28" cy="36" r="18" fill="#93c5fd" />
      <circle cx="52" cy="36" r="18" fill="#f9a8d4" />
      <circle cx="40" cy="52" r="14" fill="#fde047" />
    </svg>
  );
}

export default function NotFoundPage() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <NotFoundIcon />
      <p
        style={{
          margin: "1rem 0 0",
          fontSize: "2rem",
          fontWeight: 700,
          color: "#111827",
          letterSpacing: "-0.02em",
          lineHeight: 1,
        }}
      >
        404
      </p>
      <h1
        style={{
          margin: "0.35rem 0 0.25rem",
          fontSize: "1rem",
          fontWeight: 600,
          color: "#374151",
        }}
      >
        Not found
      </h1>
      <p
        style={{
          margin: 0,
          fontSize: "0.8125rem",
          color: "#64748b",
          maxWidth: 260,
        }}
      >
        The page you’re looking for doesn’t exist or was moved.
      </p>
      <Link
        to="/app"
        style={{
          marginTop: "1.25rem",
          padding: "0.5rem 1rem",
          fontSize: "0.8125rem",
          fontWeight: 500,
          borderRadius: radius,
          border,
          background: "#fff",
          color: "#374151",
          textDecoration: "none",
        }}
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
