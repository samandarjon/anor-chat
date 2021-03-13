import React, {Component} from 'react';
import isEmpty from "../../validation/is-empty";
import Grid from "@material-ui/core/Grid";

class RightSide extends Component {
    render() {
        const {messages} = this.props
        let messageView;
        console.log(messages)
        if (!isEmpty(messages)) {
            console.log("hey")
            messageView = messages.map(message =>
                    <Grid container>
                        <Grid item xs={6}>
                            {message.text}
                        </Grid>
                    </Grid>

            )
        }
        return (
            <div>
                {messageView}
            </div>
        );
    }
}

export default RightSide;