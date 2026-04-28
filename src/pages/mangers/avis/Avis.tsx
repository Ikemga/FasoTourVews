import { CheckCircle } from "lucide-react";
import HeaderTitle from "../../../components/common/utilitaire/HeaderTitle";
import SpecifiqueRechercheBarre from "../../../components/common/ui/SpecifiqueRechercheBarre";
import { useEffect, useState } from "react";
import { getCircuitsByStatutRecent, searchCircuit } from "../../../service/CircuitService";
import AvisCard from "./AvisCard";

const Avis = ({ onToggleSidebar }) => {
    const [circuits, setCircuits] = useState([]);
    const [displayed, setDisplayed] = useState([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        fetchCircuits();
    }, []);

    const fetchCircuits = async () => {
        setLoading(true);
        try {
            const res = await getCircuitsByStatutRecent("TERMINEE");

            const data = res.data;
            const liste = Array.isArray(data)
                ? data
                : data.content ?? data.data ?? data.circuits ?? [];

            setCircuits(liste);
            setDisplayed(liste);

        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (results) => {
        setDisplayed(results ?? circuits);
    };

    return (
        <div>
            <HeaderTitle
                title="Gestion des avis"
                label="Avis des circuits"
                initiales="AD"
                onToggleSidebar={onToggleSidebar}
            />

            {success && (
                <div className="fixed top-5 right-5 z-[9999] flex items-center gap-3 bg-white border border-green-200 text-green-600 text-sm px-5 py-3 rounded-2xl shadow-lg">
                    <CheckCircle size={18} />
                    <span>{success}</span>
                </div>
            )}

            <div className="mx-5 py-5 flex justify-between items-center gap-6">
                <h4 className="text-2xl font-bold">Liste des circuits</h4>

                <SpecifiqueRechercheBarre
                    searchFn={searchCircuit}
                    onResults={handleSearch}
                    placeholder="Rechercher un circuit..."
                />
            </div>

            {loading && (
                <div className="flex justify-center py-10">
                    Chargement...
                </div>
            )}

            <div className="mx-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayed.map((circuit) => (
                    <AvisCard
                        key={circuit.id}
                        circuit={circuit}
                        onAvis={() => console.log("avis", circuit)}
                        onLike={() => console.log("like", circuit.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Avis;