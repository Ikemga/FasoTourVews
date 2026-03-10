const activities = [
  "Nouvel utilisateur inscrit: Marie K.",
  "Nouveau circuit ajouté: Désert du Ténéré",
  "Avis signalé sur Circuit Sahel",
  "Paiement reçu: 250 000 FCFA",
  "Guide vérifié: Amadou B."
];

const ActiviteRecente = () => {
  return (
    <div className="border p-4 rounded-2xl w-full max-w-sm mx-6">
      
      {/* Titre */}
      <h2 className="text-left text-xl font-bold text-gray-900 mb-3">
        Activité récente
      </h2>

      {/* Liste */}
      <div className="flex flex-col gap-2">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-center gap-4 border border-gray-300 rounded-2xl px-6 py-3 bg-transparent cursor-pointer hover:shadow-lg/10"
          >
            {/* Point orange */}
            <span className="w-3 h-3 bg-orange-500 rounded-full"></span>

            {/* Texte */}
            <p className="text-gray-800 text-lg">{activity}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ActiviteRecente;