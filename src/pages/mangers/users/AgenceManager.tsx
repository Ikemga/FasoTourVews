import { useState } from "react";
import { BouttonPopUp } from "../../../components/common/ui/Bt"
import { PlusCircle } from "lucide-react";
import AddAgence from "../../../components/common/ui/AddAgence";

const AgenceManager = () =>{
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
                    label="Nouvelle agence"
                    icon={<PlusCircle size={18} />}
                    onClick={Open}
                />
            </div>

            
            
            <AddAgence
                open={openModal}
                onClose={Close}
            />
        </div>
    )
}

export default AgenceManager;