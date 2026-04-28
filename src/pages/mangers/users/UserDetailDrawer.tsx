import { useEffect } from "react";

interface Utilisateur {
    id: number;
    nomComplet: string;
    mail: string;
    telephone: string;
    preferenceTouristique: string;
    actif: boolean;
    createAt: string;
    pays: string;
    langues: string[];
    roles: string[];
}

interface Props {
    utilisateur: Utilisateur | null;
    onClose: () => void;
    onToggleActif?: (user: Utilisateur) => void;  // optionnel : activer / désactiver
}

// ─── Couleurs concrètes ──────────────────────────────────
const C = {
    bg:          "#ffffff",
    bgSurface:   "#f9fafb",
    border:      "#e5e7eb",
    textPrimary: "#111827",
    textMuted:   "#6b7280",
    textHint:    "#9ca3af",
};

const ROLE_CONFIG: Record<string, { bg: string; color: string; border: string }> = {
    TOURISTE:      { bg: "#EEF2FF", color: "#3730A3", border: "#A5B4FC" },
    AGENCE:        { bg: "#FDF4FF", color: "#7E22CE", border: "#D8B4FE" },
    ADMIN:         { bg: "#FFF7ED", color: "#C2410C", border: "#FED7AA" },
    SUPER_ADMIN:   { bg: "#FEF2F2", color: "#B91C1C", border: "#FECACA" },
};

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
        day: "2-digit", month: "short", year: "numeric",
    });
}

function initiales(nom: string) {
    return nom.trim().split(" ").map((w) => w[0]?.toUpperCase() ?? "").join("").slice(0, 2);
}

/* ─── Sub-components ────────────────────────────────────── */

function Section({ title, children, last = false }: {
    title: string; children: React.ReactNode; last?: boolean;
}) {
    return (
        <div style={{ padding: "14px 20px", borderBottom: last ? "none" : `1px solid ${C.border}` }}>
            <p style={{
                fontSize: 10, fontWeight: 700, color: C.textHint,
                textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 10px",
            }}>
                {title}
            </p>
            {children}
        </div>
    );
}

function Row({ icon, label, value, small = false }: {
    icon: React.ReactNode; label: string; value: string; small?: boolean;
}) {
    return (
        <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "7px 0", borderBottom: `1px solid #f3f4f6`, fontSize: 13,
        }}>
            <span style={{ color: C.textMuted, display: "flex", alignItems: "center", gap: 7 }}>
                {icon}
                {label}
            </span>
            <span style={{
                fontWeight: 600, color: C.textPrimary,
                fontSize: small ? 12 : 13, textAlign: "right", maxWidth: "55%",
            }}>
                {value}
            </span>
        </div>
    );
}

function Metric({ label, value, accent }: { label: string; value: string; accent?: string }) {
    return (
        <div style={{ background: C.bgSurface, borderRadius: 8, padding: "9px 12px" }}>
            <p style={{ fontSize: 11, color: C.textHint, margin: "0 0 3px" }}>{label}</p>
            <p style={{ fontSize: 13, fontWeight: 600, color: accent ?? C.textPrimary, margin: 0 }}>{value}</p>
        </div>
    );
}

// ── Icônes SVG inline ────────────────────────────────────
const IconMail = () => (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke={C.textHint} strokeWidth="1.5">
        <rect x="1" y="3" width="14" height="10" rx="2" />
        <path d="M1 5l7 5 7-5" />
    </svg>
);
const IconPhone = () => (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke={C.textHint} strokeWidth="1.5">
        <rect x="4" y="1" width="8" height="14" rx="2" />
        <circle cx="8" cy="12" r="0.8" fill={C.textHint} />
    </svg>
);
const IconPin = () => (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke={C.textHint} strokeWidth="1.5">
        <circle cx="8" cy="7" r="2.5" />
        <path d="M8 1C4.7 1 2 3.7 2 7c0 4 6 9 6 9s6-5 6-9c0-3.3-2.7-6-6-6z" />
    </svg>
);
const IconStar = () => (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke={C.textHint} strokeWidth="1.5">
        <path d="M8 2l1.5 3 3.5.5-2.5 2.5.6 3.5L8 10l-3.1 1.5.6-3.5L3 5.5l3.5-.5z" />
    </svg>
);

/* ─── Main Drawer ───────────────────────────────────────── */

