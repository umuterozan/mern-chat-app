import { post, get } from "./request";

//export const registerUser = (data) => post("/user/register", data)
export const getChats = (userId) => get(`/chat/${userId}`)