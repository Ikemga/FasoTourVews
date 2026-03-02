const StatistiqueItem = ({stat, label}) =>{

    return(
        <div className="justify-center text-white items-center text-center">
            <h1 className="text-4xl font-bold">{stat}</h1>
            <p>{label}</p>
        </div>
    )
}
export default StatistiqueItem;