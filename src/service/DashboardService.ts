import Api from "./api/Api";

const BASE = "dashboard";

// GET dashboard global
export const getDashboard = () => {
    return Api.get(`${BASE}/all`);
};

// GET stats utilisateur
export const getUserStats = () => {
    return Api.get(`${BASE}/utilisateur`);
};

// Stats globales
export const getReservationStats = () =>
    Api.get(`${BASE}/reservation`);

// Stats par mois
export const getReservationStatsByMois = (mois: number, annee: number) =>
    Api.get(`${BASE}/stats/mois`, { params: { mois, annee } });