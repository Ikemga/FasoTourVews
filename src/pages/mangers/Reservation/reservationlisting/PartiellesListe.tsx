import { useEffect, useState }          from "react";
import { annuleeReservation, getMesReservations, getReservationByStatut }            from "../../../../service/ReservationService";
import DataTable                        from "../../../../components/common/ui/DataTable";
import {reservationsPartiellesColumns }  from "../../../../components/common/ui/tableConfigs";
import ReservationDetailDrawer from "./ReservationDetailDrawer";

const PartielleListe = () => {

    const [reservations,   setReservations]   = useState([]);
    const [loading,        setLoading]        = useState(true);
    const [error,          setError]          = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [selectedRow,    setSelectedRow]    = useState<any>(null); 

    const showSuccess = (message: string) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(""), 3000);
    };

    useEffect(() => {
            const role = localStorage.getItem("role");
        
            const apiCall =
                role?.includes("AGENCE")
                    ? getMesReservations("PARTIELLE")
                    : getReservationByStatut("PARTIELLE");
        
            apiCall
                .then(res => setReservations(res.data))
                .catch(() => setError("Impossible de charger les réservations annulées."))
                .finally(() => setLoading(false));
        
        }, []);

    const handleCancel = async (row: any) => {
            if (!confirm("Voulez-vous vraiment annuler cette réservation ?")) return;
            try {
                await annuleeReservation(row.id);
                // Met à jour le statut localement sans recharger
                setReservations((prev: any[]) =>
                    prev.map((r: any) =>
                        r.id === row.id ? { ...r, statut: "ANNULEE" } : r
                    )
                );
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
                Réservations partielles
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
                    columns={reservationsPartiellesColumns}
                    onView={(row)   => console.log("voir", row)}
                    onCancel={handleCancel}
                    emptyText="Aucune réservation partielles."
                />
            )}

            {/* Drawer détail */}
            <ReservationDetailDrawer
                reservation={selectedRow}
                onClose={() => setSelectedRow(null)}
                onCancel={(row) => {
                    handleCancel(row);
                }}
            />
        </div>
    );
};

export default PartielleListe;