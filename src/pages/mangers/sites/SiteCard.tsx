import { Star, MapPin, Trash2, Hourglass, Banknote, ChevronRight } from 'lucide-react';


const SiteCard = ({ imageSrc, title, note, description,region, categorie,horaire,tarif, onDelete,onDetail }) => {

        const handleDelete = (e) => {
            e.stopPropagation();
            onDelete();
        };


  return (
    <div className="group m-1 my-10 cursor-pointer w-full overflow-hidden bg-white shadow-lg rounded-3xl border border-gray-100 transition-all duration-300 hover:shadow-2xl">
      <div className="relative h-64 w-full overflow-hidden">
        
        <img
          src={imageSrc}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4   px-4 py-1 rounded-full ">
          <span className="text-sm font-bold tracking-widest m-2 text-white ">{categorie}</span>
        </div>

        {/* Bouton supprimer */}
        <button
          onClick={handleDelete}
          className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-2 rounded-full shadow-lg text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="p-6">

        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-full shadow-lg">
            <Star className="w-5 h-5 text-text-bf fill-current" />
            <span className="font-semibold text-gray-700">{note}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-gray-500">
          <MapPin className="w-5 h-5" />
          <span className="text-lg font-bold">{region}</span>
        </div>

        <div>
          <p className="text-gray-500 text-left">{description}</p>
        </div>

        <div  className="flex justify-between text-center items-center gap-1.5 py-2">
          <span className="flex justify-start text-center items-center gap-1.5 py-2">
            <Hourglass className="w-4 h-4 text-[#c1440e]" />
              <span>{horaire} </span>
            </span>
            <button
              type="button"
              onClick={onDetail}
              className="flex items-center gap-2 border border-primary text-primary px-6 py-3 rounded-xl font-bold 
                        hover:bg-amber-700 hover:text-white transition-all duration-300 ease-in-out cursor-pointer group"
            >
              <span>Détail</span>
              <ChevronRight className="w-5 h-5 text-primary transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white" />
            </button>
        </div>
        <p className="border mx-2 "></p>
        <div className="flex justify-between items-center gap-4 p-4">
          <p>Prix d'entrée</p>
          <span className="flex items-center gap-1.5 ">
            <Banknote className="w-5 h-5 text-[#c1440e] mx-2" />
            <span className="text-primary text-3xl font-bold">{tarif} FCFA</span>
            
          </span>
        </div>
        

      </div>
    </div>
  );
};

export default SiteCard;