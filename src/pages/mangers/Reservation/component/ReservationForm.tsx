import { Users, CalendarDays, MessageSquare, CreditCard, UserCircle } from "lucide-react";
import { DateInput } from "../../../../components/common/ui/Input";

const ReservationForm = ({
    form,
    setForm,
    handleChange,
    handleSubmit,
    total,
    circuit,
    loading,
    error,
    touristes = [],
}) => {
    return (
        <div className="space-y-5">
            <h2 className="text-lg font-bold text-gray-800">Détails de la réservation</h2>

            {/* Sélecteur touriste (admin) */}
            <div>
                <label className="text-sm text-gray-500 flex items-center gap-1.5 mb-1.5">
                    <UserCircle className="w-4 h-4" /> Touriste
                </label>
                <select
                    name="touristeId"
                    value={form.touristeId}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#c1440e]/30 focus:border-[#c1440e]"
                >
                    <option value="">-- Sélectionner un touriste --</option>
                    {touristes.map(t => (
                        <option key={t.id} value={t.id}>
                            {t.nomComplet ?? t.nom ?? `Touriste #${t.id}`}
                        </option>
                    ))}
                </select>
            </div>

            {/* Nombre de personnes */}
            <div>
                <label className="text-sm text-gray-500 flex items-center gap-1.5 mb-2">
                    <Users className="w-4 h-4" /> Nombre de personnes
                </label>
                <div className="flex gap-3 items-center">
                    <button
                        type="button"
                        onClick={() =>
                            setForm(p => ({
                                ...p,
                                nombrePersonne: Math.max(1, p.nombrePersonne - 1)
                            }))
                        }
                        className="w-10 h-10 flex items-center justify-center bg-black/10 border border-black/30 rounded-full hover:bg-black/20 transition"
                    >−</button>

                    <span className="text-xl font-bold w-6 text-center">{form.nombrePersonne}</span>

                    <button
                        type="button"
                        onClick={() =>
                            setForm(p => ({
                                ...p,
                                nombrePersonne: Math.min(
                                    circuit.nombreRestant ?? 99,
                                    p.nombrePersonne + 1
                                )
                            }))
                        }
                        className="w-10 h-10 flex items-center justify-center bg-black/10 border border-black/30 rounded-full hover:bg-black/20 transition"
                    >+</button>

                    <span className="text-sm text-gray-400">max {circuit.nombreRestant}</span>
                </div>
            </div>

            {/* Date de réservation */}
            <div>
                <label className="text-sm text-gray-500 flex items-center gap-1.5 mb-1.5">
                    <CalendarDays className="w-4 h-4" /> Date de réservation
                </label>
                <DateInput
                    name="dateResevation"
                    value={form.dateResevation}
                    onChange={handleChange}
                />
            </div>

            {/* Limite de paiement */}
            <div>
                <label className="text-sm text-gray-500 flex items-center gap-1.5 mb-1.5">
                    <CalendarDays className="w-4 h-4" /> Limite de paiement
                </label>
                <DateInput
                    name="dateLimitePaiement"
                    value={form.dateLimitePaiement}
                    onChange={handleChange}
                />
            </div>

            {/* Commentaire */}
            <div>
                <label className="text-sm text-gray-500 flex items-center gap-1.5 mb-1.5">
                    <MessageSquare className="w-4 h-4" /> Commentaire (optionnel)
                </label>
                <textarea
                    name="commentaire"
                    value={form.commentaire}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Besoins spéciaux, allergies, demandes particulières..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white resize-none focus:outline-none focus:ring-2 focus:ring-[#c1440e]/30 focus:border-[#c1440e]"
                />
            </div>

            {/* Erreur */}
            {error && (
                <p className="text-sm text-red-500 bg-red-50 border border-red-100 px-4 py-3 rounded-xl">
                    {error}
                </p>
            )}

            {/* Total + bouton */}
            <div className="border border-black/20 p-4 rounded-2xl">
                <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-500 text-sm">
                        {form.nombrePersonne} × {circuit.prixIndividuel?.toLocaleString('fr-FR')} FCFA
                    </span>
                    <span className="text-2xl text-primary font-bold">
                        {total.toLocaleString('fr-FR')} FCFA
                    </span>
                </div>
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-[#c1440e] text-white p-3 rounded-xl flex justify-center items-center gap-2 hover:bg-[#a83a0c] transition disabled:opacity-60"
                >
                    {loading
                        ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        : <CreditCard size={16} />
                    }
                    Payer
                </button>
            </div>
        </div>
    );
};

export default ReservationForm;