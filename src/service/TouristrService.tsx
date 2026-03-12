import Api from "./api/Api";

const BASE = "/touristes";

// GET all touristes
export const getTouristes = () => {
  return Api.get(BASE);
};

// GET all touristes ordered alphabetically (A → Z)
export const getTouristesAlphabetical = () => {
  return Api.get(`${BASE}/order/name/desc`);
};

// GET touriste by id
export const getTouristeById = (id) => {
  return Api.get(`${BASE}/${id}`);
};

// GET touriste by mail
export const getTouristeByMail = (mail) => {
  return Api.get(`${BASE}/mail/${mail}`);
};

// PUT update touriste
export const putTouriste = (id, touriste) => {
  return Api.put(`${BASE}/${id}`, touriste);
};

// DELETE touriste
export const deleteTouriste = (id) => {
  return Api.delete(`${BASE}/${id}`);
};

// PATCH toggle statut touriste
export const toggleTouriste = (id) => {
  return Api.patch(`${BASE}/${id}/toggle`);
};