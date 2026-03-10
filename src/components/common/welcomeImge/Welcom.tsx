import bgImage from "../img/hero-burkina.jpg";

import Statistique from "../utilitaire/Statistique";
import Pays from "./Pays";
import RechercheBarre from "./RechercheBarre";
import WelcomeTitle from "./WelcomTitle";


const Welcome = () => {
    return (
    <div className="items-center justify-center">
        <div
            style={{ backgroundImage: `url(${bgImage})` }}
            className="bg-cover bg-center h-screen"
        >
            <div>
                    <Pays />
                    <WelcomeTitle />
                    <RechercheBarre />
                    <Statistique />
            </div>
        </div>
        
    </div>
    );
};

export default Welcome;