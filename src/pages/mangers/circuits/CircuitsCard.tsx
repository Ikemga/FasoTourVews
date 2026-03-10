import { Star, MapPin, Clock, CreditCard, Trash2, Users } from 'lucide-react'; 
import { Boutton } from '../../../components/common/ui/Bt';
import { useNavigate } from 'react-router-dom';


const CircuitsCard = ({ image, title, description, note, duree, place, personnes, sites, prix, onDelete}) => {

        const navigate = useNavigate();

        const handleDelete = (e) => {
            e.stopPropagation();
            onDelete();
        };


        const handleClick = () => {
            navigate(`/circuits`);
        };

    return(
        <div onClick={handleClick}
        className="group text-left m-1 my-10 cursor-pointer w-full overflow-hidden bg-white shadow-lg rounded-3xl border border-gray-100 transition-all duration-300 hover:pb-3 hover:shadow-2xl">
            <div className="relative h-64 w-full">
                <img 
                src={image} 
                alt={title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"/>

                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="font-bold text-sm text-gray-800">{note}</span>
                </div>

                {/* Bouton supprimer */}
                <button
                    onClick={handleDelete}
                    className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm p-2 rounded-full shadow-lg text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200"
                    >
                    <Trash2 className="w-4 h-4" />
                </button>

            </div>

            <div className="p-6">
                <div className="">
                    <div>
                        <h4 className="text-2xl font-bold text-gray-900">
                        {title}
                        </h4>
                        <p className="py-2">
                            {description}
                        </p>
                    </div>
                    
                    <div className='flex justify-start items-start py-2'>
                        <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-[#c1440e]" />
                            {duree} jours
                        </span>

                        <span className="flex items-center gap-1.5 mx-4">
                            <MapPin className="w-4 h-4 text-[#c1440e]" />
                            {place} places restant
                        </span>

                        <span className="flex items-center gap-1.5 mx-4">
                            <Users className="w-4 h-4 text-[#c1440e]" />
                            {personnes} pers
                        </span>

                        <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-[#c1440e]" />
                            {sites} Sites
                        </span>
                    </div>
                </div>
                
                <div className="my-4 h-px bg-gray-200"></div>

                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-3xl font-bold text-[#c1440e]">{prix} FCFA</p>
                        <p > par personne</p>
                    </div>
                    <div>
                        <Boutton
                        label="Réserver"
                        icon = {<CreditCard size={18} />}/>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default CircuitsCard;