import { X, Check, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { getSitesAlphabetical } from "../../../service/SiteService";

const SiteSelector = ({ selected, onChange }) => {
    const [sites, setSites]   = useState([]);
    const [open, setOpen]     = useState(false);
    const [search, setSearch] = useState("");
    const ref                 = useRef(null);

    useEffect(() => {
        const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    useEffect(() => {
        getSitesAlphabetical()
            .then(res => setSites(res.data))
            .catch(() => setSites([]));
    }, []);

    const toggle = (site) => {
        const exists = selected.find(s => s.id === site.id);
        onChange(exists ? selected.filter(s => s.id !== site.id) : [...selected, site]);
    };

    const filtered = sites.filter(s =>
        s.nom.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div ref={ref} className="relative">
            {/* Déclencheur */}
            <button
                type="button"
                onClick={() => setOpen(o => !o)}
                className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm text-gray-500 hover:border-gray-400 transition"
            >
                <span className="text-gray-400">
                    {selected.length === 0 ? "Sélectionner un site..." : `${selected.length} site(s) sélectionné(s)`}
                </span>
                <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
            </button>

            {/* Tags sélectionnés affichés EN DESSOUS */}
            {selected.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                    {selected.map(site => (
                        <span
                            key={site.id}
                            className="bg-primary/5 text-amber-700 border border-primary text-xs px-2 py-1 rounded-full flex items-center gap-1"
                        >
                                {site.nom}
                            <X
                                size={10}
                                className="cursor-pointer hover:text-rprimary"
                                onClick={() => toggle(site)}
                            />
                        </span>
                    ))}
                </div>
            )}

            {/* Dropdown */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
                    >
                        <div className="p-2 border-b border-gray-100">
                            <input
                                autoFocus
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Rechercher un site..."
                                className="w-full text-sm px-3 py-1.5 rounded-lg border border-gray-200 outline-none focus:border-primary"
                            />
                        </div>
                        <ul className="max-h-48 overflow-y-auto">
                            {filtered.length === 0 && (
                                <li className="px-4 py-3 text-sm text-gray-400 text-center">Aucun site trouvé</li>
                            )}
                            {filtered.map(site => {
                                const isSelected = selected.some(s => s.id === site.id);
                                return (
                                    <li
                                        key={site.id}
                                        onClick={() => toggle(site)}
                                        className="flex items-center justify-between px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 transition"
                                    >
                                        <span>{site.nom}</span>
                                        {isSelected && <Check size={14} className="text-amber-600" />}
                                    </li>
                                );
                            })}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SiteSelector;