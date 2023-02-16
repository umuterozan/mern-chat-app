import { refreshUser } from "../services";
import { request } from "../services/request";
import { handleLogout } from "./handleLogout";

export const handleRefresh = (endpoint, data, method, refreshToken) => {
    return new Promise((resolve) => {
        refreshUser(refreshToken)
            .then((res) => {
                localStorage.setItem("_accessToken", res.accessToken);
                localStorage.setItem("_refreshToken", res.refreshToken);
                request(endpoint, data, method, res.accessToken).then((res) => {
                    resolve(res);
                });
            })
            .catch((err) => handleLogout(err));
    });
};
