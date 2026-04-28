import HeaderTitle from "../../components/common/utilitaire/HeaderTitle";
import DashboardStats from "../../components/common/utilitaire/DashboardStats";
import SitesParCategorieChart from "./SitesParCategorieChart";
import CircuitsTauxReservationChart from "./CircuitsTauxReservationChart";

const Dashboad = () =>{
    return(
        <div className="flex flex-col w-full">
            <HeaderTitle
            title= "Dashboard"
            label= "Vue d'ensemble de votre activité"
            initiales= "AD"
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}/>

            <main className="flex flex-col flex-1">
                <DashboardStats />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch mx-6">
                    <div className="h-full">
                        <SitesParCategorieChart />
                    </div>

                    <div className="h-full">
                        <CircuitsTauxReservationChart />
                    </div>
                </div>
            </main>
        </div>
    )
}
export  default Dashboad;
