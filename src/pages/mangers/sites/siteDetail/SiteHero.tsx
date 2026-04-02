import { MapPin } from "lucide-react";
import Badge from "./Badge";


const getImageUrl = (image) => {
    if (!image) return "/placeholder.jpg";
    return `http://localhost:8080${image.split('/').map(segment => encodeURIComponent(segment)).join('/')}`;
};
const SiteHero = ({ site }) => (
    <div className="relative h-90 rounded-2xl overflow-hidden shadow-lg">
        <img
            src={getImageUrl(site.image)}
            alt=""
            className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
            {site.statut && <Badge label={site.statut} color="green" />}
            {site.categories?.map((cat, i) => (
                <Badge key={i} label={cat.categorie ?? cat.nom} color="orange" />
            ))}
        </div>

        {/* Titre + région */}
        <div className="absolute bottom-5 left-5 right-5">
            <h1 className="text-3xl font-extrabold text-white drop-shadow-lg leading-tight">
                {site.nom}
            </h1>
            {site.region && (
                <div className="flex items-center gap-1 mt-1 text-white/80 text-sm">
                    <MapPin size={14} />
                    <span>{site.region}</span>
                </div>
            )}
        </div>
    </div>
);

export default SiteHero;