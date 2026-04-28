import { useEffect } from "react";

interface Reservation {
    id: number;
    reference: string;
    circuitId: number;
    circuitName: string;
    statut: string;
    statutDescription: string;
    nomComplet: string;
    touristeId: number;
    nombrePersonne: number;
    dateResevation: string;
    dateLimitePaiement: string;
    prixCircuit: number;
    fraisReservation: number;
    montantTotal: number;
    montantTotalRembourse: number | null;
    paiementId: number;
    referencePaie: string;
    commentaire: string;
}

interface Props {
    reservation: Reservation | null;
    onClose: () => void;
    onCancel: (row: Reservation) => void;
}

// ─── Palette de couleurs concrètes (sans var CSS) ───────
const C = {
    bg:          "#ffffff",
    bgSurface:   "#f9fafb",
    border:      "#e5e7eb",
    textPrimary: "#111827",
    textMuted:   "#6b7280",
};

const STATUS_CONFIG: Record<string, { bg: string; color: string; border: string }> = {
    ANNULEE:    { bg: "#FCEBEB", color: "#A32D2D", border: "#F09595" },
    CONFIRMEE:  { bg: "#E1F5EE", color: "#0F6E56", border: "#5DCAA5" },
    EN_ATTENTE: { bg: "#FAEEDA", color: "#633806", border: "#FAC775" },
    EXPIREE:    { bg: "#F1EFE8", color: "#5F5E5A", border: "#B4B2A9" },
};

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
        day: "2-digit", month: "short", year: "numeric",
    });
}

function formatMontant(val: number | null) {
    if (val == null) return "Non renseigné";
    return val.toLocaleString("fr-FR") + " FCFA";
}

function initiales(nom: string) {
    return nom.trim().split(" ").map((w) => w[0]?.toUpperCase() ?? "").join("").slice(0, 2);
}

function capitalize(str: string) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/* ─── Sub-components ────────────────────────────────── */

function Section({ title, children, last = false }: {
    title: string; children: React.ReactNode; last?: boolean;
}) {
    return (
        <div style={{ padding: "14px 20px", borderBottom: last ? "none" : `1px solid ${C.border}` }}>
            <p style={{
                fontSize: 10, fontWeight: 600, color: C.textMuted,
                textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 10px",
            }}>
                {title}
            </p>
            {children}
        </div>
    );
}

function Metric({ label, value, span2 = false }: { label: string; value: string; span2?: boolean }) {
    return (
        <div style={{
            background: C.bgSurface, borderRadius: 8, padding: "9px 12px",
            gridColumn: span2 ? "span 2" : undefined,
        }}>
            <p style={{ fontSize: 11, color: C.textMuted, margin: "0 0 3px" }}>{label}</p>
            <p style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary, margin: 0 }}>{value}</p>
        </div>
    );
}

function Row({ label, value, mono = false, last = false }: {
    label: string; value: string | number; mono?: boolean; last?: boolean;
}) {
    return (
        <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "7px 0", borderBottom: last ? "none" : `1px solid ${C.border}`, fontSize: 13,
        }}>
            <span style={{ color: C.textMuted }}>{label}</span>
            <span style={{
                fontWeight: 600, color: C.textPrimary,
                fontFamily: mono ? "ui-monospace, monospace" : undefined,
                fontSize: mono ? 11 : 13,
            }}>
                {value}
            </span>
        </div>
    );
}

/* ─── Main Drawer ───────────────────────────────────── */

