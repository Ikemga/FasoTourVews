import {MapPin,CreditCard, Trash2, Users, CalendarDaysIcon, ChevronRight, User2Icon } from 'lucide-react'; 
import { Boutton } from '../../../components/common/ui/Bt';


const CircuitsCard = ({ image, circuitName, description, duree, nombreRestant, prixIndividuel,nombreExact,sites, guides, onDelete, onDetail}) => {


        
        const handleDelete = (e) => {
            e.stopPropagation();
            onDelete();
        };

        //nombre de site
        const nbSites = Array.isArray(sites) ? sites.length : (sites ?? 0);
        const nguides = Array.isArray(guides) ? guides.length : (guides ?? 0);

    return(
        <div 
        className="text-left m-1 my-10 cursor-pointer w-full overflow-hidden bg-white shadow-lg rounded-3xl border border-gray-100 transition-all duration-300 hover:shadow-2xl">
            <div className="relative h-64 w-full">
                <img 
                src={image} 
                alt=""
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"/>

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
                        {circuitName}
                        </h4>
                        <p className="py-2">
                            {description}
                        </p>
                    </div>
                    
                    <div className='flex justify-start items-start py-2'>
                        <span className="flex items-center gap-1.5">
                            <CalendarDaysIcon className="w-4 h-4 text-[#c1440e]" />
                            {duree} jours
                        </span>

                        <span className="flex items-center gap-1.5 mx-4">
                            <Users className="w-4 h-4 text-[#c1440e]" />
                            {nombreRestant} places restant / {nombreExact}
                        </span>
                        
                        <span className="flex items-center gap-1.5 text-sm">
                            <MapPin className="w-4 h-4 text-[#c1440e]" />
                            {nbSites} site{nbSites > 1 ? "s" : ""} 
                        </span>

                        <span className="flex items-center gap-1.5 text-sm">
                            <User2Icon className="w-4 h-4 text-[#c1440e]" />
                            {nguides} guide{nguides > 1 ? "s" : ""} 
                        </span>
                    </div>
                </div>
                
                <div className="my-4 h-px bg-gray-200"></div>

                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-2xl font-bold text-[#c1440e]">{prixIndividuel} FCFA</p>
                        <p > par personne</p>
                    </div>

                </div>
                <div className="flex justify-between items-start">
                    <div>
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