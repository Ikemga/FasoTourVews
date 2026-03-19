import { Smartphone, CreditCard, Building2 } from "lucide-react";

export const CATEGORIES = [
    { id: "mobile",   label: "Mobile Money",   description: "Paiement rapide",    Icon: Smartphone },
    { id: "carte",    label: "Carte bancaire", description: "Visa / Mastercard",  Icon: CreditCard },
    { id: "virement", label: "Virement",       description: "Transfert bancaire", Icon: Building2  },
];

export const OPERATORS = [
    { id: "orange", label: "Orange Money", prefix: "+226 O7", color: "#FF6600" },
    { id: "moov",   label: "Moov Money",   prefix: "+226 O1", color: "#0057A8" },
    { id: "coris",  label: "Coris Money",  prefix: "+226 O5", color: "#1D6B4A" },
    { id: "mobi",   label: "Mobicash",     prefix: "+226 O6", color: "#D32F2F" },
];