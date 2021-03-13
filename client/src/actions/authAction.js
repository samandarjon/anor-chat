import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {GET_ERRORS, SET_CURRENT_USER} from "./types";

export const registerUser = (userData, history) => dispatch => {
    axios
        .post("/api/auth/signup", userData)
        .then(res => history.push("/login"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};
// Login get user Token

export const login = (userData, history) => dispatch => {
    axios
        .post("/api/auth/login", userData)
        .then(res => {
            // Save to Localstorge
            const {token} = res.data;
            // Set token to ls
            localStorage.setItem("jwtToken", token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decode = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decode));
            history.push("/chat")
        })
        .catch(err => {
                console.log(err)
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            }
        );
};

// Set login in user
export const setCurrentUser = decode => {
    return {
        type: SET_CURRENT_USER,
        payload: decode
    };
};

// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem("jwtToken");
    // Remove auth header from future request
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};
