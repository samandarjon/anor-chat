import axios from "axios";
import {GET_CHAT, GET_CHATS, GET_ERRORS} from "./types";

export const getChats = () => dispatch => {
    axios.get("/api/chats")
        .then(res => dispatch({
            action: GET_CHATS,
            payload: res.data
        }))
        .catch(err => dispatch({
            action: GET_ERRORS,
            payload: err.response.data
        }))
}
export const getChatByChatId = (chatId) => dispatch => {
    axios.get(`/api/messages/${chatId}`)
        .then(res => dispatch({
                action: GET_CHAT,
                payload: res.data
            }
        ))
        .catch(err => dispatch({
            action: GET_ERRORS,
            payload: err.response.data
        }))
}