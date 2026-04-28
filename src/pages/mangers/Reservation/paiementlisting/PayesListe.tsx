import { useEffect, useState }           from "react";
import DataTable                         from "../../../../components/common/ui/DataTable";
import { paiementsPayesColumns }         from "../../../../components/common/ui/tableConfigs";
import { getPaiementByStatutRecent }     from "../../../../service/PaiementService";
import { getPaiementsByAgStatut }        from "../../../../service/DashboardAgenceService";
import PaymentDetailDrawer               from "./DetailPaiement";

const PayesListe = ({ search }) => {

    const [paiements,     setPaiements]     = useState([]);
    const [loading,       setLoading]       = useState(true);
    const [error,         setError]         = useState(null);
    const [drawerPaiement, setDrawerPaiement] = useState<any>(null);

    const fetchPaiements = async () => {
        try {
            setLoading(true);
            setError(null);
            const role = localStorage.getItem("role");

            if (role?.includes("AGENCE")) {
                const data = await getPaiementsByAgStatut("PAYE");
                setPaiements(data ?? []);
            } else {
                const response = await getPaiementByStatutRecent("PAYE");
                setPaiements(response.data ?? []);
            }
        } catch (err) {
            setError("Impossible de charger les paiements payés.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => fetchPaiements(), 400);
        return () => clearTimeout(timer);
    }, []);

    const filtered = paiements.filter((p: any) => {
        if (!search) return true;
        const q = search.toLowerCase();
        return (
            p.referencePaie?.toLowerCase().includes(q)  ||
            String(p.reservationId ?? "").includes(q)    ||
            p.statutDescription?.toLowerCase().includes(q)
        );
    });

    return (
        <div className="p-6">
            <p className="text-xl font-bold text-left mb-4">
                Liste des paiements payés
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
                        onClick={fetchPaiements}
                        className="ml-3 underline text-red-500 hover:text-red-700"
                    >
                        Réessayer
                    </button>
                </div>
            )}

            {/* Table */}
            {!loading && !error && (
                <DataTable
                    rows={filtered}
                    columns={paiementsPayesColumns}
                    onView={(row) => setDrawerPaiement(row)}
                    emptyText="Aucun paiement payé trouvé."
                />
            )}

            {/* Drawer détail — pas de onPayer car statut PAYE */}
            <PaymentDetailDrawer
                paiement={drawerPaiement}
                onClose={() => setDrawerPaiement(null)}
            />
        </div>
    );
};

export default PayesListe;