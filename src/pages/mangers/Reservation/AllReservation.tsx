import { useState, useEffect }   from "react";
import UserTabGroup              from "../../../components/common/ui/UserTabGroup";
import HeaderTitle               from "../../../components/common/utilitaire/HeaderTitle";
import RechercheBarre            from "../users/RechercheBarre";
import ReservationStat           from "./ResertionStat";
import { ChevronRight }          from "lucide-react";
import Circuits                  from "../circuits/Circuits";
import AllReservationListe       from "./reservationlisting/AllReservationListe";
import AnnuleesListe             from "./reservationlisting/AnnuleesListe";
import EnAttenteListe            from "./reservationlisting/EnAttenteListe";
import ConfirmeeListe            from "./reservationlisting/ConfirméeLise";
import PartielleListe            from "./reservationlisting/PartiellesListe";
import ExpireeListe              from "./reservationlisting/Expiree";
import { getReservationStats } from "../../../service/DashboardService";

const AllReservation = ({ onCircuit }) => {

    const [activeTab,     setActiveTab]     = useState(0);
    const [search,        setSearch]        = useState("");
    const [statsData,     setStatsData]     = useState(null);
    const [showCircuits,  setShowCircuits]  = useState(false);

    
    useEffect(() => {
        getReservationStats()
            .then(res => setStatsData(res.data))
            .catch(err => console.error("Erreur stats", err));
    }, []);

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
                <ReservationStat data={statsData} />

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-4">
                    <div>
                        <p className="text-2xl font-bold whitespace-nowrap">Liste des réservations</p>
                    </div>
                    <div>
                        <RechercheBarre
                            value={search}
                            onChange={(val) => setSearch(val)}
                        />
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={() => setShowCircuits(true)}
                            className="flex items-center gap-2 border border-primary text-primary px-6 py-3 rounded-xl font-bold hover:bg-amber-700 hover:text-white transition-all duration-300 ease-in-out cursor-pointer group"
                        >
                            <span>Réserver</span>
                            <ChevronRight className="w-5 h-5 text-primary transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white" />
                        </button>
                    </div>
                </div>

                <div className="w-full my-6">
                    <div className="flex justify-start items-start mx-4">
                        <UserTabGroup
                            tabs={tabs}
                            activeTab={activeTab}
                            onChange={(index) => setActiveTab(index)}
                        />
                    </div>

                    {activeTab === 0 && <AllReservationListe search={search} />}
                    {activeTab === 1 && <ConfirmeeListe      search={search} />}
                    {activeTab === 2 && <PartielleListe      search={search} />}
                    {activeTab === 3 && <EnAttenteListe      search={search} />}
                    {activeTab === 4 && <AnnuleesListe       search={search} />}
                    {activeTab === 5 && <ExpireeListe        search={search} />}
                </div>
            </main>
        </div>
    );
};

export default AllReservation;