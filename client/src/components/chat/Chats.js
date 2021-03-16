import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import {getChatByChatId, getChats} from "../../actions/chatAction";
import LeftSide from "./LeftSide";
import {connectToWebsocket} from "../../actions/websocketAction";
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

class Chats extends Component {

    componentDidMount() {
        this.props.getChats();
        // this.props.connectToWebsocket()
        const host = "http://localhost:8080/ws/anor-me-websocket";
        const options = {
            headers: {
                "X-Authentication": localStorage.getItem('jwtToken')
            }
        };
        let sockjs = new SockJS(host, null, {
            transports: ['xhr-streaming'],
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')}
        });
        const stomp = Stomp.over(sockjs);
        const headers = {Authorization: `Bearer ${localStorage.getItem("jwtToken")}`};

        stomp.connect(headers, function (frame) {
            stomp.subscribe('/user/topic/periodic', function (response) {
                console.log(response);
            });

        }, headers);

    }


    render() {
        const {chats} = this.props.chats;
        const {auth} = this.props;
        return (
            <div id="frame">
                <LeftSide chats={chats} auth={auth}/>
            </div>
        );
    }
}

Chats.propTypes = {
    getChats: PropTypes.func.isRequired,
    getChatByChatId: PropTypes.func.isRequired,
    connectToWebsocket: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    chats: PropTypes.object.isRequired
}
const s2p = (state) => ({
        auth: state.auth,
        chats: state.chats,
    })
;
export default connect(s2p, {getChats, getChatByChatId, connectToWebsocket})(Chats);
