import { Clock, Users, MapPin, User2Icon } from "lucide-react";
import { getFraisReservation } from "../../../../service/ConfigurationService";
import { useEffect, useState } from "react";

const CircuitSummary = ({ circuit }) => {

    const [fraisReservation, setFraisReservation] = useState<number | null>(null);
    const [fraisLoading, setFraisLoading]         = useState<boolean>(true); 

    useEffect(() => {
        getFraisReservation()
            .then(res  => setFraisReservation(res.data))
            .catch(()  => setFraisReservation(200))
            .finally(() => setFraisLoading(false));
    }, []);

    const getImageUrl = (image) => {
        if (!image) return "/placeholder.jpg";
        return `http://localhost:8080${image
            .split('/')
            .map(segment => encodeURIComponent(segment))
            .join('/')}`;
    };

    return (
        <div className="space-y-4">
            <h2 className="font-bold">Résumé du circuit</h2>

            {circuit.image && (
                <img
                    src={getImageUrl(circuit.image)}
                    alt={circuit.circuitName}
                    className="w-full h-48 object-cover rounded-2xl"
                />
            )}

            <p>{circuit.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 bg-white p-5 rounded-2xl border border-black/20 space-y-3">
                <div className="bg-primary/10 border-amber-600 rounded-2xl p-4">
                    <div className="flex gap-2 text-sm"><Clock size={16} /> Durée</div>
                    <div className="text-left font-bold">
                        <span>{circuit.duree} jours</span>
                    </div>
                </div>
                <div className="bg-primary/10 border-amber-600 rounded-2xl p-4">
                    <div className="flex gap-2 text-sm"><Users size={16} /> Personnes</div>
                    <div className="text-left font-bold">
                        <span>{circuit.nombreRestant} / {circuit.nombreExact} Personnes</span>
                    </div>
                </div>
                <div className="bg-primary/10 border-amber-600 rounded-2xl p-4">
                    <div className="flex gap-2 text-sm"><MapPin size={16} /> Nombre de sites</div>
                    <div className="text-left font-bold">
                        <span>{circuit.sites?.length} sites</span>
                    </div>
                </div>
                <div className="bg-primary/10 border-amber-600 rounded-2xl p-4">
                    <div className="flex gap-2 text-sm"><User2Icon size={16} /> Nombre de guides</div>
                    <div className="text-left font-bold">
                        <span>{circuit.guide?.length} guides</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 bg-white p-5 rounded-2xl border border-black/20 space-y-3 items-center">
                <div className="text-left">
                    <span>Prix du circuit</span><br />
                    <span className="font-bold text-2xl text-[#c1440e]">
                        {circuit.prixIndividuel?.toLocaleString("fr-FR")} FCFA
                    </span>
                </div>

                <div className="text-left">
                    <span>Frais de réservation</span><br />
                    {/* pendant le chargement */}
                    {fraisLoading ? (
                        <span className="inline-block w-24 h-7 bg-gray-200 rounded animate-pulse mt-1" />
                    ) : (
                        <span className="font-bold text-2xl text-[#08a103]">
                            {fraisReservation?.toLocaleString("fr-FR")} FCFA
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CircuitSummary;