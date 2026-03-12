import { useEffect, useState } from "react";
import { getUsersByRecent, searchUsers } from "../../../service/UtilisateurService";
import DataTable from "../../../components/common/ui/DataTable";
import { utilisateursColumns } from "../../../components/common/ui/tableConfigs";

const AllUserManager = ({ search = "", actif }: { search?: string; actif?: boolean }) => {
  const [users, setUsers]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

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

  useEffect(() => {
    const timer = setTimeout(() => fetchUsers(search, actif), 400);
    return () => clearTimeout(timer);
  }, [search, actif]);

  const handleDelete = async (row: any) => {         // ← reçoit toute la row
    if (!confirm("Supprimer cet utilisateur ?")) return;
    try {
      setUsers((prev: any[]) => prev.filter((u) => u.id !== row.id));
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
    }
  };

  return (
    <div className="p-6">
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
          onView={(row) => console.log("voir", row)}
          onEdit={(row) => console.log("éditer", row)}
          onDelete={handleDelete}
          emptyText="Aucun utilisateur trouvé."
        />
      )}
    </div>
  );
};

export default AllUserManager;