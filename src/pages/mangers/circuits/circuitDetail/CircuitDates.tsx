const fmt = (date) =>
  date ? new Date(date).toLocaleDateString("fr-FR") : "—";

const DateItem = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-400 mb-1">{label}</p>
    <p className="font-semibold text-gray-800">{value}</p>
  </div>
);

const CircuitDates = ({ circuit }) => (
  <div className="flex flex-wrap gap-6 mb-6">
    <DateItem label="Date de début"              value={fmt(circuit.dateDebut)} />
    <DateItem label="Date de fin"                value={fmt(circuit.dateFin)} />
    <DateItem label="Date limite réservation"    value={fmt(circuit.dateLimiteReservation)} />
    <DateItem label="Transport inclus"           value={circuit.transport ? "Oui " : "Non "} />
  </div>
);

export default CircuitDates;