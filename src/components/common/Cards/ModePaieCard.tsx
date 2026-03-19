const ModePaieCard = ({ icon, title, label, onClick }) => {
  return (
    <div
      className=" p-4 bg-white border-2 border-black/10 rounded-xl hover:border-amber-500 focus:border-amber-700 hover:bg-primary/10 cursor-pointer transition-shadow duration-200"
      onClick={onClick}
    >
        <div className="text-3xl text-primary mr-4">{icon}</div>
            <div>
                <h4 className="text-lg text-left font-bold text-gray-800">{title}</h4>
                <p className="text-gray-500 text-sm text-left">{label}</p>
            </div>
        </div>
  );
};

export default ModePaieCard;