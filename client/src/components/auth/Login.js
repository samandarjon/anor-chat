import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Box} from "@material-ui/core";
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import {Link as LinkTo} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {login} from "../../actions/authAction";
import Alert from '@material-ui/lab/Alert';

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

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            username: "",
            password: ""
        }

    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/chat")
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
        this.setState({errors: {[e.target.name]: null}})
    }

    onSubmit = (e) => {
        e.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password,
        };

        this.props.login(user, this.props.history);
        console.log("hey ", this.state)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
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
                marginTop: theme.spacing(1),
            },
            submit: {
                margin: theme.spacing(3, 0, 2),

            },
        }));
        const alert = makeStyles((theme) => ({
            root: {
                width: '100%',
                '& > * + *': {
                    marginTop: theme.spacing(2),
                },
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
                            <Typography component="h1" variant="h5" align={"center"}>
                                Welcome to our chat app!!!
                            </Typography>
                            <Typography className={"mt-3"} component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <form className={classes.form} noValidate onSubmit={this.onSubmit}>
                                <TextField
                                    error={this.state.errors.username}
                                    helperText={this.state.errors.username}
                                    onChange={this.onChange}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                />
                                <TextField
                                    error={this.state.errors.password}
                                    helperText={this.state.errors.password}
                                    onChange={this.onChange}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Sign In
                                </Button>
                                <Grid container>

                                    <Grid item>
                                        <LinkTo to={"/register"}>{"Don't have an account? Sign Up"}</LinkTo>
                                    </Grid>
                                </Grid>
                            </form>
                        </div>
                        <Box mt={8}>
                            <Copyright/>
                        </Box>
                    </Container>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    errors: state.errors,
    auth: state.auth
})
export default connect(mapStateToProps, {login})(Login);