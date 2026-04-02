/**
 * Toast — notification temporaire ancrée en bas à droite.
 * Rendu null si aucun message actif.
 *
 * @param {{ message: string|null }} props
 */
export function Toast({ message }) {
  if (!message) return null;

  return (
    <div style={{
      position: "fixed", bottom: 26, right: 26,
      background: "var(--surface)",
      border: "1px solid rgba(92,184,142,.3)",
      borderRadius: 12, padding: "13px 18px",
      display: "flex", alignItems: "center", gap: 10,
      fontSize: 14,
      boxShadow: "0 8px 32px rgba(0,0,0,.5)",
      animation: "toastIn .35s cubic-bezier(.34,1.56,.64,1)",
      zIndex: 999,
    }}>
      {message}
    </div>
  );
}
