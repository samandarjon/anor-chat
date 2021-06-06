import axios from "axios";
import {getChatByChatId, getChats} from "./chatAction";

export const sentMessageToUser = (message) => dispatch => {
    axios.post("/api/messages", message)
        .then((res) => {
            dispatch(getChatByChatId(res.data.chatId))
            dispatch(getChats())
        })
        .catch(reason => console.log(reason))
}
