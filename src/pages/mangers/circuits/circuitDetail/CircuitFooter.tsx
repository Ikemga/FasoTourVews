import { Banknote, Trash2, CreditCard, Pencil } from "lucide-react";

const CircuitFooter = ({ circuit, onDelete, onEdit }) => (
  <div className="flex items-center justify-between flex-wrap gap-4">
    <div>
      <p className="text-sm text-gray-400">Prix par personne</p>
      <p className="text-3xl font-bold text-[#c1440e] flex items-center gap-2">
        <Banknote className="w-6 h-6" />
        {circuit.prixIndividuel?.toLocaleString()} FCFA
      </p>
    </div>

    <div className=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <button
            onClick={onDelete}
            className="cursor-pointer  flex items-center gap-2 border border-red-300 text-red-500 px-5 py-3 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-all duration-300"
        >
            <Trash2 className="w-4 h-4" />
            Supprimer
        </button>
        <button
            onClick={onEdit}
            className="cursor-pointer  px-4 py-3 flex-1 flex items-center justify-center gap-2 bg-[#c1440e] hover:bg-amber-700 text-white font-semibold  rounded-xl transition shadow-md shadow-orange-200"
            >
            <Pencil size={16} />
            Modifier
        </button>
        <button className=" cursor-pointer flex items-center gap-2 bg-[#c1440e] text-white px-6 py-3 rounded-xl font-bold hover:bg-amber-700 transition-all duration-300">
            <CreditCard className="w-4 h-4" />
            Réserver
        </button>
    </div>
  </div>
);

export default CircuitFooter;