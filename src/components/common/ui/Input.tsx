import { Banknote } from "lucide-react";

import { useState } from "react";
import * as Select from "@radix-ui/react-select";

type Statut = "actif" | "inactif" | "brouillon";

interface SelectStatusProps {
  value?: Statut;
  onChange?: (value: Statut) => void;
}

const SelectStatus = ({ value, onChange }: SelectStatusProps) => {
  const [statut, setStatut] = useState<Statut>(value || "actif");

  const handleChange = (v: Statut) => {
    setStatut(v);
    onChange?.(v);
  };

  return (
    <div >
        <Select.Root value={statut} onValueChange={handleChange}>
            <Select.Trigger
                id="statut"
                className="w-full rounded-xl border border-gray-300 px-4 py-2 text-left"
                >
            <Select.Value placeholder="Sélectionner un statut" />
            </Select.Trigger>

            <Select.Content className="rounded-xl border  border-gray-300 bg-white shadow-md mt-1">
                <Select.Item value="actif" className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Actif
                </Select.Item>
                <Select.Item value="inactif" className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Inactif
                </Select.Item>
                <Select.Item value="brouillon" className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Brouillon
            </Select.Item>
            </Select.Content>
        </Select.Root>
    </div>
  );
};


const InputText = ({ ...props }) => {
    return (
        <input
            
            {...props}
            className="text-black w-full px-5 py-3 rounded-xl border border-gray-300
                    outline-none focus:shadow-lg focus:border-primary
                    transition"
        />
    );
};

const DateInput = ({ ...props }) => {
    return (
        <div className="relative w-full">
            <input
                type="date"
                {...props}
                className="text-black w-full pl-12 pr-5 py-3 rounded-xl border border-gray-300
                            outline-none focus:shadow-lg focus:border-primary
                            transition"
            />
        </div>
        
    );
};

const LabelRequiert = ({ label = "Name", requiert = "*" }) => {
    return (
        <div className=" fles justify-start items-start gap-2">
            <span className="text-textDark">
            {label}
            </span>
            <span className="text-primary">
                {requiert}
            </span>
        </div>
        
    );
};

const Textarea = ({ ...props }) => (
    <div className="w-full">
        <textarea
        {...props}
        rows={3}
        className="text-black w-full px-5 py-3 rounded-xl border border-gray-300
                    outline-none focus:shadow-lg focus:border-primary
                    transition"
        />
    </div>
);

const PrixInput = ({ ...props }) => {
  return (
        <div>

            <div className="relative w-full">

                {/* Icon */}
                <Banknote
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                {/* Input */}
                <input
                    type="number"
                    {...props}
                    className="text-black w-full pl-12 pr-16 py-3 rounded-xl border border-gray-300
                            outline-none focus:shadow-lg focus:border-primary transition"
                />

                {/* FCFA */}
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                    FCFA
                </span>
            </div>
        </div>
    );
};

const Label = ({ label ="Label" }) => {
    return (
        <span className="text-textDark">
            {label}
        </span>
    );
};

const LogeTitle = ({ Title ="Title", Describe = "Describe" }) => {
    return (
        <div className="flex flex-col items-center mb-3">
            <h3 className="text-2xl font-bold mt-6 bg-[#C45A1C] bg-clip-text text-transparent">
                {Title}
            </h3>
            <p className="text-gray-500 mt-2 text-center">
                {Describe}
            </p>
        </div>
    );
};

const InputHeure = ({ ...props }) => {
    return (
        <div className="flex justify-center items-center text-black w-full px-5 py-3 rounded-xl border border-gray-300
                    outline-none focus:shadow-lg focus:border-primary
                    transition">
            <input
                {...props}
            />
            <p className=" text-xl font-bold"> - </p>
            <input
                {...props}
            />
        </div>
        
    );
};


export { InputText, DateInput,Label, Textarea,LabelRequiert, PrixInput, SelectStatus, LogeTitle, InputHeure};