import axios from "axios";
import {getChatByChatId} from "./chatAction";

export const sentMessageToUser = (message) => dispatch => {
    axios.post("/api/messages", message)
        .then((res) => {
            dispatch(getChatByChatId(res.data.chatId))
        })
        .catch(reason => console.log(reason))
}
