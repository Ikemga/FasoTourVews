import { useState } from "react";
import { FormGroup } from "../primitives/FormGroup";
import Card from "../primitives/Card";
import { InputText, Label, Textarea } from "../../../../components/common/ui/Input";
import { Save, Trash2 } from "lucide-react";
import Btn from "../primitives/Btn";

const EditPanel = ({ user, onSave, showToast }) => {
  const [form, setForm] = useState({ ...user });
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

    const handleSave = () => {
        onSave(form);
        showToast("Profil mis à jour !");
    };

    return (
        <div className="animate-fadeUp ">
        <Card title="Modifier le profil" sub="Mettez à jour vos informations personnelles">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormGroup >
                <div className="text-left pb-2">
                    <Label label="Prénom" />
                </div>
                <InputText
                value={form.firstName}
                onChange={set("firstName")}
                placeholder="Votre prénom"
                />
            </FormGroup>

            <FormGroup >
                <div className="text-left pb-2">
                    <Label label="Nom" />
                </div>
                <InputText
                value={form.lastName}
                onChange={set("lastName")}
                placeholder="Votre nom"
                />
            </FormGroup>

            <FormGroup >
                <div className="text-left pb-2">
                    <Label label="Email" />
                </div>
                <InputText
                type="email"
                value={form.email}
                onChange={set("email")}
                placeholder="email@exemple.com"
                />
            </FormGroup>

            <FormGroup>
                <div className="text-left pb-2">
                    <Label label="Téléphone" />
                </div>
                <InputText
                value={form.phone}
                onChange={set("phone")}
                placeholder="+33 6 00 00 00 00"
                />
            </FormGroup>

            <FormGroup>
                <div className="text-left pb-2">
                    <Label label="Localisation" />
                </div>
                <InputText
                value={form.location}
                onChange={set("location")}
                placeholder="Ville, Pays"
                />
            </FormGroup>

            <FormGroup>
                <div className="text-left pb-2">
                    <Label label="Site web" />
                </div>
                <InputText
                value={form.website}
                onChange={set("website")}
                placeholder="https://…"
                />
            </FormGroup>

            </div>
            <FormGroup >
                <div className="text-left pb-2">
                    <Label label="Bio" />
                </div>
                <Textarea
                as="textarea"
                value={form.bio}
                onChange={set("bio")}
                placeholder="Parlez-nous de vous…"
                className="h-24 resize-none"
                />
            </FormGroup>
            <div className="flex gap-2 mt-5">
                <Btn variant = "Enregistrer" onClick={handleSave} > <Save />Enregistrer</Btn>
                <Btn variant="Annuler"> <Trash2 />Annuler</Btn>
            </div>
        </Card>
        </div>
    );
};

export default EditPanel;