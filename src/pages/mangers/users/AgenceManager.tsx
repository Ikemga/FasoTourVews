import { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import { BouttonPopUp } from "../../../components/common/ui/Bt";
import DataTable from "../../../components/common/ui/DataTable";
import { agencesColumns } from "../../../components/common/ui/tableConfigs";
import { deleteAgence, getAgencesAlphabetical, toggleAgence } from "../../../service/AgenceService";
import AddAgence from "../../../components/common/ui/AddAgence";
import { toggleActifUtilisateur } from "../../../service/UtilisateurService";
import UserDetailDrawer from "./UserDetailDrawer";

const AgenceManager = () => {
  const [agences, setAgences]           = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [agenceEdit, setAgenceEdit]     = useState(null);
  const [openForm, setOpenForm]         = useState(false);

  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleView = (row: any) => {
    setSelectedUser(row);
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    setSelectedUser(null);
  };

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // ─── Fetch ──────────────────────────────────────────────────────────────────
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

  useEffect(() => { fetchAgences(); }, []);

  // ─── Handlers ───────────────────────────────────────────────────────────────
  const handleDelete = async (row: any) => {
    if (!confirm(`Supprimer l'agence "${row.nomAgence}" ?`)) return;
    try {
      await deleteAgence(row.id);
      setAgences((prev: any[]) => prev.filter((a) => a.id !== row.id));
      showSuccess("Agence supprimée avec succès !");
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
    }
  };

  const handleToggleActif = async (user: any) => {
  
    const ok = confirm(
      user.actif
        ? "Désactiver cet utilisateur ?"
        : "Activer cet utilisateur ?"
    );
  
    if (!ok) return;
  
    try {
      await toggleActifUtilisateur(user.id);
  
      setAgences((prev: any[]) =>
        prev.map((t) =>
          t.id === user.id ? { ...t, actif: !t.actif } : t
        )
      );
  
      setSelectedUser((prev: any) => ({
        ...prev,
        actif: !prev.actif
      }));
  
    } catch (error) {
      console.error(error);
    }
  };
  

  //Ouvrir formulaire en mode édition
  const handleEdit = (row: any) => {
    setAgenceEdit(row);
    setOpenForm(true);
  };

  // Ouvrir formulaire en mode création
  const handleNew = () => {
    setAgenceEdit(null);
    setOpenForm(true);
  };

  const handleClose = () => {
    setOpenForm(false);
    setAgenceEdit(null);
  };

  const handleSuccess = () => {
    fetchAgences();
    showSuccess(agenceEdit ? "Agence modifiée avec succès !" : "Agence créée avec succès !");
  };

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="p-6">

      {/* Toast succès */}
      {successMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-green-600 text-white text-sm px-5 py-3 rounded-xl shadow-lg">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {successMessage}
        </div>
      )}

      {/* En-tête */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-xl font-bold">Liste des agences</p>
        <BouttonPopUp
          label="Nouvelle agence"
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
          <button onClick={fetchAgences} className="ml-3 underline text-red-500 hover:text-red-700">
            Réessayer
          </button>
        </div>
      )}

      {/* Table */}
      {!loading && !error && (
        <DataTable
          rows={agences}
          columns={agencesColumns}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          emptyText="Aucune agence trouvée."
        />
      )}

      {/* Modal création / édition */}
      <AddAgence
        open={openForm}
        onClose={handleClose}
        onSuccess={handleSuccess}
        initialData={agenceEdit}
      />

      <UserDetailDrawer
        utilisateur={openDrawer ? selectedUser : null}
        onClose={handleCloseDrawer}
        onToggleActif={handleToggleActif}
      />
    </div>
  );
};

export default AgenceManager;