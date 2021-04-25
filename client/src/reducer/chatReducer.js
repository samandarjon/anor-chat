import {GET_CHAT, GET_CHATS} from "../actions/types";

const initialState = {
    chats: [],
    chat: []
}
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CHATS: {
            return {
                ...state,
                chats: action.payload
            }
        }
        case GET_CHAT: {
            return {
                ...state,
                chat: action.payload
            }
        }
        default:
            return state;
    }
}