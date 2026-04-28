import { useEffect, useState } from "react";
import { deleteUtilisateur, getUsersByRecent, searchUsers, toggleActifUtilisateur } from "../../../service/UtilisateurService";
import DataTable from "../../../components/common/ui/DataTable";
import { utilisateursColumns } from "../../../components/common/ui/tableConfigs";
import UserDetailDrawer from "./UserDetailDrawer";

const AllUserManager = ({ search = "", actif }: { search?: string; actif?: boolean }) => {
  const [users, setUsers]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const[successMessage, setSuccessMessage] = useState("");


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


  const showSuccess = (message : string) =>{
    setSuccessMessage(message)
    setTimeout(()=> setSuccessMessage(""), 3000);
  };

  const fetchUsers = async (searchVal: string, actifVal?: boolean) => {
    try {
      setLoading(true);
      setError(null);
      const response =
        searchVal || actifVal !== undefined
          ? await searchUsers(searchVal, actifVal)
          : await getUsersByRecent();
      setUsers(response.data);
    } catch (err) {
      setError("Impossible de charger les utilisateurs.");
      console.error(err);
    } finally {
      setLoading(false);
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
  
      setUsers((prev: any[]) =>
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

  useEffect(() => {
    const timer = setTimeout(() => fetchUsers(search, actif), 400);
    return () => clearTimeout(timer);
  }, [search, actif]);

  const handleDelete = async (row: any) => {
    if (!confirm("Supprimer cet utilisateur ?")) return;
    try {
      await deleteUtilisateur(row.id);
      setUsers((prev: any[]) => prev.filter((u) => u.id !== row.id));
      showSuccess("Utilisateur supprimé avec succès !");
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
    }
  };

  return (
    <div className="p-6">

      {successMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-green-600 text-white text-sm px-5 py-3 rounded-xl shadow-lg animate-fade-in">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {successMessage}
        </div>
      )}

      <p className="text-xl font-bold text-left mb-4">
        Liste de tous les utilisateurs
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
            onClick={() => fetchUsers(search, actif)}
            className="ml-3 underline text-red-500 hover:text-red-700"
          >
            Réessayer
          </button>
        </div>
      )}

      {!loading && !error && (
        <DataTable
          rows={users}
          columns={utilisateursColumns}
          onView={handleView}
          onEdit={(row) => console.log("éditer", row)}
          onDelete={handleDelete}
          emptyText="Aucun utilisateur trouvé."
        />
      )}

      <UserDetailDrawer
        utilisateur={openDrawer ? selectedUser : null}
        onClose={handleCloseDrawer}
        onToggleActif={handleToggleActif}
      />
    </div>
  );
};

export default AllUserManager;
