export const handleLogout = () => {
    localStorage.removeItem("_accessToken");
    localStorage.removeItem("_refreshToken");
    localStorage.removeItem("_user");
    window.location.reload();
};
