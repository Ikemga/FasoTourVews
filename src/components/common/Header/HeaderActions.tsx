import { Globe } from "lucide-react";
import { Link } from "react-router-dom";

const HeaderActions = ({ onClose }) => {
  return (
    <div className="flex items-center gap-2 sm:gap-4">
      {/* Language selector */}
      <div className="cursor-pointer">
        <div className="flex items-center gap-1.5 text-text-soft px-2 py-1.5 rounded-xl hover:bg-white/10 transition-colors">
          <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm">FR</span>
        </div>
      </div>

      {/* Inscription - hidden on small screens */}
      <Link
        to="/register"
        onClick={onClose}
        className="hidden lg:flex items-center gap-2 border-2 border-primary text-primary
                   px-4 py-1.5 rounded-xl text-sm font-medium
                   hover:bg-primary hover:text-white transition-all duration-200"
      >
        Inscription
      </Link>

      {/* Connexion - always visible */}
      <Link
        to="/login"
        onClick={onClose}
        className="bg-primary text-white px-4 sm:px-5 py-1.5 rounded-xl text-sm font-medium
                   hover:bg-primaryDark transition-all duration-200 shadow-md whitespace-nowrap"
      >
        Connexion
      </Link>
    </div>
  );
};

export default HeaderActions;