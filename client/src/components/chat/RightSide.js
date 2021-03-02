import React, {Component} from 'react';
import isEmpty from "../../validation/is-empty";
import Grid from "@material-ui/core/Grid";

class RightSide extends Component {
    render() {
        const {messages} = this.props
        let messageView;
        if (!(isEmpty(messages) && messages.length > 0)) {
            messageView = messages.map(message => {
                    <Grid container>
                        <Grid item xs={6}>

                        </Grid>
                    </Grid>
                }
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