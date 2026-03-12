import HeaderLogo from "../Header/HeaderLogo";

const SideBarreLogo = ({userrole = "Invité"}) =>{
    return(
        <div>
            <div className="flex flex-col px-4 gap-2">
                <HeaderLogo />
                <span className="text-left text-white text-sm font-bold">{userrole}</span>
            </div>
            <hr className="border-gray-700 mx-4 my-3" />
        </div>
    )
}

export default SideBarreLogo;