import { Map } from "lucide-react"

const HeaderLogo = () => {
    return (
        <div className="flex items-center text-center gap-3 cursor-pointer">
        
            <div className="bg-primary w-8 h-8 rounded-full flex items-center justify-center shadow-md">
                <Map className="w-6 h-6 text-white" />
            </div>

            <h3 className="font-bold text-xx">
                <span className="text-white">Faso</span>
                <span className="text-primary">Tour</span>
            </h3>

        </div>
    )
}

export default HeaderLogo