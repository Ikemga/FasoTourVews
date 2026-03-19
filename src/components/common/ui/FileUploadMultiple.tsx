import { useState } from "react";
import { UploadCloud, X, FileText, FileImage, FileVideo, File } from "lucide-react";

const getFileIcon = (file) => {
    if (file.type.startsWith("image/")) return <FileImage size={16} className="text-emerald-500" />;
    if (file.type.startsWith("video/")) return <FileVideo size={16} className="text-violet-500" />;
    if (file.type.includes("pdf") || file.type.includes("text")) return <FileText size={16} className="text-amber-500" />;
    return <File size={16} className="text-gray-400" />;
};

const truncateName = (name, max = 10) =>
    name.length > max ? name.slice(0, max - 1) + "…" : name;

const FileUploadMultiple = ({ onChange }) => {
    const [files, setFiles] = useState([]);

    const handleFiles = (e) => {
        const newFiles = Array.from(e.target.files).map(file => ({ file }));
        const updated = [...files, ...newFiles];
        setFiles(updated);
        onChange?.(updated.map(f => f.file));
    };

    const removeFile = (index) => {
        const updated = files.filter((_, i) => i !== index);
        setFiles(updated);
        onChange?.(updated.map(f => f.file));
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
                    {files.map(({ file }, index) => (
                        <div key={index} className="relative w-16 h-16 flex-shrink-0">
                            <div className="w-full h-full rounded-xl border border-gray-200 bg-gray-50 flex flex-col items-center justify-center gap-0.5 px-1">
                                {getFileIcon(file)}
                                <span className="text-[9px] text-gray-500 text-center leading-tight break-all">
                                    {truncateName(file.name)}
                                </span>
                            </div>
                            <button type="button" onClick={() => removeFile(index)}
                                className="absolute -top-1.5 -right-1.5 bg-white border border-gray-200 shadow p-0.5 rounded-full text-gray-600 hover:text-red-500 hover:border-red-300 transition z-10">
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