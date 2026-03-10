import { MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const LogoFooter = () => {
    return (
    <div>
        <div className="flex items-center gap-2 mb-4 ">
            <div className="bg-[#C45A1C] p-2 rounded-full">
            <MapPin size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold">
            <span className="text-white">Faso</span>
            <span className="text-[#C45A1C]">Tour</span>
            </span>
        </div>

        <p className="text-left text-sm text-gray-400 leading-relaxed mb-6 w-80">
            La première plateforme de tourisme digital au Burkina Faso. Découvrez le pays des hommes
            intègres avec nos guides certifiés.
        </p>

        <div className="flex gap-3">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
            <a key={i} href="#" className="bg-[#3a2e22] p-2 rounded-full hover:bg-[#C45A1C] transition">
                <Icon size={16} className="text-gray-300" />
            </a>
            ))}
        </div>
    </div>
    );
};

export default LogoFooter;