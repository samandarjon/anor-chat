import axios from "axios";
import {GET_CHAT, GET_CHATS, GET_ERRORS} from "./types";

export const getChats = () => dispatch => {
    axios.get("/api/chats")
        .then(res => dispatch({
            type: GET_CHATS,
            payload: res.data
        }))
        .catch(err => {
                console.log(err)
                dispatch({
                    type: GET_ERRORS,
                    payload: "wrong!!!"
                })
            }
        )
}
export const getChatByChatId = (chatId) => dispatch => {
    axios.get(`/api/messages/${chatId}`)
        .then(res => dispatch({
                type: GET_CHAT,
                payload: res.data
            }
        ))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}