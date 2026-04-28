import { Link } from "react-router-dom";
import { useAuth } from "../../../service/protected/useAuth";
import SideBareItem from "./SideBarreItem";
import SideBarreLogo from "./SideBarreLogo";

const SideBarre = ({ activeItem, onSelect }) => {
  const { role, nomComplet } = useAuth();

  return (
    <div className="h-screen w-64 bg-[#1c1713] flex flex-col py-3">
      <SideBarreLogo nomComplet={nomComplet} userrole={role ?? "Invité"} />
      <SideBareItem activeItem={activeItem} onSelect={onSelect} />
      <div className="flex-1" />
      <Link
        to={`/login`}
        className="flex items-center gap-3 px-6 py-3 text-gray-500 hover:text-gray-300 transition-colors duration-150"
      >
        <span>Déconnexion</span>
      </Link>
    </div>
  );
};

export default SideBarre;