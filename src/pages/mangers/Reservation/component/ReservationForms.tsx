import { Users, MessageSquare, UserCircle, AlertCircle, UserPlus } from "lucide-react";
import { useEffect } from "react";

const ReservationForms = ({
    form,
    setForm,
    handleChange,
    circuit,
    touristes = [],
    errors = {},
    setErrors = () => {},
    onAddTouriste,
}) => {

    useEffect(() => {
        if (Object.keys(errors).length === 0) return;
        const timer = setTimeout(() => setErrors({}), 3000);
        return () => clearTimeout(timer);
    }, [errors, setErrors]);

    const maxPersonnes = circuit?.nombreRestant ?? 99;

    const role = localStorage.getItem("role");
    const isAdminOrAgence = role === "ADMIN" || role === "AGENCE";

    return (
        <div className="py-4 space-y-5">
            <h2 className="text-lg font-bold text-gray-800">Détails de la réservation</h2>

            {isAdminOrAgence && (
                <div>
                    <label className="text-sm text-gray-500 flex items-center gap-1.5 mb-1.5">
                        <UserCircle className="w-4 h-4" /> Touriste
                    </label>

                    <div className="flex gap-2 items-stretch">
                        <select
                            name="touristeId"
                            value={form.touristeId || ""}
                            onChange={handleChange}
                            className={`flex-1 border rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#c1440e]/30 focus:border-[#c1440e] transition ${
                                errors.touristeId ? "border-red-400" : "border-gray-200"
                            }`}
                        >
                            <option value="">-- Sélectionner un touriste --</option>

                            {Array.isArray(touristes) &&
                                touristes
                                    .filter(t => t && t.id)
                                    .map((t) => (
                                        <option key={t.id} value={t.id}>
                                            {t.nomComplet ?? t.nom ?? `Touriste #${t.id}`}
                                        </option>
                                    ))
                            }
                        </select>

                        {onAddTouriste && (
                            <button
                                type="button"
                                onClick={onAddTouriste}
                                title="Créer un nouveau touriste"
                                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-dashed border-[#c1440e] text-[#c1440e] text-sm font-medium hover:bg-[#c1440e]/5 transition whitespace-nowrap"
                            >
                                <UserPlus className="w-4 h-4" />
                                Nouveau
                            </button>
                        )}
                    </div>

                    <ErrorMessage message={errors.touristeId} />
                </div>
            )}

            <div>
                <label className="text-sm text-gray-500 flex items-center gap-1.5 mb-2">
                    <Users className="w-4 h-4" /> Nombre de personnes
                </label>

                <div className="flex gap-3 items-center">
                    <CounterButton
                        onClick={() =>
                            setForm(p => ({
                                ...p,
                                nombrePersonne: Math.max(1, (p.nombrePersonne || 1) - 1)
                            }))
                        }
                        disabled={form.nombrePersonne <= 1}
                        label="−"
                    />

                    <span className="text-xl font-bold w-6 text-center">
                        {form.nombrePersonne || 1}
                    </span>

                    <CounterButton
                        onClick={() =>
                            setForm(p => ({
                                ...p,
                                nombrePersonne: Math.min(
                                    maxPersonnes,
                                    (p.nombrePersonne || 1) + 1
                                )
                            }))
                        }
                        disabled={form.nombrePersonne >= maxPersonnes}
                        label="+"
                    />

                    <span className="text-sm text-gray-400">max {maxPersonnes}</span>
                </div>

                <ErrorMessage message={errors.nombrePersonne} />
            </div>

            <div>
                <label className="text-sm text-gray-500 flex items-center gap-1.5 mb-1.5">
                    <MessageSquare className="w-4 h-4" /> Commentaire (optionnel)
                </label>

                <textarea
                    name="commentaire"
                    value={form.commentaire || ""}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Besoins spéciaux, allergies, demandes particulières..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white resize-none focus:outline-none focus:ring-2 focus:ring-[#c1440e]/30 focus:border-[#c1440e]"
                />

                <ErrorMessage message={errors.commentaire} />
            </div>
        </div>
    );
};

const ErrorMessage = ({ message }) => {
    if (!message) return null;
    return (
        <div className="flex items-center gap-1.5 mt-1.5 text-red-600 text-xs animate-fade-in">
            <AlertCircle size={13} className="flex-shrink-0" />
            <span>{message}</span>
        </div>
    );
};

const CounterButton = ({ onClick, disabled, label }) => (
    <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="w-10 h-10 flex items-center justify-center bg-black/10 border border-black/30 rounded-full hover:bg-black/20 disabled:opacity-30 disabled:cursor-not-allowed transition"
    >
        {label}
    </button>
);

export default ReservationForms;