export const handleRefresh = (res) => {
    localStorage.setItem("_accessToken", res.accessToken);
    localStorage.setItem("_refreshToken", res.refreshToken);
    window.location.reload();
};
