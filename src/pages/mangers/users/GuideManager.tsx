import { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import { BouttonPopUp } from "../../../components/common/ui/Bt";
import AddGuide from "../../../components/common/ui/AddGuide";
import DataTable from "../../../components/common/ui/DataTable";
import { guidesColumns } from "../../../components/common/ui/tableConfigs";
import {
  getGuidesAlphabetical,
  deleteGuide,
  toggleGuide,
} from "../../../service/GuideService";

type Guide = {
  id: number;
  nomComplet: string;
  mail?: string;
  telephone?: string;
  specialite?: string;
  actif?: boolean;
  createAt?: string;
};

const GuideManager = () => {
  const [openModal, setOpenModal] = useState(false);
  const [guides, setGuides]       = useState<Guide[]>([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState<string | null>(null);

  // ─── Fetch ───────────────────────────────────────────────────────────────────

  const fetchGuides = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getGuidesAlphabetical();
      setGuides(response.data);
    } catch (err) {
      setError("Impossible de charger les guides.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuides();
  }, []);

  // ─── Handlers ────────────────────────────────────────────────────────────────

  const handleDelete = async (row: Guide) => {
    if (!confirm(`Supprimer le guide "${row.nomComplet}" ?`)) return;
    try {
      await deleteGuide(row.id);
      setGuides((prev) => prev.filter((g) => g.id !== row.id));
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
    }
  };

  const handleToggle = async (row: Guide) => {
    try {
      await toggleGuide(row.id);
      setGuides((prev) =>
        prev.map((g) =>
          g.id === row.id ? { ...g, actif: !g.actif } : g
        )
      );
    } catch (err) {
      console.error("Erreur lors du toggle :", err);
    }
  };

  const handleAdded = () => {
    setOpenModal(false);
    fetchGuides();
  };

  // ─── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="p-6">

      {/* En-tête */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-xl font-bold">Liste des guides</p>
        <BouttonPopUp
          label="Nouveau guide"
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
            onClick={fetchGuides}
            className="ml-3 underline text-red-500 hover:text-red-700"
          >
            Réessayer
          </button>
        </div>
      )}

      {/* Table */}
      {!loading && !error && (
        <DataTable
          rows={guides}
          columns={guidesColumns}
          onView={(row)   => console.log("voir", row)}
          onEdit={(row)   => handleToggle(row)}
          onDelete={(row) => handleDelete(row)}
          emptyText="Aucun guide trouvé."
        />
      )}

      {/* Modal ajout */}
      <AddGuide
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={handleAdded}
      />
    </div>
  );
};

export default GuideManager;