import { useState } from "react";
import SideBarre from "../components/common/userHome/SideBarre";
import Dashboad from "./dashboad/Dashboad";
import DashboadAgence from "./dashboad/DashboadAgence";
import Circuits from "./mangers/circuits/Circuits";
import Sites from "./mangers/sites/Sites";
import Avis from "./mangers/avis/Avis";
import { useAuth } from "../service/protected/useAuth";
import Utiliisateurs from "./mangers/users/Utiliisateurs";
import AllReservation from "./mangers/Reservation/AllReservation";
import AllPaiement from "./mangers/Reservation/AllPaiement";
import UserProfile from "./mangers/userprofil/UserProfile";
import Guides from "./mangers/Reservation/component/guide/Guides";

const Home = () => {
    const { role } = useAuth();

    // age initiale selon le rôle, sans useEffect
    const [page, setPage] = useState(() => {
        if (role === "TOURISTE" || role === "GUIDE") return "Circuits";
        return "Tableau de bord";
    });

    const renderDashboard = () => {
        if (role === "AGENCE")   return <DashboadAgence />;
        if (role === "ADMIN")    return <Dashboad />;
        if (role === "TOURISTE") return <Circuits />;
        if (role === "GUIDE")    return <Circuits />;
        return (
            <div className="p-10 text-gray-500">
                Accès non autorisé.
            </div>
        );
    };

    return (
        <div className="w-screen flex h-screen overflow-hidden bg-[#faf7f4]">
            {/* Sidebar */}
            <div className="fixed top-0 left-0 h-screen z-30">
                <SideBarre activeItem={page} onSelect={setPage} />
            </div>

            {/* Main */}
            <main className="ml-64 overflow-auto min-h-screen w-full">
                {page === "Tableau de bord"      && renderDashboard()}
                {page === "Circuits"             && <Circuits />}
                {page === "Sites touristiques"   && <Sites />}
                {page === "Guides"                && <Guides />}
                {page === "Utilisateurs"         && <Utiliisateurs />}
                {page === "Réservations"         && <AllReservation />}
                {page === "Paiements"            && <AllPaiement />}
                {page === "Avis & Notes"         && <Avis />}
                {page === "Profil"               && <UserProfile />}
            </main>
        </div>
    );
};

export default Home;