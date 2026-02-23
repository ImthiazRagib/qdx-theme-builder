import { useState } from "react";
import { authenticate } from "../shopify.server";

const PAGE_SIZE = 10;
const border = "1px solid #e5e7eb";
const radius = "6px";

// Minimal 16x16 stroke icons
const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M11.33 2.67l2 2-8 8H3.33v-2l8-8z" />
    <path d="M13.33 4.67l-2-2" />
  </svg>
);
const DeleteIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M2 4h12M5.33 4V2.67a1.33 1.33 0 011.34-1.34h2.66a1.33 1.33 0 011.34 1.34V4M6.67 7.33v4M9.33 7.33v4M4 4l.67 8a1.33 1.33 0 001.33 1.33h4a1.33 1.33 0 001.33-1.33L12 4" />
  </svg>
);
const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="7" cy="7" r="4.5" />
    <path d="M10.5 10.5L13 13" />
  </svg>
);
const RefreshIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M14 8A6 6 0 102 8a6 6 0 0010 5.5" />
    <path d="M10 2v3h3" />
  </svg>
);
const BuildStoreIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M8 3v10M3 8h10" />
  </svg>
);

// Placeholder data (replace with API)
const STORES = [
  { id: "1", name: "Main Store", status: "Active", productPagesCount: 24, date: "Feb 18, 2025" },
  { id: "2", name: "Outlet Shop", status: "Active", productPagesCount: 12, date: "Feb 15, 2025" },
  { id: "3", name: "Test Store", status: "Draft", productPagesCount: 0, date: "Feb 10, 2025" },
  { id: "4", name: "Seasonal Pop-up", status: "Active", productPagesCount: 8, date: "Feb 5, 2025" },
  { id: "5", name: "Wholesale", status: "Paused", productPagesCount: 56, date: "Jan 28, 2025" },
  { id: "6", name: "EU Store", status: "Active", productPagesCount: 31, date: "Jan 20, 2025" },
  { id: "7", name: "Clearance", status: "Draft", productPagesCount: 3, date: "Jan 12, 2025" },
];

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function YourStoresPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const filtered = STORES.filter(
    (s) => !search.trim() || s.name.toLowerCase().includes(search.trim().toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const rows = filtered.slice(start, start + PAGE_SIZE);

  const handleRefresh = () => {
    setPage(1);
    // Placeholder: refetch stores
  };

  const handleBuildStore = () => {
    // Placeholder: navigate to build flow
  };

  const handleDelete = (id) => {
    // Placeholder: wire to API later
    console.log("Delete store", id);
  };

  const handleEdit = (id) => {
    // Placeholder: navigate or open modal
    console.log("Edit store", id);
  };

  return (
    <s-page heading="Your stores">
      <s-section>
        <h2 style={{ margin: "0px 0px 1rem 0px", fontSize: "0.9375rem", fontWeight: 600, color: "#374151" }}>
          All Your Stores
        </h2>
        {/* Search + heading and actions row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            marginBottom: "1rem",
            flexWrap: "wrap",
          }}
        >
          <form
            style={{
              flex: "1 1 280px",
              minWidth: 0,
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
            onSubmit={(e) => e.preventDefault()}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                border,
                borderRadius: radius,
                background: "#fff",
                paddingLeft: "0.6rem",
              }}
            >
              <span style={{ color: "#94a3b8", display: "flex" }} aria-hidden>
                <SearchIcon />
              </span>
              <input
                type="search"
                placeholder="Search stores"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                style={{
                  flex: 1,
                  width: 0,
                  padding: "0.5rem 0.6rem",
                  border: "none",
                  background: "none",
                  fontSize: "0.8125rem",
                  color: "#374151",
                  outline: "none",
                }}
              />
            </div>
          </form>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "0.75rem",
              flexShrink: 0,
            }}
          >
            <span style={{ display: "flex", gap: "0.5rem" }}>
              <button
                type="button"
                onClick={handleRefresh}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  padding: "0.4rem 0.6rem",
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  borderRadius: radius,
                  border,
                  background: "#fff",
                  color: "#64748b",
                  cursor: "pointer",
                }}
              >
                <RefreshIcon />
                Refresh stores
              </button>
              <button
                type="button"
                onClick={handleBuildStore}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  padding: "0.4rem 0.6rem",
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  borderRadius: radius,
                  border,
                  background: "#374151",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                <BuildStoreIcon />
                Build store
              </button>
            </span>
          </div>
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: radius,
            border,
            overflow: "hidden",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8125rem" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: border }}>
                <th style={{ textAlign: "left", padding: "0.6rem 0.75rem", fontWeight: 600, color: "#374151" }}>
                  Store
                </th>
                <th style={{ textAlign: "left", padding: "0.6rem 0.75rem", fontWeight: 600, color: "#374151" }}>
                  Status
                </th>
                <th style={{ textAlign: "left", padding: "0.6rem 0.75rem", fontWeight: 600, color: "#374151" }}>
                  Product pages
                </th>
                <th style={{ textAlign: "left", padding: "0.6rem 0.75rem", fontWeight: 600, color: "#374151" }}>
                  Date
                </th>
                <th style={{ textAlign: "right", padding: "0.6rem 0.75rem", fontWeight: 600, color: "#374151" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((store) => (
                <tr key={store.id} style={{ borderBottom: border }}>
                  <td style={{ padding: "0.6rem 0.75rem", color: "#111827", fontWeight: 500 }}>
                    {store.name}
                  </td>
                  <td style={{ padding: "0.6rem 0.75rem", color: "#64748b" }}>
                    {store.status}
                  </td>
                  <td style={{ padding: "0.6rem 0.75rem", color: "#64748b" }}>
                    {store.productPagesCount}
                  </td>
                  <td style={{ padding: "0.6rem 0.75rem", color: "#64748b" }}>
                    {store.date}
                  </td>
                  <td style={{ padding: "0.6rem 0.75rem", textAlign: "right" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                      <button
                        type="button"
                        onClick={() => handleEdit(store.id)}
                        aria-label="Edit"
                        style={{
                          padding: "0.35rem",
                          border: "none",
                          background: "none",
                          color: "#64748b",
                          cursor: "pointer",
                          borderRadius: "4px",
                        }}
                      >
                        <EditIcon />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(store.id)}
                        aria-label="Delete"
                        style={{
                          padding: "0.35rem",
                          border: "none",
                          background: "none",
                          color: "#64748b",
                          cursor: "pointer",
                          borderRadius: "4px",
                        }}
                      >
                        <DeleteIcon />
                      </button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.6rem 0.75rem",
                borderTop: border,
                fontSize: "0.8125rem",
                color: "#64748b",
              }}
            >
              <span>
                Showing {start + 1}–{Math.min(start + PAGE_SIZE, filtered.length)} of {filtered.length}
              </span>
              <span style={{ display: "flex", gap: "0.25rem" }}>
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  style={{
                    padding: "0.35rem 0.5rem",
                    fontSize: "0.8125rem",
                    borderRadius: "4px",
                    border,
                    background: "#fff",
                    color: page <= 1 ? "#94a3b8" : "#374151",
                    cursor: page <= 1 ? "not-allowed" : "pointer",
                  }}
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  style={{
                    padding: "0.35rem 0.5rem",
                    fontSize: "0.8125rem",
                    borderRadius: "4px",
                    border,
                    background: "#fff",
                    color: page >= totalPages ? "#94a3b8" : "#374151",
                    cursor: page >= totalPages ? "not-allowed" : "pointer",
                  }}
                >
                  Next
                </button>
              </span>
            </div>
          )}
        </div>
      </s-section>
    </s-page>
  );
}
