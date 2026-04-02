import { ArrowLeft, Navigation, Pencil, Trash2 } from "lucide-react";
import HeaderTitle from "../../../../components/common/utilitaire/HeaderTitle";
import SiteHero from "./SiteHero";
import MediaTabs from "./MediaTabs";
import SiteInfoCard from "./SiteInfoCard";
import EditSiteModal from "../../../../components/common/ui/EditSiteModal";
import { useState, useEffect } from "react";
import { getSiteById } from "../../../../service/SiteService";

const SitesDetail = ({ site, onBack, onToggleSidebar, onDelete, onRefresh }) => {

    const [editOpen, setEditOpen]       = useState(false);
    const [siteLocal, setSiteLocal]     = useState(site);
    const [refreshing, setRefreshing]   = useState(false);

    useEffect(() => {
        setSiteLocal(site);
    }, [site]);

    const handleEditSuccess = async () => {
        setEditOpen(false);
        setRefreshing(true);
        try {
            const response = await getSiteById(siteLocal.id);
            setSiteLocal(response.data);
            onRefresh?.();
        } catch (err) {
            console.error("Erreur rechargement site :", err);
        } finally {
            setRefreshing(false);
        }
    };

    if (!siteLocal) return (
        <div className="p-10 text-center text-gray-400">Aucun site sélectionné.</div>
    );

    const openItineraire = () => {
        if (siteLocal.localisation) {
            window.open(
                `https://www.google.com/maps/search/?api=1&query=${siteLocal.localisation}`,
                "_blank"
            );
        }
    };

    return (
        <div>
            <div className="w-full text-left">
                <HeaderTitle
                    title="Detail du site"
                    label={siteLocal.nom}
                    initiales="AD"
                    onToggleSidebar={onToggleSidebar}
                />
            </div>

            <button
                onClick={onBack}
                className="mx-6 mt-4 cursor-pointer flex items-center gap-2 text-gray-500 hover:text-primary hover:font-bold transition mb-6 group"
            >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium">Retour à la liste</span>
            </button>

            {refreshing && (
                <div className="mx-6 mb-3 text-sm text-orange-500 animate-pulse">
                    Mise à jour en cours...
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w- mx-6">
                <div className="col-span-2">
                    <SiteHero site={siteLocal} />
                </div>
                <div className="flex flex-col gap-4">
                    <SiteInfoCard site={siteLocal} onItineraire={openItineraire} />
                </div>
            </div>

            <div className="m-6">
                <div className="bg-white rounded-2xl border border-gray-300 p-4 mb-4">
                    <h2 className="text-base text-left font-bold text-gray-800 mb-3">Description</h2>
                    <p className="text-gray-500 text-left text-sm leading-relaxed">
                        {siteLocal.description ?? "Aucune description disponible."}
                    </p>
                </div>
                <div>
                    <MediaTabs site={siteLocal} />
                </div>
            </div>

            <div className="mb-4 flex justify-center items-center gap-4">
                <button
                    onClick={openItineraire}
                    className="relative px-4 py-3 flex items-center justify-center gap-2 bg-orange-50 hover:bg-orange-100 border border-orange-200 text-orange-600 text-sm font-semibold rounded-xl transition"
                >
                    <Navigation size={15} />
                    Voir l'itinéraire
                </button>

                <div className="flex gap-3">
                    <button
                        onClick={() => setEditOpen(true)}
                        className="px-4 py-3 flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition shadow-md shadow-orange-200"
                    >
                        <Pencil size={16} />
                        Modifier
                    </button>
                    <button
                        onClick={onDelete}
                        className="flex items-center justify-center w-12 h-12 bg-red-500 hover:bg-red-600 text-white rounded-xl transition shadow-md shadow-red-200"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            <EditSiteModal
                open={editOpen}
                onClose={() => setEditOpen(false)}
                onSuccess={handleEditSuccess}
                site={siteLocal}
            />
        </div>
    );
};

export default SitesDetail;