import { Trash2, ChevronDown } from "lucide-react";
import BadgeCircuit from "./BadgeCircuit";
import { useState, useRef, useEffect } from "react";

const getImageUrl = (image) => {
  if (!image) return "/placeholder.jpg";
  return `http://localhost:8080${image.split('/').map(segment => encodeURIComponent(segment)).join('/')}`;
};

const STATUTS = ["ACTIF", "INACTIF", "BROUILLON", "CLOS", "EN_COURS", "TERMINEE"];

const CircuitHero = ({ circuit, onDelete, onStatutChange, canManage }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fermer le dropdown si on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleStatutSelect = (newStatut) => {
    if (newStatut !== circuit.statut) {
      onStatutChange(newStatut);
    }
    setDropdownOpen(false);
  };

  return (
    <>
      <div className="relative h-80 w-full">
        <img
          src={getImageUrl(circuit.image)}
          alt=""
          className="h-full w-full object-cover"
        />
        {canManage && (
          <button
            onClick={onDelete}
            className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-2 rounded-full shadow-lg text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="flex items-start justify-between mb-4 px-8 pt-8">
        <h2 className="text-3xl font-bold text-gray-900">{circuit.circuitName}</h2>

        {circuit.statut && (
          canManage ? (
            // Badge cliquable avec dropdown
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-1 cursor-pointer"
              >
                <BadgeCircuit label={circuit.statut} />
                <ChevronDown className="w-4 h-4 text-gray-500 mt-0.5" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                  {STATUTS.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleStatutSelect(s)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                        s === circuit.statut ? "font-semibold bg-gray-100" : "text-gray-700"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            // Badge statique pour les autres rôles
            <BadgeCircuit label={circuit.statut} />
          )
        )}
      </div>

      <p className="text-gray-500 leading-relaxed mb-6 px-8">{circuit.description}</p>
    </>
  );
};

export default CircuitHero;