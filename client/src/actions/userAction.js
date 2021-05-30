import axios from "axios";
import {getChatByChatId} from "./chatAction";
import {GET_CHAT, GET_CHATS, GET_USERS} from "./types";

export const searchUser = (username) => dispatch => {
    axios.get(`/api/users${username ? `?username=${username}` : ""}`)
        .then((res) => dispatch({type: GET_CHATS, payload: res.data}))
        .catch(reason => console.log(reason))
}
