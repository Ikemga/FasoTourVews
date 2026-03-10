import GeneriqueHeader from './GeneriqueHeader';
import SiteFeatureCard from './SiteFeatureCard';


const SitesFeature= () =>{
    return(
        <div className="bg-[#f7f7f7]">
            <div className="mx-30  py-10">
            
                <GeneriqueHeader
                title="Découvrir"
                label="Sites Touristiques Populaires"
                text="Explorez les trésors cachés du Burkina Faso, des sites classés UNESCO aux merveilles naturelles."
                />

                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4  gap-4 w-full items-center">

                <SiteFeatureCard
                    imageSrc="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600"
                    title="Ruines de Loropéni"
                    localisation="Loropéni, Poni"
                    note="4.8"
                    type="Patrimoine UNESCO"
                />

                <SiteFeatureCard
                    imageSrc="https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600"
                    title="Pics de Sindou"
                    localisation="Sindou, Léraba"
                    note="4.7"
                    type="Géologie"
                />

                <SiteFeatureCard
                    imageSrc="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600"
                    title="Lac Tengrela"
                    localisation="Banfora, Comoé"
                    note="4.6"
                    type="Nature"
                />

                <SiteFeatureCard
                    imageSrc="https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=600"
                    title="Grand Marché de Ouagadougou"
                    localisation="Ouagadougou, Centre"
                    note="4.5"
                    type="Culture"
                />

                
                </div>
            </div>
        </div>
        

    )
}

export default SitesFeature;