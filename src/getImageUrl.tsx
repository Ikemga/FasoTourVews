// Utilitaire pour images
export const getImageUrl = (url) => {
    if (!url) return null;
    return url.replace("https://fasotour.bf", "http://localhost:8080");
};