import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import {Link as LinkTo} from "react-router-dom";
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {registerUser} from "../../actions/authAction";
import Alert from "@material-ui/lab/Alert";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            <Link color="inherit" href="https://www.facebook.com/samandar.akbarov/">
                <FacebookIcon/>
            </Link>
            <Link className={"mx-3"} color="inherit" href="https://github.com/samandarjon">
                <GitHubIcon/>
            </Link><Link color="inherit" href="https://www.linkedin.com/in/samandar-akbarov-32b3b996/">
            <LinkedInIcon/>
        </Link>
        </Typography>
    );
}

class Register extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: "",
            fullName: "",
            password: "",
            confirmPassword: "",
            errors: {}
        };
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
        this.setState({errors: {[e.target.name]: null}})
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            fullName: this.state.fullName,
            username: this.state.username,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        };

        this.props.registerUser(newUser, this.props.history);
    }
    onClose = (e) => {
        this.setState({errors: {}})
    }


    render() {
        const classes = makeStyles((theme) => ({
            paper: {
                marginTop: theme.spacing(8),
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            },
            avatar: {
                margin: theme.spacing(1),
                backgroundColor: theme.palette.secondary.main,
            },
            form: {
                width: '100%', // Fix IE 11 issue.
                marginTop: theme.spacing(3),
            },
            submit: {
                margin: theme.spacing(3, 0, 2)
            },
        }));
        return (
            <div className={"row mt-5"}>
                {this.state.errors.message ?
                    (<div className={"offset-md-3 col-md-6"}>
                        <div className={alert.root}>
                            <Alert onClose={this.onClose} severity="error">{this.state.errors.message}</Alert>
                        </div>
                    </div>) : ""}
                <div className={"col-md-12"}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline/>
                        <div className={classes.paper}>
                            <Typography align={"center"} className={""} component="h1" variant="h5">
                                Join us now
                            </Typography>
                            <Typography className={"my-3"} component="h1" variant="h5">
                                Sign up
                            </Typography>
                            <form className={classes.form} noValidate onSubmit={this.onSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            error={this.state.errors.fullName}
                                            helperText={this.state.errors.fullName}
                                            onChange={this.onChange}
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="fullName"
                                            label="Full name"
                                            name="fullName"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            error={this.state.errors.username}
                                            helperText={this.state.errors.username}
                                            onChange={this.onChange}
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="username"
                                            label="Username"
                                            name="username"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            error={this.state.errors.password}
                                            helperText={this.state.errors.password}
                                            onChange={this.onChange}
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            error={this.state.errors.confirmPassword}
                                            helperText={this.state.errors.confirmPassword}
                                            onChange={this.onChange}
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="confirmPassword"
                                            label="Confirm password"
                                            type="password"
                                            id="confirmPassword"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                        >
                                            Sign Up
                                        </Button>
                                    </Grid>
                                </Grid>

                                <Grid container justify="flex-end">
                                    <Grid item>
                                        <LinkTo to={"/login"}>
                                            Already have an account? Sign in</LinkTo>
                                    </Grid>
                                </Grid>
                            </form>
                        </div>
                        <Box mt={5}>
                            <Copyright/>
                        </Box>
                    </Container>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    errors: state.errors,
    auth: state.auth
})
export default connect(mapStateToProps, {registerUser})(Register);