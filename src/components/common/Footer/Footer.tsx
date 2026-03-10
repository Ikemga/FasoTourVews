import LiensRapides from "./LiensRapides";
import LogoFooter from "./LogoFooter";
import Support from "./Support";
import Divider from "./Divider";
import Contact from './Contact';

const Footer = () => {
    return (
        <div className=" bg-[#2a2018] py-14 items-center px-30">
            <div className="lfex flex-col md:flex-row w-full">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full items-center text-gray-300 ">
                    <LogoFooter />
                    <LiensRapides />
                    <Support />
                    <Contact />
                </div>
                <div >
                    <Divider />
                </div>
            </div>
        </div>
    )
}
    
export default Footer;