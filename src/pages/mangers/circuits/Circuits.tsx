import {PlusCircle } from "lucide-react";
import { BouttonPopUp } from "../../../components/common/ui/Bt";
import SpecifiqueRechercheBarre from "../../../components/common/ui/SpecifiqueRechercheBarre";
import HeaderTitle from "../../../components/common/utilitaire/HeaderTitle";
import CircuitsCard from "./CircuitsCard";
import { useState } from "react";
import AddCircuitModal from "../../../components/common/ui/AddCircuitModal";

const Circuits = () =>{

    const [openModal, setOpenModal] = useState(false);

    return(
        <div >
            <HeaderTitle
            title= "Gestion des circuits"
            label= "Vue d'ensemble des circuits"
            initiales= "AD"
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}/>
            
            <div className="mx-5 py-5 flex justify-between items-center-safe gap-6">                
                <h4 className="text-2xl font-bold">Liste des circuits</h4>
                <SpecifiqueRechercheBarre />
                <div>
                    <BouttonPopUp 
                        label="Nouveau circuit"
                        icon={<PlusCircle size={18} />}
                        onClick={() => setOpenModal(true)}
                    />
                </div>
            </div>
            <p className="mx-6 border border-b-taupe-50"></p>

            
            <div >
                <div className="mx-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 items-center">
                    <CircuitsCard
                        image="https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=600"
                        title="Circuit Cascades & Pics de Sindou"
                        description="Explorez les Cascades de Banfora, le lac de Tengrela et les majestueux pics de Sindou dans une immersion naturelle exceptionnelle."
                        note={4.8}
                        duree="3"
                        place= "5"
                        personnes="2-10"
                        sites="5"
                        prix="150 000"
                        onDelete ={() => handleDelete(1)}
                    />

                    <CircuitsCard
                        image="https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=600"
                        title="Ouagadougou & Patrimoine Mossi"
                        description="Plongez dans l’histoire du royaume Mossi, visitez le musée national et découvrez l’artisanat local."
                        note={4.6}
                        duree="2"
                        place = "3"
                        personnes="4-15 "
                        sites="4 "
                        prix="95 000"
                    />

                    <CircuitsCard
                        image="https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=600"
                        title="Ouagadougou & Patrimoine Mossi"
                        description="Plongez dans l'histoire du royaume Mossi, visitez le musée national et découvrez l'artisanat local."
                        note={4.6}
                        duree="2"
                        place = "3"
                        personnes="4-15"
                        sites="4"
                        prix="95 000"
                        />

                    <CircuitsCard
                        image="https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=600"
                        title="Cascades & Pics de Sindou"
                        description="Explorez les Cascades de Banfora, le lac de Tengrela et les majestueux pics de Sindou dans une immersion naturelle exceptionnelle."
                        note={4.8}
                        duree="3"
                        place = "3"
                        personnes="2-10"
                        sites="5"
                        prix="150 000"
                        />

                        <CircuitsCard
                        image="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600"
                        title="Sahel & Dunes de Gorom-Gorom"
                        description="Partez à la rencontre des Touaregs au marché de Gorom-Gorom et vivez une nuit sous les étoiles du Sahel."
                        note={4.9}
                        duree="4"
                        place = "3"
                        personnes="2-8"
                        sites="4"
                        prix="220 000"
                        />
                    <CircuitsCard
                    image="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600"
                    title="Réserve de Nazinga & Faune Sauvage"
                    description="Observez éléphants, hippos et antilopes dans la réserve de Nazinga, l'un des parcs les plus riches d'Afrique de l'Ouest."
                    note={4.7}
                    duree="2 "
                    place = "3"
                    personnes="2-12"
                    sites="3 sites"
                    prix="95 000"
                    />
                    <CircuitsCard
                    image="https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600"
                    title="Pays Lobi & Art Sacré de Gaoua"
                    description="Plongez dans la culture Lobi à Gaoua, visitez le musée Poni et découvrez les rites ancestraux de cette région mystérieuse."
                    note={4.6}
                    duree="2"
                    place = "3"
                    personnes="2-8"
                    sites="4 sites"
                    prix="110 000"
                    />


                <CircuitsCard
                    image="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600"
                    title="Aventure Sahélienne - Dori & Gorom"
                    description="Partez à la découverte du Sahel burkinabè, des dunes de sable et des traditions peules authentiques."
                    note={4.7}
                    duree="5"
                    place = "3"
                    personnes="4-8"
                    sites="6 sites"
                    prix="210 000"
                />
    
                </div>
            </div>
            <AddCircuitModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                />
        </div>
    )
}

export default Circuits;