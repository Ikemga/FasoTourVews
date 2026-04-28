import {Trash2, ChevronRight, ThumbsUp, MessageCircle, Star } from 'lucide-react';

const AvisCard = ({
    image,
    circuitName,
    description,
    prixIndividuel,
    sites,
    likes = 0,
    rating = 0,
    onLike,
    onAvis,
    onDelete,
    onDetail
}) => {

    const handleDelete = (e) => {
        e.stopPropagation();
        onDelete();
    };

    const handleLike = (e) => {
        e.stopPropagation();
        onLike && onLike();
    };

    const handleAvis = (e) => {
        e.stopPropagation();
        onAvis && onAvis();
    };

    const getImageUrl = (image) => {
        if (!image) return "/placeholder.jpg";
        return `http://localhost:8080${image.split('/').map(segment => encodeURIComponent(segment)).join('/')}`;
    };

    return(
        <div className="text-left m-1 my-10 cursor-pointer w-full overflow-hidden bg-white shadow-lg rounded-3xl border border-gray-100 transition-all duration-300 hover:shadow-2xl">
            
            {/* IMAGE */}
            <div className="relative h-64 w-full">
                <img 
                    src={getImageUrl(image)} 
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* supprimer */}
                <button
                    onClick={handleDelete}
                    className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm p-2 rounded-full shadow-lg text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200"
                >
                    <Trash2 className="w-4 h-4" />
                </button>

                {/* LIKE facebook */}
                <div className="absolute bottom-4 right-4">
                    <button
                        onClick={handleLike}
                        className="flex items-center gap-2 bg-white/90 px-3 py-1.5 rounded-full shadow hover:bg-blue-600 hover:text-white transition"
                    >
                        <ThumbsUp className="w-4 h-4" />
                        <span className="text-sm font-semibold">{likes}</span>
                    </button>
                </div>
            </div>

            <div className="p-6">
                
                {/* titre */}
                <h4 className="text-2xl font-bold text-gray-900">
                    {circuitName}
                </h4>

                <p className="py-2">
                    {description}
                </p>

                {/* rating */}
                <div className="flex items-center gap-1 py-1">
                    {[1,2,3,4,5].map((star)=>(
                        <Star
                            key={star}
                            className={`w-4 h-4 ${
                                star <= rating 
                                ? "text-yellow-400 fill-yellow-400" 
                                : "text-gray-300"
                            }`}
                        />
                    ))}
                    <span className="text-sm text-gray-500 ml-2">
                        ({rating}/5)
                    </span>
                </div>
                
                <div className="my-4 h-px bg-gray-200"></div>

                {/* prix */}
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-2xl font-bold text-[#c1440e]">
                            {prixIndividuel} FCFA
                        </p>
                        <p>par personne</p>
                    </div>
                </div>

                {/* boutons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    
                    <button
                        onClick={onDetail}
                        className="flex items-center justify-center gap-2 border border-primary text-primary px-6 py-3 rounded-xl font-bold hover:bg-amber-700 hover:text-white transition"
                    >
                        Détail
                        <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* donner avis */}
                    <button
                        onClick={handleAvis}
                        className="md:col-span-2 flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                    >
                        <MessageCircle className="w-4 h-4"/>
                        Donner un avis
                    </button>

                </div>
            </div>
        </div>
    )
}

export default AvisCard;