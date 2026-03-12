import { X, Check, ChevronDown, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { getGuidesAlphabetical } from "../../../service/GuideService";

const GuideSelector = ({ selected, onChange }) => {
    const [guides, setGuides] = useState([]);
    const [open, setOpen]     = useState(false);
    const [search, setSearch] = useState("");
    const ref                 = useRef(null);

    useEffect(() => {
        const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    useEffect(() => {
        getGuidesAlphabetical()
            .then(res => setGuides(res.data))
            .catch(() => setGuides([]));
    }, []);

    const toggle = (guide) => {
        const exists = selected.find(g => g.id === guide.id);
        onChange(exists ? selected.filter(g => g.id !== guide.id) : [...selected, guide]);
    };

    const filtered = guides.filter(g =>
        `${g.nomComplet}`.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                onClick={() => setOpen(o => !o)}
                className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm text-gray-500 hover:border-gray-400 transition"
            >
                <span className="text-gray-400">
                    {selected.length === 0 ? "Assigner un guide..." : `${selected.length} guide(s) assigné(s)`}
                </span>
                <ChevronDown size={14} className={"transition-transform"} />
            </button>

            {/* Tags affichés EN DESSOUS */}
            {selected.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                    {selected.map(guide => (
                        <span
                            key={guide.id}
                            className="bg-stone-100 text-stone-700 border border-stone-200 text-xs px-2 py-1 rounded-full flex items-center gap-1"
                        >
                            <User size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} /> {guide.nomComplet}
                            <X
                                size={10}
                                className="cursor-pointer hover:text-red-500"
                                onClick={() => toggle(guide)}
                            />
                        </span>
                    ))}
                </div>
            )}

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
                                placeholder="Rechercher un guide..."
                                className="w-full text-sm px-3 py-1.5 rounded-lg border border-gray-200 outline-none focus:border-stone-400"
                            />
                        </div>
                        <ul className="max-h-48 overflow-y-auto">
                            {filtered.length === 0 && (
                                <li className="px-4 py-3 text-sm text-gray-400 text-center">Aucun guide trouvé</li>
                            )}
                            {filtered.map(guide => {
                                const isSelected = selected.some(g => g.id === guide.id);
                                return (
                                    <li
                                        key={guide.id}
                                        onClick={() => toggle(guide)}
                                        className="flex items-center justify-between px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 transition"
                                    >
                                        <span>{guide.nomComplet}</span>
                                        {isSelected && <Check size={14} className="text-stone-600" />}
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

export default GuideSelector;