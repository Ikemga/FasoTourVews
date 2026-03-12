import Api from "./api/Api";

// GET all sites
export const getCategorieAll = () => {
    return Api.get("/categories/all");
};


// GET site by id
export const getCategorieById = (id) => {
    return Api.get(`/categories/${id}`);
};

// GET by region
export const getSiteByCategorie = (categorie) => {
    return Api.get(`/categories/nom/${categorie}`);
}


export const getCategorieOrderByLaste = () => {
    return Api.get("/categories/recent"); 
};

export const getCategorieOrderByAphabetique = () => {
    return Api.get("/categories/alphabetique"); 
};


// pagination
export const getCategorieByPage = (page = 0, size = 10) => {
    return Api.get("/categories", {
    params: { page, size }
    });
};

// POST
export const postCategorie = (categorie) => {
    return Api.post("/categories", categorie);
};

// PUT
export const putCategorie = (categorie) => {
    return Api.put(`/categories/${categorie.id}`, categorie);
};

// DELETE
export const deleteCategorie = (id) => {
    return Api.delete(`/categories/${id}`);
};