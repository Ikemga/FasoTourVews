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

// POST
export const postSites = (site) => {
    return Api.post("/sites", site);
};

// PUT
export const putSites = (site) => {
    return Api.put(`/sites/${site.id}`, site);
};

// DELETE
export const deleteSites = (id) => {
    return Api.delete(`/sites/${id}`);
};