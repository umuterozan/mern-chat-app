import { post } from "./request";

export const registerUser = (data) => post("/register", data)
export const loginUser = (data) => post("/login", data)