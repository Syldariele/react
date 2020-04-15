import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import CreateArticle from "./pages/CreatArticle";
import DeleteArticle from "./pages/DeleteArticle";
import NotFound from "./pages/NotFound";
import ViewArticle from "./pages/ViewArticle";

const App = () => {
    return (
        <Router>
            <Navigation/>
            <Switch>
                <Route exact path="/"          component={Home}/>
                <Route exact path="/Signin"    component={Signin}/>
                <Route path="/articles/create" component={CreateArticle}/>
                <Route path="/articles/delete" component={DeleteArticle}/>
                <Route path="/article/:id"     component={ViewArticle}/>
                <Route path="*"                component={NotFound}/>
            </Switch>
            <ToastContainer/>
        </Router>
    );
};

export default App;
