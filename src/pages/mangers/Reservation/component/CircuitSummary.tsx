import { Clock, Users, MapPin, User2Icon } from "lucide-react";

const CircuitSummary = ({ circuit }) => {
        const getImageUrl = (image) => {
            if (!image) return "/placeholder.jpg";
            return `http://localhost:8080${image.split('/').map(segment => encodeURIComponent(segment)).join('/')}`;
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
                    <div className="flex gap-2 text-sm">
                        <Clock size={16} /> Durée
                    </div>
                    <div className="text-left font-bold items-start">
                        <span className="text-left">{circuit.duree} jours</span>
                    </div>
                </div>

                <div className="bg-primary/10 border-amber-600 rounded-2xl p-4">
                    <div className="flex gap-2 text-sm">
                        <Users size={16} /> personne
                    </div>
                    <div className="text-left font-bold items-start">
                        <span className="text-left">{circuit.nombreRestant} / {circuit.nombreExact} Personnes</span>
                    </div>
                </div>

                <div className="bg-primary/10 border-amber-600 rounded-2xl p-4">
                    <div className="flex gap-2 text-sm">
                        <MapPin size={16} /> nombre de sites 
                    </div>
                    <div className="text-left font-bold items-start">
                        <span className="text-left">{circuit.sites?.length} sites</span>
                    </div>
                </div>

                <div className="bg-primary/10 border-amber-600 rounded-2xl p-4">
                    <div className="flex gap-2 text-sm">
                        <User2Icon size={16} /> nombre de guide 
                    </div>
                    <div className="text-left font-bold items-start">
                        <span className="text-left">{circuit.guide?.length} guides</span>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 bg-white p-5 rounded-2xl border border-black/20 space-y-3 items-center">
                <div className="text-left ">
                    <span>Prix du circuit</span> <br />
                    <span className="font-bold text-2xl text-[#c1440e]">
                        {circuit.prixIndividuel} FCFA
                    </span>
                </div>
                <div className="text-left">
                    <span>Frais de reservation</span> <br />
                    <span className="font-bold text-2xl text-[#08a103]">
                        200 FCFA
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CircuitSummary;