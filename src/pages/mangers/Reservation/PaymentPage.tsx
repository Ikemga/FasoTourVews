import { useState }         from "react";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { CATEGORIES, OPERATORS } from "./component/paie/Paymentconstants";
import PaymentSuccess from "./component/paie/PaymentSuccess";
import CategoryCard from "./component/paie/CategoryCard";
import MobileMoneyPanel from "./component/paie/MobileMoneyPanel";
import CarteBancairePanel from "./component/paie/CarteBancairePanel";
import VirementPanel from "./component/paie/VirementPanel";


const PaymentPage = ({ circuit, reservationData, total, onBack, onSuccess }) => {
    const [category, setCategory] = useState("mobile");
    const [operator, setOperator] = useState("orange");
    const [phone, setPhone]       = useState("");
    const [holder, setHolder]     = useState("");
    const [step, setStep]         = useState("form");   // "form" | "done"
    const [loading, setLoading]   = useState(false);
    const [error, setError]       = useState(null);

    const selectedOp = OPERATORS.find(o => o.id === operator);

    const methodLabel =
        category === "mobile"   ? (selectedOp?.label ?? "Mobile Money") :
        category === "carte"    ? "Carte bancaire" :
        "Virement";

    const handlePay = async () => {
        if (category === "mobile" && phone.replace(/\s/g, "").length < 8) {
            setError("Veuillez entrer un numéro valide.");
            return;
        }
        setError(null);
        setLoading(true);
        await new Promise(r => setTimeout(r, 1800));
        setLoading(false);
        setStep("done");
    };

    // ── Écran succès ───────────────────────────────────────────
    if (step === "done") {
        return (
            <PaymentSuccess
                circuit={circuit}
                reservationData={reservationData}
                total={total}
                methodLabel={methodLabel}
                phone={phone}
                holder={holder}
                onSuccess={onSuccess}
            />
        );
    }

    // ── Formulaire paiement ────────────────────────────────────
    return (
        <div className="min-h-screen w-full bg-gray-50 items-center justify-center">

            {/* Header */}
            <div className="px-6 pt-8 pb-4">
                <button
                    type="button"
                    onClick={onBack}
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition mb-4"
                >
                    <ArrowLeft size={18} />
                </button>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">Paiement sécurisé</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Finalisez votre réservation — {circuit?.circuitName}
                </p>
            </div>

            <div className="px-6 pb-10 space-y-5">

                {/* Catégories */}
                <div className="flex gap-3 flex-wrap">
                    {CATEGORIES.map(cat => (
                        <CategoryCard
                            key={cat.id}
                            item={cat}
                            selected={category === cat.id}
                            onClick={() => setCategory(cat.id)}
                        />
                    ))}
                </div>

                {/* Panel actif */}
                {category === "mobile" && (
                    <MobileMoneyPanel
                        operator={operator}
                        setOperator={setOperator}
                        phone={phone}
                        setPhone={setPhone}
                        holder={holder}
                        setHolder={setHolder}
                    />
                )}
                {category === "carte" && (
                    <CarteBancairePanel holder={holder} setHolder={setHolder} />
                )}
                {category === "virement" && (
                    <VirementPanel circuit={circuit} />
                )}

                {/* Récapitulatif montant */}
                <div className="bg-white rounded-2xl p-5 shadow-sm flex justify-between items-center">
                    <div>
                        <p className="text-xs text-gray-400 mb-0.5">Montant total</p>
                        <p className="text-2xl font-black text-[#c1440e]">
                            {total?.toLocaleString('fr-FR')} FCFA
                        </p>
                    </div>
                    <div className="text-right text-xs text-gray-400">
                        <p>{reservationData?.nombrePersonne} pers.</p>
                        <p>× {circuit?.prixIndividuel?.toLocaleString('fr-FR')} FCFA</p>
                    </div>
                </div>

                {/* Erreur */}
                {error && (
                    <p className="text-sm text-red-500 bg-red-50 border border-red-100 px-4 py-3 rounded-xl">
                        {error}
                    </p>
                )}

                {/* Bouton valider */}
                <button
                    type="button"
                    onClick={handlePay}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-[#c1440e] text-white py-4 rounded-2xl font-bold text-base hover:bg-[#a83a0c] transition disabled:opacity-60"
                    style={{ boxShadow: "0 8px 24px rgba(193,68,14,0.25)" }}
                >
                    {loading ? (
                        <>
                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Traitement en cours...
                        </>
                    ) : (
                        <>
                            <ShieldCheck size={18} />
                            Confirmer le paiement
                        </>
                    )}
                </button>

                <p className="text-xs text-center text-gray-400 pb-4">
                    En confirmant, vous acceptez les conditions générales de FasoTour.
                </p>
            </div>
        </div>
    );
};

export default PaymentPage;