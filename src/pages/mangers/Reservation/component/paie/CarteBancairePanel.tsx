import { CreditCard } from "lucide-react";

const CarteBancairePanel = ({ holder, setHolder }) => (
    <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-50 border border-purple-100 rounded-lg flex items-center justify-center">
                <CreditCard size={16} className="text-purple-600" />
            </div>
            <h3 className="font-bold text-gray-900 text-base">Informations de la carte</h3>
        </div>

        <div>
            <label className="text-sm text-gray-700 mb-2 block font-medium">Numéro de carte</label>
            <input
                type="text"
                placeholder="•••• •••• •••• ••••"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#c1440e]/30 focus:border-[#c1440e] font-mono"
            />
        </div>

        <div className="grid grid-cols-2 gap-3">
            <div>
                <label className="text-sm text-gray-700 mb-2 block font-medium">Expiration</label>
                <input
                    type="text"
                    placeholder="MM / AA"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#c1440e]/30 focus:border-[#c1440e]"
                />
            </div>
            <div>
                <label className="text-sm text-gray-700 mb-2 block font-medium">CVV</label>
                <input
                    type="text"
                    placeholder="•••"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#c1440e]/30 focus:border-[#c1440e]"
                />
            </div>
        </div>

        <div>
            <label className="text-sm text-gray-700 mb-2 block font-medium">Nom du titulaire</label>
            <input
                type="text"
                value={holder}
                onChange={e => setHolder(e.target.value)}
                placeholder="Nom complet"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#c1440e]/30 focus:border-[#c1440e]"
            />
        </div>
    </div>
);

export default CarteBancairePanel;