

// Save
export const saveTokens = ({accessToken, refreshToken}) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    //localStorage.setItem("role", role); // add
};

// Get 
export const getAccessToken  = () => localStorage.getItem("accessToken");
//export const getRole         = () => localStorage.getItem("role");// add
// Delete
export const removeTokens = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    //localStorage.removeItem("role"); //add
};