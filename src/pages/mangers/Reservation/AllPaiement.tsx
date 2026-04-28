import { useState, useEffect } from "react";
import UserTabGroup from "../../../components/common/ui/UserTabGroup";
import HeaderTitle from "../../../components/common/utilitaire/HeaderTitle";
import RechercheBarre from "../users/RechercheBarre";
import PaiementStat from "./PaiementStat";
import AllPaiementListe from "./paiementlisting/AllPaiementListe";
import PayesListe from "./paiementlisting/PayesListe";
import ImpayesListe from "./paiementlisting/ImpayesListe";
import PartielsListe from "./paiementlisting/PartielsListe";
import { getPaiementCountByStatutAg } from "../../../service/DashboardAgenceService";
import { getPaiementStats } from "../../../service/DashboardService";
import { useAuth } from "../../../service/protected/useAuth";
import { getUserId } from "../../../service/token/TokenService";

const AllPaiement = () => {

    const { role }   = useAuth();
    const touristeId = Number(getUserId());

    const [activeTab,  setActiveTab]  = useState(0);
    const [search,     setSearch]     = useState("");
    const [statsData,  setStatsData]  = useState(null);

    useEffect(() => {

        // TOURISTE : pas de stats
        if (role === "TOURISTE") return;

        const apiCall = role === "AGENCE"
            ? getPaiementCountByStatutAg()
            : getPaiementStats();

        apiCall
            .then(res => {
                const data = res.data || res;

                if (role === "AGENCE") {
                    // Cas agence : { PAYE: 10, PARTIEL: 3, IMPAYE: 5 }
                    const payes    = Number(data.PAYE    ?? 0);
                    const partiels = Number(data.PARTIEL ?? 0);
                    const impayes  = Number(data.IMPAYE  ?? 0);
                    setStatsData({ total: payes + partiels + impayes, payes, partiels, impayes });
                } else {
                    // Cas Admin : { total, payes, partiels, impayes }
                    setStatsData({
                        total:    Number(data.total)    || 0,
                        payes:    Number(data.payes)    || 0,
                        partiels: Number(data.partiels) || 0,
                        impayes:  Number(data.impayes)  || 0,
                    });
                }
            })
            .catch(err => console.error("Erreur stats paiements", err));

    }, [role]);

    const tabs = [
        { label: "Tous",     count: statsData?.total    ?? 0 },
        { label: "Payés",    count: statsData?.payes    ?? 0 },
        { label: "Partiels", count: statsData?.partiels ?? 0 },
        { label: "Impayés",  count: statsData?.impayes  ?? 0 },
    ];

    return (
        <div className="flex flex-col w-full">
            <HeaderTitle
                title="Gestion des paiements"
                label="Vue d'ensemble des paiements"
                initiales="AD"
            />
            <main>

                {/* Stats uniquement pour ADMIN et AGENCE */}
                {role !== "TOURISTE" && <PaiementStat data={statsData} />}

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6">
                    <p className="text-2xl font-bold whitespace-nowrap">
                        Liste des paiements
                    </p>
                    <RechercheBarre
                        value={search}
                        onChange={(val) => setSearch(val)}
                    />
                </div>

                <div className="w-full">

                    {/* Tabs uniquement pour ADMIN et AGENCE */}
                    {role !== "TOURISTE" && (
                        <div className="flex justify-start items-start mx-4">
                            <UserTabGroup
                                tabs={tabs}
                                activeTab={activeTab}
                                onChange={(index) => setActiveTab(index)}
                            />
                        </div>
                    )}

                    {/*TOURISTE : uniquement AllPaiementListe avec son ID */}
                    {role === "TOURISTE" ? (
                        <AllPaiementListe search={search} touristeId={touristeId} />
                    ) : (
                        <>
                            {activeTab === 0 && <AllPaiementListe search={search} />}
                            {activeTab === 1 && <PayesListe       search={search} />}
                            {activeTab === 2 && <PartielsListe    search={search} />}
                            {activeTab === 3 && <ImpayesListe     search={search} />}
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AllPaiement;