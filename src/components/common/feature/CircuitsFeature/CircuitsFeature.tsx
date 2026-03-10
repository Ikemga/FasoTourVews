import GeneriqueHeader from "./sitesFeature/GeneriqueHeader";
import CircuitsFeatureCard from "./CircuitsFeatureCard";

const CircuitsFeature = () =>{
    return(
        <div className="mx-30 py-10">
            <GeneriqueHeader
                title="NOS CIRCUITS"
                label="Circuits Populaires"
                text="Des itinéraires soigneusement conçus pour vous faire vivre l'authenticité du Burkina Faso."
            />

            <div className="flex flex-col md:flex-row gap-4 p-6 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 w-full gap-4 items-center">
                    <CircuitsFeatureCard
                        image="https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=600"
                        title="Circuit Cascades & Pics de Sindou"
                        description="Explorez les Cascades de Banfora, le lac de Tengrela et les majestueux pics de Sindou dans une immersion naturelle exceptionnelle."
                        note={4.8}
                        duree="3"
                        place="5"
                        sites="5 sites"
                        prix="150 000"
                    />

                    <CircuitsFeatureCard
                        image="https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=600"
                        title="Ouagadougou & Patrimoine Mossi"
                        description="Plongez dans l’histoire du royaume Mossi, visitez le musée national et découvrez l’artisanat local."
                        note={4.6}
                        duree="2"
                        place="4"
                        sites="4 sites"
                        prix="95 000"
                    />

                    <CircuitsFeatureCard
                        image="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600"
                        title="Aventure Sahélienne - Dori & Gorom"
                        description="Partez à la découverte du Sahel burkinabè, des dunes de sable et des traditions peules authentiques."
                        note={4.7}
                        duree="5"
                        place="5"
                        sites="6 sites"
                        prix="210 000"
                    />
        
                </div>
            </div>
            
            

            
            
        </div>

    )
}
export default CircuitsFeature;