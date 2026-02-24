const MODEL_NAMES = [
  { id: "basic", label: "Basic" },
  { id: "advance", label: "Advance" },
];

const EXECUTION_TYPES = [
  { id: "fast", label: "Fast" },
  { id: "balanced", label: "Balanced" },
  { id: "quality", label: "Quality" },
];

const GENERATION_MODES = [
  { id: "replace-bg", label: "Replace background" },
  { id: "enhance", label: "Enhance" },
  { id: "generate", label: "Generate new" },
  { id: "variations", label: "Variations" },
];

const GENDERS = [
  { id: "male", label: "Male" },
  { id: "female", label: "Female" },
  { id: "unisex", label: "Unisex" },
  { id: "kids", label: "Kids" },
];

const BRAND_LOGO_OPTIONS = [
  { id: "yes", label: "Yes" },
  { id: "no", label: "No" },
];

const STYLE_OPTIONS = [
  { id: "realistic", label: "Realistic" },
  { id: "product", label: "Product shot" },
  { id: "lifestyle", label: "Lifestyle" },
  { id: "minimal", label: "Minimal" },
  { id: "vintage", label: "Vintage" },
  { id: "modern", label: "Modern" },
  { id: "luxury", label: "Luxury" },
  { id: "eco", label: "Eco-friendly" },
  { id: "bold", label: "Bold" },
  { id: "soft", label: "Soft" },
  { id: "professional", label: "Professional" },
  { id: "creative", label: "Creative" },
  { id: "editorial", label: "Editorial" },
];

const labelStyle = {
  fontSize: "0.75rem",
  color: "#71717a",
  margin: "0 0 0.5rem 0",
  textTransform: "uppercase",
  letterSpacing: "0.04em",
};

const baseBtn = {
  padding: "0.375rem 0.75rem",
  fontSize: "0.8125rem",
  fontWeight: 500,
  borderRadius: "9999px",
  border: "1px solid #e5e7eb",
  background: "#fff",
  color: "#71717a",
  cursor: "pointer",
};

function PillGroup({ options, selected, onSelect, multi = false }) {
  const isSelected = (id) =>
    multi ? selected.includes(id) : selected === id;
  const toggle = (id) => {
    if (multi) {
      const next = selected.includes(id)
        ? selected.filter((s) => s !== id)
        : [...selected, id];
      onSelect(next);
    } else {
      onSelect(id);
    }
  };
  return (
    <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap" }}>
      {options.map((opt) => {
        const active = isSelected(opt.id);
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => toggle(opt.id)}
            style={{
              ...baseBtn,
              background: active ? "#18181b" : "#fff",
              color: active ? "#fff" : "#71717a",
              borderColor: active ? "#18181b" : "#e5e7eb",
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function SelectorRow({ title, children }) {
  return (
    <div>
      <p style={labelStyle}>{title}</p>
      {children}
    </div>
  );
}

export default function AiModelSelector({
  modelName,
  onModelNameChange,
  executionType,
  onExecutionChange,
  generationMode,
  onGenerationModeChange,
  gender,
  onGenderChange,
  brandLogo,
  onBrandLogoChange,
  modelStyles = [],
  onModelStylesChange,
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        marginBottom: "1.25rem",
      }}
    >
      <SelectorRow title="Model name">
        <PillGroup
          options={MODEL_NAMES}
          selected={modelName}
          onSelect={onModelNameChange}
        />
      </SelectorRow>

      <SelectorRow title="Execution">
        <PillGroup
          options={EXECUTION_TYPES}
          selected={executionType}
          onSelect={onExecutionChange}
        />
      </SelectorRow>

      <SelectorRow title="Generation mode">
        <PillGroup
          options={GENERATION_MODES}
          selected={generationMode}
          onSelect={onGenerationModeChange}
        />
      </SelectorRow>

      <SelectorRow title="What gender is this product for?">
        <PillGroup options={GENDERS} selected={gender} onSelect={onGenderChange} />
      </SelectorRow>

      <SelectorRow title="Would you like to place your brand logo on the product?">
        <PillGroup
          options={BRAND_LOGO_OPTIONS}
          selected={brandLogo}
          onSelect={onBrandLogoChange}
        />
      </SelectorRow>

      <SelectorRow title="Style controls">
        <PillGroup
          options={STYLE_OPTIONS}
          selected={modelStyles}
          onSelect={onModelStylesChange}
          multi
        />
      </SelectorRow>
    </div>
  );
}
