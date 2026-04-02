import { Compass, Eye, EyeOff, Globe, Lock, MailCheck, MapPinHouseIcon, PhoneCall, StoreIcon, User } from "lucide-react";
import { InputText, Label, LogeTitle } from "../components/common/ui/Input";
import bgImage from "../components/common/img/Paysage burkinabé.jpeg";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { inscrireTouriste } from "../service/AuthService";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        nomComplet: "",
        adresse: "",
        mail: "",
        telephone: "",
        pays: "",
        preferenceTouristique: "",
        motDePasse: "",
        confirmMotDePasse: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(""); // reset erreur à chaque frappe
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Validation côté client
        if (!formData.nomComplet || !formData.mail || !formData.motDePasse) {
            setError("Veuillez remplir tous les champs obligatoires.");
            return;
        }

        if (formData.motDePasse !== formData.confirmMotDePasse) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        setLoading(true);
        try {
            await inscrireTouriste({
                nomComplet: formData.nomComplet,
                mail: formData.mail,
                motDePasse: formData.motDePasse,
                telephone: formData.telephone,         // adapte si ton backend a un champ dédié
                preferenceTouristique: formData.preferenceTouristique,
            });

            navigate("/login");
        } catch (err) {
            const message =
                err?.response?.data?.message ||
                err?.response?.data ||
                "Une erreur est survenue. Veuillez réessayer.";
            setError(typeof message === "string" ? message : "Erreur serveur.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{ backgroundImage: `url(${bgImage})` }}
            className="relative min-h-screen w-screen bg-cover bg-center flex items-center justify-center px-4"
        >
            {/* Overlay dégradé */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-orange-900/60"></div>

            {/* Card animée */}
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative w-full max-w-md p-8 shadow-2xl bg-white backdrop-blur-xl border border-white/20"
            >
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-[#C45A1C] p-5 rounded-3xl shadow-lg">
                        <StoreIcon className="text-white" size={32} />
                    </div>
                    <LogeTitle
                        Title="Créer un compte"
                        Describe="Rejoignez notre boutique et découvrez nos collections exclusives"
                    />
                </div>

                <form onSubmit={handleSubmit} className="space-y-3 mt-3 text-gray-500">

                    {/* Message d'erreur global */}
                    {error && (
                        <div className="w-full bg-red-50 border border-red-300 text-red-600 text-sm rounded-lg px-4 py-2">
                            {error}
                        </div>
                    )}

                    {/* Nom + Adresse */}
                    <div className="flex w-full items-start gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 font-medium mb-2">
                                <User size={18} />
                                <Label label="Nom complet *" />
                            </div>
                            <InputText
                                type="text"
                                name="nomComplet"
                                placeholder="SAWADOGO Smith"
                                value={formData.nomComplet}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center gap-2 font-medium mb-2">
                                <MapPinHouseIcon size={18} />
                                <Label label="Adresse" />
                            </div>
                            <InputText
                                type="text"
                                name="adresse"
                                placeholder="Ouagadougou secteur 04"
                                value={formData.adresse}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Mail + Contact */}
                    <div className="flex w-full items-start gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 font-medium mb-2">
                                <MailCheck size={18} />
                                <Label label="Mail *" />
                            </div>
                            <InputText
                                type="email"
                                name="mail"
                                placeholder="example@gami.com"
                                value={formData.mail}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center gap-2 font-medium mb-2">
                                <PhoneCall size={18} />
                                <Label label="Contact" />
                            </div>
                            <InputText
                                type="tel"
                                name="telephone"
                                placeholder="+226 00 00 00 00"
                                value={formData.telephone}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Pays */}
                    <div className="flex-1">
                        <div className="flex items-center gap-2 font-medium mb-2">
                            <Globe size={18} />
                            <Label label="Pays" />
                        </div>
                        <InputText
                            type="text"
                            name="pays"
                            placeholder="Burkina Faso"
                            value={formData.pays}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Préférence touristique */}
                    <div className="flex-1">
                        <div className="flex items-center gap-2 font-medium mb-2">
                            <Compass size={18} />
                            <Label label="Préférence touristique" />
                        </div>
                        <InputText
                            type="text"
                            name="preferenceTouristique"
                            placeholder="Culturel, Historique"
                            value={formData.preferenceTouristique}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Mot de passe */}
                    <div>
                        <div className="flex items-center gap-2 font-medium mb-2">
                            <Lock size={18} />
                            <Label label="Mot de passe *" />
                        </div>
                        <div className="relative">
                            <InputText
                                type={showPassword ? "text" : "password"}
                                name="motDePasse"
                                placeholder="••••••••"
                                value={formData.motDePasse}
                                onChange={handleChange}
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

                    {/* Confirmation mot de passe */}
                    <div>
                        <div className="flex items-center gap-2 font-medium mb-2">
                            <Lock size={18} />
                            <Label label="Confirmer Mot de passe *" />
                        </div>
                        <div className="relative">
                            <InputText
                                type={showPassword ? "text" : "password"}
                                name="confirmMotDePasse"
                                placeholder="••••••••"
                                value={formData.confirmMotDePasse}
                                onChange={handleChange}
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

                    {/* Bouton animé */}
                    <motion.button
                        whileHover={{ scale: loading ? 1 : 1.03 }}
                        whileTap={{ scale: loading ? 1 : 0.97 }}
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-xl font-semibold text-white bg-[#C45A1C]
                                shadow-lg hover:shadow-orange-500/40 transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? "Création en cours..." : "Créer"}
                    </motion.button>
                </form>

                <p className="text-center text-gray-500 mt-6">
                    Déjà un compte ?{" "}
                    <Link to="/login" className="text-orange-400 font-medium hover:underline">
                        Connectez-Vous
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Register;