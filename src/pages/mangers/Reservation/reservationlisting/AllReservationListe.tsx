import { useEffect, useState } from "react";
import DataTable from "../../../../components/common/ui/DataTable";
import { reservationsColumns } from "../../../../components/common/ui/tableConfigs";
import {
    getMesReservations,
    getReservationsByRecent,
    getReservationsByTouriste,
    annuleeReservation,
} from "../../../../service/ReservationService";
import { getRole } from "../../../../service/api/Api";
import { getUserId } from "../../../../service/token/TokenService";
import ReservationDetailDrawer from "./ReservationDetailDrawer";

interface Props {
    statut?:     string;
    touristeId?: number;
    search?:     string;
}

const AllReservationListe = ({ statut, touristeId, search }: Props) => {

    const [reservations,    setReservations]    = useState([]);
    const [loading,         setLoading]         = useState(true);
    const [error,           setError]           = useState(null);
    const [successMessage,  setSuccessMessage]  = useState("");
    const [selectedRow,     setSelectedRow]     = useState<any>(null); // ← drawer

    const role          = getRole();
    const currentUserId = Number(getUserId());

    const showSuccess = (message: string) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(""), 3000);
    };

    const fetchReservations = async () => {
        setLoading(true);
        setError(null);
        try {
            let data: any[] = [];

            if (role === "TOURISTE") {
                data = await getReservationsByTouriste(touristeId ?? currentUserId);
            } else if (role === "AGENCE") {
                const res = await getMesReservations();
                data = res.data ?? res;
            } else {
                const res = await getReservationsByRecent();
                data = res.data ?? res;
            }

            if (statut) {
                data = data.filter((r: any) => r.statut === statut);
            }

            if (search) {
                const q = search.toLowerCase();
                data = data.filter((r: any) =>
                    r.reference?.toLowerCase().includes(q)   ||
                    r.circuitName?.toLowerCase().includes(q) ||
                    r.nomComplet?.toLowerCase().includes(q)
                );
            }

            setReservations(data);
        } catch (err) {
            setError("Impossible de charger les réservations.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => fetchReservations(), 400);
        return () => clearTimeout(timer);
    }, [statut, touristeId, search]);

    const handleCancel = async (row: any) => {
        if (!confirm("Voulez-vous vraiment annuler cette réservation ?")) return;
        try {
            await annuleeReservation(row.id);
            setReservations((prev: any[]) =>
                prev.map((r: any) =>
                    r.id === row.id ? { ...r, statut: "ANNULEE", statutDescription: "Réservation annulée" } : r
                )
            );
            // Mettre à jour le drawer si la réservation annulée est celle affichée
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

            {/* Toast succès */}
            {successMessage && (
                <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-green-600 text-white text-sm px-5 py-3 rounded-xl shadow-lg animate-fade-in">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {successMessage}
                </div>
            )}

            <p className="text-xl font-bold text-left mb-4">
                Liste de toutes les réservations
            </p>

            {/* Chargement */}
            {loading && (
                <div className="flex items-center justify-center py-16">
                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <span className="ml-3 text-gray-400 text-sm">Chargement...</span>
                </div>
            )}

            {/* Erreur */}
            {error && (
                <div className="text-center py-8 text-red-400 text-sm bg-red-50 rounded-xl border border-red-100">
                    {error}
                    <button
                        onClick={fetchReservations}
                        className="ml-3 underline text-red-500 hover:text-red-700"
                    >
                        Réessayer
                    </button>
                </div>
            )}

            {/* Table */}
            {!loading && !error && (
                <DataTable
                    rows={reservations}
                    columns={reservationsColumns}
                    onView={(row) => setSelectedRow(row)}  // ← ouvre le drawer
                    onCancel={handleCancel}
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

export default AllReservationListe;