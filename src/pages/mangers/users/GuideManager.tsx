import { useState } from "react";
import { BouttonPopUp } from "../../../components/common/ui/Bt"
import { PlusCircle } from "lucide-react";
import AddGuide from "../../../components/common/ui/AddGuide";

const GuideManager = () =>{
    const[openModal, setOpenModal] = useState(false);

    const Open = () =>{
        setOpenModal(true);
    }

    const Close = () =>{
        setOpenModal(false);
    }


    return(
        <div >
            <div className="flex justify-end items-end mx-4">
                <BouttonPopUp 
                    label="Nouveau guide"
                    icon={<PlusCircle size={18} />}
                    onClick={Open}
                />
            </div>

            
            
            <AddGuide
                open={openModal}
                onClose={Close}
            />
        </div>
    )
}

export default GuideManager;