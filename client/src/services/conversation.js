import { post, get } from "./request";

//export const registerUser = (data) => post("/user/register", data)
export const getConversations = (userId) => get(`/conversation/${userId}`)