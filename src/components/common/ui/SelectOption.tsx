import { ChevronDown } from "lucide-react";
import { useState } from "react";


const STATUTS = ["Brouillon", "ACTIF", "Inactif"];

interface Props {
    value: string;
    onChange: (value: string) => void;
}

const SelectOption = ({ value, onChange }: Props) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex-1">
        <div className="relative">
            <button
            type="button"
            onClick={() => setOpen(!open)}
            className="w-full flex items-center justify-between bg-stone-100 hover:bg-stone-200 transition-colors rounded-xl px-4 py-3 text-stone-800 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-amber-600 "
            >
            <span>{value}</span>

            <span
                className={`text-stone-500 transition-transform duration-200 ${
                open ? "rotate-180" : ""
                }`}
            >
                <ChevronDown />
            </span>
            </button>

            {open && (
            <ul className="absolute z-20 mt-2 w-full bg-white border border-stone-200 rounded-xl shadow-lg overflow-hidden">
                {STATUTS.map((s) => (
                <li key={s}>
                    <button
                        type="button"
                        onClick={() => {
                        onChange(s);
                        setOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors
                        ${
                        value === s
                            ? "bg-amber-50 text-amber-700 font-semibold"
                            : "text-stone-700 hover:bg-stone-50"
                        }`}
                    >
                    {s}
                    </button>
                </li>
                ))}
            </ul>
            )}
        </div>
        </div>
    );
}
export default SelectOption;