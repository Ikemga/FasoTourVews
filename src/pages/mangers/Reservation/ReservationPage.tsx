import { useState, useEffect } from "react";
import ReservationHeader from "./component/ReservationHeader";
import CircuitSummary    from "./component/CircuitSummary";
import ReservationForm   from "./component/ReservationForm";
import PaymentPage       from "./PaymentPage";
import { postReservation } from "../../../service/ReservationService";
import { getTouristes } from "../../../service/TouristrService";


const ReservationPage = ({ circuit, onBack }) => {
    const [form, setForm] = useState({
        nombrePersonne:     1,
        dateResevation:     "",
        dateLimitePaiement: "",
        commentaire:        "",
        statut:             "EN_ATTENTE",
        touristeId:         "",   // ← sélectionné par l'admin
    });
    const [touristes, setTouristes]     = useState([]);
    const [loading, setLoading]         = useState(false);
    const [error, setError]             = useState(null);
    const [showPayment, setShowPayment] = useState(false);

    // Charge la liste des touristes au montage
    useEffect(() => {
        getTouristes()
            .then(res => {
                const data = res.data;
                const liste = Array.isArray(data)
                    ? data
                    : data.content ?? data.data ?? [];
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

    const handleSubmit = async () => {
        if (!form.dateResevation) {
            setError("Veuillez renseigner la date de réservation.");
            return;
        }

        const circuitId  = circuit.id ?? circuit.circuitId ?? circuit.idCircuit;
        const touristeId = Number(form.touristeId);

        if (!circuitId) {
            setError("Identifiant du circuit introuvable.");
            return;
        }
        if (!touristeId) {
            setError("Veuillez sélectionner un touriste.");
            return;
        }

        setError(null);
        setLoading(true);

        const payload = {
            nombrePersonne:  Number(form.nombrePersonne),
            prixReservation: total,
            commentaire:     form.commentaire,
            statut:          form.statut,
            circuitId,
            touristeId,
            paiementId:      null,
        };

        console.log("Payload →", JSON.stringify(payload, null, 2));

        try {
            await postReservation(payload);
            setShowPayment(true);
        } catch (err) {
            console.error("Erreur →", err.response?.status, err.response?.data);
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
                reservationData={form}
                total={total}
                onBack={() => setShowPayment(false)}
                onSuccess={onBack}
            />
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <ReservationHeader circuit={circuit} onBack={onBack} />
            <div className="max-w-3xl mx-auto px-6 py-8 grid md:grid-cols-2 gap-8">
                <CircuitSummary circuit={circuit} />
                <ReservationForm
                    form={form}
                    setForm={setForm}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    total={total}
                    circuit={circuit}
                    loading={loading}
                    error={error}
                    touristes={touristes}   // ← liste pour le select
                />
            </div>
        </div>
    );
};

export default ReservationPage;