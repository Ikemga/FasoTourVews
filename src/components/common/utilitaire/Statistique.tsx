import StatistiqueItem from "./StatistiqueItem"

const Statistique = () =>{
    
    return(
        <div className="my-5 flex justify-center items-center gap-6">
            <StatistiqueItem
                stat={150}
                label="Sites touristiques"
            />

            <StatistiqueItem
                stat={50}
                label="Circuits disponibles"
            />
            <StatistiqueItem
                stat={200}
                label="Guides"
            />

            <StatistiqueItem
                stat={5000}
                label="Voyageurs satisfaits"
            />
        </div>
    )

}
export default Statistique;