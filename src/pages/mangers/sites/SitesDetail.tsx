import HeaderTitle from "../../../components/common/utilitaire/HeaderTitle";

const SitesDetail = () =>{
    return(
        <div>
            <div className="w-screen text-left">
                <HeaderTitle
                title= "Gestion des circsitesits"
                label= "Detail du site"
                initiales= "AD"
                onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}/>
            </div>
        </div>
    )
}

export default SitesDetail;