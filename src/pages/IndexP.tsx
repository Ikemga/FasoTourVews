
import { useState } from "react";
import SideBarre from "../components/common/userHome/SideBarre";
import Dashboad from "./dashboad/Dashboad";
import Circuits from "./mangers/circuits/Circuits";
import Sites from "./mangers/sites/Sites";
import Utiliisateurs from "./mangers/users/Utiliisateurs";
import AllReservation from "./mangers/Reservation/AllReservation";
import UserProfile from "./mangers/userprofil/UserProfile";


const IndexP = () => {

    const [page, setPage] = useState("Tableau de bord");

    return (
        <div className="w-screen flex h-screen overflow-hidden bg-[#faf7f4]">
            
                <div className="fixed top-0 left-0 h-screen z-30">
                    <SideBarre
                        activeItem={page}
                        onSelect={setPage}
                    />
                </div>
                <main className="ml-64 overflow-auto min-h-screen w-full">
                    {page === "Tableau de bord" && <Dashboad />}
                    {page === "Circuits" && <Circuits />}
                    {page === "Sites touristiques" && <Sites />}
                    {page === "Utilisateurs" && <Utiliisateurs />}
                    {page === "Réservations" && <AllReservation />}
                    {page === "Paiements" && <div className="p-10">Page Paiements</div>}
                    {page === "Avis & Notes" && <div className="p-10">Avis & Notes</div>}
                    {page === "" && <div className="p-10">Avis & Notes</div>}
                    {page === "Profil" && <UserProfile />}

                    
                </main>
        </div>
    );
};

export default IndexP;