import Api from "./api/Api";

// Créer un paiement (versement sur une réservation)
export const createPaiement = (data) =>
    Api.post("/paiements", data);

//Modifier un paiement
export const updatePaiement = (id, data) =>
    Api.put(`/paiements/${id}`, data);

//Récupérer un paiement par ID
export const getPaiementById = (id) =>
    Api.get(`/paiements/${id}`);

//Récupérer tous les paiements
export const getAllPaiements = () =>
    Api.get("/paiements");

//Supprimer un paiement
export const deletePaiement = (id) =>
    Api.delete(`/paiements/${id}`);