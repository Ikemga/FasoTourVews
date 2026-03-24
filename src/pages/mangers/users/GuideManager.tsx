import { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import { BouttonPopUp } from "../../../components/common/ui/Bt";
import AddGuide from "../../../components/common/ui/AddGuide";
import DataTable from "../../../components/common/ui/DataTable";
import { guidesColumns } from "../../../components/common/ui/tableConfigs";
import { getGuidesAlphabetical, deleteGuide, toggleGuide } from "../../../service/GuideService";

type Guide = {
    id: number;
    nomComplet: string;
    mail?: string;
    telephone?: string;
    experience?: string;
    actif?: boolean;
    createAt?: string;
};

const GuideManager = () => {
    const [guides, setGuides]                 = useState([]);
    const [loading, setLoading]               = useState(true);
    const [error, setError]                   = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [guideEdit, setGuideEdit]           = useState(null);
    const [openForm, setOpenForm]             = useState(false);

    const showSuccess = (message: string) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(""), 3000);
    };

    // ─── Fetch ───────────────────────────────────────────────────────────────
    const fetchGuides = async () => {
  try {
    setLoading(true);
    setError(null);
    const response = await getGuidesAlphabetical();
    if (!response?.data) {
      throw new Error("Aucune donnée reçue");
    }
    setGuides(response.data);
  } catch (err) {
    console.error("Erreur fetchGuides:", err);
    setError( err.response?.data?.message || "Impossible de charger les guides."
    );
  } finally {
    setLoading(false);
  }
};

    useEffect(() => { fetchGuides(); }, []);

    // ─── Handlers ────────────────────────────────────────────────────────────
    const handleNew = () => {
        setGuideEdit(null);
        setOpenForm(true);
    };

    const handleEdit = (row: any) => {
        setGuideEdit(row);
        setOpenForm(true);
    };

    const handleClose = () => {
        setOpenForm(false);
        setGuideEdit(null);
    };

    const handleSuccess = async () => {
        const message = guideEdit ? "Guide modifié avec succès !" : "Guide créé avec succès !";
        fetchGuides();
        showSuccess(message);
    };

    const handleDelete = async (row: Guide) => {
        if (!confirm(`Supprimer le guide "${row.nomComplet}" ?`)) return;
        try {
            await deleteGuide(row.id);
            setGuides((prev) => prev.filter((g) => g.id !== row.id));
            showSuccess("Guide supprimé avec succès !");
        } catch (err) {
            console.error("Erreur lors de la suppression :", err);
        }
    };

    const handleToggle = async (row: Guide) => {
        try {
            await toggleGuide(row.id);
            setGuides((prev) =>
                prev.map((g) => g.id === row.id ? { ...g, actif: !g.actif } : g)
            );
        } catch (err) {
            console.error("Erreur lors du toggle :", err);
        }
    };

    // ─── Render ──────────────────────────────────────────────────────────────
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
                <p className="text-xl font-bold">Liste des guides</p>
                <BouttonPopUp
                    label="Nouveau guide"
                    icon={<PlusCircle size={18} />}
                    onClick={handleNew} 
                />
            </div>

            {loading && (
                <div className="flex items-center justify-center py-16">
                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <span className="ml-3 text-gray-400 text-sm">Chargement...</span>
                </div>
            )}

            {error && (
                <div className="text-center py-8 text-red-400 text-sm bg-red-50 rounded-xl border border-red-100">
                    {error}
                    <button onClick={fetchGuides} className="ml-3 underline text-red-500 hover:text-red-700">
                        Réessayer
                    </button>
                </div>
            )}

            {!loading && !error && (
                <DataTable
                    rows={guides}
                    columns={guidesColumns}
                    onView={(row) => console.log("voir", row)}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    emptyText="Aucun guide trouvé."
                />
            )}

            <AddGuide
                open={openForm}
                onClose={handleClose}
                onSuccess={handleSuccess}
                initialData={guideEdit}
            />
        </div>
    );
};

export default GuideManager;