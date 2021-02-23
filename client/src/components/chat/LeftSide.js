import React, {Component} from 'react';
import isEmpty from "../../validation/is-empty";

class LeftSide extends Component {
    render() {
        const {chats, auth} = this.props;
        let chatList
        if (!(isEmpty(chats) && chats.length <= 0)) {
            chatList = chats.map(chat => <li
                key={chat.id}>{auth.id === chat.firstUser ? chat.secondUser.fullName : chat.firstUser.fullName}</li>)
        }
        return (
            <div>
                <ul>{chatList}</ul>
            </div>
        );
    }
}

export default LeftSide;