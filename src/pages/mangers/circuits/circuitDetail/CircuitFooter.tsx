import { Banknote, Trash2, Pencil, ChevronRight } from "lucide-react";

const CircuitFooter = ({ circuit, onDelete, onEdit, onReserve, canManage }) => (
    <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
            <p className="text-sm text-gray-400">Prix par personne</p>
            <p className="text-3xl font-bold text-[#c1440e] flex items-center gap-2">
                <Banknote className="w-6 h-6" />
                {circuit.prixIndividuel?.toLocaleString()} FCFA
            </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">

            {/*Supprimer — uniquement AGENCE et ADMIN */}
            {canManage && (
                <button
                    onClick={onDelete}
                    className="cursor-pointer flex items-center gap-2 border border-red-300 text-red-500 px-5 py-3 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-all duration-300"
                >
                    <Trash2 className="w-4 h-4" />
                    Supprimer
                </button>
            )}

            {/*Modifier — uniquement AGENCE et ADMIN */}
            {canManage && (
                <button
                    onClick={onEdit}
                    className="cursor-pointer px-4 py-3 flex-1 flex items-center justify-center gap-2 bg-[#c1440e] hover:bg-amber-700 text-white font-semibold rounded-xl transition shadow-md shadow-orange-200"
                >
                    <Pencil size={16} />
                    Modifier
                </button>
            )}

            {/*Réserver — visible pour tous */}
            <button
                type="button"
                onClick={onReserve}
                className="flex items-center gap-2 border border-primary text-primary px-6 py-3 rounded-xl font-bold hover:bg-amber-700 hover:text-white transition-all duration-300 ease-in-out cursor-pointer group"
            >
                <span>Réserver</span>
                <ChevronRight className="w-5 h-5 text-primary transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white" />
            </button>
        </div>
    </div>
);

export default CircuitFooter;