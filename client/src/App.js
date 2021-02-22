import './App.css';
import {Provider} from "react-redux";
import store from "./store";
import Chats from "./components/chat/Chats";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import PrivateRoute from "./components/comman/PrivateRoute";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

function App() {

    return (
        <Provider store={store}>
            <Router>
                <div className="container">
                    <Route exact path="/" component={Login}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <Switch>
                        <PrivateRoute exact path="/chat" component={Chats}/>
                    </Switch>
                </div>
            </Router>

        </Provider>
    );
}

export default App;
