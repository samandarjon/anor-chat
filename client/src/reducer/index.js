import {combineReducers} from "redux";
import authReducer from "./account";
import errorReducer from "./errorReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    // games: gameReducer,
    // websocket: websocketReducer,
    errors: errorReducer
});

export default rootReducer;