import { Compass, Eye, EyeOff, Globe, Lock, MailCheck, MapPinHouseIcon, PhoneCall, User, X } from "lucide-react";
import { AlertCircle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { InputText, Label } from "./Input";
import { useState, useEffect } from "react";
import { inscrireAgence, updateAgence } from "../../../service/AuthService";

const AgenceForm = ({ open, onClose, onSuccess, initialData = null }) => {
    const isEdit = !!initialData;

    const [error, setError]               = useState(null);
    const [success, setSuccess]           = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading]           = useState(false);
    

    const [form, setForm] = useState({
        nomComplet:      "",
        adresse:         "",
        mail:            "",
        telephone:       "",
        pays:            "",
        numeroAgrement:  "",
        motDePasse:      "",
        confirmPassword: "",
    });

    useEffect(() => {
        if (initialData) {
            console.log("initialData reçu :", initialData); 
            setForm({
                nomComplet:      initialData.nomComplet     ?? "",
                adresse:         initialData.adresse        ?? "",
                mail:            initialData.mail           ?? "",
                telephone:       initialData.telephone      ?? "",
                pays:            initialData.pays           ?? "",
                numeroAgrement:  initialData.numeroAgrement ?? "",
                motDePasse:      "",
                confirmPassword: "",
            });
        } else {
            setForm({
                nomComplet:      "",
                adresse:         "",
                mail:            "",
                telephone:       "",
                pays:            "",
                numeroAgrement:  "",
                motDePasse:      "",
                confirmPassword: "",
            });
        }
    }, [initialData]);
    
    // Toast erreur — disparaît après 3s
    useEffect(() => {
        if (!error) return;
        const timer = setTimeout(() => setError(null), 3000);
        return () => clearTimeout(timer);
    }, [error]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!isEdit && form.motDePasse !== form.confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        setLoading(true);
        try {
            if (isEdit) {
                await updateAgence(initialData.id, {
                    nomComplet:     form.nomComplet,
                    adresse:        form.adresse,
                    telephone:      form.telephone,
                    pays:           form.pays,
                    numeroAgrement: form.numeroAgrement,
                });
            } else {
                await inscrireAgence({
                    nomComplet:     form.nomComplet,
                    mail:           form.mail,
                    motDePasse:     form.motDePasse,
                    telephone:      form.telephone,
                    adresse:        form.adresse,
                    pays:           form.pays,
                    numeroAgrement: form.numeroAgrement,
                });
            }

            setSuccess(isEdit ? "Agence modifiée avec succès !" : "Agence créée avec succès !");

            setTimeout(() => {
                setSuccess(null);
                onSuccess?.();
                onClose();
            }, 2000);

        } catch (err) {
            const message = err.response?.data?.message
                || `Erreur lors de la ${isEdit ? "modification" : "création"} de l'agence.`;
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

            {/* Toast erreur */}
            {error && (
                <div className="fixed top-5 right-5 z-[9999] flex items-center gap-3 bg-red-100 border border-red-200 text-red-600 text-sm px-5 py-3 rounded-2xl shadow-lg transition-all duration-300">
                    <AlertCircle size={18} className="shrink-0" />
                    <span>{error}</span>
                    <button onClick={() => setError(null)} className="ml-2 hover:opacity-70 transition">
                        <X size={14} />
                    </button>
                </div>
            )}

            {/* Toast succès */}
            {success && (
                <div className="fixed top-5 right-5 z-[9999] flex items-center gap-3 bg-white border border-green-200 text-green-600 text-sm px-5 py-3 rounded-2xl shadow-lg transition-all duration-300">
                    <CheckCircle size={18} className="shrink-0" />
                    <span>{success}</span>
                </div>
            )}

            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative w-full max-w-md rounded-2xl shadow-2xl bg-white border border-white/20"
            >
                <div className="bg-white w-full rounded-2xl shadow-xl flex flex-col max-h-[90vh]">

                    {/* Header */}
                    <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100 flex-shrink-0">
                        <h2 className="text-xl font-bold">
                            {isEdit ? "Modifier l'agence" : "Nouvelle agence"}
                        </h2>
                        <button onClick={onClose} className="cursor-pointer text-gray-400 hover:text-black transition">
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-white rounded-2xl text-gray-500">
                        <div className="overflow-y-auto flex-1 px-6 py-4 space-y-4">

                            {/* Nom + Adresse */}
                            <div className="flex w-full items-start gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 font-medium mb-2">
                                        <User size={18} />
                                        <Label label="Nom complet" />
                                    </div>
                                    <InputText type="text" name="nomComplet" placeholder="SAWADOGO Smith"
                                        value={form.nomComplet} onChange={handleChange} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 font-medium mb-2">
                                        <MapPinHouseIcon size={18} />
                                        <Label label="Adresse" />
                                    </div>
                                    <InputText type="text" name="adresse" placeholder="Ouagadougou secteur 04"
                                        value={form.adresse} onChange={handleChange} />
                                </div>
                            </div>

                            {/* Mail + Contact */}
                            <div className="flex w-full items-start gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 font-medium mb-2">
                                        <MailCheck size={18} />
                                        <Label label="Mail" />
                                    </div>
                                    <InputText type="email" name="mail" placeholder="example@gami.com"
                                        value={form.mail} onChange={handleChange} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 font-medium mb-2">
                                        <PhoneCall size={18} />
                                        <Label label="Contact" />
                                    </div>
                                    <InputText type="tel" name="telephone" placeholder="+226 00 00 00 00"
                                        value={form.telephone} onChange={handleChange} />
                                </div>
                            </div>

                            {/* Pays */}
                            <div className="flex-1">
                                <div className="flex items-center gap-2 font-medium mb-2">
                                    <Globe size={18} />
                                    <Label label="Pays" />
                                </div>
                                <InputText type="text" name="pays" placeholder="Burkina Faso"
                                    value={form.pays} onChange={handleChange} />
                            </div>

                            {/* IFU */}
                            <div className="flex-1">
                                <div className="flex items-center gap-2 font-medium mb-2">
                                    <Compass size={18} />
                                    <Label label="Numéros IFU / Agrément" />
                                </div>
                                <InputText type="text" name="numeroAgrement" placeholder="IFU 008464GDZ"
                                    value={form.numeroAgrement} onChange={handleChange} />
                            </div>

                            {/* Mot de passe — masqué en mode édition */}
                            {!isEdit && (
                                <>
                                    <div>
                                        <div className="flex items-center gap-2 font-medium mb-2">
                                            <Lock size={18} />
                                            <Label label="Mot de passe" />
                                        </div>
                                        <div className="relative">
                                            <InputText type={showPassword ? "text" : "password"}
                                                name="motDePasse" placeholder="••••••••"
                                                value={form.motDePasse} onChange={handleChange} />
                                            <button type="button" onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-400 transition">
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
                                            <InputText type={showPassword ? "text" : "password"}
                                                name="confirmPassword" placeholder="••••••••"
                                                value={form.confirmPassword} onChange={handleChange} />
                                            <button type="button" onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-400 transition">
                                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end gap-3 px-6 py-3 border-t border-gray-100 flex-shrink-0">
                            <button type="button" onClick={onClose}
                                className="cursor-pointer font-bold border px-4 py-2 rounded-xl hover:bg-red-500 hover:text-white transition">
                                Annuler
                            </button>
                            <button type="submit" disabled={loading || !!success}
                                className="cursor-pointer font-bold bg-primary text-white px-5 py-2 rounded-xl hover:opacity-90 transition disabled:opacity-50">
                                {loading ? "Enregistrement..." : isEdit ? "Modifier" : "Créer"}
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default AgenceForm;