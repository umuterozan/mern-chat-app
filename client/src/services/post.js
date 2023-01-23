import { post } from "./request";

export const registerUser = (data) => post("/user/register", data)
export const loginUser = (data) => post("/user/login", data)