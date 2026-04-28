import { useEffect, useState } from "react";
import { CreditCard } from "lucide-react";
import PaymentOptions from "./PaymentOptions";
import { getFraisReservation } from "../../../../service/ConfigurationService";

const ReservationForm = ({ form, handleSubmit, total, circuit, loading }) => {

    const [fraisReservation, setFraisReservation] = useState(0);
    const [fraisLoading, setFraisLoading]         = useState(true);

    useEffect(() => {
        getFraisReservation()
        .then(res  => setFraisReservation(res.data))
        .catch(()  => setFraisReservation(300))
        .finally(() => setFraisLoading(false));
    }, []);

    // Toujours recalculé à partir des props/state courants
    const fraisTotal     = fraisReservation * form.nombrePersonne;
    const montantComplet = total + fraisTotal;


    const [paiement, setPaiement] = useState({
        mode:    "frais",
        montant: 0,             // sera resyncé par le useEffect de PaymentOptions au montage
        details: {
        nombrePersonne: form.nombrePersonne,
        prixIndividuel: circuit.prixIndividuel ?? 0,
        totalCircuit:   total,
        frais:          0,
        },
    });

    const montantApayer = paiement.montant;

    if (fraisLoading) {
    return (
      <div className="space-y-4 bg-[#faf8f5] p-2 animate-pulse">
        <div className="h-24 bg-gray-200 rounded-2xl" />
        <div className="h-40 bg-gray-200 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="space-y-4 bg-[#faf8f5] p-2">

      {/* PaymentOptions appelle onSelect (= setPaiement) à chaque changement */}
      <PaymentOptions
        total={total}
        nombrePersonne={form.nombrePersonne}
        prixIndividuel={circuit.prixIndividuel ?? 0}
        fraisReservation={fraisReservation}
        onSelect={setPaiement}
      />

      <div className="border border-black/20 bg-white p-4 rounded-2xl space-y-3">

        {/* Prix circuit */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">
            {form.nombrePersonne} × {(circuit.prixIndividuel ?? 0).toLocaleString("fr-FR")} FCFA
          </span>
          <span className="font-semibold text-gray-800">
            {total.toLocaleString("fr-FR")} FCFA
          </span>
        </div>

        {/* Frais */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">
            Frais de réservation ({form.nombrePersonne} × {fraisReservation.toLocaleString("fr-FR")} FCFA)
          </span>
          <span className="font-semibold text-[#08a103]">
            {fraisTotal.toLocaleString("fr-FR")} FCFA
          </span>
        </div>

        {/* Total selon mode choisi */}
        <div className="flex justify-between items-center border-t border-dashed border-black/10 pt-3">
          <span className="text-sm text-gray-500">
            {paiement.mode === "frais" ? "Vous payez maintenant" : "Total à payer"}
          </span>
          <span className="text-2xl text-[#c1440e] font-bold">
            {montantApayer.toLocaleString("fr-FR")} FCFA
          </span>
        </div>

        {/* Récap mode sélectionné */}
        {paiement.mode === "frais" && (
          <p className="text-xs text-gray-400">
            Reste à payer avant le départ :{" "}
            <span className="font-semibold text-gray-600">
              {montantComplet.toLocaleString("fr-FR")} FCFA
            </span>
          </p>
        )}

        {/* Bouton Payer */}
        <button
          type="button"
          onClick={() => handleSubmit({ paiement, montantApayer })}
          disabled={loading || montantApayer <= 0}
          className="w-full bg-[#c1440e] text-white p-3 rounded-xl flex justify-center items-center gap-2 hover:bg-[#a83a0c] transition disabled:opacity-60"
        >
          {loading
            ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            : <CreditCard size={16} />
          }
          Payer {montantApayer.toLocaleString("fr-FR")} FCFA
        </button>
      </div>
    </div>
  );
};

export default ReservationForm;