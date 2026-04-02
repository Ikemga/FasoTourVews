import { useState, useRef } from "react";
import AvatarSizePreview from "./AvatarSizePreview";
import Card from "../primitives/Card";
import Btn from "../primitives/Btn";
import { Save, Upload } from "lucide-react";

const DEFAULT_AVATAR = "https://i.pravatar.cc/200?img=47";

const AvatarPanel = ({ avatar, onAvatarChange, showToast }) =>{
    const [setDrag] = useState(false);
    const ref = useRef();

    const handleFiles = (files) => {
        const file = files?.[0];
        if (file && file.type.startsWith("image/")) {
        onAvatarChange(URL.createObjectURL(file));
        showToast("Aperçu mis à jour !");
        }
    };

    return (
        <div>
        <Card title="Photo de profil" sub="Importez une nouvelle image (JPG, PNG, WebP — max 5 Mo)">

            {/* Zone drag & drop */}
            <div
            onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => { e.preventDefault(); setDrag(false); handleFiles(e.dataTransfer.files); }}
            onClick={() => ref.current?.click()}
            
            >
            <input
                ref={ref}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => handleFiles(e.target.files)}
            />
            <div className="flex items-center justify-center text-amber-700 p-6 cursor-pointer">
                <Upload size={70}/>
            </div>
            <div>
                Glissez votre image ici ou{" "}
                <strong className="text-amber-700 font-bold">cliquez pour parcourir</strong>
            </div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>
                PNG, JPG, WebP — ratio 1:1 recommandé — max 5 Mo
            </div>
            </div>

            {/* Prévisualisations */}
            <div className="flex justify-start items-center gap-6">
                <div>
                    <div className="uppercase text-sm mb-2 font-bold">
                    Aperçu
                    </div>
                    <img src={avatar} alt="" className="w-fit h-fit border-5 border-amber-700 rounded-full bg-cover" />
                </div>
                <div className="flex flex-col gap-2.5"  >
                    <AvatarSizePreview src={avatar} size={40} label="40×40 — Navigation" />
                    <AvatarSizePreview src={avatar} size={24} label="24×24 — Commentaires" />
                </div>
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
            <Btn variant="Enregistrer"  onClick={() => showToast("Avatar sauvegardé !")}> <Save/>Enregistrer</Btn>
            <Btn variant="Annuler" onClick={() => onAvatarChange(DEFAULT_AVATAR)}>Supprimer</Btn>
            </div>
        </Card>
        </div>
    );
} 
export default AvatarPanel;