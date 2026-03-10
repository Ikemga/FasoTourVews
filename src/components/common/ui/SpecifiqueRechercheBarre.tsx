import { Search } from "lucide-react";

const SpecifiqueRechercheBarre = () => {
    return (
        <div className="relative w-lg">
        <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            size={18}
        />
        <input
            type="text"
            placeholder="Rechercher un site touristique..."
            className="text-black w-full pl-11 pr-5 py-3 rounded-xl border border-gray-300 outline-none focus:border-primary focus:shadow-sm focus:shadow-orange-500/40 transition"
        />
        </div>
    );
};

export default SpecifiqueRechercheBarre;