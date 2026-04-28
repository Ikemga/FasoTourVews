// ReservationPage.jsx

import { useState, useEffect, useCallback } from "react";
import ReservationHeader         from "./component/ReservationHeader";
import CircuitSummary            from "./component/CircuitSummary";
import ReservationForm           from "./component/ReservationForm";
import ReservationForms          from "./component/ReservationForms";
import PaymentPage               from "./PaymentPage";
import { postReservation }       from "../../../service/ReservationService";
import { getTouristes }          from "../../../service/TouristrService";
import { getFraisReservation }   from "../../../service/ConfigurationService";
import AddTouriste               from "../../../components/common/ui/AddTouriste";

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
    const [openAddTouriste,  setOpenAddTouriste]  = useState(false);

    const isAdminOrAgence = ["ADMIN", "AGENCE"].includes(localStorage.getItem("role"));

    const chargerTouristes = useCallback(() => {
        return getTouristes()
            .then(res => {
                const data  = res.data;
                const liste = Array.isArray(data) ? data : data.content ?? data.data ?? [];
                setTouristes(liste);
                return liste;
            })
            .catch(err => {
                console.error("Erreur chargement touristes", err);
                return [];
            });
    }, []);

    useEffect(() => {
        getFraisReservation()
            .then(res => setFraisReservation(res.data))
            .catch(()  => setFraisReservation(200));
    }, []);

    useEffect(() => {
        if (isAdminOrAgence) {
            chargerTouristes();
        } else {
            const touristeId = localStorage.getItem("userId");
            if (touristeId) setForm(prev => ({ ...prev, touristeId }));
        }
    }, [chargerTouristes]);

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

    // ── ✅ MODIFIÉ : setTouristes + setForm dans le même .then() ─────────────
    const handleTouristeCreated = (nouveauTouriste) => {
        setOpenAddTouriste(false);

        getTouristes()
            .then(res => {
                const data  = res.data;
                const liste = Array.isArray(data) ? data : data.content ?? data.data ?? [];

                const id =
                    nouveauTouriste?.id         ??
                    nouveauTouriste?.touristeId ??
                    nouveauTouriste?.idTouriste;

                const trouve  = liste.find(t => String(t.id) === String(id));
                const idFinal = trouve?.id ?? id;

                // ✅ Même .then() = même batch React = un seul re-render
                // La liste est à jour ET le touriste est sélectionné simultanément
                setTouristes(liste);
                if (idFinal) {
                    setForm(prev => ({ ...prev, touristeId: String(idFinal) }));
                    setFormErrors(prev => {
                        const next = { ...prev };
                        delete next.touristeId;
                        return next;
                    });
                }
            })
            .catch(err => console.error("Erreur rechargement touristes", err));
    };
    // ─────────────────────────────────────────────────────────────────────────

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
                        onAddTouriste={isAdminOrAgence ? () => setOpenAddTouriste(true) : undefined}
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

            {isAdminOrAgence && (
                <AddTouriste
                    open={openAddTouriste}
                    onClose={() => setOpenAddTouriste(false)}
                    onSuccess={handleTouristeCreated}
                    initialData={null}
                />
            )}
        </div>
    );
};

export default ReservationPage;