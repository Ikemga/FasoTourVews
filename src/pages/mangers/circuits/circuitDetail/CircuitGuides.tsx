import { Info } from "lucide-react";

const CircuitGuides = ({ guides = [] }) => {
  if (!guides.length) return null;

  return (
    <div className="mb-6">
      <h3 className="flex items-center gap-2 font-bold text-gray-800 mb-3">
        <Info className="w-5 h-5 text-[#c1440e]" />
        Guides
      </h3>
      <div className="flex flex-wrap gap-2">
        {guides.map((guide, i) => (
          <span key={i} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
            {guide.nomComplet ?? guide}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CircuitGuides;