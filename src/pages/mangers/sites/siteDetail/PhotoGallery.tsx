import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const BASE_URL = "http://localhost:8080";

// Retourne une URL complète utilisable dans <img src>
const toUrl = (item) => {
    if (!item) return "/placeholder.jpg";

    const raw = typeof item === "string"
        ? item
        : item.url ?? item.cheminFichier ?? item.path ?? item.src ?? "";

    if (!raw) return "/placeholder.jpg";
    if (raw.startsWith("http")) return raw;         
    return `${BASE_URL}${raw}`;                     
};

const PhotoGallery = ({ images = [] }) => {
    const [current,  setCurrent]  = useState(0);
    const [lightbox, setLightbox] = useState(false);


    if (!images.length) return (
        <div className="h-40 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
            Aucune photo disponible
        </div>
    );

    return (
        <>
            <div className="grid grid-cols-4 gap-2">
                {images.map((item, i) => (
                    <div
                        key={i}
                        onClick={() => { setCurrent(i); setLightbox(true); }}
                        className="aspect-square rounded-xl overflow-hidden cursor-pointer hover:opacity-80 transition"
                    >
                        <img
                            src={toUrl(item)}
                            alt=""
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = "/placeholder.jpg"; }} // ✅ fallback si 404
                        />
                    </div>
                ))}
            </div>

            {lightbox && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
                    <button
                        onClick={() => setLightbox(false)}
                        className="absolute top-4 right-4 text-white hover:text-orange-400 transition"
                    >
                        <X size={28} />
                    </button>
                    <button
                        onClick={() => setCurrent(p => (p - 1 + images.length) % images.length)}
                        className="absolute left-4 text-white hover:text-orange-400 transition"
                    >
                        <ChevronLeft size={36} />
                    </button>
                    <img
                        src={toUrl(images[current])}
                        alt=""
                        className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain"
                        onError={(e) => { e.target.src = "/placeholder.jpg"; }}
                    />
                    <button
                        onClick={() => setCurrent(p => (p + 1) % images.length)}
                        className="absolute right-4 text-white hover:text-orange-400 transition"
                    >
                        <ChevronRight size={36} />
                    </button>
                    <span className="absolute bottom-6 text-white/60 text-sm">
                        {current + 1} / {images.length}
                    </span>
                </div>
            )}
        </>
    );
};

export default PhotoGallery;