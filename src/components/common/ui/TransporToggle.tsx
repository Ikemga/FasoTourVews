import { BusIcon } from "lucide-react";

interface Props {
  value: boolean;
  onChange: (value: boolean) => void;
}

const TransportToggle = ({ value, onChange }: Props) => {
    return (
        <div className="flex-1">
        <button
            type="button"
            onClick={() => onChange(!value)}
            className="flex items-center gap-3 group focus:outline-none"
            aria-pressed={value}
        >
            <span
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200
                ${
                value
                    ? "border-amber-600 bg-amber-600"
                    : "border-amber-600 bg-white group-hover:border-amber-600"
                }`}
            >
            {value && <span className="w-2 h-2 rounded-full bg-white block" />}
            </span>

            <span className="text-amber-600">
            <BusIcon/>
            </span>

            <span className="text-sm font-medium text-stone-700 select-none">
            Transport inclus
            </span>
        </button>
        </div>
    );
}
export default TransportToggle;