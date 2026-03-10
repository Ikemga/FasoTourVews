import { Star } from "lucide-react";

const GuideCard = ({ image, name, speciality, rating, experience, langue }) => {
  return (
    <div className="bg-white my-10 rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 w-full">
      
      {/* Image centrée */}
      <div className="flex justify-center pt-6">
        <img
          src={image}
          alt={name}
          className="w-28 h-28 rounded-full object-cover border-4 border-orange-100 shadow"
        />
      </div>

      <div className="p-5 text-center">
        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-500 mb-2">{speciality}</p>

        {/* Rating */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <Star className="text-yellow-400 fill-yellow-400" size={18} />
          <span className="text-gray-700 font-medium">{rating}</span>
        </div>

        {/* Expérience */}
        <p className="text-sm text-gray-600 mb-2">{experience} ans d'expérience</p>

        {/* Langue */}
        <p className="text-sm text-gray-500 mb-4">{langue}</p>

        {/* Bouton */}
        <div className="flex justify-center">
          <button className="bg-[#C45A1C] text-white px-6 py-2 rounded-xl hover:bg-orange-700 transition cursor-pointer">
            Voir profil
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuideCard;