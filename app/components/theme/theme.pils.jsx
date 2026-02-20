const TemplatePill = (props) => {
  const { label, active, onClick } = props;
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "0.4rem 0.75rem",
        borderRadius: "999px",
        border: active ? "2px solid #1463ff" : "1px solid #d0d4db",
        background: active ? "rgba(20, 99, 255, 0.08)" : "white",
        fontSize: "0.8rem",
        textTransform: "capitalize",
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
};

export default TemplatePill;