import { Clock, Users, MapPin, User2Icon } from "lucide-react";

const CircuitSummary = ({ circuit }) => {
    return (
        <div className="space-y-4">
            <h2 className="font-bold">Résumé du circuit</h2>

            {circuit.image && (
                <img
                    src={circuit.image}
                    alt={circuit.circuitName}
                    className="w-full h-48 object-cover rounded-2xl"
                />
            )}

            <div className="bg-white p-5 rounded-2xl border border-black/20 space-y-3">
                <div className="flex gap-2 text-sm">
                    <Clock size={16} /> {circuit.duree} jours
                </div>

                <div className="flex gap-2 text-sm">
                    <Users size={16} />
                    {circuit.nombreRestant} / {circuit.nombreExact} Personnes
                </div>

                <div className="flex gap-2 text-sm">
                    <MapPin size={16} />
                    {circuit.sites?.length} sites
                </div>

                <div className="flex gap-2 text-sm">
                    <User2Icon size={16} />
                    {circuit.guide?.length} guides
                </div>

                <div className="flex justify-between pt-3 border-t border-black/20">
                    <span>Prix</span>
                    <span className="font-bold text-2xl text-[#c1440e]">
                        {circuit.prixIndividuel} FCFA
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CircuitSummary;