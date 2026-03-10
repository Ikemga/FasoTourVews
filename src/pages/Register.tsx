import { Compass, Eye, EyeOff, Globe, Lock, MailCheck, MapPinHouseIcon, PhoneCall, StoreIcon, User } from "lucide-react";
import { InputText, Label, LogeTitle } from "../components/common/ui/Input";
import bgImage from "../components/common/img/Paysage burkinabé.jpeg";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
        const [showPassword, setShowPassword] = useState(false);

        const navigate = useNavigate();
        const handleSubmit= (e) => {
            e.preventDefault();
            navigate("/login");
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

                <form className="space-y-3 mt-3 text-gray-500">

                    {/* Nom + Adresse */}
                    <div className="flex w-full items-start gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 font-medium mb-2">
                                <User size={18} />
                                <Label label="Nom complet" />
                            </div>
                            <InputText
                                type="text"
                                name="fullName"
                                placeholder="SAWADOGO Smith"
                            />
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center gap-2 font-medium mb-2">
                                <MapPinHouseIcon size={18} />
                                <Label label="Adresse" />
                            </div>
                            <InputText
                                type="text"
                                name="address"
                                placeholder="Ouagadougou secteur 04"
                            />
                        </div>
                    </div>

                    {/* Mail + Contact */}
                    <div className="flex w-full items-start gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 font-medium mb-2">
                                <MailCheck size={18} />
                                <Label label="Mail" />
                            </div>
                            <InputText
                                type="email"
                                name="email"
                                placeholder="example@gami.com"
                            />
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center gap-2 font-medium mb-2">
                                <PhoneCall size={18} />
                                <Label label="Contact" />
                            </div>
                            <InputText
                                type="tel"
                                name="phone"
                                placeholder="+226 00 00 00 00"
                            />
                        </div>
                    </div>

                    {/* Pays  */}

                    <div className="flex-1">
                            <div className="flex items-center gap-2 font-medium mb-2">
                                <Globe size={18} />
                                <Label label="Pays" />
                            </div>
                            <InputText
                                type="text"
                                name="country"
                                placeholder="Burkina Faso"
                            />
                    </div>
                    {/*  Préférence touristique */}
                    <div className="flex-1">
                            <div className="flex items-center gap-2 font-medium mb-2">
                                <Compass size={18} />
                                <Label label="Préférence touristique" />
                            </div>
                            <InputText
                                type="text"
                                name="preference"
                                placeholder="Culturel, Historique"
                            />
                        </div>

                    {/* Mot de passe + Confirmation */}
                    
                    <div>
                        <div className="flex items-center gap-2 font-medium mb-2">
                            <Lock size={18} />
                            <Label label="Mot de passe" />
                        </div>
                        <div className="relative">
                            <InputText
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="••••••••"
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

                    <div>
                        <div className="flex items-center gap-2 font-medium mb-2">
                            <Lock size={18} />
                            <Label label="Confirmer Mot de passe" />
                        </div>
                        <div className="relative">
                            <InputText
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="••••••••"
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
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full py-3 rounded-xl font-semibold text-white bg-[#C45A1C]
                                shadow-lg hover:shadow-orange-500/40 transition"
                    >
                        Créer
                    </motion.button>
                </form>

                <p className="text-center text-gray-500 mt-6">
                    Déjà un compte ?{" "}
                    <Link
                        to="/login"
                        className="text-orange-400 font-medium hover:underline"
                    >
                        Connectez-Vous
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Register;