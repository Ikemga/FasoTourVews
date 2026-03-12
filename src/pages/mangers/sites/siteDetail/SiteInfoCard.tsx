import { Navigation, Pencil, Trash2 } from "lucide-react";
import InfoRow from "./InfoRow";

const SiteInfoCard = ({ site, onItineraire , onEdit, onDelete}) => (
    <div className="bg-white rounded-2xl  border border-gray-300 p-6">
        <h2 className="text-base font-bold text-gray-800 mb-2">Informations</h2>

        <InfoRow label="Région"   value={site.region  ?? "—"} />
        <InfoRow label="Horaires" value={site.horaire ?? "—"} />
        <InfoRow
            label="Tarif d'entrée"
            value={site.tarif ? `${Number(site.tarif).toLocaleString()} FCFA` : "Gratuit"}
            highlight
        />
        <InfoRow label="Statut" value={site.status ?? "—"} />
        {site.noteMoyenne && (
            <InfoRow label="Note moyenne" value={`⭐ ${site.noteMoyenne} / 5`} />
        )}

        {/* Coordonnées cliquables */}
        {site.localisation && (
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-sm text-gray-400 font-medium">Coordonnées</span>
                <button
                    onClick={onItineraire}
                    className="flex items-center gap-1.5 text-sm font-bold text-orange-500 hover:text-orange-600 transition group"
                    title="Ouvrir dans Google Maps"
                >
                    <Navigation size={14} className="group-hover:scale-110 transition-transform" />
                    {site.localisation}
                </button>
            </div>
        )}
        
        
        
    </div>
);

export default SiteInfoCard;