import { useState, useEffect }   from "react";
import ReservationHeader         from "./component/ReservationHeader";
import CircuitSummary            from "./component/CircuitSummary";
import ReservationForm           from "./component/ReservationForm";
import ReservationForms          from "./component/ReservationForms";
import PaymentPage               from "./PaymentPage";
import { postReservation }       from "../../../service/ReservationService";
import { getTouristes }          from "../../../service/TouristrService";
import { getFraisReservation }   from "../../../service/ConfigurationService";

const ReservationPage = ({ circuit, onBack }) => {

    const [form, setForm] = useState({
        nombrePersonne: 1,
        commentaire:    "",
        touristeId:     "",
    });

    const [touristes,        setTouristes]        = useState([]);
    const [loading,          setLoading]          = useState(false);
    const [error,            setError]            = useState(null);
    const [showPayment,      setShowPayment]      = useState(false);
    const [montantAPayer,    setMontantAPayer]    = useState(0);
    const [modePaiement,     setModePaiement]     = useState("frais");
    const [reservationData,  setReservationData]  = useState(null);
    const [fraisReservation, setFraisReservation] = useState(200);

    
    /* ── Frais depuis le backend ── */
    useEffect(() => {
        getFraisReservation()
            .then(res => setFraisReservation(res.data))
            .catch(()  => setFraisReservation(200));
    }, []);

    /* ── Touristes ── */
    useEffect(() => {
        getTouristes()
            .then(res => {
                const data  = res.data;
                const liste = Array.isArray(data) ? data : data.content ?? data.data ?? [];
                setTouristes(liste);
            })
            .catch(err => console.error("Erreur chargement touristes", err));
    }, []);

    const total = (circuit.prixIndividuel ?? 0) * form.nombrePersonne;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async ({ paiement, montantAPayer: montant }) => {
        const circuitId  = circuit.id ?? circuit.circuitId ?? circuit.idCircuit;
        const touristeId = form.touristeId ? Number(form.touristeId) : null;

        if (!circuitId)  { setError("Identifiant du circuit introuvable."); return; }
        if (!touristeId) { setError("Veuillez sélectionner un touriste.");  return; }

        setError(null);
        setLoading(true);
        setMontantAPayer(montant);
        setModePaiement(paiement.mode);

        const payload = {
            nombrePersonne: Number(form.nombrePersonne),
            commentaire:    form.commentaire,
            circuitId,
            touristeId,
        };

        try {
            const res = await postReservation(payload);
            setReservationData(res.data);
            setReservationData(res.data);
                //
            setShowPayment(true);
        } catch (err) {
            setError(
                err.response?.data?.message
                ?? err.response?.data
                ?? "Erreur lors de la réservation."
            );
        } finally {
            setLoading(false);
        }
    };

    if (showPayment) {
        return (
            <PaymentPage
                circuit={circuit}
                reservationData={reservationData}
                total={total}
                montantAPayer={montantAPayer}
                modePaiement={modePaiement}
                onBack={() => setShowPayment(false)}
                onSuccess={onBack}
            />
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <ReservationHeader circuit={circuit} onBack={onBack} />
            <div className="max-w-6xl mx-auto px-6 py-8 grid md:grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="col-span-2 space-y-6">
                    <CircuitSummary circuit={circuit} />
                    <ReservationForms
                        form={form}
                        setForm={setForm}
                        handleChange={handleChange}
                        circuit={circuit}
                        touristes={touristes}
                    />
                </div>

                <ReservationForm
                    form={form}
                    handleSubmit={handleSubmit}
                    total={total}
                    circuit={circuit}
                    loading={loading}
                    error={error}
                    fraisReservation={fraisReservation}
                />
                
            </div>
        </div>
    );
};

export default ReservationPage;