import { Smartphone, Phone, ShieldCheck, Code } from "lucide-react";
import OperatorCard  from "./OperatorCard";
import { OPERATORS } from "./Paymentconstants";
import { InputText } from "../../../../../components/common/ui/Input";

const MobileMoneyPanel = ({ operator, setOperator, phone, setPhone, holder, setHolder }) => {
    const selectedOp = OPERATORS.find(o => o.id === operator);

    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
            {/* Titre */}
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-50 border border-orange-200 rounded-lg flex items-center justify-center">
                    <Smartphone size={16} className="text-[#c1440e]" />
                </div>
                <h3 className="font-bold text-gray-900 text-base">Choisissez votre opérateur</h3>
            </div>

            {/* Grille opérateurs */}
            <div className="grid grid-cols-2 gap-3">
                {OPERATORS.map(op => (
                    <OperatorCard
                        key={op.id}
                        op={op}
                        selected={operator === op.id}
                        onClick={() => setOperator(op.id)}
                    />
                ))}
            </div>

            <hr className="border-gray-100" />

            {/* Numéro */}
            <div>
                <label className="text-sm text-gray-700 flex items-center gap-1.5 mb-2 font-medium">
                    <Phone size={14} /> Numéro de téléphone
                </label>
                <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder={`${selectedOp?.prefix ?? "+226"} XX XX XX`}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#c1440e]/30 focus:border-[#c1440e]"
                />
            </div>

            {/* OTP */}

            <div>
                <label className="text-sm text-gray-700 flex items-center gap-1.5 mb-2 font-medium">
                    <Code size={14} /> Code OTP
                </label>
                <InputText
                    type="number"
                    value={holder}
                    onChange={e => setHolder(e.target.value)}
                    placeholder="Code OTP"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#c1440e]/30 focus:border-[#c1440e]"
                />

            </div>
            {/* Note PIN */}
            <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 flex items-start gap-2 text-xs text-gray-500" >
                <ShieldCheck size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
                Vous recevrez un code OTP de validation sur votre téléphone.{selectedOp?.label}.
            </div>
            <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 flex items-start gap-2 text-xs text-gray-500" >
                <ShieldCheck size={14} className="text-red-400 mt-0.5 shrink-0" />
                Aucun rembourssement n'est possibele après validation du paiement.{selectedOp?.label}.
            </div>
        </div>
    );
};

export default MobileMoneyPanel;