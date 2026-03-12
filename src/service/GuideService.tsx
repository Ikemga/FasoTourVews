import Api from "./api/Api";

const BASE = "/guides";

// GET all guides
export const getGuides = () => {
    return Api.get(BASE);
};

// GET all guides ordered alphabetically (A → Z)
export const getGuidesAlphabetical = () => {
    return Api.get(`${BASE}/order/name/desc`);
};

// GET guide by id
export const getGuideById = (id) => {
    return Api.get(`${BASE}/${id}`);
};

// PUT update guide
export const putGuide = (id, guide) => {
    return Api.put(`${BASE}/${id}`, guide);
};

// DELETE guide
export const deleteGuide = (id) => {
    return Api.delete(`${BASE}/${id}`);
};

// PATCH toggle statut guide
export const toggleGuide = (id) => {
    return Api.patch(`${BASE}/${id}/toggle`);
};