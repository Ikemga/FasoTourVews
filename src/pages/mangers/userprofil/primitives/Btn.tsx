const Btn = ({ children, onClick, variant }) => {
  const bgColor =
    variant === "Annuler" ? "bg-red-500" :
    variant === "Enregistrer" ? "bg-green-500" :
    "bg-gray-500";

  return (
    <button
      className={`text-sm text-center text-white font-bold flex justify-between items-center gap-2 py-2 px-4 border-0 rounded-2xl cursor-pointer ${bgColor}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Btn;