import {wsConnect} from "../modules/websocket";

export const connectToWebsocket = () => dispatch => {
    const host = `ws://127.0.0.1:8000/anor-me-websocket`;
    dispatch(wsConnect(host));
}