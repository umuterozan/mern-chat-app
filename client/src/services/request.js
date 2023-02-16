import { handleRefresh } from "../helpers";

export function request(
    endpoint,
    data = false,
    method = "GET",
    accessToken = localStorage.getItem("_accessToken"),
    refreshToken = localStorage.getItem("_refreshToken")
) {
    return new Promise(async (resolve, reject) => {
        const options = {
            method,
            headers: {
                Authorization: "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        };

        if (data && method === "POST") {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(
            process.env.REACT_APP_API_URL + endpoint,
            options
        );

        const result = await response.json();

        if (response.ok) {
            resolve(result);
        } else if (result.err === "Token expired") {
            handleRefresh(endpoint, data, method, { refreshToken }).then(
                (res) => resolve(res)
            );
        } else {
            reject(result);
        }
    });
}

export const post = (endpoint, data) => request(endpoint, data, "POST");
export const get = (endpoint) => request(endpoint);
