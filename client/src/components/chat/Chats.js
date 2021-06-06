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
import {searchUser} from "../../actions/userAction";
import isEmpty from "../../validation/is-empty";
import {logoutUser} from "../../actions/authAction";
import getRandomUrl from "../../utils/random";
import {url} from "../../env";

class Chats extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chat: [],
            chats: [],
            clickedChat: {},
            message: "",
            new: null
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

    onClickChat = (id, chat, url) => {
        if (id)
            this.props.getChatByChatId(id)
        this.setState({clickedChat: {chat: chat, url: url}, new: id})
    }
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    componentWillReceiveProps(nextProps) {
        this.setState({chat: nextProps.chats.chat, chats: nextProps.chats.chats})
    }

    sendMessageToUser = (e, chatId, userId) => {
        e.preventDefault()
        const message = {
            chatId: chatId,
            userId: userId,
            message: this.state.message
        }
        this.setState({message: ""})
        this.setState({new: "yes"})
        this.props.sentMessageToUser(message);

    };

    searchUser = (e) => {
        if (isEmpty(e.target.value)) {
            this.props.getChats();
        } else {
            this.props.searchUser(e.target.value)
        }
    }
    logout = () => {
        this.props.logoutUser()
    }

    render() {
        const {chats, chat} = this.state;
        const {auth} = this.props;
        let authUrl = getRandomUrl(auth.user.fullName)
        return (
            <div id="frame">
                <LeftSide logout={this.logout} chats={chats} auth={auth} url={authUrl} onClick={this.onClickChat}
                          search={this.searchUser}/>
                <RightSide
                    authUrl={authUrl}
                    message={this.state.new ? chat : []}
                    auth={auth}
                    chat={this.state.clickedChat}
                    onChange={this.onChange}
                    sendMessageToUser={this.sendMessageToUser}
                    messageValue={this.state.message}/>
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
export default connect(s2p, {
    getChats,
    getChatByChatId,
    connectToWebsocket,
    sentMessageToUser,
    searchUser,
    logoutUser
})(Chats);
