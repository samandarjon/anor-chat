import {combineReducers} from "redux";
import authReducer from "./account";
import errorReducer from "./errorReducer";
import chatReducer from "./chatReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    // games: gameReducer,
    // websocket: websocketReducer,
    errors: errorReducer,
    chats: chatReducer
});

export default rootReducer;