import Api from "./api/Api";

// GET all sites
export const getCircuit = () => {
    return Api.get("/circuits");
};

// GET site by id
export const getCircuitById = (id) => {
    return Api.get(`/circuits/${id}`);
};

// pagination
export const getSitesByPage = (page = 0, size = 10) => {
    return Api.get("/circuits/page", {
    params: { page, size }
    });
};

    //Dec recent circuit
export const getCircuitsByDateDesc = () => {
    return Api.get("/circuits/order/date/desc");
}

// Plus Ancien circuit
export const getCircuitsByDateAsc  = () => {
    return Api.get("/circuits/order/date/asc");
}

// A - Z
export const getCircuitsByNameAsc  = () => {
    return Api.get("/circuits/order/name/asc");
}
// Z - A
export const getCircuitsByNameDesc = () => {
    return Api.get("/circuits/order/name/desc");
}

// Search
export const searchCircuit = (query) => {
    return Api.get("/circuits/search", { params: { name: query } });
}
// POST
export const postCircuit = (circuit) => {
    return Api.post("/circuits", circuit);
};

// PUT
export const putCircuit = (id,circuit) => {
    return Api.put(`/circuits/${id}`, circuit);
};

// DELETE
export const deleteCircuit = (id) => {
    return Api.delete(`/circuits/${id}`);
};