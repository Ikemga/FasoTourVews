import HeaderTitle from "../../components/common/utilitaire/HeaderTitle";
import DashboardStats from "../../components/common/utilitaire/DashboardStats";
import ActiviteRecente from "./ActiviteRecente";

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
                
                <ActiviteRecente />
            </main>
        </div>
    )
}
export  default Dashboad;