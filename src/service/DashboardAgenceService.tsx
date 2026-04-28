// service/DashboardAgenceService.ts
import Api from "./api/Api";

// ── Dashboard global ───────────────────────────────
export const getDashboardAgence = async () => {
    const { data } = await Api.get("/dashboard/agence");
    return data;
};

// ── Stats paiements (total, payés, partiels, impayés) ──
export const getPaiementStatsAg = async () => {
    const { data } = await Api.get("/dashboard/agence/paiements/stats");
    return data;
};

// ── Liste complète des paiements ────────────────────
export const getPaiements = async () => {
    const { data } = await Api.get("/dashboard/agence/paiements");
    return data;
};

// ── Liste des paiements filtrée par statut ──────────
export const getPaiementsByAgStatut = async (statut) => {
    const { data } = await Api.get(`/dashboard/agence/paiements/statut/${statut}`);
    return data;
};

// ── Nombre de paiements par statut ──────────────────
export const getPaiementCountByStatutAg = async () => {
    const { data } = await Api.get("/dashboard/agence/paiements/count");
    return data;
};

export const getCircuitsParMois = async () => {
    const { data } = await Api.get("/dashboard/agence/circuits/par/mois");
    return data;
};

export const getTauxReservationCircuits = async () => {
    const { data } = await Api.get("/dashboard/agence/circuits/taux/reservation");
    return data;
};