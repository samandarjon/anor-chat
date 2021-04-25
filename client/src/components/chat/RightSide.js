import React, {Component} from 'react';
import isEmpty from "../../validation/is-empty";

class RightSide extends Component {
    componentDidMount() {
        console.log("mount")
        this.trackScrolling()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("upadte")
        this.trackScrolling()
    }

    isBottom(el) {
        console.log(el.getBoundingClientRect().bottom, window.innerHeight)
        return el.getBoundingClientRect().bottom <= window.innerHeight;

    }

    trackScrolling = () => {
        var objDiv = document.getElementById("messages");
        objDiv.scrollTop = objDiv.scrollHeight;
    };

    render() {
        const {message, chat, auth, onChange, sendMessageToUser} = this.props
        let messageView;
        let messageHeader;
        let messageFooter;
        if (!isEmpty(chat) && !isEmpty(auth)) {
            messageHeader = <div className="contact-profile">
                <div className="img"><span>{chat.chatUserFullname[0]}</span></div>
                <p>{chat.chatUserFullname}</p>
            </div>
            messageFooter = <div className="wrap">
                <form onSubmit={(e) => sendMessageToUser(e, chat.chatId, chat.chatUserId)}>
                    <input type="text" placeholder="Write your message..." name={"message"} required
                           onChange={onChange}/>
                    <i className="fa fa-paperclip attachment" aria-hidden="true"/>
                    <button className="submit"
                    ><i
                        className="fa fa-paper-plane" aria-hidden="true"/></button>
                </form>
            </div>
        }
        if (message) {
            messageView = message.map(message =>
                <li key={message.id} className={parseInt(auth.user.id) === message.createdBy ? "replies" :
                    "sent"}>
                    <div
                        className="img"><span>{chat.chatUserFullname[0]}</span></div>
                    <p>{message.text}
                    </p>
                </li>
            )
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
}


export default RightSide;
