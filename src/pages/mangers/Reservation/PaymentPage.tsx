import { useState }              from "react";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { CATEGORIES, OPERATORS }  from "./component/paie/Paymentconstants";
import PaymentSuccess             from "./component/paie/PaymentSuccess";
import CategoryCard               from "./component/paie/CategoryCard";
import MobileMoneyPanel           from "./component/paie/MobileMoneyPanel";
import CarteBancairePanel         from "./component/paie/CarteBancairePanel";
import VirementPanel              from "./component/paie/VirementPanel";
import { createPaiement } from "../../../service/PaiementService";

const PaymentPage = ({
    circuit,
    reservationData,
    total,
    montantAPayer,
    modePaiement,
    onBack,
    onSuccess,
}) => {

    const montantTotal     = reservationData?.montantTotal     ?? 0;
    const montant = montantAPayer ?? montantTotal ?? (total + fraisReservation) ?? 0;
    const fraisReservation = reservationData?.fraisReservation ?? 0;
    const [category, setCategory] = useState("mobile");
    const [operator, setOperator] = useState("orange");
    const [phone,    setPhone]    = useState("");
    const [holder,   setHolder]   = useState("");
    const [step,     setStep]     = useState("form");
    const [loading,  setLoading]  = useState(false);
    const [error,    setError]    = useState(null);

    const selectedOp = OPERATORS.find(o => o.id === operator);

    const methodLabel =
        category === "mobile" ? (selectedOp?.label ?? "Mobile Money") :
        category === "carte"  ? "Carte bancaire" :
        "Virement";


        const handlePay = async () => {
            console.log("montant =", montant);
            console.log("montantAPayer prop =", montantAPayer);
            console.log("reservationData =", reservationData);
                if (category === "mobile" && phone.replace(/\s/g, "").length < 8) {
            setError("Veuillez entrer un numéro valide.");
            return;
        }

        setError(null);
        setLoading(true);

        try {
            await createPaiement({
                reservationId: reservationData?.id,
                montantPaye:   montantAPayer,
            });

            setStep("done");

        } catch (err) {
            const message = err?.response?.data?.message
                ?? "Une erreur est survenue lors du paiement. Veuillez réessayer.";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    if (step === "done") {
        return (
            <PaymentSuccess
                circuit={circuit}
                reservationData={reservationData}
                total={montantAPayer}
                methodLabel={methodLabel}
                phone={phone}
                holder={holder}
                onSuccess={onSuccess}
            />
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4">
            <div className="w-full max-w-md space-y-5">

                {/* Header */}
                <div className="flex justify-center items-center gap-2">
                    <button
                        type="button"
                        onClick={onBack}
                        className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition mb-4"
                    >
                        <ArrowLeft size={30} />
                    </button>
                    <div>
                        <h4 className="text-2xl font-black text-gray-900 tracking-tight">Paiement sécurisé</h4>
                        <p className="text-sm text-gray-500 mt-1">
                            Finalisez votre réservation — {circuit?.circuitName}
                        </p>
                    </div>
                </div>

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
                {category === "carte"    && <CarteBancairePanel holder={holder} setHolder={setHolder} />}
                {category === "virement" && <VirementPanel circuit={circuit} />}

                {/* Récapitulatif */}
                <div className="bg-white rounded-2xl p-5 shadow-sm space-y-2">
                    <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>
                            {reservationData?.nombrePersonne} × {circuit?.prixIndividuel?.toLocaleString("fr-FR")} FCFA
                        </span>
                        <span className="font-semibold text-gray-800">
                            {total?.toLocaleString("fr-FR")} FCFA
                        </span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>Frais de réservation</span>
                        {fraisReservation != null ? (
                            <span className="font-semibold text-[#08a103]">
                                {fraisReservation.toLocaleString("fr-FR")} FCFA
                            </span>
                        ) : (
                            <span className="inline-block w-20 h-4 bg-gray-200 rounded animate-pulse" />
                        )}
                    </div>
                    
                    <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>Montant total</span>
                        <span className="font-semibold text-gray-800">
                            {montantTotal.toLocaleString("fr-FR")} FCFA
                        </span>
                    </div>

                    <div className="flex justify-between items-center border-t border-dashed border-black/10 pt-3">
                        <span className="text-sm text-gray-500">
                            {modePaiement === "frais" ? "Vous payez maintenant" : "Total à payer"}
                        </span>
                        <span className="text-2xl font-black text-[#c1440e]">
                            {montantAPayer?.toLocaleString("fr-FR")} FCFA
                        </span>
                    </div>
                </div>

                {/*Erreur API ou validation */}
                {error && (
                    <p className="text-sm text-red-500 bg-red-50 border border-red-100 px-4 py-3 rounded-xl">
                        {error}
                    </p>
                )}

                {/* Bouton */}
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
                            Payer {montantAPayer?.toLocaleString("fr-FR")} FCFA
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