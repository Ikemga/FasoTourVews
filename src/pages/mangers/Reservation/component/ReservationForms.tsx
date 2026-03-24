import { Users, MessageSquare, UserCircle } from "lucide-react";

const ReservationForms = ({
    form,
    setForm,
    handleChange,
    circuit,
    touristes = [],
}) => {
    return (
        <div className="py-4 space-y-5">
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
        </div>
    );
};

export default ReservationForms;