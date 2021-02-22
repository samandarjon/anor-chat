import React, {Component} from 'react';
import {wsConnect} from "../../modules/websocket";
import WithAuth from "../../hocs/AuthenticationWrapper";
import {connect} from 'react-redux';

class Chats extends Component {
    componentDidMount() {
        const {id} = this.props;
        if (id) {
            this.connectAndJoin();
        }
    }

    connectAndJoin = () => {
        const {id, dispatch} = this.props;
        const host = `ws://127.0.0.1:8000/anor-me-websocket?token=${localStorage.getItem('token')}`;
        dispatch(wsConnect(host));
    };

    render() {
        return (
            <div>

            </div>
        );
    }
}

const s2p = (state, ownProps) => ({
    id: ownProps.match && ownProps.match.params.id,
});
export default WithAuth(connect(s2p)(Chats));
