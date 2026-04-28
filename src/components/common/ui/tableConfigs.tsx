import { Renderers } from "./DataTable";

// ─── Couleurs partagées ────────────────────────────────────────────────────────

const roleColors = {
  admin:    "border border-red-300 text-red-500 bg-red-50",
  guide:    "border border-orange-300 text-orange-500 bg-orange-50",
  touriste: "border border-teal-300 text-teal-600 bg-teal-50",
  gestion:  "border border-amber-300 text-amber-600 bg-amber-50",
};

const agenceStatutColors = {
  active:    "bg-emerald-600 text-white",
  inactive:  "border border-gray-300 text-gray-500 bg-white",
  suspendue: "border border-red-300 text-red-500 bg-red-50",
};

// ─── Utilisateurs ─────────────────────────────────────────────────────────────

export const utilisateursColumns = [
  {
    key: "nomComplet",
    label: "Utilisateur",
    cellClass: "px-5",
    headerClass: "px-5",
    render: Renderers.avatar,
  },
  { key: "mail",      label: "Email",      render: Renderers.muted },
  { key: "telephone", label: "Téléphone",  render: Renderers.subtle },
  {
    key: "roles",
    label: "Rôle",
    accessor: (row) =>
      Array.isArray(row.roles) ? row.roles.join(", ") : (row.roles ?? "—"),
    render: Renderers.badge(roleColors),
  },
  { key: "actif",    label: "Statut",     render: Renderers.boolStatut },
  { key: "createAt", label: "Inscrit le", render: Renderers.date },
];

// ─── Touristes ─────────────────────────────────────────────────────────

export const touristesColumns = [
  {
    key: "nomComplet",
    label: "Utilisateur",
    cellClass: "px-5",
    headerClass: "px-5",
    render: Renderers.avatar,
  },
  { key: "mail",      label: "Email",      render: Renderers.muted },
  { key: "telephone", label: "Téléphone",  render: Renderers.subtle },
  { key: "preferenceTouristique", label: "Préférence Touristique",  render: Renderers.subtle },
  { key: "actif",    label: "Statut",     render: Renderers.boolStatut },
  { key: "createAt", label: "Inscrit le", render: Renderers.date },
];


// ─── Guides touristes ─────────────────────────────────────────────────────────

export const guidesColumns = [
  {
    key: "nomComplet",
    label: "Guide",
    cellClass: "px-5",
    headerClass: "px-5",
    render: Renderers.avatar,
  },
  { key: "mail",        label: "Email",       render: Renderers.muted },
  { key: "telephone",   label: "Téléphone",   render: Renderers.subtle },
  { key: "specialite",  label: "Spécialité",  render: Renderers.subtle },
  { key: "experience",  label: "Experience",  render: Renderers.subtle },
  { key: "actif",    label: "Statut",     render: Renderers.boolStatut },
  { key: "createAt", label: "Inscrit le", render: Renderers.date },
];

// ─── Agences ──────────────────────────────────────────────────────────────────

export const agencesColumns = [
  {
    key: "nomComplet",
    label: "Agence",
    cellClass: "px-5",
    headerClass: "px-5",
    render: Renderers.avatar,
  },
  { key: "mail",      label: "Email",       render: Renderers.muted },
  { key: "telephone",  label: "Téléphone",   render: Renderers.subtle },
  { key: "numeroAgrement",  label: "Agrement",   render: Renderers.subtle },
  {key: "actif",label: "Statut",render: Renderers.boolStatut},
  { key: "createAt", label: "Créée le", render: Renderers.date },
];

const statutReservationColors = {
    EN_ATTENTE: "border border-amber-300 text-amber-600 bg-amber-50",
    CONFIRMEE:  "border border-emerald-300 text-emerald-600 bg-emerald-50",
    PARTIELLE:  "border border-blue-300 text-blue-600 bg-blue-50",
    ANNULEE:    "border border-red-300 text-red-500 bg-red-50",
    EXPIREE:    "border border-gray-300 text-gray-500 bg-gray-100",
};

const reservationsBaseColumns = [
    { key: "nomComplet",         label: "Touriste",        accessor: (row) => row.nomComplet  ?? row.touriste?.nomComplet  ?? "—", render: Renderers.avatar },
    { key: "reference",          label: "Référence",       cellClass: "px-5", headerClass: "px-5", render: Renderers.subtle },
    { key: "circuitName",        label: "Circuit",         accessor: (row) => row.circuitName ?? row.circuit?.circuitName ?? "—", render: Renderers.muted  },
    { key: "nombrePersonne",     label: "Personnes",       render: Renderers.subtle },
    { key: "prixCircuit",        label: "Prix circuit",    accessor: (row) => row.prixCircuit  != null ? `${row.prixCircuit.toLocaleString("fr-FR")} FCFA`  : "—", render: Renderers.subtle },
    { key: "montantTotal",       label: "Total",           accessor: (row) => row.montantTotal != null ? `${row.montantTotal.toLocaleString("fr-FR")} FCFA` : "—", render: Renderers.subtle },
    { key: "dateResevation",     label: "Réservé le",      render: Renderers.date },
    { key: "dateLimitePaiement", label: "Limite paiement", render: Renderers.date },
];

export const reservationsColumns = [
    ...reservationsBaseColumns,
    { key: "statut", label: "Statut", render: Renderers.badge(statutReservationColors) },
];

export const reservationsEnAttenteColumns  = [...reservationsBaseColumns];
export const reservationsConfirmeesColumns = [...reservationsBaseColumns];
export const reservationsPartiellesColumns = [...reservationsBaseColumns];
export const reservationsAnnuleesColumns   = [...reservationsBaseColumns];
export const reservationsExpireesColumns   = [...reservationsBaseColumns];

const statutPaiementColors = {
    PAYE:    "border border-emerald-300 text-emerald-600 bg-emerald-50",
    PARTIEL: "border border-blue-300   text-blue-600    bg-blue-50",
    IMPAYE:  "border border-red-300    text-red-500     bg-red-50",
};

const paiementsBaseColumns = [
    { key: "referencePaie",     label: "Référence",      cellClass: "px-5", headerClass: "px-5",                                                                                                    render: Renderers.subtle },
    //{ key: "reservationId",     label: "Réservation",    accessor: (row) => row.reservationId  != null ? `#${row.reservationId}`                                                         : "—",      render: Renderers.subtle },
    { key: "montant",           label: "Montant total",  accessor: (row) => row.montant        != null ? `${row.montant.toLocaleString("fr-FR")} FCFA`                                   : "—",      render: Renderers.subtle },
    { key: "montantPaye",       label: "Montant payé",   accessor: (row) => row.montantPaye    != null ? `${row.montantPaye.toLocaleString("fr-FR")} FCFA`                               : "—",      render: Renderers.subtle },
    { key: "resteAPayer",       label: "Reste à payer",  accessor: (row) => row.montant        != null && row.montantPaye != null ? `${(row.montant - row.montantPaye).toLocaleString("fr-FR")} FCFA` : "—", render: Renderers.subtle },
    { key: "datePaiement",      label: "Date paiement",                                                                                                                                             render: Renderers.date   },
    //{ key: "statutDescription", label: "Description",    accessor: (row) => row.statutDescription ?? "—",                                                                                           render: Renderers.muted  },
];

export const paiementsColumns          = [...paiementsBaseColumns, { key: "statut", label: "Statut", render: Renderers.badge(statutPaiementColors) }];

export const paiementsPayesColumns    = [...paiementsBaseColumns];
export const paiementsPartielsColumns = [...paiementsBaseColumns];
export const paiementsImpayesColumns  = [...paiementsBaseColumns];