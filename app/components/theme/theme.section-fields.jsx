import { useThemeBuilder } from "../../context/theme.context";

const inputStyle = {
  width: "100%",
  marginTop: "0.25rem",
  padding: "0.4rem 0.55rem",
  borderRadius: "0.45rem",
  border: "1px solid #d0d4db",
  fontSize: "0.85rem",
  boxSizing: "border-box",
};

const labelStyle = { fontSize: "0.8rem", display: "block", marginBottom: "0.5rem" };

const Field = ({ label, ...rest }) => (
  <label style={labelStyle}>
    {label}
    <input style={inputStyle} {...rest} />
  </label>
);

const FieldNumber = ({ label, value, onChange, min, max }) => (
  <label style={labelStyle}>
    {label}
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      min={min}
      max={max}
      style={inputStyle}
    />
  </label>
);

const FieldCheckbox = ({ label, checked, onChange }) => (
  <label style={{ ...labelStyle, display: "flex", alignItems: "center", gap: "0.5rem" }}>
    <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    {label}
  </label>
);

const FieldSelect = ({ label, value, onChange, options }) => (
  <label style={labelStyle}>
    {label}
    <select value={value} onChange={(e) => onChange(e.target.value)} style={inputStyle}>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </label>
);

export default function SectionFields() {
  const {
    template,
    setTemplate,
    sections,
    updateSection,
    updateTestimonialItem,
    selectedGroup,
    selectedSectionName,
    selectedSubsectionName,
  } = useThemeBuilder();

  const sectionLabel = [selectedGroup, selectedSectionName, selectedSubsectionName].filter(Boolean).join(" · ");

  // Header
  if (selectedGroup === "Header" && selectedSectionName === "Logo & navigation") {
    const h = sections.header || {};
    return (
      <s-stack direction="block" gap="base">
        <s-heading>Logo & navigation</s-heading>
        <p style={{ margin: "0.35rem 0 0", fontSize: "0.78rem", color: "#4b5563" }}>{sectionLabel}</p>
        <Field label="Logo URL" value={h.logoUrl || ""} onChange={(e) => updateSection("header", "logoUrl", e.target.value)} placeholder="https://..." />
        <FieldNumber label="Logo width (px)" value={h.logoWidth || 150} onChange={(v) => updateSection("header", "logoWidth", v)} min={50} max={300} />
        <FieldCheckbox label="Show search" checked={h.showSearch !== false} onChange={(v) => updateSection("header", "showSearch", v)} />
        <FieldCheckbox label="Show cart" checked={h.showCart !== false} onChange={(v) => updateSection("header", "showCart", v)} />
      </s-stack>
    );
  }

  // Hero Banner
  if (selectedGroup === "Homepage" && selectedSectionName === "Hero Banner") {
    const h = sections.heroBanner || {};
    return (
      <s-stack direction="block" gap="base">
        <s-heading>Hero Banner</s-heading>
        <p style={{ margin: "0.35rem 0 0", fontSize: "0.78rem", color: "#4b5563" }}>{sectionLabel}</p>
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
          {["classic", "modern", "minimal"].map((t) => (
            <button key={t} type="button" onClick={() => setTemplate(t)} style={{ padding: "0.35rem 0.75rem", borderRadius: "999px", border: template === t ? "2px solid #1463ff" : "1px solid #d0d4db", background: template === t ? "rgba(20, 99, 255, 0.08)" : "white", fontSize: "0.78rem", textTransform: "capitalize", cursor: "pointer" }}>{t}</button>
          ))}
        </div>
        <Field label="Heading" value={h.heading || ""} onChange={(e) => updateSection("heroBanner", "heading", e.target.value)} />
        <Field label="Subheading" value={h.subheading || ""} onChange={(e) => updateSection("heroBanner", "subheading", e.target.value)} />
        <label style={labelStyle}>Body content <textarea value={h.body || ""} onChange={(e) => updateSection("heroBanner", "body", e.target.value)} style={{ ...inputStyle, minHeight: "4rem", resize: "vertical" }} /></label>
        <Field label="Banner image URL" value={h.bannerImageUrl || ""} onChange={(e) => updateSection("heroBanner", "bannerImageUrl", e.target.value)} placeholder="https://..." />
        <Field label="Primary button text" value={h.primaryCtaText || ""} onChange={(e) => updateSection("heroBanner", "primaryCtaText", e.target.value)} />
        <Field label="Primary button link" value={h.primaryCtaLink || ""} onChange={(e) => updateSection("heroBanner", "primaryCtaLink", e.target.value)} />
        <Field label="Secondary button text" value={h.secondaryCtaText || ""} onChange={(e) => updateSection("heroBanner", "secondaryCtaText", e.target.value)} />
        <Field label="Secondary button link" value={h.secondaryCtaLink || ""} onChange={(e) => updateSection("heroBanner", "secondaryCtaLink", e.target.value)} />
      </s-stack>
    );
  }

  // Featured Products
  if (selectedGroup === "Homepage" && selectedSectionName === "Featured Products") {
    const f = sections.featuredProducts || {};
    return (
      <s-stack direction="block" gap="base">
        <s-heading>Featured Products</s-heading>
        <p style={{ margin: "0.35rem 0 0", fontSize: "0.78rem", color: "#4b5563" }}>{sectionLabel}</p>
        <Field label="Heading" value={f.heading || ""} onChange={(e) => updateSection("featuredProducts", "heading", e.target.value)} />
        <Field label="Subheading" value={f.subheading || ""} onChange={(e) => updateSection("featuredProducts", "subheading", e.target.value)} />
        <Field label="Collection handle" value={f.collectionHandle || ""} onChange={(e) => updateSection("featuredProducts", "collectionHandle", e.target.value)} placeholder="frontpage" />
        <FieldNumber label="Products to show" value={f.productsToShow || 8} onChange={(v) => updateSection("featuredProducts", "productsToShow", v)} min={2} max={24} />
        <FieldNumber label="Columns (desktop)" value={f.columnsDesktop || 4} onChange={(v) => updateSection("featuredProducts", "columnsDesktop", v)} min={2} max={6} />
        <FieldNumber label="Columns (mobile)" value={f.columnsMobile || 2} onChange={(v) => updateSection("featuredProducts", "columnsMobile", v)} min={1} max={3} />
      </s-stack>
    );
  }

  // Image with text
  if (selectedGroup === "Homepage" && selectedSectionName === "Image with text") {
    const i = sections.imageWithText || {};
    return (
      <s-stack direction="block" gap="base">
        <s-heading>Image with text</s-heading>
        <p style={{ margin: "0.35rem 0 0", fontSize: "0.78rem", color: "#4b5563" }}>{sectionLabel}</p>
        <Field label="Heading" value={i.heading || ""} onChange={(e) => updateSection("imageWithText", "heading", e.target.value)} />
        <label style={labelStyle}>Body <textarea value={i.body || ""} onChange={(e) => updateSection("imageWithText", "body", e.target.value)} style={{ ...inputStyle, minHeight: "4rem", resize: "vertical" }} /></label>
        <Field label="Image URL" value={i.imageUrl || ""} onChange={(e) => updateSection("imageWithText", "imageUrl", e.target.value)} placeholder="https://..." />
        <FieldSelect label="Image position" value={i.imagePosition || "left"} onChange={(v) => updateSection("imageWithText", "imagePosition", v)} options={[{ value: "left", label: "Left" }, { value: "right", label: "Right" }]} />
        <Field label="Button text" value={i.buttonText || ""} onChange={(e) => updateSection("imageWithText", "buttonText", e.target.value)} />
        <Field label="Button link" value={i.buttonLink || ""} onChange={(e) => updateSection("imageWithText", "buttonLink", e.target.value)} />
      </s-stack>
    );
  }

  // Testimonials
  if (selectedGroup === "Homepage" && selectedSectionName === "Testimonials") {
    const t = sections.testimonials || {};
    const items = t.items || [];
    return (
      <s-stack direction="block" gap="base">
        <s-heading>Testimonials</s-heading>
        <p style={{ margin: "0.35rem 0 0", fontSize: "0.78rem", color: "#4b5563" }}>{sectionLabel}</p>
        <Field label="Heading" value={t.heading || ""} onChange={(e) => updateSection("testimonials", "heading", e.target.value)} />
        <Field label="Subheading" value={t.subheading || ""} onChange={(e) => updateSection("testimonials", "subheading", e.target.value)} />
        {items.map((item, i) => (
          <div key={i} style={{ padding: "0.75rem", border: "1px solid #e5e7eb", borderRadius: "0.5rem" }}>
            <p style={{ fontSize: "0.75rem", fontWeight: 600, marginBottom: "0.5rem" }}>Testimonial {i + 1}</p>
            <label style={labelStyle}>Quote <textarea value={item.quote || ""} onChange={(e) => updateTestimonialItem(i, "quote", e.target.value)} style={{ ...inputStyle, minHeight: "2.5rem", resize: "vertical" }} /></label>
            <Field label="Author" value={item.author || ""} onChange={(e) => updateTestimonialItem(i, "author", e.target.value)} />
          </div>
        ))}
      </s-stack>
    );
  }

  // Newsletter
  if (selectedGroup === "Homepage" && selectedSectionName === "Newsletter") {
    const n = sections.newsletter || {};
    return (
      <s-stack direction="block" gap="base">
        <s-heading>Newsletter</s-heading>
        <p style={{ margin: "0.35rem 0 0", fontSize: "0.78rem", color: "#4b5563" }}>{sectionLabel}</p>
        <Field label="Heading" value={n.heading || ""} onChange={(e) => updateSection("newsletter", "heading", e.target.value)} />
        <Field label="Subheading" value={n.subheading || ""} onChange={(e) => updateSection("newsletter", "subheading", e.target.value)} />
        <Field label="Placeholder" value={n.placeholder || ""} onChange={(e) => updateSection("newsletter", "placeholder", e.target.value)} />
        <Field label="Button text" value={n.buttonText || ""} onChange={(e) => updateSection("newsletter", "buttonText", e.target.value)} />
        <label style={labelStyle}>Footer text <textarea value={n.body || ""} onChange={(e) => updateSection("newsletter", "body", e.target.value)} style={{ ...inputStyle, minHeight: "2.5rem", resize: "vertical" }} /></label>
      </s-stack>
    );
  }

  // Footer
  if (selectedGroup === "Footer" && selectedSectionName === "Footer") {
    const f = sections.footer || {};
    return (
      <s-stack direction="block" gap="base">
        <s-heading>Footer</s-heading>
        <p style={{ margin: "0.35rem 0 0", fontSize: "0.78rem", color: "#4b5563" }}>{sectionLabel}</p>
        <FieldCheckbox label="Show payment icons" checked={f.showPaymentIcons !== false} onChange={(v) => updateSection("footer", "showPaymentIcons", v)} />
        <Field label="Copyright text" value={f.copyrightText || ""} onChange={(e) => updateSection("footer", "copyrightText", e.target.value)} />
        <p style={{ fontSize: "0.8rem", marginTop: "0.75rem" }}>Menu items</p>
        {(f.menuItems || []).map((item, i) => (
          <div key={i} style={{ display: "flex", gap: "0.5rem" }}>
            <input style={{ ...inputStyle, flex: 1 }} placeholder="Title" value={item.title || ""} onChange={(e) => {
              const next = [...(f.menuItems || [])];
              next[i] = { ...next[i], title: e.target.value };
              updateSection("footer", "menuItems", next);
            }} />
            <input style={{ ...inputStyle, flex: 1 }} placeholder="Link" value={item.link || ""} onChange={(e) => {
              const next = [...(f.menuItems || [])];
              next[i] = { ...next[i], link: e.target.value };
              updateSection("footer", "menuItems", next);
            }} />
          </div>
        ))}
      </s-stack>
    );
  }

  // Product Gallery
  if (selectedGroup === "Product Page" && (selectedSectionName === "Gallery" || selectedSubsectionName === "Thumbnails" || selectedSubsectionName === "Zoom View")) {
    const g = sections.productGallery || {};
    return (
      <s-stack direction="block" gap="base">
        <s-heading>Product Gallery</s-heading>
        <p style={{ margin: "0.35rem 0 0", fontSize: "0.78rem", color: "#4b5563" }}>{sectionLabel}</p>
        <FieldSelect label="Layout" value={g.layout || "thumbnails"} onChange={(v) => updateSection("productGallery", "layout", v)} options={[{ value: "thumbnails", label: "Thumbnails" }, { value: "grid", label: "Grid" }]} />
        <FieldCheckbox label="Show thumbnails" checked={g.showThumbnails !== false} onChange={(v) => updateSection("productGallery", "showThumbnails", v)} />
        <FieldCheckbox label="Show zoom" checked={g.showZoom !== false} onChange={(v) => updateSection("productGallery", "showZoom", v)} />
        <FieldSelect label="Thumbnail position" value={g.thumbnailPosition || "bottom"} onChange={(v) => updateSection("productGallery", "thumbnailPosition", v)} options={[{ value: "bottom", label: "Bottom" }, { value: "left", label: "Left" }]} />
      </s-stack>
    );
  }

  // Product Details
  if (selectedGroup === "Product Page" && (selectedSectionName === "Details" || ["Title", "Price", "Description"].includes(selectedSubsectionName))) {
    const d = sections.productDetails || {};
    return (
      <s-stack direction="block" gap="base">
        <s-heading>Product Details</s-heading>
        <p style={{ margin: "0.35rem 0 0", fontSize: "0.78rem", color: "#4b5563" }}>{sectionLabel}</p>
        <FieldCheckbox label="Show vendor" checked={d.showVendor !== false} onChange={(v) => updateSection("productDetails", "showVendor", v)} />
        <FieldCheckbox label="Show SKU" checked={d.showSKU !== false} onChange={(v) => updateSection("productDetails", "showSKU", v)} />
        <FieldCheckbox label="Show quantity selector" checked={d.showQuantitySelector !== false} onChange={(v) => updateSection("productDetails", "showQuantitySelector", v)} />
        <Field label="Product title" value={d.productTitle || ""} onChange={(e) => updateSection("productDetails", "productTitle", e.target.value)} />
        <Field label="Product price" value={d.productPrice || ""} onChange={(e) => updateSection("productDetails", "productPrice", e.target.value)} />
        <label style={labelStyle}>Product description <textarea value={d.productDescription || ""} onChange={(e) => updateSection("productDetails", "productDescription", e.target.value)} style={{ ...inputStyle, minHeight: "4rem", resize: "vertical" }} /></label>
      </s-stack>
    );
  }

  // Product Reviews
  if (selectedGroup === "Product Page" && selectedSectionName === "Reviews") {
    const r = sections.productReviews || {};
    return (
      <s-stack direction="block" gap="base">
        <s-heading>Product Reviews</s-heading>
        <p style={{ margin: "0.35rem 0 0", fontSize: "0.78rem", color: "#4b5563" }}>{sectionLabel}</p>
        <FieldCheckbox label="Enable reviews" checked={r.enableReviews !== false} onChange={(v) => updateSection("productReviews", "enableReviews", v)} />
        <FieldCheckbox label="Show rating" checked={r.showRating !== false} onChange={(v) => updateSection("productReviews", "showRating", v)} />
        <FieldNumber label="Reviews count (display)" value={r.reviewsCount || 0} onChange={(v) => updateSection("productReviews", "reviewsCount", v)} min={0} max={999} />
      </s-stack>
    );
  }

  // Fallback
  return (
    <s-stack direction="block" gap="base">
      <s-heading>Selected section</s-heading>
      <p style={{ margin: "0.35rem 0 0", fontSize: "0.78rem", color: "#4b5563" }}>{sectionLabel}</p>
      <p style={{ fontSize: "0.85rem", color: "#6b7280" }}>Select a section to edit its settings.</p>
    </s-stack>
  );
}
