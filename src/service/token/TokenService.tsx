export const saveTokens = (data: {
    accessToken:  string;
    refreshToken: string;
    role?:        string;
    roles?:       string[];
    nomComplet?:  string;
    userId?:      number;
    id?:          number;
}) => {

    const resolvedId   = data.userId ?? data.id;
    const resolvedRole = data.role ?? data.roles?.[0];

    localStorage.setItem("accessToken",  data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    if (resolvedRole)      localStorage.setItem("role",       resolvedRole);
    if (resolvedId)        localStorage.setItem("userId",     resolvedId.toString());
    if (data.nomComplet)   localStorage.setItem("nomComplet", data.nomComplet);
};

export const getAccessToken = () => localStorage.getItem("accessToken");
export const getRole        = () => localStorage.getItem("role");
export const getUserId      = () => localStorage.getItem("userId");
export const getNomComplet  = () => localStorage.getItem("nomComplet") ?? "Invité";

export const removeTokens = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("nomComplet");
};