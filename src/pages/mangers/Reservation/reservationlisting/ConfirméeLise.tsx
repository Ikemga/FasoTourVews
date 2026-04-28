import { useEffect, useState }           from "react";
import DataTable                         from "../../../../components/common/ui/DataTable";
import { reservationsConfirmeesColumns }  from "../../../../components/common/ui/tableConfigs";
import {getMesReservations, getReservationByStatut } from "../../../../service/ReservationService";
import ReservationDetailDrawer from "./ReservationDetailDrawer";

const ConfirmeeListe = () => {

    const [reservations,   setReservations]   = useState([]);
    const [loading,        setLoading]        = useState(true);
    const [error,          setError]          = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [selectedRow,    setSelectedRow]    = useState<any>(null);  // ← ajouté
    

    const showSuccess = (message: string) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(""), 3000);
    };

    useEffect(() => {
    const role = localStorage.getItem("role");

    const apiCall =
        role?.includes("AGENCE")
            ? getMesReservations("CONFIRMEE")
            : getReservationByStatut("CONFIRMEE");

    apiCall
        .then(res => setReservations(res.data))
        .catch(() => setError("Impossible de charger les réservations annulées."))
        .finally(() => setLoading(false));

}, []);


    const handleCancel = async (row: any) => {
            if (!confirm("Voulez-vous vraiment annuler cette réservation ?")) return;
            try {
                await annuleeReservation(row.id);
                setReservations((prev: any[]) =>
                    prev.map((r: any) =>
                        r.id === row.id ? { ...r, statut: "ANNULEE", statutDescription: "Réservation annulée" } : r
                    )
                );
                // Mettre à jour le drawer si la ligne annulée est celle affichée
                if (selectedRow?.id === row.id) {
                    setSelectedRow((prev: any) => ({
                        ...prev,
                        statut: "ANNULEE",
                        statutDescription: "Réservation annulée",
                    }));
                }
                showSuccess("Réservation annulée avec succès !");
            } catch (err) {
                console.error("Erreur lors de l'annulation :", err);
            }
        };

    return (
        <div className="p-6">
            {successMessage && (
                <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-green-600 text-white text-sm px-5 py-3 rounded-xl shadow-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {successMessage}
                </div>
            )}

            <p className="text-xl font-bold text-left mb-4">
                Réservations confirmées
            </p>

            {loading && (
                <div className="flex items-center justify-center py-16">
                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <span className="ml-3 text-gray-400 text-sm">Chargement...</span>
                </div>
            )}

            {error && (
                <div className="text-center py-8 text-red-400 text-sm bg-red-50 rounded-xl border border-red-100">
                    {error}
                </div>
            )}

            {!loading && !error && (
                <DataTable
                    rows={reservations}
                    columns={reservationsConfirmeesColumns}
                    onView={(row) => setSelectedRow(row)}
                    onCancel={handleCancel}
                    emptyText="Aucune réservation confirmée."
                />
            )}

            {/* Drawer détail — bouton annulation visible car statut EN_ATTENTE */}
            <ReservationDetailDrawer
                reservation={selectedRow}
                onClose={() => setSelectedRow(null)}
                onCancel={(row) => handleCancel(row)}
            />
        </div>
    );
};

export default ConfirmeeListe;