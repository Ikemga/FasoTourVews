import { X } from "lucide-react";
import { motion } from "framer-motion";
import {  InputHeure, InputText, Label, LabelRequiert, PrixInput, Textarea } from "./Input";
import ImageUploadMultiple from "./ImageUploadMultiple";
import VideoUploadMultiple from "./VideoUploadMultiple";
import FileUploadMultiple from "./FileUploadMultiple";
import { useEffect, useState } from "react";
import CategorieSelector from "./CategorieSelector";
import { postSites } from "../../../service/SiteService";

const AddSiteModal = ({ open, onClose, onSuccess }) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedCats, setSelectedCats] = useState([]); 

    useEffect (() => {
        if (!error) return;
        
        const timer = setTimeout(() => setError(null), 3000);
        return () => clearTimeout(timer); // nettoyage si error change avant la fin
        }, [error]);

    // Etat des fichiers
    const [photos, setPhotos] = useState([]);
    const [videos, setVideos] = useState([]);
    const [fichiers, setFichiers] = useState([]);

    if (!open) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);

        // ── Données texte ──
        const payload = {
            nom:            formData.get("nom"),
            region:         formData.get("region"),
            description:    formData.get("description"),
            localisation:   formData.get("localisation"),
            noteMoyenne:    formData.get("noteMoyenne"),
            categorieIds:   selectedCats.map(c => c.id),
            horaire:        formData.get("horaire"),
            tarif:          formData.get("prix"),
            statut:         formData.get("statut"),
        };

        try {

            await postSites(payload);
            onSuccess?.();
            onClose();
            } catch (err) {
            console.error("Erreur création site :", err);
                setError(err.response?.data?.message || "Une erreur est survenue.");
            } finally {
                setLoading(false);
            }
        };

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
                    <h2 className="text-xl font-bold">Nouveau site</h2>
                    <button
                        onClick={onClose}
                        className="cursor-pointer text-gray-400 hover:text-black transition"
                    >
                        <X size={20} />
                    </button>
                </div>
                {/* ── Corps scrollable ── */}
                <div className="overflow-y-auto flex-1 px-6 py-4 space-y-4">
                    <form onSubmit={handleSubmit} className="space-y-3 mt-3 text-gray-500">
                        {/* Message d'erreur */}
                            {error && (
                                <div className=" text-red-500 text-sm  ">
                                {error}
                                </div>
                            )}
                        {/* Nom + Région */}
                        <div className="flex gap-4 ">
                            <div className="flex-1 ">
                                <div className="items-start flex">
                                    <LabelRequiert 
                                        label="Nom du site" 
                                        requiert="*"
                                        />
                                </div>
                                
                                <InputText
                                type="text"
                                name="nom"
                                placeholder="Ex: Parc Urbain BW"
                                className="mt-1"
                                />
                            </div>

                            <div className="flex-1">
                                <div className="items-start flex">
                                    <Label label="Région" />
                                </div>
                                
                                <InputText
                                    type="text"
                                    name="region"
                                    placeholder="Ex: Sud-Ouest"
                                    className="mt-1"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <div className="items-start flex">
                                <Label label="Description" />
                            </div>
                            
                            <Textarea
                                name="description"
                                placeholder="Découvrez le circuit ..."
                                className="mt-1"
                            />
                        </div>

                            {/* Géolocalisation + Note + Catégorie */}
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <div className="items-start flex">
                                    <LabelRequiert 
                                    label="Géolocalisation" 
                                    requiert="*" />
                                </div>
                                <InputText
                                    type="text"
                                    name="localisation"
                                    placeholder="1.5456, 1.4354"
                                    className="mt-1"
                                />
                                
                            </div>
                            <div className="w-24">
                                
                                <div className="items-start flex">
                                    <Label label="Note" />
                                </div>
                                <InputText
                                    type="text"
                                    name="noteMoyenne"
                                    placeholder="4.6"
                                    className="mt-1"
                                />
                            </div>
                            <div className="flex-1">
                                <div className="items-start flex">
                                    <LabelRequiert label="Catégorie" requiert="*" />
                                </div>

                                <CategorieSelector
                                    selected={selectedCats}
                                    onChange={setSelectedCats}
                                />
                            </div>
                        </div>

                            {/* Horaires + Note + Statut */}
                        <div className="flex gap-4 items-end">
                            {/* Horaires */}
                            <div className="flex-1">
                                <div className="items-start flex">
                                <LabelRequiert label="Horaires" requiert="*" />
                                </div>
                                <div className="relative w-full">
                                <InputHeure
                                    type="time"
                                    name="horaire"
                                    placeholder="17:00"
                                />
                                </div>
                            </div>

                            {/* Tarif */}
                            <div className="flex-1">
                                <div className="items-start flex">
                                <Label label="Tarif" />
                                </div>
                                <div className="w-full">
                                <PrixInput
                                    name="prix"
                                    placeholder="500"
                                />
                                </div>
                            </div>

                            {/* Status */}
                            <div className="flex-1 relative w-full">
                                <div className="items-start flex">
                                    <LabelRequiert label="Status" requiert="*" />
                                </div>
                                <InputText
                                    type="text"
                                    name="statut"
                                    placeholder="Actif"
                                    className="mt-1"
                                />
                            </div>
                        </div>
                        
                        {/* Médias : Photo + Vidéo + Fichier sur une ligne */}
                        <div className="flex gap-6 pt-1">
                            <div>
                                <LabelRequiert label="Photos" requiert="*" />
                                <div className="mt-1">
                                    <ImageUploadMultiple onChange={setPhotos} />
                                </div>
                            </div>
                            <div>
                                <LabelRequiert label="Vidéos" requiert="*" />
                                <div className="mt-1">
                                    <VideoUploadMultiple onChange={setVideos} />
                                </div>
                            </div>
                            <div>
                                <LabelRequiert label="Fichiers" requiert="*" />
                                <div className="mt-1">
                                    <FileUploadMultiple onChange={setFichiers}/>
                                </div>
                            </div>
                        </div>

                        {/* ── Footer fixe ── */}
                        <div className="flex justify-end gap-3 px-6 py-4 border rounded-2xl border-gray-100 shadow-sm flex-shrink-0">
                            <button
                                type="button"
                                onClick={onClose}
                                className="border px-4 py-2 rounded-xl hover:bg-gray-50 transition"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="cursor-pointer bg-primary text-white px-5 py-2 rounded-xl hover:opacity-90 transition"
                            >
                                {loading ? "Création..." : "Créer"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </motion.div>
    </div>
  );
};

export default AddSiteModal;