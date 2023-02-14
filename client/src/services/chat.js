import { post, get } from "./request";

export const getConversations = (userId) => get(`/conversation/${userId}`);
export const getMessages = (conversationId) =>
    get(`/message/${conversationId}`);
export const sendMessage = (data) => post("/message/", data);
