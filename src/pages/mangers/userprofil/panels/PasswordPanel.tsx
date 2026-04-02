import { useState }       from "react";
import { FormGroup }      from "../primitives/FormGroup";
import StrengthMeter from "./StrengthMeter";
import Card from "../primitives/Card";
import Btn from "../primitives/Btn";
import { InputText, Label } from "../../../../components/common/ui/Input";


const PasswordPanel = ({ showToast }) =>{
  const [newPw, setNewPw] = useState("");

  return (
    <div className="w-lg mx-auto">
      <Card title="Changer le mot de passe" sub="Choisissez un mot de passe fort et unique">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <FormGroup >
            <div className="text-left pb-2">
              <Label label="Mot de passe actuel" />
            </div>
            <InputText placeholder="••••••••••" />
          </FormGroup>

          <FormGroup >
            <div className="text-left pb-2">
              <Label label="Nouveau mot de passe" />
            </div>
            <InputText placeholder="••••••••••" onChange={(e) => setNewPw(e.target.value)} />
            <StrengthMeter value={newPw} />
          </FormGroup>

          <FormGroup >
            <div className="text-left pb-2">
              <Label label="Confirmer le mot de passe" />
            </div>
            <div className="text-black font-bold">
              <InputText placeholder="••••••••••" />
            </div>
          </FormGroup>
        </div>

        <div className=" text-sm my-4 bg-amber-600/5 p-5">
          <strong >Conseils :</strong>{" "}
          au moins 8 caractères, une majuscule, un chiffre et un caractère spécial.
        </div>

        <div className="flex justify-items-start items-center gap-2">
          <Btn variant = "Enregistrer" onClick={() => showToast("Mot de passe modifié !")}>Mettre à jour</Btn>
          <Btn variant="Annuler">Annuler</Btn>
        </div>
      </Card>

      {/* Danger zone */}
      <div className="bg-amber-700/10 p-6">
        <div>
          <div className="text-center font-bold">
            Supprimer le compte
          </div>
          <div className="text-sm">
          Action irréversible. Toutes vos données seront supprimées définitivement.
          </div>
        </div>
        <Btn variant="Annuler" onClick={() => showToast("Confirmation requise")}>
          Supprimer mon compte
        </Btn>
      </div>
    </div>
  );
}
export default PasswordPanel;