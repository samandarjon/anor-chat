import React, {Component} from 'react';
import isEmpty from "../../validation/is-empty";
import {logoutUser} from "../../actions/authAction";
import {connect} from "react-redux";

class LeftSide extends Component {
    constructor(props) {
        super(props)
        this.state = {
            clicked: ""
        }
    }

    logout = () => {
        this.props.logoutUser()
    }

    render() {
        const {chats, auth, onClick, search, logout} = this.props;
        let chatList
        if (!isEmpty(chats) && Array.isArray(chats)) {
            chatList = chats.map(chat =>
                <li className={"contact"}
                    key={chat.id} onClick={() => onClick(chat.chatId, chat)}>
                    <div className="wrap" ref={chat.chatId}>
                        <img src="assets/images/avatars/avatar.png" alt=""/>
                        <div className="meta">
                            <p className="name">{chat.chatUserFullname ? chat.chatUserFullname : chat.fullName}</p>
                            {!isEmpty(chat.message) ? <p className="preview">{chat.message}</p> : ""}
                        </div>
                    </div>
                </li>)

        }

        return (
            <div id="sidepanel">
                <div id="profile">
                    <div className="wrap">
                        <img id="profile-img" src="assets/images/avatars/mikeross.png" className="online" alt=""/>
                        <p>{auth.user.fullName}</p>
                    </div>
                </div>
                <div id="search">
                    <label htmlFor=""><i className="fa fa-search" aria-hidden="true"/></label>
                    <input type="text" placeholder="Search contacts..." onChange={search} name={"serach"}/>
                </div>
                <div id="contacts">
                    <ul>
                        {chatList}
                    </ul>
                </div>
                <div id="bottom-bar">
                    <button id="addcontact"><i className="fa fa-user-plus fa-fw" aria-hidden="true"></i> <span>Add
                        contact</span></button>
                    <button id="settings" onClick={logout}>
                        <span>Log out</span></button>
                </div>
            </div>
        );
    }
}

export default (LeftSide);
