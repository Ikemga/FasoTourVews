import { useState } from "react";
import { Image, Film, FileText } from "lucide-react";
import PhotoGallery from "./PhotoGallery";
import VideoGallery from "./VideoGallery";
import FichierList from "./FichierList";

const MediaTabs = ({ site }) => {
    const [tab, setTab] = useState("photos");

    const tabs = [
        { key: "photos",   label: "Photos",  icon: Image    },
        { key: "videos",   label: "Vidéos",  icon: Film     },
        { key: "fichiers", label: "Fichiers", icon: FileText },
    ];

    // Adapter les champs singuliers du backend en tableaux
    const photos   = site?.image   ? [site.image]   : [];
    const videos   = site?.video   ? [site.video]   : [];
    const fichiers = site?.fichier ? [site.fichier] : [];

    return (
        <div className="bg-white rounded-2xl border border-gray-300 p-6">
            {/* Onglets */}
            <div className="flex gap-1 mb-5 bg-gray-100 p-1 rounded-xl w-fit">
                {tabs.map(({ key, label, icon: Icon }) => (
                    <button
                        key={key}
                        onClick={() => setTab(key)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition
                            ${tab === key
                                ? "bg-white text-orange-500 shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        <Icon size={15} />
                        {label}
                    </button>
                ))}
            </div>

            {/* Passer les tableaux construits */}
            {tab === "photos"   && <PhotoGallery images={photos}   />}
            {tab === "videos"   && <VideoGallery videos={videos}   />}
            {tab === "fichiers" && <FichierList  fichiers={fichiers} />}
        </div>
    );
};

export default MediaTabs;