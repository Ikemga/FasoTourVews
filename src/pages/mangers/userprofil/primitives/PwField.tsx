import { useState } from "react";

/**
 * PwField — champ mot de passe avec bouton toggle visibilité.
 *
 * @param {{ id?: string, placeholder?: string, onChange?: fn }} props
 */
export function PwField({ id, placeholder, onChange }) {
  const [visible, setVisible] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <input
        type={visible ? "text" : "password"}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        style={{ paddingRight: 42 }}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        style={{
          position: "absolute", right: 13, top: "50%", transform: "translateY(-50%)",
          background: "none", border: "none", cursor: "pointer",
          fontSize: 15, color: "var(--muted)", lineHeight: 1,
        }}
      >
        {visible ? "🙈" : "👁"}
      </button>
    </div>
  );
}
