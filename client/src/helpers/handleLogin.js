export const handleLogin = (res) => {
    localStorage.setItem("_accessToken", res.accessToken);
    localStorage.setItem("_refreshToken", res.refreshToken);
    localStorage.setItem("_user", JSON.stringify(res.user));
};
