import React, {Component} from 'react';
import {wsConnect} from "../../modules/websocket";
import WithAuth from "../../hocs/AuthenticationWrapper";
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import {getChatByChatId, getChats} from "../../actions/chatAction";
import LeftSide from "./LeftSide";
import {Grid} from "@material-ui/core";
import RightSide from "./RightSide";

class Chats extends Component {
    constructor(props) {
        super(props);
        this.state = {current_chat: {}}
    }

    componentDidMount() {
        const {id} = this.props;
        if (id) {
            this.connectAndJoin();
        }
        this.props.getChats();
    }

    connectAndJoin = () => {
        const {id, dispatch} = this.props;
        const host = `ws://127.0.0.1:8000/anor-me-websocket?token=${localStorage.getItem('token')}`;
        dispatch(wsConnect(host));
    };

    render() {
        const {chats, auth} = this.props;
        return (
            <div>
                <Grid container>
                    <Grid item xs={6}>
                        <LeftSide chats={chats} auth={auth}/>
                    </Grid>
                    <Grid item xs={6}>
                        <RightSide/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Chats.propTypes = {
    getChats: PropTypes.func.isRequired,
    getChatByChatId: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}
const s2p = (state) => ({
        auth: state.auth,
        chats: state.chats,
        chat: state.chat
    })
;
export default WithAuth(connect(s2p, {getChats, getChatByChatId})(Chats));
