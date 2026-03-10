import { Compass, Eye, EyeOff, Globe, Lock, MailCheck, MapPinHouseIcon, PhoneCall, User, X } from "lucide-react";
import { motion } from "framer-motion";
import { InputText, Label } from "./Input";
import { useState } from "react";

const AddAgence = ({open,onClose}) =>{

    const [showPassword, setShowPassword] = useState(false);



    if (!open) return null;
    return(
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative w-full max-w-md rounded-2xl shadow-2xl bg-white backdrop-blur-xl border border-white/20"
            >
                <div className="bg-white w-full max-w-mdl rounded-2xl shadow-xl flex flex-col max-h-[90vh]">

                    {/* ── Header fixe ── */}
                    <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100 flex-shrink-0">
                        <h2 className="text-xl font-bold">Nouvelle agence</h2>
                        <button
                            onClick={onClose}
                            className="cursor-pointer text-gray-400 hover:text-black transition"
                            >
                            <X size={20} />
                        </button>
                    </div>

                    <form className="bg-white rounded-2xl text-gray-500">
                    {/* ── Corps scrollable ── */}
                        <div className="overflow-y-auto flex-1 px-6 py-4 space-y-4">
                            {/* Nom + Adresse */}
                            <div className="flex w-full items-start gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 font-medium mb-2">
                                        <User size={18} />
                                        <Label label="Nom complet" />
                                    </div>
                                    <InputText
                                        type="text"
                                        name="fullName"
                                        placeholder="SAWADOGO Smith"
                                    />
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center gap-2 font-medium mb-2">
                                        <MapPinHouseIcon size={18} />
                                        <Label label="Adresse" />
                                    </div>
                                    <InputText
                                        type="text"
                                        name="address"
                                        placeholder="Ouagadougou secteur 04"
                                    />
                                </div>
                            </div>

                            {/* Mail + Contact */}
                            <div className="flex w-full items-start gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 font-medium mb-2">
                                        <MailCheck size={18} />
                                        <Label label="Mail" />
                                    </div>
                                    <InputText
                                        type="email"
                                        name="email"
                                        placeholder="example@gami.com"
                                    />
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center gap-2 font-medium mb-2">
                                        <PhoneCall size={18} />
                                        <Label label="Contact" />
                                    </div>
                                    <InputText
                                        type="tel"
                                        name="phone"
                                        placeholder="+226 00 00 00 00"
                                    />
                                </div>
                            </div>

                            {/* Pays  */}

                            <div className="flex-1">
                                    <div className="flex items-center gap-2 font-medium mb-2">
                                        <Globe size={18} />
                                        <Label label="Pays" />
                                    </div>
                                    <InputText
                                        type="text"
                                        name="country"
                                        placeholder="Burkina Faso"
                                    />
                            </div>
                            
                            <div className="flex-1">
                                <div className="flex items-center gap-2 font-medium mb-2">
                                    <Compass size={18} />
                                    <Label label="Numéros IFU / Agrément" />
                                </div>
                                <InputText
                                    type="text"
                                    name="preference"
                                    placeholder="IFU 008464GDZ"
                                />
                            </div>

                            {/* Mot de passe + Confirmation */}
                            
                            <div>
                                <div className="flex items-center gap-2 font-medium mb-2">
                                    <Lock size={18} />
                                    <Label label="Mot de passe" />
                                </div>
                                <div className="relative">
                                    <InputText
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-400 transition"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center gap-2 font-medium mb-2">
                                    <Lock size={18} />
                                    <Label label="Confirmer Mot de passe" />
                                </div>
                                <div className="relative">
                                    <InputText
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-400 transition"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                        </div>
                        {/* ── Footer fixe ── */}
                        <div className="flex justify-end gap-3 px-6 py-2 border-t border-gray-100 flex-shrink-0">
                            <button
                                type="button"
                                onClick={onClose}
                                className="border px-4 py-2 rounded-xl hover:bg-gray-50 transition"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                className="cursor-pointer bg-primary text-white px-5 py-2 rounded-xl hover:opacity-90 transition"
                            >
                                Créer
                            </button>
                        </div>
                    </form>

                    

                </div>
            </motion.div>
        </div>
    );
}
export default AddAgence;