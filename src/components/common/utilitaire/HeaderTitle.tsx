import { PanelLeft } from "lucide-react";

const HeaderTitle = ({
    title = "Dashboard",
    label = "Vue d'ensemble de votre activité",
    initiales = "AK",
    onToggleSidebar,
    }) => {
    return (
    <div className="w-full bg-white border-b border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 py-2">

        {/* Left: toggle icon + text */}
            <div className="flex items-center gap-4">

            {/* Bouton toggle sidebar — visible sur mobile uniquement */}
            <button
                onClick={onToggleSidebar}
                className="flex items-center justify-center w-9 h-9 rounded-xl hover:bg-[#d5510a] transition-colors duration-150 shrink-0 md:hidden"
                aria-label="Toggle sidebar"
            >
                <PanelLeft className="text-orange-400 w-5 h-5" />
            </button>

            {/* Icône décorative — visible sur desktop uniquement */}
            <div className="hidden md:flex items-center justify-center w-9 h-9 rounded-xl bg-[#1c1713]">
                <PanelLeft className="text-orange-400 w-5 h-5" />
            </div>

            <div className="flex flex-col">
                <h4 className="text-left text-xl font-extrabold text-gray-900 tracking-tight leading-tight">
                {title}
                </h4>
                <p className="text-sm text-amber-800 font-medium hidden sm:block">{label}</p>
            </div>
            </div>

        {/* Right: avatar */}
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-bold shadow-md shrink-0">
            {initiales}
            </div>

        </div>
    </div>
    );
};

export default HeaderTitle;