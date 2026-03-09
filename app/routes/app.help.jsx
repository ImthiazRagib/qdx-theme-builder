import { useState } from "react";

const FAQ_ITEMS = [
  { q: "How Does QDX Theme Builder Operate?", a: "QDX Theme Builder helps you design and customize your Shopify store with a visual theme builder, pre-built sections, and controls for colors, header, homepage, and product pages. You customize your store from one place without coding." },
  { q: "What Advantages Does QDX Theme Builder Offer Over Building a Store Manually?", a: "QDX Theme Builder saves time with ready-made sections and live preview, reduces the need for code, and gives you guided customization for header, hero, featured products, and more so you can launch and iterate faster." },
  { q: "How Does QDX Theme Builder Differ From Other Theme Solutions?", a: "QDX Theme Builder works with your existing Shopify store and theme, offering a dedicated theme builder plus tools like bundle deals, AI product photos, and product import—all in one app." },
  { q: "What is the Cost of Using QDX Theme Builder?", a: "Pricing depends on your plan. Check the Settings or Upgrade to Pro section in the app for current options and features included in each tier." },
  { q: "What features are included with QDX Theme Builder?", a: "QDX Theme Builder includes the theme builder (colors, header, homepage, product page), bundle deals, AI product photos, product import, your stores management, and support. Specific features may vary by plan." },
  { q: "Are the Themes Created by QDX Theme Builder Randomly Generated?", a: "No. Themes and sections are built from templates and your choices. You control layout, colors, and content; QDX Theme Builder provides the structure and controls to customize it." },
  { q: "How Long Will It Take to Customize My Store with QDX Theme Builder?", a: "With the visual theme builder and pre-built sections, you can get your store looking the way you want in a fraction of the time. Exact time depends on how much you customize and how many sections you use." },
];

const cardStyle = {
  background: "white",
  borderRadius: "0.75rem",
  padding: "1.5rem",
  marginBottom: "1rem",
  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
};

export default function SupportPage() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <s-page heading="Support">
      <s-section>
        <div style={cardStyle}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.25rem" }}>Need Help ?</h2>
          <p style={{ color: "#6b7280", marginBottom: "1rem" }}>Reach out to our support team</p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button
              type="button"
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                border: "1px solid #e5e7eb",
                background: "#f9fafb",
                cursor: "pointer",
                fontSize: "0.875rem",
                fontWeight: 500,
              }}
            >
              Email Us
            </button>
            <button
              type="button"
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                border: "none",
                background: "#18181b",
                color: "#fff",
                cursor: "pointer",
                fontSize: "0.875rem",
                fontWeight: 500,
              }}
            >
              Chat With Support
            </button>
          </div>
        </div>

        <div style={cardStyle}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1rem" }}>Frequently Asked Questions</h2>
          <div style={{ borderTop: "1px solid #e5e7eb" }}>
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "1rem 0",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    fontSize: "1rem",
                  }}
                >
                  {item.q}
                  <span
                    style={{
                      transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s",
                      fontSize: "0.75rem",
                    }}
                    aria-hidden
                  >
                    ▼
                  </span>
                </button>
                {openIndex === i && (
                  <div style={{ padding: "0 0 1rem 0", color: "#6b7280", fontSize: "0.9375rem" }}>{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </s-section>
    </s-page>
  );
}
