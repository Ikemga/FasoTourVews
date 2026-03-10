import GeneriqueHeader from "../feature/CircuitsFeature/sitesFeature/GeneriqueHeader";
import GuideCard from './GuideCard';

const Guide = () =>{
    return(
        <div className="bg-[#f7f7f7]">
            <div className="mx-30 py-10">
    
                <GeneriqueHeader
                    title="NOS EXPERTS"
                    label="Guides Touristiques Certifiés"
                    text="Des guides passionnés et certifiés pour vous accompagner dans votre découverte du Burkina Faso."
                />
                <div className="flex flex-col md:flex-row gap-4 p-4 w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6 w-full items-center">
                    
                    <GuideCard
                    image="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=600"
                    name="Issa Ouédraogo"
                    speciality="Guide des Cascades de Banfora"
                    rating={4.8} 
                    experience={6} 
                    langue="Français, Dioula"
                    />

                    <GuideCard 
                    image="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600"
                    name="Aminata Traoré"
                    speciality="Guide culturel de Ouagadougou"
                    rating={4.9}
                    experience={8} 
                    langue="Français, Mooré"
                    />

                    <GuideCard image="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600" 
                    name="Moussa Compaoré" 
                    speciality="Safari & Parc du W" 
                    rating={4.7} 
                    experience={10} 
                    langue="Français, Anglais" 
                    />

                    <GuideCard 
                    image="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600" 
                    name="Fatoumata Diallo" 
                    speciality="Artisanat & Marché central" 
                    rating={4.6} 
                    experience={4} 
                    langue="Français, Fulfuldé"
                    />
                </div>
                </div>
                

            </div>
        </div>
        
    )
}
export default Guide;