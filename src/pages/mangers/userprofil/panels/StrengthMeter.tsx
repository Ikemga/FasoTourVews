
const StrengthMeter = ({ value }) => {
  const score = [
    value.length >= 8,
    /[A-Z]/.test(value),
    /[0-9]/.test(value),
    /[^A-Za-z0-9]/.test(value),
  ].filter(Boolean).length;

  const colors = ["", "var(--danger)", "#e07a3a", "#d4b34a", "var(--success)"];
  const labels = ["", "Très faible", "Faible", "Moyen", "Fort"];

  return (
    <div>
      <div style={{ display: "flex", gap: 4, marginTop: 7 }}>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              height: 3, flex: 1, borderRadius: 2,
              background: i <= score ? colors[score] : "var(--surface2)",
              transition: "background .3s",
            }}
          />
        ))}
      </div>
      <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>
        {value ? (labels[score] || "Très faible") : "Saisissez un mot de passe"}
      </div>
    </div>
  );
}
export default StrengthMeter;