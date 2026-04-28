import { useState } from "react";
import { UploadCloud, X, FileText, FileImage, FileVideo, File, Link } from "lucide-react";

// Icône selon le type MIME ou l'extension de l'URL
const getFileIcon = (item) => {
    if (!item.file) {
        // URL existante : on devine via l'extension
        const url = item.preview ?? "";
        if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url)) return <FileImage size={16} className="text-emerald-500" />;
        if (/\.(mp4|mov|avi|mkv|webm)$/i.test(url))      return <FileVideo  size={16} className="text-violet-500"  />;
        if (/\.(pdf|txt|doc|docx)$/i.test(url))           return <FileText   size={16} className="text-amber-500"   />;
        return <Link size={16} className="text-blue-400" />;
    }
    const type = item.file.type;
    if (type.startsWith("image/")) return <FileImage size={16} className="text-emerald-500" />;
    if (type.startsWith("video/")) return <FileVideo  size={16} className="text-violet-500"  />;
    if (type.includes("pdf") || type.includes("text")) return <FileText size={16} className="text-amber-500" />;
    return <File size={16} className="text-gray-400" />;
};

const truncateName = (name, max = 10) =>
    name.length > max ? name.slice(0, max - 1) + "…" : name;

const getDisplayName = (item) => {
    if (item.file) return truncateName(item.file.name);
    // Extraire le nom de fichier depuis l'URL
    try {
        const parts = new URL(item.preview).pathname.split("/");
        return truncateName(parts[parts.length - 1] || "fichier");
    } catch {
        return "fichier";
    }
};

const normalize = (items) =>
    items.map((item) =>
        typeof item === "string"
            ? { file: null, preview: item }
            : { file: item, preview: null }
    );

const FileUploadMultiple = ({ value = [], onChange }) => {
    const [files, setFiles] = useState(() => normalize(value));

    const handleFiles = (e) => {
        const newFiles = Array.from(e.target.files).map((file) => ({ file, preview: null }));
        const updated = [...files, ...newFiles];
        setFiles(updated);
        onChange?.(updated.map((f) => f.file ?? f.preview));
    };

    const removeFile = (index) => {
        const updated = files.filter((_, i) => i !== index);
        setFiles(updated);
        onChange?.(updated.map((f) => f.file ?? f.preview));
    };

    return (
        <div className="w-full space-y-3">
            <label className="inline-flex flex-col items-center justify-center w-16 h-16 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-primary hover:bg-gray-50 transition">
                <UploadCloud className="w-5 h-5 text-gray-400" />
                <span className="text-[10px] text-gray-500 mt-0.5">Fichier</span>
                <input type="file" multiple onChange={handleFiles} className="hidden" />
            </label>

            {files.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {files.map((item, index) => (
                        <div key={index} className="relative w-16 h-16 flex-shrink-0">
                            <div className="w-full h-full rounded-xl border border-gray-200 bg-gray-50 flex flex-col items-center justify-center gap-0.5 px-1">
                                {getFileIcon(item)}
                                <span className="text-[9px] text-gray-500 text-center leading-tight break-all">
                                    {getDisplayName(item)}
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="absolute -top-1.5 -right-1.5 bg-white border border-gray-200 shadow p-0.5 rounded-full text-gray-600 hover:text-red-500 hover:border-red-300 transition z-10"
                            >
                                <X size={12} strokeWidth={2.5} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FileUploadMultiple;