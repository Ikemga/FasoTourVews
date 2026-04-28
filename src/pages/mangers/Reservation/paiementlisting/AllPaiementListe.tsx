import { useEffect, useState } from "react";
import DataTable from "../../../../components/common/ui/DataTable";
import { paiementsColumns } from "../../../../components/common/ui/tableConfigs";
import { getAllPaiements, getPaiementsByTouriste } from "../../../../service/PaiementService";
import { getPaiements } from "../../../../service/DashboardAgenceService";
import PaymentPage from "../PaymentPage";
import { getRole } from "../../../../service/api/Api";
import { getUserId } from "../../../../service/token/TokenService";
import PaymentDetailDrawer from "./DetailPaiement";

interface Props {
    search?: string;
    touristeId?: number;
}

const AllPaiementListe = ({ search, touristeId }: Props) => {

    const [paiements,        setPaiements]        = useState([]);
    const [loading,          setLoading]          = useState(true);
    const [error,            setError]            = useState(null);
    const [selectedPaiement, setSelectedPaiement] = useState<any>(null);
    const [drawerPaiement,   setDrawerPaiement]   = useState<any>(null);

    const role          = getRole();
    const currentUserId = Number(getUserId());

    const fetchPaiements = async () => {
        setLoading(true);
        setError(null);
        try {
            let data: any[] = [];
            if (role === "TOURISTE") {
                data = await getPaiementsByTouriste(touristeId ?? currentUserId);
            } else if (role === "AGENCE") {
                const res = await getPaiements();
                data = res.data ?? res;
            } else {
                const res = await getAllPaiements();
                data = res.data ?? res;
            }
            setPaiements(data);
        } catch (err) {
            setError("Impossible de charger les paiements.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => fetchPaiements(), 400);
        return () => clearTimeout(timer);
    }, [touristeId]);

    const filtered = paiements.filter((p: any) => {
        if (!search) return true;
        const q = search.toLowerCase();
        return (
            p.referencePaie?.toLowerCase().includes(q)  ||
            String(p.reservationId ?? "").includes(q)    ||
            p.statutDescription?.toLowerCase().includes(q)
        );
    });

    const colonnesAvecAction = [
        ...paiementsColumns,
        {
            key: "action",
            label: "",
            render: (_value: any, row: any) => {
                if (!row) return null;
                const estSolde = row.statut === "PAYE";
                return estSolde ? (
                    <span className="text-xs text-gray-400 italic">Soldé</span>
                ) : (
                    <button
                        type="button"
                        onClick={() => setSelectedPaiement(row)}
                        className="flex items-center gap-1.5 bg-[#c1440e] text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-[#a83a0c] transition"
                    >
                        Payer
                    </button>
                );
            },
        },
    ];


    return (
        <div className="p-6 relative">
            <p className="text-xl font-bold text-left mb-4">
                Liste de tous les paiements
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
                    <button
                        onClick={fetchPaiements}
                        className="ml-3 underline text-red-500 hover:text-red-700"
                    >
                        Réessayer
                    </button>
                </div>
            )}

            {!loading && !error && (
                <DataTable
                    rows={filtered}
                    columns={colonnesAvecAction}
                    onView={(row) => setDrawerPaiement(row)}
                    emptyText="Aucun paiement trouvé."
                />
            )}

            {/* Drawer détail */}
            <PaymentDetailDrawer
                paiement={drawerPaiement}
                onClose={() => setDrawerPaiement(null)}
                onPayer={(p) => {
                    setDrawerPaiement(null);
                    setSelectedPaiement(p);
                }}
            />

            {/* ── Drawer paiement côté droit ── */}
            {selectedPaiement && (
                <>
                    {/* Fond assombri — ferme le drawer au clic */}
                    <div
                        className="fixed inset-0 bg-black/30 z-40 transition-opacity"
                        onClick={() => setSelectedPaiement(null)}
                    />

                    {/* Panel glissant */}
                    <div className="fixed top-0 right-0 h-full w-full max-w-md z-50
                                    shadow-2xl overflow-y-auto animate-slideInRight bg-gray-50">
                        <PaymentPage
                            circuit={{
                                circuitName:    selectedPaiement.circuitNom   ?? "Circuit",
                                prixIndividuel: selectedPaiement.prixUnitaire ?? 0,
                                id:             selectedPaiement.circuitId,
                            }}
                            reservationData={{
                                id:               selectedPaiement.reservationId,
                                nombrePersonne:   selectedPaiement.nombrePersonne  ?? 1,
                                montantTotal:     selectedPaiement.montant         ?? 0,
                                fraisReservation: selectedPaiement.montantRestant  ?? 0,
                            }}
                            total={selectedPaiement.montant        ?? 0}
                            montantAPayer={selectedPaiement.montantRestant ?? 0}
                            modePaiement="custom"
                            onBack={() => setSelectedPaiement(null)}
                            onSuccess={() => {
                                setSelectedPaiement(null);
                                fetchPaiements();
                            }}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default AllPaiementListe;