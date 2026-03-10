import Api from "./api/Api";

export const AuthService = async (mail, motDePasse) => {
    const response = await Api.post("/auth/login",
        {
            mail,
            motDePasse
        });
    return response.data;
};