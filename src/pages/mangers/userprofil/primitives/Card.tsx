const Card = ({ title, sub, children }) => {
  return (
    <div className="relative overflow-hidden mb-5 p-6">
      
      {/* Ligne dorée décorative */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"/>

      {title && (
        <div className="mb-1 font-bold text-sm text-amber-700" >
          {title}
        </div>
      )}

      {sub && (
        <div className="mb-5 text-[13px]">
          {sub}
        </div>
      )}

      {children}
    </div>
  );
};

export default Card;