import { Trash2 } from "lucide-react";
import BadgeCircuit from "./BadgeCircuit";

const CircuitHero = ({ circuit, onDelete }) => (
    <>
        <div className="relative h-80 w-full">
        <img src={circuit.image} alt="" className="h-full w-full object-cover" />
        <button
            onClick={onDelete}
            className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-2 rounded-full shadow-lg text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200"
        >
            <Trash2 className="w-5 h-5" />
        </button>
        </div>

        <div className="flex items-start justify-between mb-4 px-8 pt-8">
        <h2 className="text-3xl font-bold text-gray-900">{circuit.circuitName}</h2>
        {circuit.statut && <BadgeCircuit label={circuit.statut} />}
        </div>

        <p className="text-gray-500 leading-relaxed mb-6 px-8">{circuit.description}</p>
    </>
);

export default CircuitHero;