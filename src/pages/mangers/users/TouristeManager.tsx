import { useEffect, useState } from "react";
import { BouttonPopUp } from "../../../components/common/ui/Bt";
import { PlusCircle } from "lucide-react";
import AddTouriste from "../../../components/common/ui/AddTouriste";
import DataTable from "../../../components/common/ui/DataTable";
import { touristesColumns} from "../../../components/common/ui/tableConfigs";
import { deleteTouriste, getTouristesAlphabetical } from "../../../service/TouristrService";


const TouristeManager = () => {
  const [openModal, setOpenModal] = useState(false);
  const [touristes, setTouristes] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  const fetchTouristes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getTouristesAlphabetical();
      setTouristes(response.data);
    } catch (err) {
      setError("Impossible de charger les touristes.");
      console.error("Erreur backend :", err.response?.data);
      console.error(err);
      console.log("=== ERREUR BACKEND ===");
    console.log(JSON.stringify(err.response?.data, null, 2));
    console.log("URL :", err.config?.url);
    console.log("=====================");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTouristes();
  }, []);

  const handleDelete = async (row: any) => {
    if (!confirm("Supprimer ce touriste ?")) return;
    try {
      await deleteTouriste(row.id);                              // appel API
      setTouristes((prev: any[]) => prev.filter((t) => t.id !== row.id));
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
    }
  };

  // Recharge la liste après ajout d'un touriste
  const handleAdded = () => {
    setOpenModal(false);
    fetchTouristes();
  };

  return (
    <div className="p-6">
      {/* En-tête */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-xl font-bold">Liste des touristes</p>
        <BouttonPopUp
          label="Nouveau touriste"
          icon={<PlusCircle size={18} />}
          onClick={() => setOpenModal(true)}
        />
      </div>

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
            onClick={fetchTouristes}
            className="ml-3 underline text-red-500 hover:text-red-700"
          >
            Réessayer
          </button>
        </div>
      )}

      {/* Table */}
      {!loading && !error && (
        <DataTable
          rows={touristes}
          columns={touristesColumns}
          onView={(row) => console.log("voir", row)}
          onEdit={(row) => console.log("éditer", row)}
          onDelete={handleDelete}
          emptyText="Aucun touriste trouvé."
        />
      )}

      {/* Modal ajout */}
      <AddTouriste
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={handleAdded}
      />
    </div>
  );
};

export default TouristeManager;