const ReservationDetailDrawer = ({ reservation, onClose, onCancel }: Props) => {

    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [onClose]);

    if (!reservation) return null;

    const statusCfg = STATUS_CONFIG[reservation.statut] ?? STATUS_CONFIG.EN_ATTENTE;
    const canCancel = ["EN_ATTENTE", "PARTIELLE"].includes(reservation.statut);

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

            {/* Drawer panel */}
            <div style={{
                position: "fixed", top: 0, right: 0, bottom: 0,
                width: 400, maxWidth: "95vw",
                background: C.bg,
                borderLeft: `1px solid ${C.border}`,
                boxShadow: "-6px 0 30px rgba(0,0,0,0.1)",
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

                {/* Header */}
                <div style={{
                    padding: "16px 20px",
                    borderBottom: `1px solid ${C.border}`,
                    display: "flex", alignItems: "flex-start",
                    justifyContent: "space-between", gap: 12, flexShrink: 0,
                    background: C.bg,
                }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                        <span style={{
                            display: "inline-block",
                            background: statusCfg.bg, color: statusCfg.color,
                            border: `1px solid ${statusCfg.border}`,
                            fontSize: 11, fontWeight: 600,
                            padding: "3px 10px", borderRadius: 20, width: "fit-content",
                        }}>
                            {reservation.statutDescription}
                        </span>
                        <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: C.textPrimary }}>
                            {reservation.circuitName}
                        </p>
                        <span style={{ fontSize: 12, color: C.textMuted, letterSpacing: "0.03em" }}>
                            {reservation.reference}
                        </span>
                    </div>

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

                {/* Body scrollable */}
                <div style={{ flex: 1, overflowY: "auto", background: C.bg }}>

                    <Section title="Touriste">
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <div style={{
                                width: 40, height: 40, borderRadius: "50%",
                                background: "#E1F5EE",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 13, fontWeight: 700, color: "#0F6E56", flexShrink: 0,
                            }}>
                                {initiales(reservation.nomComplet)}
                            </div>
                            <div>
                                <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: C.textPrimary }}>
                                    {capitalize(reservation.nomComplet)}
                                </p>
                                <p style={{ margin: 0, fontSize: 12, color: C.textMuted }}>
                                    ID touriste · {reservation.touristeId}
                                </p>
                            </div>
                        </div>
                    </Section>

                    <Section title="Détails de la réservation">
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                            <Metric label="Date de réservation" value={formatDate(reservation.dateResevation)} />
                            <Metric label="Limite de paiement"  value={formatDate(reservation.dateLimitePaiement)} />
                            <Metric
                                label="Nombre de personnes"
                                value={`${reservation.nombrePersonne} personne${reservation.nombrePersonne > 1 ? "s" : ""}`}
                                span2
                            />
                        </div>
                    </Section>

                    <Section title="Récapitulatif financier">
                        <Row label="Prix du circuit"      value={formatMontant(reservation.prixCircuit)} />
                        <Row label="Frais de réservation" value={formatMontant(reservation.fraisReservation)} last />
                        <div style={{
                            display: "flex", justifyContent: "space-between", alignItems: "center",
                            padding: "10px 0 4px",
                            borderTop: `1px solid ${C.border}`, marginTop: 4,
                        }}>
                            <span style={{ fontSize: 14, fontWeight: 600, color: C.textPrimary }}>Montant total</span>
                            <span style={{ fontSize: 18, fontWeight: 700, color: C.textPrimary }}>
                                {formatMontant(reservation.montantTotal)}
                            </span>
                        </div>
                        <div style={{
                            background: "#FAEEDA", borderRadius: 8,
                            padding: "9px 14px",
                            display: "flex", justifyContent: "space-between", alignItems: "center",
                            marginTop: 10,
                        }}>
                            <span style={{ fontSize: 12, color: "#633806" }}>Montant remboursé</span>
                            <span style={{ fontSize: 13, fontWeight: 600, color: "#412402" }}>
                                {formatMontant(reservation.montantTotalRembourse)}
                            </span>
                        </div>
                    </Section>

                    <Section title="Paiement">
                        <Row label="Référence paiement" value={reservation.referencePaie} mono />
                        <Row label="ID paiement"        value={reservation.paiementId}    last />
                    </Section>

                    <Section title="Commentaire" last>
                        {reservation.commentaire ? (
                            <p style={{ fontSize: 13, color: C.textPrimary, margin: 0, lineHeight: 1.6 }}>
                                {reservation.commentaire}
                            </p>
                        ) : (
                            <p style={{ fontSize: 13, color: C.textMuted, fontStyle: "italic", margin: 0 }}>
                                Aucun commentaire.
                            </p>
                        )}
                    </Section>
                </div>

                {/* Footer */}
                {canCancel && (
                    <div style={{
                        padding: "14px 20px",
                        borderTop: `1px solid ${C.border}`,
                        flexShrink: 0, background: C.bg,
                    }}>
                        <button
                            onClick={() => onCancel(reservation)}
                            style={{
                                width: "100%", padding: "10px 0",
                                background: "#FCEBEB", color: "#A32D2D",
                                border: "1px solid #F09595",
                                borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer",
                            }}
                        >
                            Annuler la réservation
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default ReservationDetailDrawer;