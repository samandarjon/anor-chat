import React, {Component} from 'react';
import isEmpty from "../../validation/is-empty";

class LeftSide extends Component {
    render() {
        const {chats, auth} = this.props;
        console.log(auth)
        let chatList
        console.log(chats)
        if (!isEmpty(chats)) {
            console.log(chats)
            chatList = chats.map(chat =>
                <li className={"contact"}
                    key={chat.id}>
                    <div className="wrap">
                        <img src="assets/images/avatars/avatar.png" alt=""/>
                        <div className="meta">
                            <p className="name">{parseInt(auth.user.id) === chat.firstUser.id ? chat.secondUser.fullName : chat.firstUser.fullName}</p>
                            <p className="preview">You just got LITT up, Mike.</p>
                        </div>
                    </div>
                </li>)

        }

        return (
            <div id="sidepanel">
                <div id="profile">
                    <div className="wrap">
                        <img id="profile-img" src="assets/images/avatars/mikeross.png" className="online" alt=""/>
                        <p>Mike Ross</p>
                    </div>
                </div>
                <div id="search">
                    <label htmlFor=""><i className="fa fa-search" aria-hidden="true"></i></label>
                    <input type="text" placeholder="Search contacts..."/>
                </div>
                <div id="contacts">
                    <ul>
                        {chatList}
                    </ul>
                </div>
                <div id="bottom-bar">
                    <button id="addcontact"><i className="fa fa-user-plus fa-fw" aria-hidden="true"></i> <span>Add
                        contact</span></button>
                    <button id="settings"><i className="fa fa-cog fa-fw" aria-hidden="true"></i>
                        <span>Settings</span></button>
                </div>
            </div>
        );
    }
}

export default LeftSide;