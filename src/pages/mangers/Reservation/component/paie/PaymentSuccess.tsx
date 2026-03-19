import { ArrowLeft, CheckCircle, Printer, Download } from "lucide-react";
import { useRef } from "react";

const PaymentSuccess = ({ circuit, reservationData, total, methodLabel, phone, holder, onSuccess }) => {
    const invoiceRef = useRef(null);

    const handlePrint = () => {
        const num = Date.now().toString().slice(-6);
        const win = window.open("", "_blank", "width=800,height=900");
        win.document.write(`
            <html><head><title>Facture FasoTour</title>
            <style>
                * { margin:0; padding:0; box-sizing:border-box; }
                body { font-family:'Helvetica Neue',Arial,sans-serif; color:#1a1a1a; padding:40px; }
                .header { display:flex; justify-content:space-between; padding-bottom:20px; border-bottom:3px solid #c1440e; }
                .brand { font-size:26px; font-weight:900; color:#c1440e; }
                .brand span { color:#1a1a1a; }
                .badge { display:inline-block; background:#d1fae5; color:#065f46; border-radius:20px; padding:3px 12px; font-size:11px; font-weight:700; margin-top:4px; }
                .section { margin-top:24px; }
                .section h3 { font-size:10px; text-transform:uppercase; letter-spacing:1.5px; color:#999; margin-bottom:8px; }
                .row { display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #f0f0f0; font-size:13px; }
                .row .v { font-weight:600; }
                .total-box { background:#fff8f5; border:2px solid #c1440e; border-radius:10px; padding:16px 20px; margin-top:24px; display:flex; justify-content:space-between; align-items:center; }
                .total-box .amount { font-size:28px; font-weight:900; color:#c1440e; }
                .footer { margin-top:36px; text-align:center; font-size:11px; color:#aaa; padding-top:16px; border-top:1px solid #eee; line-height:1.8; }
                @media print { body { padding:20px; } }
            </style></head><body>
            <div class="header">
                <div><div class="brand">Faso<span>Tour</span></div><div style="font-size:12px;color:#888;margin-top:3px;">Tourisme &amp; Voyages au Burkina Faso</div></div>
                <div style="text-align:right">
                    <div style="font-size:14px;color:#666;font-weight:600;">FACTURE</div>
                    <div style="font-size:20px;font-weight:700;">#FT-${num}</div>
                    <div class="badge">&#10003; Payé</div>
                </div>
            </div>
            <div class="section"><h3>Circuit</h3>
                <div class="row"><span>Nom</span><span class="v">${circuit?.circuitName ?? "—"}</span></div>
                <div class="row"><span>Durée</span><span class="v">${circuit?.duree ?? "—"} jours</span></div>
                <div class="row"><span>Prix unitaire</span><span class="v">${circuit?.prixIndividuel?.toLocaleString('fr-FR') ?? "—"} FCFA</span></div>
            </div>
            <div class="section"><h3>Réservation</h3>
                <div class="row"><span>Personnes</span><span class="v">${reservationData?.nombrePersonne ?? "—"}</span></div>
                <div class="row"><span>Date</span><span class="v">${reservationData?.dateResevation ?? "—"}</span></div>
                <div class="row"><span>Mode de paiement</span><span class="v">${methodLabel}</span></div>
                ${phone  ? `<div class="row"><span>Numéro</span><span class="v">${phone}</span></div>` : ""}
                ${holder ? `<div class="row"><span>Titulaire</span><span class="v">${holder}</span></div>` : ""}
            </div>
            <div class="total-box">
                <span style="font-size:14px;color:#555;">Montant payé</span>
                <span class="amount">${total?.toLocaleString('fr-FR') ?? "—"} FCFA</span>
            </div>
            <div class="footer">FasoTour · Ouagadougou, Burkina Faso · contact@fasotour.bf<br/>Merci pour votre confiance. Cette facture fait foi de votre paiement.</div>
            </body></html>
        `);
        win.document.close();
        win.focus();
        setTimeout(() => win.print(), 400);
    };

    return (
        <div className="min-h-screen bg-[#F5F0EB] flex flex-col items-center justify-center px-6 gap-6 py-12">
            {/* Icône succès */}
            <div className="relative">
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center">
                    <CheckCircle className="text-green-500 w-12 h-12" />
                </div>
                <div className="absolute -top-1 -right-1 w-7 h-7 bg-[#c1440e] rounded-full flex items-center justify-center text-white text-xs font-bold">✓</div>
            </div>

            <div className="text-center">
                <h2 className="text-2xl font-black text-gray-900 mb-1">Paiement validé !</h2>
                <p className="text-gray-500 text-sm">
                    Réservation pour <strong>{circuit?.circuitName}</strong> confirmée.
                </p>
            </div>

            {/* Facture */}
            <div ref={invoiceRef} className="w-full max-w-md bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="bg-[#c1440e] px-5 py-4 flex justify-between items-center text-white">
                    <div>
                        <p className="font-black text-lg">FasoTour</p>
                        <p className="text-orange-100 text-xs">Tourisme &amp; Voyages</p>
                    </div>
                    <div className="text-right">
                        <p className="text-orange-100 text-xs">FACTURE</p>
                        <p className="font-mono font-bold text-sm">#FT-{Date.now().toString().slice(-6)}</p>
                    </div>
                </div>

                <div className="px-5 py-4 space-y-2.5">
                    {[
                        ["Circuit",    circuit?.circuitName],
                        ["Personnes",  reservationData?.nombrePersonne],
                        ["Date",       reservationData?.dateResevation],
                        ["Paiement",   methodLabel],
                        ...(phone  ? [["Numéro",    phone]]  : []),
                        ...(holder ? [["Titulaire", holder]] : []),
                    ].map(([l, v]) => (
                        <div key={l} className="flex justify-between text-sm">
                            <span className="text-gray-400">{l}</span>
                            <span className="font-semibold text-gray-800">{v}</span>
                        </div>
                    ))}
                </div>

                <div className="mx-5 mb-4 bg-orange-50 border border-orange-100 rounded-xl px-4 py-3 flex justify-between items-center">
                    <span className="text-sm text-gray-500">Montant payé</span>
                    <span className="text-xl font-black text-[#c1440e]">{total?.toLocaleString('fr-FR')} FCFA</span>
                </div>

                <div className="px-5 pb-4">
                    <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-100 rounded-xl px-3 py-2">
                        <CheckCircle size={14} />
                        <span className="text-xs font-semibold">Paiement confirmé</span>
                    </div>
                </div>
            </div>

            {/* Boutons */}
            <div className="w-full max-w-md grid grid-cols-2 gap-3">
                <button onClick={handlePrint} className="flex items-center justify-center gap-2 bg-white border-2 border-gray-200 text-gray-700 px-4 py-3 rounded-xl font-bold hover:bg-gray-50 transition text-sm">
                    <Printer size={15} /> Imprimer
                </button>
                <button onClick={handlePrint} className="flex items-center justify-center gap-2 bg-white border-2 border-gray-200 text-gray-700 px-4 py-3 rounded-xl font-bold hover:bg-gray-50 transition text-sm">
                    <Download size={15} /> Télécharger
                </button>
            </div>

            <button
                onClick={onSuccess}
                className="w-full max-w-md flex items-center justify-center gap-2 bg-[#c1440e] text-white px-6 py-3.5 rounded-xl font-bold hover:bg-[#a83a0c] transition"
            >
                <ArrowLeft size={17} /> Retour aux circuits
            </button>
        </div>
    );
};

export default PaymentSuccess;