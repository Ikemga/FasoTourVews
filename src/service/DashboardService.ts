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