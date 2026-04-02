import { X, CheckCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { InputHoraire, InputText, Label, LabelRequiert, PrixInput, Textarea } from "./Input";
import ImageUploadMultiple from "./ImageUploadMultiple";
import VideoUploadMultiple from "./VideoUploadMultiple";
import FileUploadMultiple from "./FileUploadMultiple";
import { useEffect, useState } from "react";
import CategorieSelector from "./CategorieSelector";
import { putSites } from "../../../service/SiteService";
import { createPortal } from "react-dom";

const Toast = ({ message, type }) =>
    message ? createPortal(
        <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
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
        </motion.div>,
        document.body
    ) : null;

const EditSiteModal = ({ open, onClose, onSuccess, site }) => {
    const [loading, setLoading]           = useState(false);
    const [error, setError]               = useState(null);
    const [success, setSuccess]           = useState(null);
    const [selectedCats, setSelectedCats] = useState([]);
    const [photos, setPhotos]             = useState([]);
    const [videos, setVideos]             = useState([]);
    const [fichiers, setFichiers]         = useState([]);

    const [ouverture, setOuverture] = useState("08:00");
    const [fermeture, setFermeture] = useState("17:00");


    useEffect(() => {
        if (site?.categories) setSelectedCats(site.categories);

        if (site?.heureOuverture) setOuverture(site.heureOuverture);
        if (site?.heureFermeture) setFermeture(site.heureFermeture);
    }, [site]);

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

        if (!ouverture || !fermeture) {
            setError("Les horaires d'ouverture et de fermeture sont requis.");
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(null);

        const formData = new FormData(e.currentTarget);

        const payload = {
            nom:          formData.get("nom"),
            region:       formData.get("region"),
            description:  formData.get("description"),
            localisation: formData.get("localisation"),
            noteMoyenne:  formData.get("noteMoyenne"),
            categorieIds: selectedCats.map(c => c.id),
            heureOuverture: ouverture,
            heureFermeture: fermeture, 
            tarif:        formData.get("tarif"),
            statut:       formData.get("statut"),
        };

        try {
            await putSites(site.id, payload);
            console.log("PAYLOAD horaire:", payload.horaire);
            console.log("ouverture state:", ouverture);
            console.log("fermeture state:", fermeture);
            setSuccess("Site modifié avec succès !");
            setTimeout(() => {
                setSuccess(null);
                onSuccess?.();
                onClose();
            }, 2000);
        } catch (err) {
            console.error("Erreur modification site :", err);
            setError(err.response?.data?.message || "Une erreur est survenue.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Toasts */}
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
                            <h2 className="text-xl font-bold">Modifier le site</h2>
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
                                        <InputText type="text" name="nom" placeholder="Ex: Parc Urbain BW" defaultValue={site?.nom} />
                                    </div>
                                    <div className="flex-1">
                                        <Label label="Région" />
                                        <InputText type="text" name="region" placeholder="Ex: Sud-Ouest" defaultValue={site?.region} />
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <Label label="Description" />
                                    <Textarea name="description" placeholder="Découvrez le site ..." defaultValue={site?.description} />
                                </div>

                                {/* Géolocalisation + Note + Catégorie */}
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <LabelRequiert label="Géolocalisation" requiert="*" />
                                        <InputText type="text" name="localisation" placeholder="1.5456, 1.4354" defaultValue={site?.localisation} />
                                    </div>
                                    <div className="w-24">
                                        <Label label="Note" />
                                        <InputText type="text" name="noteMoyenne" placeholder="4.6" defaultValue={site?.noteMoyenne} />
                                    </div>
                                    <div className="flex-1">
                                        <LabelRequiert label="Catégorie" requiert="*" />
                                        <CategorieSelector selected={selectedCats} onChange={setSelectedCats} />
                                    </div>
                                </div>

                                {/* Horaires + Tarif + Statut */}
                                <div className="flex gap-4 items-end">
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
                                        <PrixInput name="tarif" placeholder="500" defaultValue={site?.tarif} />
                                    </div>
                                    <div className="flex-1">
                                        <LabelRequiert label="Statut" requiert="*" />
                                        <InputText type="text" name="statut" placeholder="Actif" defaultValue={site?.statut} />
                                    </div>
                                </div>

                                {/* Médias */}
                                <div className="flex gap-6 pt-1">
                                    <div>
                                        <Label label="Photos" />
                                        <div className="mt-1"><ImageUploadMultiple onChange={setPhotos} existantes={site?.photos} /></div>
                                    </div>
                                    <div>
                                        <Label label="Vidéos" />
                                        <div className="mt-1"><VideoUploadMultiple onChange={setVideos} existantes={site?.videos} /></div>
                                    </div>
                                    <div>
                                        <Label label="Fichiers" />
                                        <div className="mt-1"><FileUploadMultiple onChange={setFichiers} existants={site?.fichiers} /></div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="flex justify-end gap-3 px-6 py-4 border rounded-2xl border-gray-100 shadow-sm">
                                    <button type="button" onClick={onClose}
                                        className="border px-4 py-2 rounded-xl hover:bg-gray-50 transition">
                                        Annuler
                                    </button>
                                    <button type="submit" disabled={loading || !!success}
                                        className="cursor-pointer bg-orange-500 text-white px-5 py-2 rounded-xl hover:opacity-90 transition disabled:opacity-50">
                                        {loading ? "Modification..." : "Modifier"}
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

export default EditSiteModal;