import DashboadAgenceStats from "../../components/common/utilitaire/DashboardAgenceStats";
import HeaderTitle from "../../components/common/utilitaire/HeaderTitle";
import CircuitsParMoisChart from "./CircuitsParMoisChart";
import CircuitsTauxReservationAgence from "./CircuitsTauxReservationAgence";

const DashboadAgence = () =>{

    return(
        <div className="flex flex-col w-full">
            <div className="flex flex-col w-full">
            <HeaderTitle
            title= "Agence Dashboard"
            label= "Vue d'ensemble de votre activité"
            initiales= "AD"
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}/>
            </div>

            <main className="flex flex-col flex-1">
                <DashboadAgenceStats />
                 <main className="flex flex-col flex-1">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch mx-6">
                    <div className="h-full">
                        <CircuitsParMoisChart />
                    </div>

                    <div className="h-full">
                        <CircuitsTauxReservationAgence />

                    </div>
                </div>
            </main>
                
            </main>

        </div>
    )
}

export default DashboadAgence;