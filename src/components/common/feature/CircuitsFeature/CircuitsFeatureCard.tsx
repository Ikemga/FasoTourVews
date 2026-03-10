import { Star, MapPin, Clock, User, CreditCard } from 'lucide-react'; 
import { Boutton} from '../../ui/Bt';

const CircuitsFeatureCard = ({ image, title, description, note, duree, place, sites, prix}) => {

    return(
        <div className="group text-left m-1 my-10 cursor-pointer w-full overflow-hidden bg-white shadow-lg rounded-3xl border border-gray-100 transition-all duration-300 hover:pb-3 hover:shadow-2xl">
            <div className="relative h-64 w-full">
                <img 
                src={image} 
                alt={title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"/>

                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="font-bold text-sm text-gray-800">{note}</span>

                </div>
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
                            <User className="w-4 h-4 text-[#c1440e]" />
                            {place} places restant
                        </span>

                        <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-[#c1440e]" />
                            {sites}
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

export default CircuitsFeatureCard;