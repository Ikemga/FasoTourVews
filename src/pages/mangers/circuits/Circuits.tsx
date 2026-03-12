import { PlusCircle } from "lucide-react";
import { BouttonPopUp } from "../../../components/common/ui/Bt";
import SpecifiqueRechercheBarre from "../../../components/common/ui/SpecifiqueRechercheBarre";
import HeaderTitle from "../../../components/common/utilitaire/HeaderTitle";
import { useCallback, useEffect, useState } from "react";
import AddCircuitModal from "../../../components/common/ui/AddCircuitModal";
import { deleteCircuit, getCircuitsByDateDesc, searchCircuit } from "../../../service/CircuitService";
import CircuitsCard from "./CircuitsCard";
import CircuitDetail from "./circuitDetail/CircuitDetail";

const Circuits = ({ onToggleSidebar }) => {
    const [openModal, setOpenModal]         = useState(false);
    const [circuits, setCircuits]           = useState([]);
    const [sidebarOpen, setSidebarOpen]     = useState(false);
    const [displayed, setDisplayed]         = useState([]);
    const [success, setSuccess]             = useState(null);
    const [selectedCircuit, setSelectedCircuit] = useState(null);

    useEffect(() => {
        fetchCircuits();
    }, []);

    const fetchCircuits = async () => {
        try {
        const response = await getCircuitsByDateDesc();
        const data = response.data;

        const liste = Array.isArray(data)
            ? data
            : data.content ?? data.data ?? data.circuits ?? [];

        liste.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setCircuits(liste);
        setDisplayed(liste);
        } catch (error) {
        console.error("Erreur chargement circuits", error);
        setCircuits([]);
        setDisplayed([]);
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
        console.log("🗑️ ID reçu :", id); // ← ajoutez cette ligne
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

    if (selectedCircuit) {
    return (
        <CircuitDetail
        circuit={selectedCircuit}
        onBack={() => setSelectedCircuit(null)}
        onDelete={() => handleDelete(selectedCircuit.id)}
        onToggleSidebar={onToggleSidebar}
        onRefresh={fetchCircuits}
      />
    );
  }

  return (
    <div>
      <HeaderTitle
        title="Gestion des circuits"
        label="Vue d'ensemble des circuits"
        initiales="AD"
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      {success && (
        <div className="mx-5 mt-4 bg-green-50 text-green-600 text-sm px-4 py-3 rounded-xl border border-green-200 flex items-center gap-2">
          <span>✓</span> {success}
        </div>
      )}

    <div className="mx-5 py-5 flex justify-between items-center gap-6">
        <h4 className="text-2xl font-bold">Liste des circuits</h4>

        {/* Barre de recherche — déclenche handleSearch à chaque frappe */}
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


        <div className="mx-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

                onDelete={() => handleDelete(circuit.id)}
                onDetail={() => setSelectedCircuit(circuit)}
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