import { X, CreditCard, Calendar, Hash, Banknote, Clock, ReceiptText, Download } from "lucide-react";

interface DetailPaiement {
  id: number;
  montant: number;
  montantPaye: number;
  montantRestant: number;
  datePaiement: string | null;
  dateRemboursement: string | null;
  referencePaie: string;
  modePaiement: string | null;
  statut: string;
  statutDescription: string;
  facture: string | null;
  reservationId: number;
  // champs nécessaires pour PaymentPage
  circuitNom?: string;
  circuitId?: number;
  prixUnitaire?: number;
  nombrePersonne?: number;
}

interface PaymentDetailDrawerProps {
  paiement: DetailPaiement | null;
  onClose: () => void;
  onPayer?: (paiement: DetailPaiement) => void;
}

const statutConfig: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  IMPAYE: {
    label: "Impayé",
    bg: "bg-red-50",
    text: "text-red-600",
    dot: "bg-red-500",
  },
  PAYE: {
    label: "Payé",
    bg: "bg-green-50",
    text: "text-green-600",
    dot: "bg-green-500",
  },
  PARTIEL: {
    label: "Partiel",
    bg: "bg-amber-50",
    text: "text-amber-600",
    dot: "bg-amber-500",
  },
  REMBOURSE: {
    label: "Remboursé",
    bg: "bg-blue-50",
    text: "text-blue-600",
    dot: "bg-blue-500",
  },
};

const formatDate = (date: string | null) =>
  date
    ? new Date(date).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "—";

const formatMontant = (montant: number) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF",
    maximumFractionDigits: 0,
  }).format(montant);

const Row = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
}) => (
  <div className="flex items-start justify-between gap-4 py-3 border-b border-gray-100 last:border-0">
    <div className="flex items-center gap-2 text-sm text-gray-500 min-w-[160px]">
      {icon && <span className="text-gray-400">{icon}</span>}
      {label}
    </div>
    <div className="text-sm font-medium text-gray-800 text-right">{value}</div>
  </div>
);

const PaymentDetailDrawer = ({
  paiement,
  onClose,
  onPayer,
}: PaymentDetailDrawerProps) => {
  if (!paiement) return null;

  const statut = statutConfig[paiement.statut] ?? {
    label: paiement.statut,
    bg: "bg-gray-100",
    text: "text-gray-600",
    dot: "bg-gray-400",
  };

  const progressPercent =
    paiement.montant > 0
      ? Math.min(100, Math.round((paiement.montantPaye / paiement.montant) * 100))
      : 0;

  const estSolde = paiement.statut === "PAYE";

  const handleTelecharger = () => {
    if (!paiement.facture) return;
    const link = document.createElement("a");
    link.href = paiement.facture;
    link.download = `facture-${paiement.referencePaie}.pdf`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

    return (
        <>
        {/* Overlay */}
        <div
            className="fixed inset-0 bg-black/30 z-40 transition-opacity"
            onClick={onClose}
        />

        {/* Drawer */}
        <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                <CreditCard size={18} className="text-primary" />
                </div>
                <div>
                <p className="text-sm font-semibold text-gray-800">Détail du paiement</p>
                <p className="text-xs text-gray-400">{paiement.referencePaie}</p>
                </div>
            </div>
            <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
            >
                <X size={16} />
            </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

            {/* Statut */}
            <div className={`flex items-start gap-3 rounded-xl p-4 ${statut.bg}`}>
                <span className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${statut.dot}`} />
                <div>
                <p className={`text-sm font-semibold ${statut.text}`}>{statut.label}</p>
                <p className={`text-xs mt-0.5 ${statut.text} opacity-80`}>
                    {paiement.statutDescription}
                </p>
                </div>
            </div>

            {/* Montants */}
            <div className="rounded-xl border border-gray-100 overflow-hidden">
                <div className="grid grid-cols-3 divide-x divide-gray-100">
                {[
                    { label: "Total",   value: formatMontant(paiement.montant) },
                    { label: "Payé",    value: formatMontant(paiement.montantPaye) },
                    { label: "Restant", value: formatMontant(paiement.montantRestant) },
                ].map(({ label, value }) => (
                    <div key={label} className="flex flex-col items-center py-4 px-2">
                    <span className="text-xs text-gray-400 mb-1">{label}</span>
                    <span className="text-sm font-semibold text-gray-800">{value}</span>
                    </div>
                ))}
                </div>

                {/* Barre de progression */}
                <div className="px-4 pb-4 pt-1">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Progression</span>
                    <span>{progressPercent}%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                    />
                </div>
                </div>
            </div>

            {/* Détails */}
            <div className="rounded-xl border border-gray-100 px-4 py-1">
                <Row
                label="Référence"
                icon={<Hash size={14} />}
                value={<span className="font-mono text-xs">{paiement.referencePaie}</span>}
                />
                <Row
                label="Réservation #"
                icon={<ReceiptText size={14} />}
                value={paiement.reservationId}
                />
                <Row
                label="Mode de paiement"
                icon={<Banknote size={14} />}
                value={
                    paiement.modePaiement ?? (
                    <span className="text-gray-400 font-normal">Non renseigné</span>
                    )
                }
                />
                <Row
                label="Date de paiement"
                icon={<Calendar size={14} />}
                value={formatDate(paiement.datePaiement)}
                />
                <Row
                label="Date remboursement"
                icon={<Clock size={14} />}
                value={formatDate(paiement.dateRemboursement)}
                />
                <Row
                label="Facture"
                icon={<ReceiptText size={14} />}
                value={
                    paiement.facture ? (
                    <button
                        onClick={handleTelecharger}
                        className="flex items-center gap-1.5 text-xs text-primary hover:underline font-medium"
                    >
                        <Download size={13} />
                        Télécharger
                    </button>
                    ) : (
                    <span className="text-gray-400 font-normal">Aucune</span>
                    )
                }
                />
            </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex flex-col gap-2">

            {/* Bouton Payer — masqué si déjà soldé */}
            {!estSolde && onPayer && (
                <button
                onClick={() => {
                    onClose();
                    onPayer(paiement);
                }}
                className="w-full py-2.5 rounded-xl bg-[#c1440e] text-white text-sm font-semibold hover:bg-[#a83a0c] transition-colors"
                >
                Payer — {formatMontant(paiement.montantRestant)}
                </button>
            )}

            {/* Bouton Télécharger — visible uniquement si facture disponible */}
            {paiement.facture && (
                <button
                onClick={handleTelecharger}
                className="w-full py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                <Download size={15} />
                Télécharger la facture
                </button>
            )}

            {/* Bouton Fermer */}
            <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition-colors"
            >
                Fermer
            </button>
            </div>
        </div>
        </>
    );
    };  

export default PaymentDetailDrawer;