import { ArrowLeft } from "lucide-react";
import { Back } from "../../../components/common/ui/Bt";
import HeaderTitle from "../../../components/common/utilitaire/HeaderTitle";
import CircuitIdDetail from "../../../components/common/detail/circuits/CircuitIdDetail";

const CircuitDetail = () =>{
    return(
        <div className="">
            <div className="w-screen text-left">
                <HeaderTitle
                title= "Gestion des circuits"
                label= "Detail du circuits"
                initiales= "AD"
                onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}/>
            </div>

            <div className="w-auto m-6">
                <Back
                to= "/Circuits"
                icon ={<ArrowLeft size={18} />}
                label = "Retour à la liste des circuits"
                />
            </div>

            <CircuitIdDetail />
            <div>

            </div>
        </div>
        
    )
}
export default CircuitDetail;