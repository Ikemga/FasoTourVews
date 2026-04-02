import { CheckCircle, PlusCircle } from "lucide-react";
import { BouttonPopUp } from "../../../components/common/ui/Bt";
import SpecifiqueRechercheBarre from "../../../components/common/ui/SpecifiqueRechercheBarre";
import HeaderTitle from "../../../components/common/utilitaire/HeaderTitle";
import { useCallback, useEffect, useState } from "react";
import AddCircuitModal from "../../../components/common/ui/AddCircuitModal";
import { deleteCircuit, getCircuitsByDateDesc, getCircuitsByStatutRecent, searchCircuit } from "../../../service/CircuitService";
import CircuitsCard from "./CircuitsCard";
import CircuitDetail from "./circuitDetail/CircuitDetail";
import ReservationPage from "../Reservation/ReservationPage";

const Circuits = ({ onToggleSidebar }) => {
    const [openModal, setOpenModal]               = useState(false);
    const [circuits, setCircuits]                 = useState([]);
    const [sidebarOpen, setSidebarOpen]           = useState(false);
    const [displayed, setDisplayed]               = useState([]);
    const [success, setSuccess]                   = useState(null);
    const [selectedCircuit, setSelectedCircuit]   = useState(null);
    const [loading, setLoading]                   = useState(false);
    const [circuitAReserver, setCircuitAReserver] = useState(null);

    useEffect(() => {
        fetchCircuits();
    }, []);

    const fetchCircuits = async () => {
        setLoading(true);
        try {
            const response = await getCircuitsByStatutRecent("ACTIF");

            const data = response.data;

            const liste = Array.isArray(data)
                ? data
                : data.content ?? data.data ?? data.circuits ?? [];
            console.log("Premier circuit:", liste[0]);
            liste.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            setCircuits(liste);
            setDisplayed(liste);

            // Rafraîchit le détail ouvert si besoin
            setSelectedCircuit(prev =>
                prev ? liste.find(c => c.id === prev.id) ?? prev : null
            );
        } catch (error) {
            console.error("Erreur chargement circuits", error);
            setCircuits([]);
            setDisplayed([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSuccess = () => {
        setSuccess("Circuit créé avec succès !");
        fetchCircuits();
        setTimeout(() => setSuccess(null), 3000);
    };

    const handleSearch = (results) => {
        setDisplayed(results ?? circuits);
    };

    const handleDelete = useCallback(async (id) => {
        const ok = window.confirm("Confirmer la suppression ?");
        if (!ok) return;
        try {
            await deleteCircuit(id);
            setCircuits(prev => {
                const updated = prev.filter(c => c.id !== id);
                setDisplayed(d => d.filter(c => c.id !== id));
                return updated;
            });
            setSelectedCircuit(null);
        } catch (error) {
            console.error("Erreur suppression", error);
        }
    }, []);

    // ── Vue : page de réservation ──────────────────────────────
    if (circuitAReserver) {
        return (
            <ReservationPage
                circuit={circuitAReserver}
                onBack={() => setCircuitAReserver(null)}
            />
        );
    }

    // ── Vue : détail d'un circuit ──────────────────────────────
    if (selectedCircuit) {
        return (
            <CircuitDetail
                circuit={selectedCircuit}
                onBack={() => setSelectedCircuit(null)}
                onDelete={() => handleDelete(selectedCircuit.id)}
                onToggleSidebar={onToggleSidebar}
                onRefresh={fetchCircuits}
                onReserve={() => setCircuitAReserver(selectedCircuit)}
            />
        );
    }

    // ── Vue : liste des circuits ───────────────────────────────
    return (
        <div>
            <HeaderTitle
                title="Gestion des circuits"
                label="Vue d'ensemble des circuits"
                initiales="AD"
                onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            />

            {/* Toast succès */}
            {success && (
                <div className="fixed top-5 right-5 z-[9999] flex items-center gap-3 bg-white border border-green-200 text-green-600 text-sm px-5 py-3 rounded-2xl shadow-lg transition-all duration-300">
                    <CheckCircle size={18} className="shrink-0" />
                    <span>{success}</span>
                </div>
            )}

            {/* Toolbar */}
            <div className="mx-5 py-5 flex justify-between items-center gap-6">
                <h4 className="text-2xl font-bold">Liste des circuits</h4>

                <SpecifiqueRechercheBarre
                    searchFn={searchCircuit}
                    onResults={handleSearch}
                    placeholder="Rechercher un circuit ...."
                />

                <BouttonPopUp
                    label="Nouveau circuit"
                    icon={<PlusCircle size={18} />}
                    onClick={() => setOpenModal(true)}
                />
            </div>

            {/* Loader */}
            {loading && (
                <div className="flex items-center justify-center py-16">
                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <span className="ml-3 text-gray-400 text-sm">Chargement...</span>
                </div>
            )}

            {/* Grille de cartes */}
            <div className="mx-5 grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
                {displayed.length === 0 ? (
                    <p className="text-gray-400 italic col-span-3 text-center py-10">
                        Aucun circuit disponible.
                    </p>
                ) : (
                    displayed.map((circuit) => (
                        <CircuitsCard
                            key={circuit.id}
                            image={circuit.image}
                            circuitName={circuit.circuitName}
                            description={circuit.description}
                            duree={circuit.duree}
                            nombreRestant={circuit.nombreRestant}
                            nombreExact={circuit.nombreExact}
                            prixIndividuel={circuit.prixIndividuel}
                            sites={circuit.sites}
                            guide={circuit.guide}
                            onDelete={() => handleDelete(circuit.id)}
                            onDetail={() => setSelectedCircuit(circuit)}
                            onReserve={() => setCircuitAReserver(circuit)}
                        />
                    ))
                )}
            </div>

            <AddCircuitModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                onSuccess={handleSuccess}
            />
        </div>
    );
};

export default Circuits;