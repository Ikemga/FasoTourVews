import Api from "./api/Api";

// GET all reservations
export const getReservations = () => {
    return Api.get("/reservations");
};

// GET reservation by id
export const getReservationById = (id) => {
    return Api.get(`/reservations/${id}`);
};

// GET reservations by circuit
export const getReservationsByCircuit = (circuitId) => {
    return Api.get(`/reservations/circuit/${circuitId}`);
};

// GET réservations de l'agence connectée (JWT identifie l'agence automatiquement)
export const getMesReservations = (statut = null) =>
    Api.get("/reservations/mes/reservations", { params: statut ? { statut } : {} });

//
export const getMesReservationStats = () =>
    Api.get("/reservations/mes/reservations/stats");

// GET reservations by user (si tu as auth)
export const getReservationsByUser = (userId) => {
    return Api.get(`/reservations/user/${userId}`);
};

// pagination
export const getReservationsByPage = (page = 0, size = 10) => {
    return Api.get("/reservations", {
        params: { page, size }
    });
};

// search
export const searchReservations = (query) => {
    return Api.get(`/reservations/search?q=${query}`);
};

// POST (create reservation)
export const postReservation = (reservation) => {
    return Api.post("/reservations", reservation);
};

// PUT (update)
export const putReservation = (id, reservation) => {
    return Api.put(`/reservations/${id}`, reservation);
};

// UPDATE status (important pour paiement)
export const updateReservationStatus = (id, status) => {
    return Api.patch(`/reservations/${id}/status`, { status });
};

// Annuler

export const annuleeReservation = (id) =>{
    return Api.put(`/reservations/annulee/${id}`)
}
// DELETE
export const deleteReservation = (id) => {
    return Api.delete(`/reservations/${id}`);
};

export const getReservationsByRecent = () => Api.get("/reservations/recent");

export const getReservationByStatut = (statut: string) =>
    Api.get("/reservations/statut/alphabetical", { params: { statut } });

//Par touriste

export const getReservationsByTouriste = (touristeId: number) =>
    Api.get(`/reservations/touriste/${touristeId}`).then(r => r.data);