import { PlusCircle } from "lucide-react";
import { BouttonPopUp } from "../../../components/common/ui/Bt";
import SpecifiqueRechercheBarre from "../../../components/common/ui/SpecifiqueRechercheBarre";
import HeaderTitle from "../../../components/common/utilitaire/HeaderTitle";
import { useEffect, useState } from "react";
import AddSiteModal from "../../../components/common/ui/AddSiteModal";
import { deleteSites, getSites, getSitesOrderByLaste } from "../../../service/SiteService";
import SiteCard from "./SiteCard";

const Sites = () => {
  const [openModal, setOpenModal]     = useState(false);
  const [sites, setSites]             = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = async () => {
    try {
      const response = await getSitesOrderByLaste();
      const data = response.data;

      const liste = Array.isArray(data)
        ? data
        : data.content ?? data.data ?? data.sites ?? [];
        liste.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setSites(liste);
    } catch (error) {
      console.error("Erreur chargement sites", error);
      setSites([]);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSites(id);
      fetchSites();
    } catch (error) {
      console.error("Erreur suppression", error);
    }
  };

  return (
    <div>
      <HeaderTitle
        title="Gestion des sites"
        label="Vue d'ensemble des sites"
        initiales="AD"
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="mx-5 py-5 flex justify-between items-center gap-6"> 
        <SpecifiqueRechercheBarre />
        <BouttonPopUp
          label="Nouveau site"
          icon={<PlusCircle size={18} />}
          onClick={() => setOpenModal(true)}
        />
      </div>

      <div className="mx-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sites.length === 0 ? (
          <p className="text-gray-400 italic col-span-3 text-center py-10">
            Aucun site disponible.
          </p>
        ) : (
          sites.map((site) => (
            <SiteCard
              key={site.id}
              imageSrc={site.image}
              title={site.nom}
              note={site.note}
              description={site.description}
              region={site.region}
              categorie={site.categorie}
              horaire={site.horaire}
              tarif={site.tarif}
              onDelete={() => handleDelete(site.id)}
            />
          ))
        )}
      </div>

      <AddSiteModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={fetchSites}
      />
    </div>
  );
};

export default Sites;