import { useState } from "react";
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


const CircuitForm = ({ onClose, onSuccess, initialData = null }) => {

    const isEdit = !!initialData;

    const [statut, setStatut] = useState(initialData?.statut ?? "Brouillon");
    const [transportInclus, setTransportInclus] = useState(initialData?.transportInclus ?? false);
    const [sitesSelected, setSitesSelected] = useState(initialData?.sites ?? []);
    const [guidesSelected, setGuidesSelected] = useState(initialData?.guides ?? []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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
        ...form,
        prixIndividuel: parseFloat(form.prix) || 0,
        nombreExact:    parseInt(form.nombreExact) || 0,
        statut,
        transportInclus,
        siteIds:  sitesSelected.map((s) => s.id),
        guideIds: guidesSelected.map((g) => g.id),
        };

        try {
        if (isEdit) {
            await putCircuit(initialData.id, payload);
        } else {
            await postCircuit(payload);
        }
        onSuccess?.();
        onClose();
        } catch (err) {
        const message =
            err.response?.data?.message ||
            err.response?.data ||
            `Erreur lors de la ${isEdit ? "modification" : "création"} du circuit.`;
        setError(messanomge);
        } finally {
        setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3 mt-3 text-gray-500">
        {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2 rounded-xl">
            {error}
            </div>
        )}

        <div>
            <LabelRequiert label="Nom du circuit" requiert="*" />
            <InputText type="text" name="nom" placeholder="Ex: Circuit Savane dorée"
            value={form.circuitName} onChange={handleChange} required />
        </div>

        <div>
            <Label label="Description" />
            <Textarea name="description" placeholder="Découvrez le circuit ..."
            value={form.description} onChange={handleChange} />
        </div>

        <div className="flex gap-4">
            <div className="flex-1">
            <LabelRequiert label="Date de début" requiert="*" />
            <DateInput name="dateDebut" value={form.dateDebut} onChange={handleChange} required />
            </div>
            <div className="flex-1">
            <LabelRequiert label="Date de fin" requiert="*" />
            <DateInput name="dateFin" value={form.dateFin} onChange={handleChange} required />
            </div>
            <div className="flex-1">
            <LabelRequiert label="Date limite R." requiert="*" />
            <DateInput name="dateLimiteReservation" value={form.dateLimiteReservation} onChange={handleChange} required />
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
                value={form.prix} onChange={handleChange} required />
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
            <button type="submit" disabled={loading}
            className="font-bold cursor-pointer bg-primary text-white px-5 py-2 rounded-xl hover:opacity-90 transition disabled:opacity-50">
            {loading ? "Enregistrement..." : isEdit ? "Modifier" : "Créer"}
            </button>
        </div>
    </form>
    );
};

export default CircuitForm;