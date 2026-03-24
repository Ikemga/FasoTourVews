import Api from "./api/Api";

export const getCircuit = () => Api.get("/circuits");

export const getCircuitById = (id) => Api.get(`/circuits/${id}`);

export const getSitesByPage = (page = 0, size = 10) =>
    Api.get("/circuits/page", { params: { page, size } });

export const getCircuitsByDateDesc = () => Api.get("/circuits/order/date/desc");
export const getCircuitsByDateAsc  = () => Api.get("/circuits/order/date/asc");
export const getCircuitsByNameAsc  = () => Api.get("/circuits/order/name/asc");
export const getCircuitsByNameDesc = () => Api.get("/circuits/order/name/desc");

export const searchCircuit = (query) =>
    Api.get("/circuits/search", { params: { name: query } });

export const postCircuit = (formData) =>
    Api.post("/circuits", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });

export const putCircuit = (id, formData) =>
    Api.put(`/circuits/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });

export const deleteCircuit = (id) => Api.delete(`/circuits/${id}`);