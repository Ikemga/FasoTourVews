const BadgeCircuit = ({ label }) => {
  const colorMap = {
    ACTIF:    "bg-green-100 text-green-700 border-green-200",
    INACTIF:  "bg-gray-100 text-gray-600 border-gray-200",
    COMPLET:  "bg-red-100 text-red-600 border-red-200",
    ANNULE:   "bg-orange-100 text-orange-600 border-orange-200",
  };

  const classes = colorMap[label?.toUpperCase()] ?? "bg-amber-50 text-[#c1440e] border-amber-200";

  return (
    <span className={`px-3 py-1.5 rounded-full text-xs font-bold border ${classes}`}>
      {label}
    </span>
  );
};

export default BadgeCircuit;