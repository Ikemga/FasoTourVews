import { Play } from "lucide-react";

const VideoGallery = ({ videos = [] }) => {
    if (!videos.length) return (
        <div className="h-40 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
            Aucune vidéo disponible
        </div>
    );

    return (
        <div className="grid grid-cols-2 gap-3">
            {videos.map((src, i) => (
                <div
                    key={i}
                    className="relative rounded-xl overflow-hidden bg-black aspect-video group cursor-pointer"
                >
                    <video src={src} className="w-full h-full object-cover opacity-70" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center group-hover:bg-orange-500/80 transition">
                            <Play size={20} className="text-white ml-1" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default VideoGallery;