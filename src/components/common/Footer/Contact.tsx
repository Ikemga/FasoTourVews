import { MapPin, Phone, Mail} from "lucide-react";


const Contact = () =>{

    return(
        <div className="text-left">
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                <MapPin size={16} className="text-[#C45A1C] mt-0.5 shrink-0" />
                <span>Avenue Kwamé Nkrumah<br />Ouagadougou, Burkina Faso</span>
                </li>
                <li className="flex items-center gap-2">
                <Phone size={16} className="text-[#C45A1C] shrink-0" />
                <span>+226 25 30 XX XX</span>
                </li>
                <li className="flex items-center gap-2">
                <Mail size={16} className="text-[#C45A1C] shrink-0" />
                <span>contact@fasotour.bf</span>
                </li>
            </ul>

            {/* Modes de paiement */}
            <p className="text-sm text-gray-500 mt-4 mb-2">Modes de paiement</p>
            <div className="flex gap-2">
                <span className="bg-[#3a2e22] border border-gray-600 text-gray-300 text-xs px-3 py-1.5 rounded-lg">Orange Money</span>
                <span className="bg-[#3a2e22] border border-gray-600 text-gray-300 text-xs px-3 py-1.5 rounded-lg">Moov Money</span>
            </div>
        </div>
    )
}

export default Contact;