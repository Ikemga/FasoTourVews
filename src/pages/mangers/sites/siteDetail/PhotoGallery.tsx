import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const PhotoGallery = ({ images = [] }) => {
    const [current, setCurrent] = useState(0);
    const [lightbox, setLightbox] = useState(false);

    if (!images.length) return (
        <div className="h-40 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
            Aucune photo disponible
        </div>
    );

    return (
        <>
            <div className="grid grid-cols-4 gap-2">
                {images.map((src, i) => (
                    <div
                        key={i}
                        onClick={() => { setCurrent(i); setLightbox(true); }}
                        className="aspect-square rounded-xl overflow-hidden cursor-pointer hover:opacity-80 transition"
                    >
                        <img src={src} alt="" className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>

            {/* Lightbox */}
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
                        src={images[current]}
                        alt=""
                        className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain"
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