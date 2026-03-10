import { X } from "lucide-react";
import { motion } from "framer-motion";
import { InputText, Label, LabelRequiert, Textarea, DateInput, PrixInput } from "./Input";
import { useState } from "react";
import SelectOption from "./SelectOption";
import TransportToggle from "./TransporToggle";

const AddCircuitModal = ({ open, onClose }) => {

    const [statut, setStatut] = useState("Brouillon");
    const [transportInclus, setTransportInclus] = useState(false);

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative w-full max-w-2xl rounded-2xl shadow-2xl bg-white backdrop-blur-xl border border-white/20"
            >

                <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl flex flex-col max-h-[90vh]">

                    {/* ── Header fixe ── */}
                    <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100 flex-shrink-0">
                        <h2 className="text-xl font-bold">Nouveau circuit</h2>
                        <button
                            onClick={onClose}
                            className="cursor-pointer text-gray-400 hover:text-black transition"
                            >
                            <X size={30} className="m-2 p-1 shadow-sm border rounded-2xl hover:border-red-500 hover:text-red-500 "  />
                        </button>
                    </div>

                    {/* ── Corps scrollable ── */}
                    <div className="overflow-y-auto flex-1 px-6 py-4 space-y-4">
                        <form className="space-y-3 mt-3 text-gray-500">

                            {/* Nom du circuit */}
                            <div>
                                <LabelRequiert label="Nom du circuit" requiert="*" />
                                <InputText
                                type="text"
                                name="nom"
                                placeholder="Ex: Circuit Savane dorée"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <Label label="Description" />
                                <Textarea
                                name="description"
                                placeholder="Découvrez le circuit ..."
                                />
                            </div>

                            {/* Dates */}
                            <div className="flex gap-4">
                                <div className="flex-1">
                                <LabelRequiert label="Date de début" requiert="*" />
                                <DateInput name="dateDebut"
                                />
                                </div>
                                <div className="flex-1">
                                <LabelRequiert label="Date de fin" requiert="*" />
                                <DateInput name="dateFin" />
                                </div>
                                <div className="flex-1">
                                <LabelRequiert label="Date limite R." requiert="*" />
                                <DateInput name="dateLimite"/>
                                </div>
                            </div>

                            {/* Lieu + Heure + Prix */}
                            <div className="flex gap-4">
                                <div className="flex-1">
                                <Label label="Lieu de rassemblement" />
                                <InputText
                                    type="text"
                                    name="lieu"
                                    placeholder="Ex: Musée"
                                />
                                </div>
                                <div className="flex-1">
                                <Label label="Heure de départ" />
                                <InputText
                                    type="time"
                                    name="heureDepart"
                                />
                                </div>
                                <div className="flex-1">
                                    <LabelRequiert label="Prix / personne" requiert="*" />
                                    <PrixInput
                                        name="prix"
                                        placeholder="200000"
                                    />
                                </div>
                            </div>

                            {/* Nombre min / max / exact */}
                            <div className="flex gap-4">
                                <div className="flex-1">
                                <Label label="Nombre min" />
                                <InputText
                                    type="number"
                                    name="nombreMin"
                                    placeholder="0"
                                />
                                </div>
                                <div className="flex-1">
                                <Label label="Nombre max" />
                                <InputText
                                    type="number"
                                    name="nombreMax"
                                    placeholder="0"
                                />
                                </div>
                                <div className="flex-1">
                                <Label label="Nombre exact" />
                                <InputText
                                    type="number"
                                    name="nombreExact"
                                    placeholder="0"
                                />
                                </div>
                            </div>
                            
                            <div className="flex justify-ceter items-center gap-2">
                                <div className=" relative w-full">
                                    <Label label="Statut" />
                                    <SelectOption
                                    value={statut} 
                                    onChange={setStatut}
                                    />
                                </div>

                                <div className=" relative w-full">
                                    <Label label="Transport" />
                                    <TransportToggle value={transportInclus} onChange={setTransportInclus} />

                                </div>

                            </div>
                            {/* Statut */}

                            <div className="flex justify-end gap-3 px-6 py-4 border rounded-2xl border-gray-100 shadow-sm flex-shrink-0">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className=" cursor-pointer font-bold border px-4 py-2 rounded-xl hover:bg-red-500 hover:text-white transition"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="font-bold cursor-pointer bg-primary text-white px-5 py-2 rounded-xl hover:opacity-90 transition"
                                >
                                    Créer
                                </button>
                            </div>

                        </form >
                        
                    </div>
                    

                </div>
            </motion.div>
        </div>
    );
};

export default AddCircuitModal;