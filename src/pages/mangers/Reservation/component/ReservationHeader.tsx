import { ArrowLeft } from "lucide-react";

const ReservationHeader = ({ circuit, onBack }) => (
    <div className="bg-white border-b border-black/20 px-6 py-4 flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft size={20} />
        </button>

        <div>
            <h3 className="text-xl font-bold">Nouvelle réservation</h3>
            <p className="text-sm text-gray-500">{circuit.circuitName}</p>
        </div>
    </div>
);

export default ReservationHeader;