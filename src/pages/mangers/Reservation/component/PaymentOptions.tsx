import { useEffect, useState } from "react";
import { AlertCircle }         from "lucide-react";

const PaymentOptions = ({
    total,
    nombrePersonne,
    prixIndividuel,
    fraisReservation,
    onSelect,
}) => {

    const [selected,        setSelected]        = useState("frais");
    const [montantCustom,   setMontantCustom]   = useState("");
    const [customError,     setCustomError]     = useState("");

    const montantFrais = fraisReservation * nombrePersonne;
    const montantTotal = total + montantFrais;

    // Resync parent quand les props changent
    useEffect(() => {
        const montant = getMontant(selected);
        notifyParent(selected, montant);
    }, [nombrePersonne, fraisReservation, total]);

    const getMontant = (mode) => {
        if (mode === "frais")  return montantFrais;
        if (mode === "total")  return montantTotal;
        // mode === "custom"
        const val = parseFloat(montantCustom);
        return isNaN(val) ? 0 : val;
    };

    const notifyParent = (mode, montant) => {
        onSelect?.({
            mode,
            montant,
            details: {
                nombrePersonne,
                prixIndividuel,
                totalCircuit: total,
                frais:        montantFrais,
            },
        });
    };

    const handleSelect = (mode) => {
        setSelected(mode);
        setCustomError("");
        if (mode !== "custom") {
            notifyParent(mode, getMontant(mode));
        } else {
            // En mode custom on notifie avec la valeur actuelle (peut être 0)
            const val = parseFloat(montantCustom) || 0;
            notifyParent("custom", val);
        }
    };

    const handleCustomChange = (e) => {
        const raw = e.target.value;
        setMontantCustom(raw);
        setCustomError("");

        const val = parseFloat(raw);

        if (isNaN(val) || val <= 0) {
            setCustomError("Montant invalide.");
            notifyParent("custom", 0);
            return;
        }
        if (val < montantFrais) {
            setCustomError(`Minimum : ${montantFrais.toLocaleString("fr-FR")} FCFA (frais de réservation).`);
            notifyParent("custom", 0);
            return;
        }
        if (val > montantTotal) {
            setCustomError(`Maximum : ${montantTotal.toLocaleString("fr-FR")} FCFA (montant total).`);
            notifyParent("custom", 0);
            return;
        }

        notifyParent("custom", val);
    };

    return (
        <div className="bg-[#faf8f5] p-6 rounded-2xl space-y-3">
            <h2 className="text-lg font-bold text-gray-900">Option de paiement</h2>

            {/* ── Option 1 : frais uniquement ── */}
            <OptionCard
                selected={selected === "frais"}
                onClick={() => handleSelect("frais")}
                title="Frais de réservation uniquement"
                badge="Uniquement les frais"
                amount={`${montantFrais.toLocaleString("fr-FR")} FCFA`}
                description={
                    <>
                        Payez les frais maintenant et le reste avant le départ.<br />
                        ({fraisReservation.toLocaleString("fr-FR")} × {nombrePersonne} personne{nombrePersonne > 1 ? "s" : ""})
                    </>
                }
            />

            {/* ── Option 2 : paiement intégral ── */}
            <OptionCard
                selected={selected === "total"}
                onClick={() => handleSelect("total")}
                title="Paiement intégral"
                badge="Recommandé"
                amount={`${montantTotal.toLocaleString("fr-FR")} FCFA`}
                description={
                    <>
                        Payez la totalité : circuit ({nombrePersonne} ×{" "}
                        {prixIndividuel.toLocaleString("fr-FR")} FCFA) + frais de réservation.
                    </>
                }
            />

            {/* ── Option 3 : montant personnalisé ── */}
            <OptionCard
                selected={selected === "custom"}
                onClick={() => handleSelect("custom")}
                title="Montant personnalisé"
                badge="Flexible"
                badgeColor="#7c3aed"
                amount={
                    selected === "custom" && parseFloat(montantCustom) > 0
                        ? `${parseFloat(montantCustom).toLocaleString("fr-FR")} FCFA`
                        : "—"
                }
                description={
                    <>
                        Saisissez le montant que vous souhaitez payer maintenant.<br />
                        Min : <strong>{montantFrais.toLocaleString("fr-FR")} FCFA</strong> —
                        Max : <strong>{montantTotal.toLocaleString("fr-FR")} FCFA</strong>.
                    </>
                }
            >
                {/* Champ affiché uniquement si cette option est sélectionnée */}
                {selected === "custom" && (
                    <div className="mt-3 space-y-1" onClick={e => e.stopPropagation()}>
                        <div className="relative">
                            <input
                                type="number"
                                min={montantFrais}
                                max={montantTotal}
                                value={montantCustom}
                                onChange={handleCustomChange}
                                placeholder={`Ex : ${Math.round(montantTotal / 2).toLocaleString("fr-FR")}`}
                                className={`w-full border rounded-xl px-4 py-2.5 pr-16 text-sm bg-white focus:outline-none focus:ring-2 transition ${
                                    customError
                                        ? "border-red-400 focus:ring-red-200"
                                        : "border-gray-200 focus:ring-[#c1440e]/30 focus:border-[#c1440e]"
                                }`}
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">
                                FCFA
                            </span>
                        </div>

                        {customError && (
                            <div className="flex items-start gap-1.5 text-red-500 text-xs">
                                <AlertCircle size={13} className="mt-0.5 flex-shrink-0" />
                                <span>{customError}</span>
                            </div>
                        )}

                        {/* Raccourcis rapides */}
                        <div className="flex gap-2 flex-wrap pt-1">
                            {[25, 50, 75].map(pct => {
                                const val = Math.round(montantTotal * pct / 100);
                                return (
                                    <button
                                        key={pct}
                                        type="button"
                                        onClick={() => handleCustomChange({ target: { value: String(val) } })}
                                        className="text-xs px-3 py-1 rounded-full border border-[#c1440e]/30 text-[#c1440e] hover:bg-[#fdf5f0] transition"
                                    >
                                        {pct}% ({val.toLocaleString("fr-FR")} FCFA)
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </OptionCard>
        </div>
    );
};

/* ── Sous-composant carte ── */
const OptionCard = ({ selected, onClick, title, badge, badgeColor = "#2d7a5f", amount, description, children }) => (
    <div
        onClick={onClick}
        className={`flex gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
            selected
                ? "border-[#c1440e] bg-[#fdf5f0]"
                : "border-[#e2ddd6] bg-white hover:border-[#c9c3bb]"
        }`}
    >
        {/* Radio */}
        <div className="pt-0.5 flex-shrink-0">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
                selected ? "border-[#c1440e]" : "border-[#c5bfb5]"
            }`}>
                {selected && <div className="w-2.5 h-2.5 rounded-full bg-[#c1440e]" />}
            </div>
        </div>

        {/* Contenu */}
        <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm text-gray-900">{title}</span>
                    {badge && (
                        <span
                            className="text-white text-[0.65rem] font-semibold px-2.5 py-0.5 rounded-full tracking-wide"
                            style={{ backgroundColor: badgeColor }}
                        >
                            {badge}
                        </span>
                    )}
                </div>
                <span className="font-bold text-sm text-gray-900 whitespace-nowrap">{amount}</span>
            </div>
            <p className="mt-1 text-xs text-[#8a8278] leading-relaxed">{description}</p>

            {/* Slot enfant (champ custom) */}
            {children}
        </div>
    </div>
);

export default PaymentOptions;