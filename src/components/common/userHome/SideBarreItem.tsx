import {
  LayoutDashboard, Map, Mountain, CalendarCheck,
  CreditCard, Star, Globe, Megaphone,
  Settings, Users, User2Icon,
  MapPinned
} from "lucide-react";
import { useAuth } from "../../../service/protected/useAuth";

const SideBareItem = ({ activeItem = "Tableau de bord", onSelect }) => {
  const { can } = useAuth();

    const principal = [
        { label: "Tableau de bord",    icon: LayoutDashboard, show: can.viewDashboard },
        { label: "Circuits",           icon: Map,             show: can.manageCircuits },
        { label: "Sites touristiques", icon: Mountain,        show: can.manageSites },
        { label: "Guides",             icon: MapPinned,        show: can.manageGuide },
        { label: "Utilisateurs",       icon: Users,           show: can.isAdmin },
    ].filter(item => item.show);

    const operation = [
        { label: "Réservations", icon: CalendarCheck, show: can.manageReservations },
        { label: "Paiements",    icon: CreditCard,    show: can.managePaiements },
        { label: "Avis & Notes", icon: Star,          show: can.manageAvis },
    ].filter(item => item.show);

    const systeme = [
        { label: "Multilingue", icon: Globe,     show: can.manageLangues },
        { label: "Marketing",   icon: Megaphone, show: can.isAdmin },
        { label: "Paramètres",  icon: Settings,  show: can.isAdmin },
        { label: "Profil",      icon: User2Icon, show: true },
    ].filter(item => item.show);

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
            <Icon size={18} strokeWidth={1.6}
            className={isActive ? "text-orange-400" : "text-gray-300"} />
            <span className="text-sm">{item.label}</span>
        </button>
        );
    };

    const Section = ({ title, items }) => {
        if (items.length === 0) return null; // cache la section si vide
        return (
        <div className="flex flex-col gap-0.5">
            <p className="text-left font-bold text-xs text-gray-500 tracking-widest uppercase px-6 mb-1">
            {title}
            </p>
            {items.map((item) => <MenuItem key={item.label} item={item} />)}
        </div>
        );
    };

    return (
        <aside className="w-64 bg-[#1c1713] flex flex-col gap-4">
        <Section title="Principal" items={principal} />
        <Section title="Opération" items={operation} />
        <Section title="Système"   items={systeme} />
        </aside>
    );
};

export default SideBareItem;