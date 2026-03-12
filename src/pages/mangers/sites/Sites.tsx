import { PlusCircle } from "lucide-react";
import { BouttonPopUp } from "../../../components/common/ui/Bt";
import SpecifiqueRechercheBarre from "../../../components/common/ui/SpecifiqueRechercheBarre";
import HeaderTitle from "../../../components/common/utilitaire/HeaderTitle";
import { useEffect, useState } from "react";
import AddSiteModal from "../../../components/common/ui/AddSiteModal";
import { deleteSites, getSitesOrderByLaste, searchSites } from "../../../service/SiteService";
import SiteCard from "./SiteCard";
import SitesDetail from "./siteDetail/SitesDetail";
import Badge from "./siteDetail/Badge";

const Sites = ({onToggleSidebar}) => {
  const [openModal, setOpenModal]     = useState(false);
  const [sites, setSites]             = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [displayed, setDisplayed] = useState([]);
  const [success, setSuccess]     = useState(null);
  const [selectedSite, setSelectedSite] = useState(null);

  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = async () => {
    try {
      const response = await getSitesOrderByLaste();
      const data = response.data;
      console.log("DATA REÇUE :", data);

      const liste = Array.isArray(data)
        ? data
        : data.content ?? data.data ?? data.sites ?? [];
        console.log("LISTE FINALE :", liste); 
        liste.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setSites(liste);
      setDisplayed(liste);
    } catch (error) {
      console.error("Erreur chargement sites", error);
      setSites([]);
      setDisplayed([]);
    }
  };

  const handleSuccess = () => {
        setSuccess("Site créé avec succès!");
        fetchSites();
        setTimeout(() => setSuccess(null), 3000);
    }


  const handleSearch = (results) => {
        setDisplayed(results ?? sites); 
    };

  const handleDelete = async (id) => {
      const confirm = window.confirm("Confirmer la suppression ?");
      if (!confirm) return;

    try {
      
      await deleteSites(id);
      const updated = sites.filter(s => s.id !== id);
      setSites(updated);
      setDisplayed(prev => prev.filter(s => s.id !== id));
      setSelectedSite(null); 
    } catch (error) {
      console.error("Erreur suppression", error);
    }
  };

if (selectedSite) {
  return (
    <SitesDetail
      site={selectedSite}
      onBack={() => setSelectedSite(null)}
      onDelete={() => handleDelete(selectedSite.id)}
      onToggleSidebar={onToggleSidebar}
      onRefresh={fetchSites}
    />
  );
}
 
  return (
    <div>
      <HeaderTitle
        title="Gestion des sites"
        label="Vue d'ensemble des sites"
        initiales="AD"
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
      
      {success && (
                <div className="mx-5 mt-4 bg-green-50 text-green-600 text-sm px-4 py-3 rounded-xl border border-green-200 flex items-center gap-2">
                    <span>✓</span> {success}
                </div>
            )}

      <div className="mx-5 py-5 flex justify-between items-center gap-6"> 
        <h4 className="text-2xl font-bold">Liste des sites</h4>
        <SpecifiqueRechercheBarre 
            searchFn={searchSites}
            onResults={handleSearch}
            placeholder="Rechercher un site touristique..."
            />
        <BouttonPopUp
          label="Nouveau site"
          icon={<PlusCircle size={18} />}
          onClick={() => setOpenModal(true)}
        />
      </div>

      <div className="mx-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayed.length === 0 ? (
          <p className="text-gray-400 italic col-span-3 text-center py-10">
            Aucun site disponible.
          </p>
        ) : (
          displayed.map((site) => (
            <SiteCard
              key={site.id}
              imageSrc={site.image}
              title={site.nom}
              note={site.noteMoyenne}
              description={site.description}
              region={site.region}

              
              categorie={site.categories?.map((cat, i) => (
                <Badge key={i} label={cat.categorie ?? cat.nom} />
            ))}
              horaire={site.horaire}
              tarif={site.tarif}
              onDelete={() => handleDelete(site.id)}
              onDetail={() => {
                console.log("SITE AU MOMENT DU CLIC :", site); 
                setSelectedSite(site);
              }
                }
            />
          ))
        )}
      </div>

      <AddSiteModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default Sites;