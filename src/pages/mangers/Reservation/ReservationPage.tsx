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
    const [formErrors,       setFormErrors]       = useState({});

    useEffect(() => {
        getFraisReservation()
            .then(res => setFraisReservation(res.data))
            .catch(()  => setFraisReservation(200));
    }, []);

    useEffect(() => {
        const role = localStorage.getItem("role");
        if (role === "ADMIN" || role === "AGENCE") {
            getTouristes()
                .then(res => {
                    const data  = res.data;
                    const liste = Array.isArray(data) ? data : data.content ?? data.data ?? [];
                    setTouristes(liste);
                })
                .catch(err => console.error("Erreur chargement touristes", err));
        } else {
            const touristeId = localStorage.getItem("userId");
            if (touristeId) setForm(prev => ({ ...prev, touristeId }));
        }
    }, []);

    const total = (circuit?.prixIndividuel ?? 0) * form.nombrePersonne;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (formErrors[name]) {
            setFormErrors(prev => { const next = { ...prev }; delete next[name]; return next; });
        }
    };

    const valider = () => {
        const errs = {};
        if (!form.touristeId)
            errs.touristeId = "Veuillez sélectionner un touriste.";
        if (!form.nombrePersonne || form.nombrePersonne < 1)
            errs.nombrePersonne = "Au moins 1 personne requise.";
        setFormErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async ({ paiement, montantApayer: montant }) => {
        if (!valider()) return;

        const circuitId  = circuit?.id ?? circuit?.circuitId ?? circuit?.idCircuit;
        const touristeId = Number(form.touristeId);

        if (!circuitId)  { setError("Identifiant du circuit introuvable."); return; }
        if (!touristeId) { setError("Touriste invalide.");                   return; }

        setError(null);
        setLoading(true);
        setMontantAPayer(montant);
        setModePaiement(paiement.mode);

        const payload = {
            nombrePersonne: Number(form.nombrePersonne),
            commentaire:    form.commentaire.trim(),
            circuitId,
            touristeId,
        };

        try {
            const res = await postReservation(payload);
            setReservationData(res.data);
            setShowPayment(true);        // ← ouvre le drawer
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

    return (
        <div className="min-h-screen bg-gray-50 relative">
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
                        errors={formErrors}
                        setErrors={setFormErrors}
                    />
                </div>

                <div className="space-y-4">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                            {error}
                        </div>
                    )}
                    <ReservationForm
                        form={form}
                        handleSubmit={handleSubmit}
                        total={total}
                        circuit={circuit}
                        loading={loading}
                        fraisReservation={fraisReservation}
                    />
                </div>
            </div>

            {/* ── Drawer paiement côté droit ── */}
            {showPayment && (
                <>
                    <div
                        className="fixed inset-0 bg-black/30 z-40 transition-opacity"
                        onClick={() => setShowPayment(false)}
                    />
                    <div className="fixed top-0 right-0 h-full w-full max-w-md z-50
                                    shadow-2xl overflow-y-auto animate-slideInRight bg-gray-50">
                        <PaymentPage
                            circuit={circuit}
                            reservationData={reservationData}
                            total={total}
                            montantAPayer={montantAPayer}
                            modePaiement={modePaiement}
                            onBack={() => setShowPayment(false)}
                            onSuccess={onBack}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default ReservationPage;