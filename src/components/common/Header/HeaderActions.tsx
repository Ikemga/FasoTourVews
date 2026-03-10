import { Globe } from "lucide-react"
import { Link } from "react-router-dom"

const HeaderActions = () => {

    return (
        <div className="flex items-center gap-4 text-textDark">


            <div className="cursor-pointer p-2">
                <div className="flex items-center gap-3 text-textDark px-2 py-1 rounded-xl hover:bg-[#E7E2DC] transition">
                    <Globe className="w-5 h-5" />
                    <span>FR</span>
                </div>
            </div>


        <Link
            to="/register"
            className="hidden md:flex items-center gap-2 border-2 border-primary text-primary px-5 py-2 rounded-xl hover:bg-primary hover:text-white transition"
        >
            Inscription
        </Link>


        <Link
            to="/login"
            className="bg-primary text-white px-6 py-2 rounded-xl hover:bg-primaryDark transition shadow-md"
        >
            Connexion
        </Link>

        </div>
    )
}

export default HeaderActions