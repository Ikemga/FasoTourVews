const HeaderActions = () => {

    return(
            <div className="flex items-center gap-2 text-textDark cursor-pointer">
            
                <span>FR</span>
                <button className="cursor-pointer hidden md:flex items-center gap-2 border-2 border-primary text-primary px-5 py-2 rounded-xl hover:bg-primary hover:text-white transition">Inscription</button>
                <button className="cursor-pointer bg-primary text-white px-6 py-2 rounded-xl hover:bg-primaryDark transition shadow-md">Connexion</button>
            
            </div>
    )
}
export default HeaderActions;