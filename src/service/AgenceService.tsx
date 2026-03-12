import Api from "./api/Api";

const BASE = "/agences";

// GET all agences
export const getAgences = () => {
  return Api.get(BASE);
};

// GET all agences ordered alphabetically (A → Z)
export const getAgencesAlphabetical = () => {
  return Api.get(`${BASE}/order/name/desc`);
};

// GET agence by id
export const getAgenceById = (id) => {
  return Api.get(`${BASE}/${id}`);
};

// POST create agence
export const postAgence = (agence) => {
  return Api.post(BASE, agence);
};

// PUT update agence
export const putAgence = (id, agence) => {
  return Api.put(`${BASE}/${id}`, agence);
};

// DELETE agence
export const deleteAgence = (id) => {
  return Api.delete(`${BASE}/${id}`);
};

// PATCH toggle statut agence
export const toggleAgence = (id) => {
  return Api.patch(`${BASE}/${id}/toggle`);
};