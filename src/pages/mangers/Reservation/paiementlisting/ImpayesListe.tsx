import { useEffect, useState }       from "react";
import DataTable                     from "../../../../components/common/ui/DataTable";
import { paiementsImpayesColumns }   from "../../../../components/common/ui/tableConfigs";
import { getPaiementByStatutRecent } from "../../../../service/PaiementService";
import PaymentPage                   from "../PaymentPage";
import { getPaiementsByAgStatut }    from "../../../../service/DashboardAgenceService";
import PaymentDetailDrawer           from "./DetailPaiement";

const ImpayesListe = ({ search }) => {

    const [paiements,        setPaiements]        = useState([]);
    const [loading,          setLoading]          = useState(true);
    const [error,            setError]            = useState(null);
    const [selectedPaiement, setSelectedPaiement] = useState<any>(null);
    const [drawerPaiement,   setDrawerPaiement]   = useState<any>(null);

    const fetchPaiements = async () => {
        try {
            setLoading(true);
            setError(null);
            const role = localStorage.getItem("role");
            if (role?.includes("AGENCE")) {
                const data = await getPaiementsByAgStatut("IMPAYE");
                setPaiements(data ?? []);
            } else {
                const response = await getPaiementByStatutRecent("IMPAYE");
                setPaiements(response.data ?? []);
            }
        } catch (err) {
            setError("Impossible de charger les paiements impayés.");
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
            p.referencePaie?.toLowerCase().includes(q) ||
            String(p.reservationId ?? "").includes(q)  ||
            p.statutDescription?.toLowerCase().includes(q)
        );
    });

    const colonnesAvecAction = [
        ...paiementsImpayesColumns,
        {
            key:   "action",
            label: "",
            render: (_value: any, row: any) => {
                if (!row) return null;
                return (
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
        <div className="p-6">
            <p className="text-xl font-bold text-left mb-4">
                Liste des paiements impayés
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
                    <button onClick={fetchPaiements} className="ml-3 underline text-red-500 hover:text-red-700">
                        Réessayer
                    </button>
                </div>
            )}

            {!loading && !error && (
                <DataTable
                    rows={filtered}
                    columns={colonnesAvecAction}
                    onView={(row) => setDrawerPaiement(row)}
                    emptyText="Aucun paiement impayé trouvé."
                />
            )}

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
                    <div
                        className="fixed inset-0 bg-black/30 z-40 transition-opacity"
                        onClick={() => setSelectedPaiement(null)}
                    />
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
                                nombrePersonne:   selectedPaiement.nombrePersonne ?? 1,
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

export default ImpayesListe;