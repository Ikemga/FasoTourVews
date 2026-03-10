import SpecifiqueRechercheBarre from "../../../components/common/ui/SpecifiqueRechercheBarre";
import HeaderTitle from "../../../components/common/utilitaire/HeaderTitle";
import UserStatistique from "../../../components/common/utilitaire/UserStatistique";
import UserTabGroup from "../../../components/common/ui/UserTabGroup";
import { useState } from "react";
import TouristeManager from "./TouristeManager";
import GuideManager from "./GuideManager";
import AgenceManager from "./AgenceManager";
import AllUserManager from "./AllUserManager";


    const tabs = [
    { label: "Tous", count: 7 },
    { label: "Touristes", count: 3 },
    { label: "Guides", count: 2 },
    { label: "Agences", count: 2 },
    ];

const Utiliisateurs = () =>{

    const [activeTab, setActiveTab] = useState(0);

    return(
        <div className="flex flex-col w-full">
            <HeaderTitle
                title= "Gestion des utilisateurs"
                label= "Vue d'ensemble utilisateur"
                initiales= "AD"
                onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}/>


            <main className="flex flex-col flex-1">
                <UserStatistique />
                <div className="mx-5 py-5 flex justify-between items-center-safe gap-6">
                    <SpecifiqueRechercheBarre />
                </div>
                <div className="w-full">
                    <div className="flex justify-start items-start mx-4">
                        <UserTabGroup
                            tabs={tabs}
                            activeTab={activeTab}
                            onChange={(index) => setActiveTab(index)}
                        />
                    </div>
                    
                    {/* Afficher du contenu selon l'onglet actif */}
                    {activeTab === 0 && <AllUserManager/> }
                    {activeTab === 1 && <TouristeManager />}
                    {activeTab === 2 && <GuideManager />}
                    {activeTab === 3 && <AgenceManager/>}
                </div>
                
            </main>
                
        </div>
    )
}
export default Utiliisateurs;