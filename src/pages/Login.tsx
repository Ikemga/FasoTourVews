import { Eye, EyeOff, Lock, Mail, StoreIcon } from "lucide-react";
import { InputText, Label, LogeTitle } from "../components/common/ui/Input";
import bgImage from "../components/common/img/Paysage burkinabé.jpeg";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../service/AuthService";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);

        const email = formData.get("email");
        const password = formData.get("password");


        try {
            const data = await login(email, password);

            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);

            navigate("/index");
            } catch (error) {
                console.error("Erreur connexion :", error);
                alert("Email ou mot de passe incorrect.");
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
                className="relative w-full max-w-md p-8 rounded-3xl shadow-2xl
                        bg-white backdrop-blur-xl border border-white/20"
            >
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-[#C45A1C] p-5 rounded-3xl shadow-lg">
                        <StoreIcon className="text-white" size={32} />
                    </div>
                    <LogeTitle
                        Title="Se connecter"
                        Describe="Accédez à votre espace touristique"
                    />
                </div>

                <form onSubmit={handleSubmit} className="space-y-3 mt-3 text-gray-500">

                    {/* Email */}
                    <div>
                        <div className="flex items-center gap-2 font-medium mb-2">
                            <Mail size={18} />
                            <Label label="Email" />
                        </div>
                        <InputText
                            type="email"
                            name="email"
                            placeholder="example@gmail.com"
                        />
                    </div>

                    {/* Mot de passe */}
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

                    {/* Options */}
                    <div className="flex justify-between items-center text-sm">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="accent-orange-500" />
                            Se souvenir de moi
                        </label>
                        <a href="#" className="text-orange-400 hover:underline">
                            Mot de passe oublié ?
                        </a>
                    </div>

                    {/* Bouton animé */}
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-xl font-semibold text-white bg-[#C45A1C]
                                shadow-sm hover:shadow-orange-500/40 transition"
                    >
                        {loading ? "Connexion..." : "Se connecter"}
                        
                    </motion.button>
                </form>

                <p className="text-center text-gray-500 mt-6">
                    Pas encore de compte ?{" "}
                    <Link
                        to="/register"
                        className="text-orange-400 font-medium hover:underline"
                    >
                        Créer un compte
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;