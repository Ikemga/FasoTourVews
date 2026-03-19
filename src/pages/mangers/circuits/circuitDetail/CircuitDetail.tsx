import { ArrowLeft } from "lucide-react";
import HeaderTitle from "../../../../components/common/utilitaire/HeaderTitle";
import CircuitHero      from "./CircuitHero";
import CircuitInfoGrid  from "./CircuitInfoGrid";
import CircuitDates     from "./CircuitDates";
import CircuitSites     from "./CircuitSites";
import CircuitGuides    from "./CircuitGuides";
import CircuitFooter    from "./CircuitFooter";
import { useState } from "react";
import EditCircuitModal from "../../../../components/common/ui/EditCircuitModal";

const Divider = () => <div className="h-px bg-gray-100 mb-6" />;

const CircuitDetail = ({ circuit, onBack, onDelete,onRefresh, onToggleSidebar, onReserve }) => {
  const [editOpen, setEditOpen] = useState(false);

  if (!circuit) return null;

  const handleDelete = () => {
    if (window.confirm("Confirmer la suppression de ce circuit ?")) onDelete();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderTitle
        title="Détail du circuit"
        label={circuit.circuitName}
        initiales="AD"
        onToggleSidebar={onToggleSidebar}
      />

      <div className="mx-5 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition mb-6 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Retour aux circuits</span>
        </button>

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
          <CircuitHero circuit={circuit} onDelete={handleDelete} />

          <div className="px-8 pb-8">
            <Divider />
            <CircuitInfoGrid circuit={circuit} />
            <Divider />
            <CircuitDates circuit={circuit} />
            <Divider />
            <div>
              <CircuitSites  sites={circuit.sites} />
            </div>
            <CircuitGuides guide={circuit.guide} />
            <Divider />

            <CircuitFooter
              circuit={circuit}
              onDelete={handleDelete}
              onEdit={() => setEditOpen(true)} 
              onReserve={onReserve}/>
            
          </div>
        </div>
      </div>
    
        <EditCircuitModal
          open={editOpen}
          onClose={() => setEditOpen(false)}
          circuit={circuit}
          onSuccess={() => {
          setEditOpen(false);
          onRefresh?.();
          }}
        />
    </div>
  );
};

export default CircuitDetail;
