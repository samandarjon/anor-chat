import {GET_CHATS} from "../actions/types";

const initialState = {
    chats: [],
    chat: {}
}
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CHATS: {
            return {
                ...state
            }
        }
        default:
            return state;
    }
}