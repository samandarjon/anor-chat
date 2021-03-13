import {GET_CHATS} from "../actions/types";

const initialState = {
    chats: [],
    chat: {}
}
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CHATS: {
            return {
                ...state,
                chats: action.payload
            }
        }
        default:
            return state;
    }
}