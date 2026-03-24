import { useState, useEffect } from "react";
import ReservationHeader from "./component/ReservationHeader";
import CircuitSummary    from "./component/CircuitSummary";
import ReservationForm   from "./component/ReservationForm";
import ReservationForms  from "./component/ReservationForms";
import PaymentPage       from "./PaymentPage";
import { postReservation } from "../../../service/ReservationService";
import { getTouristes }    from "../../../service/TouristrService";

const FRAIS_RESERVATION = 200;

const ReservationPage = ({ circuit, onBack }) => {

    const [form, setForm] = useState({
        nombrePersonne:     1,
        dateResevation:     "",
        dateLimitePaiement: "",
        commentaire:        "",
        statut:             "EN_ATTENTE",
        touristeId:         "",
    });

    const [touristes,     setTouristes]     = useState([]);
    const [loading,       setLoading]       = useState(false);
    const [error,         setError]         = useState(null);
    const [showPayment,   setShowPayment]   = useState(false);

    // Montant choisi via PaymentOptions (transmis par ReservationForm)
    const [montantAPayer, setMontantAPayer] = useState(FRAIS_RESERVATION);
    const [modePaiement,  setModePaiement]  = useState("frais");

    /* ── Chargement des touristes ── */
    useEffect(() => {
        getTouristes()
            .then(res => {
                const data  = res.data;
                const liste = Array.isArray(data) ? data : data.content ?? data.data ?? [];
                setTouristes(liste);
            })
            .catch(err => console.error("Erreur chargement touristes", err));
    }, []);

    useEffect(() => {
        if (circuit?.dateLimitePaiement) {
            setForm(prev => ({
                ...prev,
                dateLimitePaiement: circuit.dateLimitePaiement.slice(0, 10),
            }));
        }
    }, [circuit]);

    const total = (circuit.prixIndividuel ?? 0) * form.nombrePersonne;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    /* ── handleSubmit reçoit { paiement, montantAPayer } depuis ReservationForm ── */
    const handleSubmit = async ({ paiement, montantAPayer: montant }) => {
        const circuitId  = circuit.id ?? circuit.circuitId ?? circuit.idCircuit;
        const touristeId = Number(form.touristeId);

        if (!circuitId)  { setError("Identifiant du circuit introuvable."); return; }
        if (!touristeId) { setError("Veuillez sélectionner un touriste.");  return; }

        setError(null);
        setLoading(true);

        // Sauvegarde pour PaymentPage
        setMontantAPayer(montant);
        setModePaiement(paiement.mode);

        const payload = {
            nombrePersonne:  Number(form.nombrePersonne),
            prixReservation: montant,          // montant réellement payé
            commentaire:     form.commentaire,
            statut:          form.statut,
            circuitId,
            touristeId,
            paiementId:      null,
        };

        try {
            await postReservation(payload);
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

    /* ── Page paiement ── */
    if (showPayment) {
        return (
            <PaymentPage
                circuit={circuit}
                reservationData={form}
                total={total}
                montantAPayer={montantAPayer}   // ← montant choisi
                modePaiement={modePaiement}     // ← "frais" | "total"
                onBack={() => setShowPayment(false)}
                onSuccess={onBack}
            />
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <ReservationHeader circuit={circuit} onBack={onBack} />
            <div className="max-w-6xl mx-auto px-6 py-8 grid md:grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Colonne gauche */}
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

                {/* Colonne droite */}
                <ReservationForm
                    form={form}
                    handleSubmit={handleSubmit}
                    total={total}
                    circuit={circuit}
                    loading={loading}
                    error={error}
                />
            </div>
        </div>
    );
};

export default ReservationPage;