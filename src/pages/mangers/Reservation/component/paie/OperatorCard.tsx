import { Smartphone, CheckCircle } from "lucide-react";

const OperatorCard = ({ op, selected, onClick }) => (
    <button
        type="button"
        onClick={onClick}
        className="flex items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-200 text-left"
        style={{
            borderColor:     selected ? op.color : "#E5E7EB",
            backgroundColor: selected ? `${op.color}10` : "#FFFFFF",
        }}
    >
        <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: op.color }}
        >
            <Smartphone size={20} color="#fff" />
        </div>
        <div className="flex-1">
            <p className="font-bold text-sm text-gray-900">{op.label}</p>
            <p className="text-xs text-gray-400">{op.prefix}</p>
        </div>
        {selected && <CheckCircle size={20} style={{ color: op.color }} />}
    </button>
);

export default OperatorCard;