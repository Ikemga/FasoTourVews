import { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import { BouttonPopUp } from "../../../components/common/ui/Bt";
import DataTable from "../../../components/common/ui/DataTable";
import { agencesColumns } from "../../../components/common/ui/tableConfigs";
import {

  deleteAgence,
  getAgencesAlphabetical,
  toggleAgence,
} from "../../../service/AgenceService";
import AddAgence from "../../../components/common/ui/AddAgence";

const AgenceManager = () => {
  const [openModal, setOpenModal] = useState(false);
  const [agences, setAgences]     = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  // ─── Fetch ───────────────────────────────────────────────────────────────────

  const fetchAgences = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAgencesAlphabetical();
      setAgences(response.data);
    } catch (err) {
      setError("Impossible de charger les agences.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgences();
  }, []);

  // ─── Handlers ────────────────────────────────────────────────────────────────

  const handleDelete = async (row: any) => {
    if (!confirm(`Supprimer l'agence "${row.nomAgence}" ?`)) return;
    try {
      await deleteAgence(row.id);
      setAgences((prev: any[]) => prev.filter((a) => a.id !== row.id));
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
    }
  };

  const handleToggle = async (row: any) => {
    try {
      await toggleAgence(row.id);
      // Met à jour le statut localement sans re-fetch
      setAgences((prev: any[]) =>
        prev.map((a) =>
          a.id === row.id
            ? { ...a, statut: a.statut === "active" ? "inactive" : "active" }
            : a
        )
      );
    } catch (err) {
      console.error("Erreur lors du toggle :", err);
    }
  };

  const handleAdded = () => {
    setOpenModal(false);
    fetchAgences();
  };

  // ─── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="p-6">

      {/* En-tête */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-xl font-bold">Liste des agences</p>
        <BouttonPopUp
          label="Nouvelle agence"
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
            onClick={fetchAgences}
            className="ml-3 underline text-red-500 hover:text-red-700"
          >
            Réessayer
          </button>
        </div>
      )}

      {/* Table */}
      {!loading && !error && (
        <DataTable
          rows={agences}
          columns={agencesColumns}
          onView={(row)   => console.log("voir", row)}
          onEdit={(row)   => handleToggle(row)}
          onDelete={(row) => handleDelete(row)}
          emptyText="Aucune agence trouvée."
        />
      )}

      {/* Modal ajout — remplace par ton composant AddAgence */}
      <AddAgence
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={handleAdded}
      /> 
    </div>
  );
};

export default AgenceManager;