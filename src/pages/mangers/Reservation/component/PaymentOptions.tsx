import { useState } from "react";



const PaymentOptions = ({
    total          ,
    nombrePersonne,
    prixIndividuel,
    fraisReservation,
    onSelect,
}) => {

    const [selected, setSelected] = useState("frais");

    const montantFrais = fraisReservation;
    const montantTotal = total + fraisReservation;



    const handleSelect = (mode) => {
        setSelected(mode);

        const montant = mode === "frais"
            ? montantFrais
            : montantTotal;

        onSelect?.({
            mode,
            montant,
            details: {
                nombrePersonne,
                prixIndividuel,
                totalCircuit: total,
                frais: fraisReservation,
            }
        });
    };

    return (
        <div className="bg-[#faf8f5] p-6 rounded-2xl space-y-3">
            <h2 className="text-lg font-bold text-gray-900">Option de paiement</h2>

            <OptionCard
                selected={selected === "frais"}
                onClick={() => handleSelect("frais")}
                title="Frais de réservation uniquement"
                badge="Uniquement les frais"
                amount={`${fraisReservation.toLocaleString("fr-FR")} FCFA`}
                description={
                    <>
                        Payez les frais maintenant et le reste avant le départ.<br />
                        Les frais sont fixes, quel que soit le nombre de personnes.
                    </>
                }
            />

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
        </div>
    );
};

/* ── Sous-composant carte ── */
const OptionCard = ({ selected, onClick, title, badge, amount, description }) => (
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
            <div className={`w-[20px] h-[20px] rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
                selected ? "border-[#c1440e]" : "border-[#c5bfb5]"
            }`}>
                {selected && <div className="w-[10px] h-[10px] rounded-full bg-[#c1440e]" />}
            </div>
        </div>

        {/* Contenu */}
        <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm text-gray-900">{title}</span>
                    {badge && (
                        <span className="bg-[#2d7a5f] text-white text-[0.65rem] font-semibold px-2.5 py-0.5 rounded-full tracking-wide">
                            {badge}
                        </span>
                    )}
                </div>
                <span className="font-bold text-sm text-gray-900 whitespace-nowrap">{amount}</span>
            </div>
            <p className="mt-1 text-xs text-[#8a8278] leading-relaxed">{description}</p>
        </div>
    </div>
);

export default PaymentOptions;