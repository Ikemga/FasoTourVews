
const HeaderNav = () =>{

    const Item = [
        "Site Touristiques",
        "Circuits",
        "Guides",
        "Agences"
    ]
    
    return(
        <aside>

            <nav>
                {Item.map((index) =>
                <button className=" cursor-pointer text-sm text-text-soft bg-none mx-3 px-2 hover:text-primary hover:font-bold transition" key={index}>{index}</button>
                )}
            </nav>
        </aside>
    )
}

export default HeaderNav;