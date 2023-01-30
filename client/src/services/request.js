function request(endpoint, data = false, method = "GET") {
    return new Promise(async (resolve, reject) => {
        const options = {
            method,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("_token"),
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
        } else {
            reject(result);
        }
    });
}

export const post = (endpoint, data) => request(endpoint, data, "POST");
export const get = (endpoint) => request(endpoint);
