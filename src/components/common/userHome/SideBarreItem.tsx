import {
    LayoutDashboard, Map, Mountain, CalendarCheck,
    CreditCard, Star, Globe, Megaphone,
    Settings,
    Users
} from "lucide-react";

const SideBareItem = ({ activeItem = "Tableau de bord", onSelect}) => {

    const principal = [
    { label: "Tableau de bord",    icon: LayoutDashboard },
    { label: "Circuits",           icon: Map },
    { label: "Sites touristiques", icon: Mountain },
    { label: "Utilisateurs", icon: Users },
    ];

    const operation = [
    { label: "Réservations",       icon: CalendarCheck },
    { label: "Paiements",          icon: CreditCard },
    { label: "Avis & Notes", icon: Star },
    ];

    const systeme = [
    { label: "Multilingue",  icon: Globe },
    { label: "Marketing",    icon: Megaphone },
    { label: "Paramètres", icon: Settings },
    ];

    const MenuItem = ({ item }) => {
    const isActive = item.label === activeItem;
    const Icon = item.icon;
    return (
        <button
            onClick={() => onSelect?.(item.label)}
            className={`flex items-center gap-3 text-left px-4 py-2.5 rounded-xl mx-2 transition-all duration-150
            ${isActive
                ? "bg-[#2e2520] text-orange-400 font-semibold"
                : "text-gray-200 hover:bg-[#2e2520] hover:text-orange-300"
            }`}
            style={{ width: "calc(100% - 16px)" }}
            >
            <Icon size={18} strokeWidth={1.6} className={isActive ? "text-orange-400" : "text-gray-300"} />
            <span className="text-sm">{item.label}</span>
        </button>
    );
    };

    return (
    <aside className="w-64 bg-[#1c1713] flex flex-col gap-4">

      {/* Principal */}
        <div className="flex flex-col gap-0.5">
            <p className="text-left font-bold text-xs  text-gray-500 tracking-widest uppercase px-6 mb-1">
            Principal
            </p>
            {principal.map((item) => <MenuItem key={item.label} item={item} />)}
        </div>
        
        {/* Opération */}

        <div className="flex flex-col gap-0.5">
            <p className="text-left font-bold text-xs  text-gray-500 tracking-widest uppercase px-6 mb-1">
            Opération
            </p>
            {operation.map((item) => <MenuItem key={item.label} item={item} />)}
        </div>

      {/* Système */}
        <div className="flex flex-col gap-0.5">
            <p className="text-left font-bold text-xs  text-gray-500 tracking-widest uppercase px-6 mb-1">
            Système
            </p>
            {systeme.map((item) => <MenuItem key={item.label} item={item} />)}
        </div>


    </aside>
    );
};

export default SideBareItem;