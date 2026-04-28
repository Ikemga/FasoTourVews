import { X, CheckCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { InputHoraire, InputText, Label, LabelRequiert, PrixInput, Textarea } from "./Input";
import ImageUploadMultiple from "./ImageUploadMultiple";
import VideoUploadMultiple from "./VideoUploadMultiple";
import FileUploadMultiple from "./FileUploadMultiple";
import { useEffect, useState } from "react";
import CategorieSelector from "./CategorieSelector";
import { postSites } from "../../../service/SiteService";
import { createPortal } from "react-dom";
import SelectStatutSite from "./SelectStatutSite"; // ✅ remplace SelectOption
import SiteSelector from "./SiteSelector";

const Toast = ({ message, type }) => (
    createPortal(
        <AnimatePresence>
            {message && (
                <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className={`fixed top-5 right-5 z-[9999] flex items-center gap-3 px-5 py-3 rounded-2xl shadow-lg border text-sm
                        ${type === "success"
                            ? "bg-white border-green-200 text-green-600"
                            : "bg-red-50 border-red-200 text-red-600"
                        }`}
                >
                    {type === "success"
                        ? <CheckCircle size={18} className="shrink-0" />
                        : <AlertCircle size={18} className="shrink-0" />
                    }
                    <span>{message}</span>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    )
);

const AddSiteModal = ({ open, onClose, onSuccess, initialData = null }) => {
    const [loading, setLoading]             = useState(false);
    const [error, setError]                 = useState(null);
    const [success, setSuccess]             = useState(null);
    const [selectedCats, setSelectedCats]   = useState([]);
    const [selectedSites, setSelectedSites] = useState([]);
    const [statut, setStatut]               = useState(initialData?.statut ?? "ACTIF");
    const [ouverture, setOuverture]         = useState("08:00");
    const [fermeture, setFermeture]         = useState("17:00");
    const [photos, setPhotos]               = useState([]);
    const [videos, setVideos]               = useState([]);
    const [fichiers, setFichiers]           = useState([]);

    useEffect(() => {
        if (!error) return;
        const timer = setTimeout(() => setError(null), 3000);
        return () => clearTimeout(timer);
    }, [error]);

    useEffect(() => {
        if (!success) return;
        const timer = setTimeout(() => setSuccess(null), 2000);
        return () => clearTimeout(timer);
    }, [success]);

    if (!open) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData();

        const ouvertureVal = ouverture || form.heureOuverture?.value;
        const fermetureVal = fermeture || form.heureFermeture?.value;

        if (!ouvertureVal || !fermetureVal) {
            setError("Les horaires sont requis.");
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(null);

        formData.append("nom",            form.nom.value);
        formData.append("region",         form.region.value);
        formData.append("description",    form.description.value);
        formData.append("localisation",   form.localisation.value);
        formData.append("noteMoyenne",    form.noteMoyenne.value || "");
        formData.append("tarif",          form.prix.value || "");
        formData.append("statut",         statut);
        formData.append("heureOuverture", ouvertureVal);
        formData.append("heureFermeture", fermetureVal);

        selectedCats.forEach(cat   => formData.append("categorieIds", cat.id));
        selectedSites.forEach(site => formData.append("siteIds",      site.id));

        if (photos.length > 0) formData.append("image", photos[0]);
        videos.forEach(v  => formData.append("videos",   v));
        fichiers.forEach(f => formData.append("fichiers", f));

        try {
            await postSites(formData);
            setSuccess("Site créé avec succès !");
            setTimeout(() => { onSuccess?.(); onClose(); }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Erreur.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Toast message={success} type="success" />
            <Toast message={error}   type="error"   />

            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative w-full max-w-2xl rounded-2xl shadow-2xl bg-white border border-white/20"
                >
                    <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl flex flex-col max-h-[90vh]">

                        {/* Header */}
                        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100 flex-shrink-0">
                            <h2 className="text-xl font-bold">Nouveau site</h2>
                            <button onClick={onClose} className="cursor-pointer text-gray-400 hover:text-black transition">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Corps scrollable */}
                        <div className="overflow-y-auto flex-1 px-6 py-4 space-y-4">
                            <form onSubmit={handleSubmit} className="space-y-3 mt-3 text-gray-500">

                                {/* Nom + Région */}
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <LabelRequiert label="Nom du site" requiert="*" />
                                        <InputText type="text" name="nom" placeholder="Ex: Parc Urbain BW" />
                                    </div>
                                    <div className="flex-1">
                                        <Label label="Région" />
                                        <InputText type="text" name="region" placeholder="Ex: Sud-Ouest" />
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <Label label="Description" />
                                    <Textarea name="description" placeholder="Découvrez le site ..." />
                                </div>

                                {/* Géolocalisation + Note + Catégorie */}
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <LabelRequiert label="Géolocalisation" requiert="*" />
                                        <InputText type="text" name="localisation" placeholder="1.5456, 1.4354" />
                                    </div>
                                    <div className="w-24">
                                        <Label label="Note" />
                                        <InputText type="text" name="noteMoyenne" placeholder="4.6" />
                                    </div>
                                    <div className="flex-1">
                                        <LabelRequiert label="Catégorie" requiert="*" />
                                        <CategorieSelector selected={selectedCats} onChange={setSelectedCats} />
                                    </div>
                                </div>

                                {/* Horaires + Tarif + Statut */}
                                <div className="relative w-full flex gap-4 items-end">
                                    <div className="flex-1">
                                        <LabelRequiert label="Horaires" requiert="*" />
                                        <InputHoraire
                                            ouverture={ouverture}
                                            fermeture={fermeture}
                                            setOuverture={setOuverture}
                                            setFermeture={setFermeture}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <Label label="Tarif" />
                                        <PrixInput name="prix" placeholder="500" />
                                    </div>
                                    <div className="flex-1">
                                        <Label label="Statut" />
                                        {/* SelectStatutSite remplace SelectOption */}
                                        <SelectStatutSite
                                            value={statut}
                                            onChange={setStatut}
                                        />
                                    </div>
                                </div>

                                {/* Médias */}
                                <div className="flex gap-6 pt-1">
                                    <div>
                                        <LabelRequiert label="Photos" requiert="*" />
                                        <div className="mt-1"><ImageUploadMultiple onChange={setPhotos} /></div>
                                    </div>
                                    <div>
                                        <LabelRequiert label="Vidéos" requiert="*" />
                                        <div className="mt-1"><VideoUploadMultiple onChange={setVideos} /></div>
                                    </div>
                                    <div>
                                        <LabelRequiert label="Fichiers" requiert="*" />
                                        <div className="mt-1"><FileUploadMultiple onChange={setFichiers} /></div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="flex justify-end gap-3 px-6 py-4 border rounded-2xl border-gray-100 shadow-sm">
                                    <button type="button" onClick={onClose}
                                        className="border px-4 py-2 rounded-xl hover:bg-gray-50 transition">
                                        Annuler
                                    </button>
                                    <button type="submit" disabled={loading || !!success}
                                        className="cursor-pointer bg-primary text-white px-5 py-2 rounded-xl hover:opacity-90 transition disabled:opacity-50">
                                        {loading ? "Création..." : "Créer"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default AddSiteModal;