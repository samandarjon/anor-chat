import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import {getChatByChatId, getChats} from "../../actions/chatAction";
import LeftSide from "./LeftSide";
import {connectToWebsocket} from "../../actions/websocketAction";

class Chats extends Component {

    componentDidMount() {
        this.props.getChats();
        this.props.connectToWebsocket()
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
