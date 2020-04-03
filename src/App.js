import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

import Navigation from './components/Navigation';

import CreateArticle from "./pages/CreatArticle";
import DeleteArticle from "./pages/DeleteArticle";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Router>
      <Navigation/>
      <Switch>
          <Route exact path="/"        component={Home}/>
        <Route path="/articles/create" component={CreateArticle}/>
        <Route path="/articles/delete" component={DeleteArticle}/>
        <Route path="*"                component={NotFound}/>
      </Switch>
    </Router>
  );
}

export default App;
