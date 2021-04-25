import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import {getChatByChatId, getChats} from "../../actions/chatAction";
import LeftSide from "./LeftSide";
import {connectToWebsocket} from "../../actions/websocketAction";
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import RightSide from "./RightSide";
import {sentMessageToUser} from "../../actions/messageAction";

class Chats extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chat: {},
            message: ""
        }
    }

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

    onClickChat = (id, chat) => {
        this.props.getChatByChatId(id)
        this.setState({chat: chat})
    }
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    sendMessageToUser = (e, chatId, userId) => {
        e.preventDefault()
        const message = {
            chatId: chatId,
            userId: userId,
            message: this.state.message
        }
        this.props.sentMessageToUser(message);
    };

    render() {
        const {chats, chat} = this.props.chats;
        const {auth} = this.props;
        return (
            <div id="frame">
                <LeftSide chats={chats} auth={auth} onClick={this.onClickChat}/>
                <RightSide
                    message={chat}
                    auth={auth}
                    chat={this.state.chat}
                    onChange={this.onChange}
                    sendMessageToUser={this.sendMessageToUser}/>
            </div>
        );
    }
}

Chats.propTypes = {
    getChats: PropTypes.func.isRequired,
    getChatByChatId: PropTypes.func.isRequired,
    connectToWebsocket: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    chats: PropTypes.object.isRequired,
    sentMessageToUser: PropTypes.func.isRequired
}
const s2p = (state) => ({
        auth: state.auth,
        chats: state.chats,
    })
;
export default connect(s2p, {getChats, getChatByChatId, connectToWebsocket, sentMessageToUser})(Chats);
