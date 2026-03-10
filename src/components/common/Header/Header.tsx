import HeaderActions from "./HeaderActions";
import HeaderLogo from "./HeaderLogo";
import HeaderNav from "./HeaderNav";

const Header = () =>{
    return (
    <div className="sticky top-0 z-50 px-20 py-2 w-screen bg-header-bg shadow-sm flex justify-between items-center gap-3 ">
        <HeaderLogo />
        <HeaderNav />
        <HeaderActions />
    </div>
    )
}
export default Header;