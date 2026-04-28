import axios from "axios";

const BASE_URL = "http://localhost:8080/api/fasotour/v1";

const Api = axios.create({
  baseURL: BASE_URL,
});

// ── Intercepteur requête ──────────────────────────────────────────────
Api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Intercepteur réponse (refresh token) ─────────────────────────────
const clearSessionAndRedirect = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("role");
  localStorage.removeItem("userId");
  localStorage.removeItem("nomComplet");
  window.location.href = "/login";
};

Api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const is401           = error.response?.status === 401;
    const alreadyRetried  = originalRequest._retry;

    if (!is401 || alreadyRetried) return Promise.reject(error);

    originalRequest._retry = true;
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      clearSessionAndRedirect();
      return Promise.reject(error);
    }

    try {
      const { data } = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken });
      localStorage.setItem("accessToken", data.accessToken);
      originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
      return Api(originalRequest);
    } catch (refreshError) {
      clearSessionAndRedirect();
      return Promise.reject(refreshError);
    }
  }
);


export default Api;

// ── Tokens ────────────────────────────────────────────────────────────
export const saveTokens = ({ accessToken, refreshToken, role, userId, id, nomComplet }) => {
  const resolvedId = userId ?? id;
  const resolvedRole = role ?? (Array.isArray(roles) ? roles[0] : null);
  localStorage.setItem("accessToken",  accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  if (resolvedRole) localStorage.setItem("role",      resolvedRole);
  if (resolvedId)  localStorage.setItem("userId",     resolvedId.toString()); 
  if (nomComplet)  localStorage.setItem("nomComplet", nomComplet);            
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

// ── Image helper ──────────────────────────────────────────────────────
export const getImageUrl = (url) => {
  if (!url) return null;
  return url.replace("https://fasotour.bf", "http://localhost:8080");
};