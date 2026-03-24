import Api from "./api/Api";

// ── Auth ──────────────────────────────────────────────────────────────────────

export const login = async (mail: string, motDePasse: string) => {
    const response = await Api.post("/auth/login", { mail, motDePasse });
    return response.data;
};

export const logout = async (refreshToken: string) => {
    const response = await Api.post("/auth/logout", { refreshToken });
    return response.data;
};

export const logoutAll = async () => {
    const response = await Api.post("/auth/logout_all");
    return response.data;
};

export const refreshToken = async (refreshToken: string) => {
    const response = await Api.post("/auth/refresh", { refreshToken });
    return response.data;
};

// ── Activation ────────────────────────────────────────────────────────────────

export const activerCompte = async (code: string) => {
    const response = await Api.post("/auth/activation", { code });
    return response.data;
};

export const renvoiCode = async (mail: string) => {
    const response = await Api.post("/auth/renvoi_code", { mail });
    return response.data;
};

// ── Inscription Touriste ──────────────────────────────────────────────────────

export const inscrireTouriste = async (dto: {
    nomComplet: string;
    mail: string;
    motDePasse: string;
    telephone?: string;
    adresse?: string;
    pays?: string;
    preferenceTouristique?: string;
}) => {
    const response = await Api.post("/auth/inscription/touriste", dto);
    return response.data;
};

export const inscrireTouristeBatch = async (dtos: any[]) => {
    const response = await Api.post("/auth/inscription/touriste/batch", dtos);
    return response.data;
};

// ── Inscription Guide ─────────────────────────────────────────────────────────

export const inscrireGuide = async (dto: {
    nomComplet: string;
    mail: string;
    motDePasse: string;
    telephone?: string;
    experience?: string;
    preferenceTouristique?: string;
}) => {
    const response = await Api.post("/auth/inscription/guide", dto);
    return response.data;
};

export const inscrireGuideBatch = async (dtos: any[]) => {
    const response = await Api.post("/auth/inscription/guide/batch", dtos);
    return response.data;
};

// ── Inscription Agence ────────────────────────────────────────────────────────

export const inscrireAgence = async (dto: {
    nomComplet: string;
    mail: string;
    motDePasse: string;
    telephone?: string;
    adresse?: string;
    pays?: string;
    sitWeb?: string;
    pageFacebook?: string;
    numeroAgrement?: string;
}) => {
    const response = await Api.post("/auth/inscription/agence", dto);
    return response.data;
};

// ── Update Agence ────────────────────────────────────────────────────────

export const updateAgence = async (id: number, dto: {
    nomComplet?: string;
    adresse?: string;
    telephone?: string;
    pays?: string;
    numeroAgrement?: string;
    sitWeb?: string;
    pageFacebook?: string;
}) => {
    const response = await Api.put(`/agences/${id}`, dto);
    return response.data;
};


export const inscrireAgenceBatch = async (dtos: any[]) => {
    const response = await Api.post("/auth/inscription/agence/batch", dtos);
    return response.data;
};

// ── Update Touriste ───────────────────────────────────────────────────────────
export const updateTouriste = async (id: number, dto: {
    nomComplet?: string;
    adresse?: string;
    mail?: string;
    telephone?: string;
    pays?: string;
    motDePasse?: string;
    preferenceTouristique?: string;
    bio?: string;
    langueIds?: number[];
}) => {
    const response = await Api.put(`/touristes/${id}`, dto);
    return response.data;
};

// ── Update Guide ─────────────────────────────────────────────────────────────
export const updateGuide = async (id: number, dto: {
    nomComplet?: string;
    adresse?: string;
    mail?: string;
    telephone?: string;
    pays?: string;
    motDePasse?: string;
    experience?: string;
    preferenceTouristique?: string;
    bio?: string;
    langueIds?: number[];
    agenceIds?: number[];
}) => {
    const response = await Api.put(`/guides/${id}`, dto);
    return response.data;
};