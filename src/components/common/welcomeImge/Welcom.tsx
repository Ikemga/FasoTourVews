// ❌ import { url } from "inspector";  → À SUPPRIMER

import bgImage from "../img/hero-burkina.jpg";
import Circuit from "../Circuits/Circuit";
import Sites from "../sites/SItes";
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
            <Pays />
            <WelcomeTitle />
            <RechercheBarre />
            <Statistique />
        </div>
        <div>
            <Sites />
            <Circuit />
        </div>
    </div>
    );
};

export default Welcome;