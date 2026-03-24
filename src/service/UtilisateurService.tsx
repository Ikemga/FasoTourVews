import Api from "./api/Api";

const BASE = "/utilisateurs";

// Tous les utilisateurs
export const getUsers = () => {
    return Api.get(BASE);
};

// Plus récents
export const getUsersByRecent = () => {
    return Api.get(`${BASE}/order/date/desc`);
};

// A → Z
export const getUsersByNameAsc = () => {
    return Api.get(`${BASE}/order/name/asc`);
};

// Z → A
export const getUsersByNameDesc = () => {
    return Api.get(`${BASE}/order/name/desc`);
};

// compter par role
export const countUsersByRole = (role) => {
    return Api.get(`${BASE}/count/${role}`);
};

// compter par role
export const countAllUsers = () => {
    return Api.get(`${BASE}/count`);
};

// Recherche : /v1/utilisateurs/search?search=Koné&actif=true
export const searchUsers = (search?: string, actif?: boolean) => {
    const params: Record<string, string> = {};
    if (search) params.search = search;
    if (actif !== undefined) params.actif = String(actif);
    return Api.get(`${BASE}/search`, { params });
};

export const deleteUtilisateur = (id) => {
    return Api.delete(`${BASE}/${id}`);
};