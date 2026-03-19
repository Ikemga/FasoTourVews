import { CheckCircle, ArrowLeft } from "lucide-react";

const ReservationSuccess = ({ circuit, onBack }) => (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center">
        <CheckCircle className="text-green-500 w-12 h-12" />

        <h2 className="text-xl font-bold">
            Réservation enregistrée !
        </h2>

        <p>{circuit.circuitName}</p>

        <button
            onClick={onBack}
            className="bg-[#c1440e] text-white px-6 py-2 rounded flex gap-2"
        >
            <ArrowLeft size={16} />
            Retour
        </button>
    </div>
);

export default ReservationSuccess;