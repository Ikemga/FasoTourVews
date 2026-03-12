import { FileText } from "lucide-react";

const FichierList = ({ fichiers = [] }) => {
    if (!fichiers.length) return (
        <div className="h-24 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
            Aucun fichier disponible
        </div>
    );

    return (
        <div className="flex flex-col gap-2">
            {fichiers.map((f, i) => (
                <a
                    key={i}
                    href={f.url}
                    download
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 hover:border-orange-400 hover:bg-orange-50 transition group"
                >
                    <FileText size={18} className="text-orange-400 shrink-0" />
                    <span className="text-sm text-gray-700 group-hover:text-orange-600 flex-1 truncate">
                        {f.nom}
                    </span>
                    <span className="text-xs text-gray-400">{f.taille}</span>
                </a>
            ))}
        </div>
    );
};

export default FichierList;