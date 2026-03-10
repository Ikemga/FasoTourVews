import { useState } from "react";
import { BouttonPopUp } from "../../../components/common/ui/Bt"
import { PlusCircle } from "lucide-react";
import AddTouriste from "../../../components/common/ui/AddTouriste";

const TouristeManager = () =>{
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
                    label="Nouveau touriste"
                    icon={<PlusCircle size={18} />}
                    onClick={Open}
                />
            </div>

            
            
            <AddTouriste
                open={openModal}
                onClose={Close}
            />
        </div>
    )
}

export default TouristeManager;