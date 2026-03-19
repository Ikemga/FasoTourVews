import { Building2, ShieldCheck } from "lucide-react";

const VirementPanel = ({ circuit }) => {
    const rows = [
        ["Banque",       "Coris Bank International"],
        ["IBAN",         "BF00 0000 0000 0000 0000 000"],
        ["BIC/SWIFT",    "CBIBBFBF"],
        ["Bénéficiaire", "FasoTour SARL"],
        ["Référence",    `FT-${circuit?.id ?? "XXX"}`],
    ];

    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center">
                    <Building2 size={16} className="text-gray-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-base">Coordonnées bancaires</h3>
            </div>

            {rows.map(([label, val]) => (
                <div key={label} className="flex justify-between items-center text-sm py-2 border-b border-gray-50 last:border-0">
                    <span className="text-gray-400">{label}</span>
                    <span className="font-semibold text-gray-800 font-mono text-xs">{val}</span>
                </div>
            ))}

            <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 flex items-start gap-2 text-xs text-amber-700">
                <ShieldCheck size={14} className="mt-0.5 flex-shrink-0" />
                Mentionnez la référence dans le libellé de votre virement. Votre réservation sera confirmée sous 24h.
            </div>
        </div>
    );
};

export default VirementPanel;