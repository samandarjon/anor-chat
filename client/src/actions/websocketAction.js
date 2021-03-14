import {wsConnect} from "../modules/websocket";

export const connectToWebsocket = () => dispatch => {
    const host = "ws://localhost:8080/anor-me-websocket";
    dispatch(wsConnect(host));
}