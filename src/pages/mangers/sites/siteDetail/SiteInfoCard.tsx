import { Navigation, Star } from "lucide-react";
import InfoRow from "./InfoRow";

const SiteInfoCard = ({ site, onItineraire, onEdit, onDelete }) => {

    const horaire = site.heureOuverture && site.heureFermeture
        ? `${site.heureOuverture} – ${site.heureFermeture}`
        : site.heureOuverture
            ? `Ouvre à ${site.heureOuverture}`
            : "—";

    return (
        <div className="bg-white rounded-2xl border border-gray-300 p-6">
            <h2 className="text-base font-bold text-gray-800 mb-2">Informations</h2>

            <InfoRow label="Région"         value={site.region ?? "—"}  highlight ={false}/>
            <InfoRow label="Horaires"       value={horaire} highlight ={false}/>
            <InfoRow
                label="Tarif d'entrée"
                value={site.tarif ? `${Number(site.tarif).toLocaleString()} FCFA` : "Gratuit"}
                highlight
            />
            <InfoRow label="Statut"         value={site.statut ?? "—"}  highlight={false} />

            {site.noteMoyenne && (
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-sm text-gray-400 font-medium">Note moyenne</span>
                    <div className="flex items-center gap-1">
                        <Star size={15} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-bold text-gray-700">
                            {site.noteMoyenne} / 5
                        </span>
                    </div>
                </div>
            )}

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
};

export default SiteInfoCard;