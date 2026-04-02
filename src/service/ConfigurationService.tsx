import Api from "./api/Api";


export const getFraisReservation = () =>
    Api.get("/configuration/frais");

export const getDelaiPaiement = () =>
    Api.get("/configuration/delai");

export const getAllConfig = () =>
    Api.get("/configuration");

//Modifier les configurations
export const updateFraisReservation = (valeur) =>
    Api.put("/configuration/frais", null, {
        params: { valeur }
    });

export const updateDelaiPaiement = (valeur) =>
    Api.put("/configuration/delai", null, {
        params: { valeur }
    });