const UserDetailDrawer = ({ utilisateur, onClose, onToggleActif }: Props) => {

    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [onClose]);

    if (!utilisateur) return null;

    const roleCfg = ROLE_CONFIG[utilisateur.roles?.[0]] ?? ROLE_CONFIG.TOURISTE;

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                style={{
                    position: "fixed", inset: 0,
                    background: "rgba(0,0,0,0.25)",
                    zIndex: 40,
                }}
            />

            {/* Drawer */}
            <div style={{
                position: "fixed", top: 0, right: 0, bottom: 0,
                width: 400, maxWidth: "95vw",
                background: C.bg,
                borderLeft: `1px solid ${C.border}`,
                boxShadow: "-6px 0 30px rgba(0,0,0,0.08)",
                zIndex: 50,
                display: "flex", flexDirection: "column",
                animation: "slideIn 0.22s ease-out",
            }}>
                <style>{`
                    @keyframes slideIn {
                        from { transform: translateX(100%); opacity: 0; }
                        to   { transform: translateX(0);    opacity: 1; }
                    }
                `}</style>

                {/* ── Header ── */}
                <div style={{
                    padding: "18px 20px",
                    borderBottom: `1px solid ${C.border}`,
                    display: "flex", alignItems: "center", gap: 14,
                    flexShrink: 0, background: C.bg,
                }}>
                    {/* Avatar */}
                    <div style={{
                        width: 52, height: 52, borderRadius: "50%",
                        background: "#EEF2FF",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 17, fontWeight: 700, color: "#4338CA", flexShrink: 0,
                    }}>
                        {initiales(utilisateur.nomComplet)}
                    </div>

                    {/* Infos */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: C.textPrimary }}>
                            {utilisateur.nomComplet}
                        </p>
                        <p style={{ margin: "2px 0 8px", fontSize: 12, color: C.textMuted }}>
                            ID · {utilisateur.id} &nbsp;·&nbsp; Membre depuis {formatDate(utilisateur.createAt)}
                        </p>
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                            {/* Badge statut */}
                            <span style={{
                                background: utilisateur.actif ? "#E1F5EE" : "#F9FAFB",
                                color:      utilisateur.actif ? "#0F6E56" : "#6b7280",
                                border:     `1px solid ${utilisateur.actif ? "#5DCAA5" : "#e5e7eb"}`,
                                fontSize: 10, fontWeight: 600,
                                padding: "2px 8px", borderRadius: 20,
                                display: "flex", alignItems: "center", gap: 4,
                            }}>
                                <span style={{
                                    width: 6, height: 6, borderRadius: "50%",
                                    background: utilisateur.actif ? "#10b981" : "#9ca3af",
                                    display: "inline-block",
                                }} />
                                {utilisateur.actif ? "Actif" : "Inactif"}
                            </span>

                            {/* Badges rôles */}
                            {utilisateur.roles?.map((role) => {
                                const cfg = ROLE_CONFIG[role] ?? ROLE_CONFIG.TOURISTE;
                                return (
                                    <span key={role} style={{
                                        background: cfg.bg, color: cfg.color,
                                        border: `1px solid ${cfg.border}`,
                                        fontSize: 10, fontWeight: 600,
                                        padding: "2px 8px", borderRadius: 20,
                                    }}>
                                        {role}
                                    </span>
                                );
                            })}
                        </div>
                    </div>

                    {/* Bouton fermer */}
                    <button
                        onClick={onClose}
                        style={{
                            width: 30, height: 30, borderRadius: "50%",
                            background: C.bgSurface, border: `1px solid ${C.border}`,
                            cursor: "pointer", fontSize: 18, color: C.textMuted,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            flexShrink: 0,
                        }}
                        aria-label="Fermer"
                    >
                        ×
                    </button>
                </div>

                {/* ── Body ── */}
                <div style={{ flex: 1, overflowY: "auto", background: C.bg }}>

                    {/* Coordonnées */}
                    <Section title="Coordonnées">
                        <Row icon={<IconMail />}  label="Email"     value={utilisateur.mail}      small />
                        <Row icon={<IconPhone />} label="Téléphone" value={utilisateur.telephone} />
                        <Row icon={<IconPin />}   label="Pays"      value={utilisateur.pays}      />
                    </Section>

                    {/* Profil touristique */}
                    <Section title="Profil touristique">
                        <Row icon={<IconStar />} label="Préférence" value={utilisateur.preferenceTouristique} />
                        {utilisateur.langues?.length > 0 && (
                            <div style={{ paddingTop: 8 }}>
                                <p style={{ fontSize: 12, color: C.textMuted, margin: "0 0 8px" }}>Langues parlées</p>
                                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                                    {utilisateur.langues.map((lang) => (
                                        <span key={lang} style={{
                                            background: C.bgSurface,
                                            border: `1px solid ${C.border}`,
                                            borderRadius: 6, padding: "4px 12px",
                                            fontSize: 12, fontWeight: 500, color: C.textPrimary,
                                        }}>
                                            {lang}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </Section>

                    {/* Compte */}
                    <Section title="Informations du compte" last={!onToggleActif}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                            <Metric label="Inscrit le"  value={formatDate(utilisateur.createAt)} />
                            <Metric
                                label="Statut"
                                value={utilisateur.actif ? "Actif" : "Inactif"}
                                accent={utilisateur.actif ? "#0F6E56" : "#6b7280"}
                            />
                        </div>
                    </Section>
                </div>

                {/* ── Footer (optionnel) ── */}
                {onToggleActif && (
                    <div style={{
                        padding: "14px 20px",
                        borderTop: `1px solid ${C.border}`,
                        flexShrink: 0, background: C.bg,
                    }}>
                        <button
                            onClick={() => onToggleActif(utilisateur)}
                            style={{
                                width: "100%", padding: "10px 0",
                                background: utilisateur.actif ? "#FEF2F2" : "#E1F5EE",
                                color:      utilisateur.actif ? "#B91C1C" : "#0F6E56",
                                border:     `1px solid ${utilisateur.actif ? "#FECACA" : "#5DCAA5"}`,
                                borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer",
                            }}
                        >
                            {utilisateur.actif ? "Désactiver le compte" : "Activer le compte"}
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default UserDetailDrawer;