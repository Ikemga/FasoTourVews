import { useEffect, useState } from "react";
import GuideSelector from "../../../components/common/ui/GuideSelector";
import {
  DateInput,
  InputText,
  Label,
  LabelRequiert,
  PrixInput,
  Textarea,
} from "../../../components/common/ui/Input";// CircuitForm.jsx
import SelectOption from "../../../components/common/ui/SelectOption";
import SiteSelector from "../../../components/common/ui/SiteSelector";
import TransportToggle from "../../../components/common/ui/TransporToggle";
import { postCircuit, putCircuit } from "../../../service/CircuitService";
import { AlertCircle, CheckCircle, X } from "lucide-react";


const CircuitForm = ({ onClose, onSuccess, initialData = null }) => {

    const isEdit = !!initialData;

    const [statut, setStatut] = useState(initialData?.statut ?? "Brouillon");
    const [transportInclus, setTransportInclus] = useState(initialData?.transportInclus ?? false);
    const [sitesSelected, setSitesSelected] = useState(initialData?.sites ?? []);
    const [guidesSelected, setGuidesSelected] = useState(initialData?.guides ?? []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect (() => {
            if (!error) return;
            
            const timer = setTimeout(() => setError(null), 3000);
            return () => clearTimeout(timer);
            }, [error]);

    const [form, setForm] = useState({
        circuitName:            initialData?.circuitName                    ?? "",
        description:            initialData?.description            ?? "",
        dateDebut:              initialData?.dateDebut              ?? "",
        dateFin:                initialData?.dateFin                ?? "",
        dateLimiteReservation:  initialData?.dateLimiteReservation  ?? "",
        lieuRassemblement:      initialData?.lieuRassemblement      ?? "",
        heureDepart:            initialData?.heureDepart            ?? "",
        prix:                   initialData?.prixIndividuel?.toString() ?? "",
        nombreExact:            initialData?.nombreExact?.toString() ?? "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const payload = {
            circuitName:           form.circuitName,
            description:           form.description,
            dateDebut:             form.dateDebut,
            dateFin:               form.dateFin,
            dateLimiteReservation: form.dateLimiteReservation,
            lieuRassemblement:     form.lieuRassemblement,
            heureDepart:           form.heureDepart || null,
            prixIndividuel:        parseFloat(form.prix) || 0,
            nombreExact:           parseInt(form.nombreExact) || 0,
            statut,
            transport:             transportInclus,   
            agenceId:              122,                 
            siteIds:               sitesSelected.map((s) => s.id),
            guideIds:              guidesSelected.map((g) => g.id),
};
        try {
        if (isEdit) {
            await putCircuit(initialData.id, payload);
        } else {
            await postCircuit(payload);
        }
        setSuccess(isEdit ? "Circuit modifié avec succès !" : "Circuit créé avec succès !");

        setTimeout(() => {
            setSuccess(null);
            onClose();
            }, 2000);
        } catch (err) {
            const message =
                err.response?.data?.message || `Erreur lors de la ${isEdit ? "modification" : "création"} du circuit.`;
            setError(message);
        } finally {
        setLoading(false);
        }

    };

    return (
        <div>
            {error && (
                <div className="fixed top-5 right-5 z-[9999] flex items-center gap-3 bg-white border border-red-200 text-red-600 text-sm px-5 py-3 rounded-2xl shadow-lg transition-all duration-300">
                    <AlertCircle size={18} className="shrink-0" />
                    <span>{error}</span>
                    <button onClick={() => setError(null)} className="ml-2 hover:opacity-70 transition">
                        <X size={14} />
                    </button>
                </div>
            )}

            {success && (
                <div className="fixed top-5 right-5 z-[9999] flex items-center gap-3 bg-white border border-green-200 text-green-600 text-sm px-5 py-3 rounded-2xl shadow-lg transition-all duration-300">
                    <CheckCircle size={18} className="shrink-0" />
                    <span>{success}</span>
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-3 mt-3 text-gray-500">

                <div>
                    <LabelRequiert label="Nom du circuit" requiert="*" />
                    <InputText type="text" name="circuitName" placeholder="Ex: Circuit Savane dorée"
                    value={form.circuitName} onChange={handleChange}/>
                </div>

                <div>
                    <Label label="Description" />
                    <Textarea name="description" placeholder="Découvrez le circuit ..."
                    value={form.description} onChange={handleChange} />
                </div>

                <div className="flex gap-4">
                    <div className="flex-1">
                    <LabelRequiert label="Date de début" requiert="*" />
                    <DateInput name="dateDebut" value={form.dateDebut} onChange={handleChange}/>
                    </div>
                    <div className="flex-1">
                    <LabelRequiert label="Date de fin" requiert="*" />
                    <DateInput name="dateFin" value={form.dateFin} onChange={handleChange}/>
                    </div>
                    <div className="flex-1">
                    <LabelRequiert label="Date limite R." requiert="*" />
                    <DateInput name="dateLimiteReservation" value={form.dateLimiteReservation} onChange={handleChange}/>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex-1">
                    <Label label="Lieu de rassemblement" />
                    <InputText type="text" name="lieuRassemblement" placeholder="Ex: Musée"
                        value={form.lieuRassemblement} onChange={handleChange} />
                    </div>
                    <div className="flex-1">
                    <Label label="Heure de départ" />
                    <InputText type="time" name="heureDepart"
                        value={form.heureDepart} onChange={handleChange} />
                    </div>
                    <div className="flex-1">
                    <LabelRequiert label="Prix / personne" requiert="*" />
                    <PrixInput name="prix" placeholder="200000"
                        value={form.prix} onChange={handleChange}/>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="relative w-full">
                    <Label label="Nombre exact" />
                    <InputText type="number" name="nombreExact" placeholder="0"
                        value={form.nombreExact} onChange={handleChange} />
                    </div>
                    <div className="relative w-full">
                    <Label label="Statut" />
                    <SelectOption value={statut} onChange={setStatut} />
                    </div>
                    <div className="relative w-full">
                    <Label label="Transport" />
                    <TransportToggle value={transportInclus} onChange={setTransportInclus} />
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex-1">
                    <Label label="Sites visités" />
                    <SiteSelector selected={sitesSelected} onChange={setSitesSelected} />
                    </div>
                    <div className="flex-1">
                    <Label label="Guides assignés" />
                    <GuideSelector selected={guidesSelected} onChange={setGuidesSelected} />
                    </div>
                </div>

                <div className="flex justify-end gap-3 px-6 py-4 border rounded-2xl border-gray-100 shadow-sm">
                    <button type="button" onClick={onClose} 
                    className="cursor-pointer font-bold border px-4 py-2 rounded-xl hover:bg-red-500 hover:text-white transition">
                        Annuler
                    </button>
                    <button type="submit" disabled={loading || !!success}
                    className="font-bold cursor-pointer bg-primary text-white px-5 py-2 rounded-xl hover:opacity-90 transition disabled:opacity-50">
                    {loading ? "Enregistrement..." : isEdit ? "Modifier" : "Créer"}
                    </button>
                </div>
            </form>
        </div>
        
    );
};

export default CircuitForm;