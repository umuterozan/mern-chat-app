import { post, get } from "./request";

export const registerUser = (data) => post("/user/register", data);
export const loginUser = (data) => post("/user/login", data);
export const getUsers = (page, limit) =>
    get(`/user?page=${page}&limit=${limit}`);
