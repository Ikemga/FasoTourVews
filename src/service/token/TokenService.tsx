

// Save
export const saveTokens = ({accessToken, refreshToken}) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
};

// Get 
export const getAccessToken = () => {
    return localStorage.getItem("accessToken");
};

// Delete
export const removeTokens = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
};