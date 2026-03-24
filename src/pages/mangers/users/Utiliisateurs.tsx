import HeaderTitle from "../../../components/common/utilitaire/HeaderTitle";
import UserStatistique from "../../../components/common/utilitaire/UserStatistique";
import UserTabGroup from "../../../components/common/ui/UserTabGroup";
import { useState, useEffect } from "react";
import TouristeManager from "./TouristeManager";
import GuideManager from "./GuideManager";
import AgenceManager from "./AgenceManager";
import AllUserManager from "./AllUserManager";
import RechercheBarre from "./RechercheBarre";
import { getUserStats } from "../../../service/DashboardService";

const tabs = [
  { label: "Tous", count: 0 },
  { label: "Touristes", count: 0 },
  { label: "Guides", count: 0 },
  { label: "Agences", count: 0 },
];

const Utiliisateurs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");
  const [userStatsData, setUserStatsData] = useState(null);
  const [tabCounts, setTabCounts] = useState(tabs);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await getUserStats();
        setUserStatsData(data);

        // Mettre à jour les counts des tabs dynamiquement
        setTabCounts([
          { label: "Tous", count: data.totalUtilisateurs },
          { label: "Touristes", count: data.totalTouristes },
          { label: "Guides", count: data.totalGuides },
          { label: "Agences", count: data.totalAgences },
        ]);
      } catch (error) {
        console.error("Erreur récupération stats utilisateur :", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex flex-col w-full">
      <HeaderTitle
        title="Gestion des utilisateurs"
        label="Vue d'ensemble utilisateur"
        initiales="AD"
      />

      <main className="flex flex-col flex-1">
        {/* Passer les données dynamiques à UserStatistique */}
        {userStatsData && <UserStatistique data={userStatsData} />}

        <div className="mx-5 py-5 flex justify-between items-center-safe gap-6">
          <RechercheBarre value={search} onChange={(val) => setSearch(val)} />
        </div>

        <div className="w-full">
          <div className="flex justify-start items-start mx-4">
            <UserTabGroup
              tabs={tabCounts}
              activeTab={activeTab}
              onChange={(index) => setActiveTab(index)}
            />
          </div>

          {/* Contenu selon l'onglet actif */}
          {activeTab === 0 && <AllUserManager search={search} />}
          {activeTab === 1 && <TouristeManager search={search} />}
          {activeTab === 2 && <GuideManager search={search} />}
          {activeTab === 3 && <AgenceManager search={search} />}
        </div>
      </main>
    </div>
  );
};

export default Utiliisateurs;