import { useEffect, useState } from "react";
import { BouttonPopUp } from "../../../components/common/ui/Bt";
import { PlusCircle } from "lucide-react";
import AddTouriste from "../../../components/common/ui/AddTouriste";
import DataTable from "../../../components/common/ui/DataTable";
import { touristesColumns} from "../../../components/common/ui/tableConfigs";
import { deleteTouriste, getTouristesAlphabetical } from "../../../service/TouristrService";


const TouristeManager = () => {
  const [touristes, setTouristes] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [touristeEdit, setTouristeEdit]     = useState(null);
  const [openForm, setOpenForm]         = useState(false);

  const showSuccess = (message : string) =>{
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 3000);
  }

  const fetchTouristes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getTouristesAlphabetical();
      setTouristes(response.data);
    } catch (err) {
      setError("Impossible de charger les touristes.");
      console.error(err);
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
      showSuccess("Touriste supprimer avec succèss !");
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
    }
  };

//Ouvrir formulaire en mode édition
  const handleEdit = (row: any) => {
    setTouristeEdit(row);
    setOpenForm(true);
  };

  // Ouvrir formulaire en mode création
  const handleNew = () => {
    setTouristeEdit(null);
    setOpenForm(true);
  };

  const handleClose = () => {
    setOpenForm(false);
    setTouristeEdit(null);
  };

  const handleSuccess = () => {
    fetchTouristes();
    showSuccess(touristeEdit ? "Touriste modifiée avec succès !" : "Touriste créée avec succès !");
  };

  return (
    <div className="p-6">
      {successMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-green-600 text-white text-sm px-5 py-3 rounded-xl shadow-lg animate-fade-in">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {successMessage}
        </div>
      )}
      {/* En-tête */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-xl font-bold">Liste des touristes</p>
        <BouttonPopUp
          label="Nouveau touriste"
          icon={<PlusCircle size={18} />}
          onClick={handleNew}
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
          onEdit={handleEdit}
          onDelete={handleDelete}
          emptyText="Aucun touriste trouvé."
        />
      )}

      {/* Modal ajout */}
      <AddTouriste
        open={openForm}
        onClose={handleClose}
        onSuccess={handleSuccess}
        initialData={touristeEdit}
      />
    </div>
  );
};

export default TouristeManager;