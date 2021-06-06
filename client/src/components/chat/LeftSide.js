import React, {Component} from 'react';
import isEmpty from "../../validation/is-empty";

import getRandomUrl from "../../utils/random";

class LeftSide extends Component {
    constructor() {
        super();
        this.state = {
            clicked: ""
        }
    }

    logout = () => {
        this.props.logoutUser()
    }

    render() {
        const {chats, auth, onClick, search, logout, url} = this.props;
        let chatList
        if (!isEmpty(chats) && Array.isArray(chats)) {
            chatList = chats.map(chat =>{
                let url= getRandomUrl(chat.chatUserFullname ? chat.chatUserFullname : chat.fullName)
                return <li className={"contact"}
                    key={chat.id} onClick={() => onClick(chat.chatId, chat, url)}>
                    <div className="wrap">
                        <img src={url} alt=""/>
                        <div className="meta">
                            <p className="name">{chat.chatUserFullname ? chat.chatUserFullname : chat.fullName}</p>
                            {!isEmpty(chat.message) ? <p className="preview">{chat.message}</p> : ""}
                        </div>
                    </div>
                </li>})

        }

        return (
            <div id="sidepanel">
                <div id="profile">
                    <div className="wrap">
                        <img d="profile-img" className="online"
                             src={url} alt=""/>
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
                    <button id="settings" onClick={logout}>
                        <span>Log out</span></button>
                </div>
            </div>
        );
    }
}

export default (LeftSide);
