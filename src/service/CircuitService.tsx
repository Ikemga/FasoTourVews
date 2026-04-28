import Api from "./api/Api";

// ── CRUD de base ──────────────────────────────────────────────────────────────

export const getCircuit = ()                => Api.get("/circuits");
export const getCircuitById = (id)          => Api.get(`/circuits/${id}`);
export const getCircuitByName = (name)      => Api.get(`/circuits/name/${name}`);

export const postCircuit = (formData) =>
    Api.post("/circuits", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });

export const putCircuit = (id, formData) =>
    Api.put(`/circuits/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });

export const deleteCircuit = (id) => Api.delete(`/circuits/${id}`);

// ── Pagination & Recherche ────────────────────────────────────────────────────

export const getCircuitsByPage = (page = 0, size = 10) =>
    Api.get("/circuits/page", { params: { page, size } });

export const searchCircuit = (query) =>
    Api.get("/circuits/search", { params: { name: query } });

// ── Tri ───────────────────────────────────────────────────────────────────────

export const getCircuitsByDateDesc = () => Api.get("/circuits/order/date/desc");
export const getCircuitsByDateAsc  = () => Api.get("/circuits/order/date/asc");
export const getCircuitsByNameAsc  = () => Api.get("/circuits/order/name/asc");
export const getCircuitsByNameDesc = () => Api.get("/circuits/order/name/desc");

// ── Filtres par statut ────────────────────────────────────────────────────────

export const getCircuitsByStatut = (statut) =>
    Api.get("/circuits", { params: { statut } });

// Routes dédiées par statut
export const getCircuitsActifs    = () => Api.get("/circuits/actifs");
export const getCircuitsEnCours   = () => Api.get("/circuits/en-cours");
export const getCircuitsClos      = () => Api.get("/circuits/clos");
export const getCircuitsTermines  = () => Api.get("/circuits/termines");
export const getCircuitsBrouillon = () => Api.get("/circuits/brouillons");

// Route par path variable
export const getCircuitsByStatutPath = (statut) =>
    Api.get(`/circuits/statut/${statut}`);

// ── Filtres par statut + tri par date ─────────────────────────────────────────

export const getCircuitsByStatutRecent = (statut) =>
    Api.get(`/circuits/statut/${statut}/recent`);

export const getCircuitsByAgenceId = (statut = null) =>
  Api.get(`/circuits/mes/circuits`, { params: statut ? { statut } : {} });


export const getCircuitsByStatutAncien = (statut) =>
    Api.get(`/circuits/statut/${statut}/ancien`);

export const getCircuitsByAgence = (agenceId) =>
    Api.get(`/circuits/agence/${agenceId}`);

// ── TAUX DE RÉSERVATION ───────────────────────────────────────────────────────

export const getCircuitsByTauxReservation = () =>
    Api.get("/circuits/taux/reservation");

export const getTopCircuits = () =>
    Api.get("/circuits/top");
