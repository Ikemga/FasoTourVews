import { X, Plus, Check, ChevronDown, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Api from "../../../service/api/Api";
import { getCategorieOrderByAphabetique, postCategorie } from "../../../service/CategorieService";


const CategorieSelector = ({ selected, onChange }) => {
    const [categories, setCategories]   = useState([]);
    const [open, setOpen]               = useState(false);
    const [search, setSearch]           = useState("");
    const [creating, setCreating]       = useState(false);
    const ref                           = useRef(null);

    // Fermer si clic extérieur
    useEffect(() => {
        const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    // Charger les catégories depuis l'API par ordre alphabetique
    useEffect(() => {
        getCategorieOrderByAphabetique()
            .then(res => setCategories(res.data))
            .catch(() => setCategories([]));
    }, []);

    const toggle = (cat) => {
        const exists = selected.find(s => s.id === cat.id);
        onChange(exists ? selected.filter(s => s.id !== cat.id) : [...selected, cat]);
    };


    const filtered = categories.filter(c =>
        c.categorie.toLowerCase().includes(search.toLowerCase())
    );

    const canCreate = search.trim() !== "" &&
    !categories.some(c => c.categorie.toLowerCase() === search.trim().toLowerCase());

    // Créer une nouvelle catégorie
    const handleCreate = async () => {
        if (!search.trim()) return;
        setCreating(true);
        try {
            const res = await postCategorie({ categorie: search.trim() });
            const newCat = res.data;
            setCategories(prev => [...prev, newCat]);
            onChange([...selected, newCat]);
            setSearch("");
        } catch {
            // silencieux, l'erreur principale gère
        } finally {
            setCreating(false);
        }
    };

    return (
        <div ref={ref} className="relative">
            {/* Déclencheur */}
            <button
                type="button"
                onClick={() => setOpen(o => !o)}
                className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm text-gray-500 hover:border-gray-400 transition"
            >
                <span className="flex flex-wrap gap-1 flex-1 min-h-[20px]">
                    {selected.length === 0
                        ? <span className="text-gray-400">Sélectionner une catégorie...</span>
                        : selected.map(cat => (
                            <span
                                key={cat.id}
                                className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full flex items-center gap-1"
                            >
                                {cat.nom}
                                <X
                                    size={10}
                                    className="cursor-pointer hover:text-red-500"
                                    onClick={(e) => { e.stopPropagation(); toggle(cat); }}
                                />
                            </span>
                        ))
                    }
                </span>
                <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
            </button>

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
                        {/* Recherche / création */}
                        <div className="p-2 border-b border-gray-100">
                            <input
                                autoFocus
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Rechercher ou créer..."
                                className="w-full text-sm px-3 py-1.5 rounded-lg border border-gray-200 outline-none focus:border-primary"
                            />
                        </div>

                        {/* Liste */}
                        <ul className="max-h-48 overflow-y-auto">
                            {filtered.length === 0 && !canCreate && (
                                <li className="px-4 py-3 text-sm text-gray-400 text-center">Aucune catégorie trouvée</li>
                            )}
                            {filtered.map(cat => {
                                const isSelected = selected.some(s => s.id === cat.id);
                                return (
                                    <li
                                        key={cat.id}
                                        onClick={() => toggle(cat)}
                                        className="flex items-center justify-between px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 transition"
                                    >
                                        <span>{cat.categorie}</span>
                                        {isSelected && <Check size={14} className="text-primary" />}
                                    </li>
                                );
                            })}

                            {/* Bouton créer */}
                            {canCreate && (
                                <li
                                    onClick={handleCreate}
                                    className="flex items-center gap-2 px-4 py-2 text-sm text-primary cursor-pointer hover:bg-primary/5 border-t border-gray-100 font-medium transition"
                                >
                                    {creating
                                        ? <Loader2 size={13} className="animate-spin" />
                                        : <Plus size={13} />
                                    }
                                    Créer "{search.trim()}"
                                </li>
                            )}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CategorieSelector;