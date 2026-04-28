import { useState, useEffect } from "react";
import UserTabGroup from "../../../components/common/ui/UserTabGroup";
import HeaderTitle from "../../../components/common/utilitaire/HeaderTitle";
import RechercheBarre from "../users/RechercheBarre";
import ReservationStat from "./ResertionStat";
import { ChevronRight } from "lucide-react";
import Circuits from "../circuits/Circuits";
import AllReservationListe from "./reservationlisting/AllReservationListe";
import AnnuleesListe from "./reservationlisting/AnnuleesListe";
import EnAttenteListe from "./reservationlisting/EnAttenteListe";
import ConfirmeeListe from "./reservationlisting/ConfirméeLise";
import PartielleListe from "./reservationlisting/PartiellesListe";
import ExpireeListe from "./reservationlisting/Expiree";
import { getReservationStats } from "../../../service/DashboardService";
import { getUserId } from "../../../service/token/TokenService";
import { useAuth } from "../../../service/protected/useAuth";
import { getMesReservationStats } from "../../../service/ReservationService";

const AllReservation = () => {

    const { role }   = useAuth();
    const touristeId = Number(getUserId());

    const [activeTab,    setActiveTab]    = useState(0);
    const [search,       setSearch]       = useState("");
    const [statsData,    setStatsData]    = useState(null);
    const [showCircuits, setShowCircuits] = useState(false);

    useEffect(() => {

        // ── TOURISTE : pas de stats ──
        if (role === "TOURISTE") return;

        // ── AGENCE : ses réservations | ADMIN : toutes ──
        const apiCall = role === "AGENCE"
            ? getMesReservationStats()
            : getReservationStats();

        apiCall
    .then(res => {
        const data = res.data || res;

        // ───── CAS AGENCE : tableau ─────
        if (Array.isArray(data)) {

            const stats = {
                total: 0,
                confirmees: 0,
                partielles: 0,
                enAttente: 0,
                annulees: 0,
                expirees: 0,
            };

            data.forEach(item => {
                stats.total += item.total;

                if (item.statut === "CONFIRMEE")
                    stats.confirmees = item.total;

                if (item.statut === "PARTIELLE")
                    stats.partielles = item.total;

                if (item.statut === "EN_ATTENTE")
                    stats.enAttente = item.total;

                if (item.statut === "ANNULEE")
                    stats.annulees = item.total;

                if (item.statut === "EXPIREE")
                    stats.expirees = item.total;
            });

            setStatsData(stats);
        }

        // ───── CAS ADMIN : objet ─────
        else {
            setStatsData({
                total:      data?.total      || 0,
                confirmees: data?.confirmees || 0,
                partielles: data?.partielles || 0,
                enAttente:  data?.enAttente  || 0,
                annulees:   data?.annulees   || 0,
                expirees:   data?.expirees   || 0,
            });
        }
    })
    .catch(err => console.error("Erreur stats", err));

    }, [role]);

    const tabs = [
        { label: "Toutes",      count: statsData?.total      ?? 0 },
        { label: "Confirmées",  count: statsData?.confirmees ?? 0 },
        { label: "Partielles",  count: statsData?.partielles ?? 0 },
        { label: "En Attentes", count: statsData?.enAttente  ?? 0 },
        { label: "Annulées",    count: statsData?.annulees   ?? 0 },
        { label: "Expirées",    count: statsData?.expirees   ?? 0 },
    ];

    if (showCircuits) {
        return <Circuits onBack={() => setShowCircuits(false)} />;
    }

    return (
        <div className="flex flex-col w-full">
            <HeaderTitle
                title="Gestion des réservations"
                label="Vue d'ensemble des réservations"
                initiales="AD"
            />
            <main>

                {/* Stats uniquement pour ADMIN et AGENCE */}
                {role !== "TOURISTE" && <ReservationStat data={statsData} />}

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-4">
                    <p className="text-2xl md:text-sm  font-bold whitespace-nowrap">
                        Liste des réservations
                    </p>

                    <RechercheBarre
                        value={search}
                        onChange={(val) => setSearch(val)}
                    />

                    {/* Bouton Réserver visible pour tous */}
                    <button
                        type="button"
                        onClick={() => setShowCircuits(true)}
                        className="flex items-center gap-2 border border-primary text-primary px-6 py-3 rounded-xl font-bold hover:bg-amber-700 hover:text-white transition-all duration-300 ease-in-out cursor-pointer group"
                    >
                        <span>Réserver</span>
                        <ChevronRight className="w-5 h-5 text-primary transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white" />
                    </button>
                </div>

                <div className="w-full my-6">

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

                    {/* TOURISTE : toujours AllReservationListe sans tabs */}
                    {role === "TOURISTE" ? (
                        <AllReservationListe search={search} touristeId={touristeId} />
                    ) : (
                        <>
                            {activeTab === 0 && <AllReservationListe search={search} />}
                            {activeTab === 1 && <ConfirmeeListe      search={search} />}
                            {activeTab === 2 && <PartielleListe      search={search} />}
                            {activeTab === 3 && <EnAttenteListe      search={search} />}
                            {activeTab === 4 && <AnnuleesListe       search={search} />}
                            {activeTab === 5 && <ExpireeListe        search={search} />}
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AllReservation;