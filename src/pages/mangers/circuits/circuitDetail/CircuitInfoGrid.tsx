import { CalendarDaysIcon, Users, Clock, MapPin } from "lucide-react";
import InfoCard from "./InfoCard";

const CircuitInfoGrid = ({ circuit }) => (
  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    <InfoCard icon={<CalendarDaysIcon className="w-5 h-5 text-[#c1440e]" />} label="Durée"    value={`${circuit.duree} jours`} />
    <InfoCard icon={<Users          className="w-5 h-5 text-[#c1440e]" />} label="Places"   value={`${circuit.nombreRestant} / ${circuit.nombreExact}`} />
    <InfoCard icon={<Clock          className="w-5 h-5 text-[#c1440e]" />} label="Départ"   value={circuit.heureDepart ?? "—"} />
    <InfoCard icon={<MapPin         className="w-5 h-5 text-[#c1440e]" />} label="Lieu RDV" value={circuit.lieuRassemblement ?? "—"} />
  </div>
);

export default CircuitInfoGrid;