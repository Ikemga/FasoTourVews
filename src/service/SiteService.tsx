import Api from "./api/Api";

// GET all sites
export const getSites = () => {
    return Api.get("/sites");
};


export const getSitesOrderByLaste = () => {
    return Api.get("/sites/all"); 
};
// GET site by id
export const getSiteById = (id) => {
    return Api.get(`/sites/${id}`);
};

// GET by region
export const getSiteByRegion = (region) => {
    return Api.get(`/sites/region/${region}`);
};

// pagination
export const getSitesByPage = (page = 0, size = 10) => {
    return Api.get("/sites", {
    params: { page, size }
    });
};

// GET /sites/by/categorie → [{ categorie: "Culturel", nombre: 14 }, ...]
export const getSitesParCategorie = () => {
    return Api.get("/sites/by/categorie");
};

// GET /sites/categorie/{categorie} → liste des sites d'une catégorie précise
export const getSitesByCategorie = (categorie) => {
    return Api.get(`/sites/categorie/${categorie}`);
};

export const getSitesAlphabetical = () => {
    return Api.get("/sites/alphabetical");
};

//Search

export const searchSites = (query) => {
    return Api.get(`/sites/search?q=${query}`);
};
// POST
export const postSites = (data) => {
    return Api.post("/sites", data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
};

// PUT
export const putSites = (id, data) => {
    return Api.put(`/sites/${id}`, data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
};

// DELETE
export const deleteSites = (id) => {
    return Api.delete(`/sites/${id}`);
};