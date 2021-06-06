import React, {Component} from 'react';
import isEmpty from "../../validation/is-empty";
import getRandomUrl from "../../utils/random";

class RightSide extends Component {
    componentDidMount() {
        this.trackScrolling()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.trackScrolling()
    }


    trackScrolling = () => {
        let endOfChat = document.getElementById("messages");
        endOfChat.scrollTop = endOfChat.scrollHeight;
    };

    render() {
        const {message, auth, onChange, sendMessageToUser, messageValue, authUrl} = this.props
        const {chat, url} = this.props.chat;
        let messageView;
        let messageHeader;
        let messageFooter;
        if (!isEmpty(chat) && !isEmpty(auth)) {
            messageHeader = <div className="contact-profile">
                <div className="img"><img src={url} alt=""/>
                </div>
                <p>{chat.chatUserFullname ? chat.chatUserFullname : chat.fullName}</p>
            </div>
            messageFooter = <div className="wrap">
                <form onSubmit={(e) => sendMessageToUser(e, chat.chatId, chat.chatUserId)}>
                    <input type="text" placeholder="Write your message..." name={"message"} required
                           onChange={onChange} value={messageValue}/>
                    {/*<i className="fa fa-paperclip attachment" aria-hidden="true"/>*/}
                    <button className="submit"
                    ><i
                        className="fa fa-paper-plane" aria-hidden="true"/></button>
                </form>
            </div>
        }
        if (message && Array.isArray(message)) {
            if (message.length > 0)
                messageView = message.map(message =>
                    <li key={message.id} className={parseInt(auth.user.id) === message.createdBy ? "replies" :
                        "sent"}>
                        <div
                            className="img"><img src={parseInt(auth.user.id) === message.createdBy?authUrl:url} alt=""/></div>
                        <p>{message.text}
                        </p>
                    </li>
                )
        }
            return (
                <div className="content">
                    {messageHeader}
                    <div className="messages" id="messages">
                        <ul>
                            {messageView}
                        </ul>
                    </div>
                    <div className="mt-2 message-input">
                        {messageFooter}
                    </div>
                </div>
            );

    }
}


export default RightSide;
