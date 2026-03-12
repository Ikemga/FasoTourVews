const RechercheBarre = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Rechercher par nom, email, téléphone, rôle..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="flex-1 px-4 py-2 text-sm border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
    />
  );
};

export default RechercheBarre;