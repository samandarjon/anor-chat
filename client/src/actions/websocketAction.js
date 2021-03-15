import {wsConnect} from "../modules/websocket";

export const connectToWebsocket = () => dispatch => {
    const host = "http://localhost:8080/ws/anor-me-websocket";
    dispatch(wsConnect(host));
}