
import { Star, MapPin } from 'lucide-react'; 

const SiteCard = ({ imageSrc, title, localisation, note,type }) => {
    return (
    <div className="m-1 my-10 cursor-pointer hover:shadow-xl w-full overflow-hidden bg-white shadow-lg rounded-3xl border border-gray-100">

        <div className="relative h-64 w-full ">
        <img
            src={imageSrc} 
            alt=""
            className="object-cover w-full h-full"
        />

        <div className="absolute top-4 left-4 bg-text-bf backdrop-blur-sm px-4 py-1 rounded-full shadow-md">
            <span className="text-xs font-bold tracking-widest text-gray-800">{type}</span>
        </div>
        </div>

        <div className="p-6">
        <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-serif font-bold text-gray-900">
            {title}
            </h2>
            <div className="flex items-center gap-1">
            <Star className="w-5 h-5 text-text-bf fill-current" />
            <span className="font-semibold text-gray-700">{note}</span>
            </div>
        </div>

        <div className="flex items-center gap-1 text-gray-500">
            <MapPin className="w-5 h-5" />
            <span className="text-lg font-light">{localisation}</span>
        </div>
        </div>
    </div>
  );
};

export default SiteCard;
