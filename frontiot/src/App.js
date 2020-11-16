import React, { Component } from 'react';
import { BrowserRouter as Router,Route, Switch, Redirect } from "react-router-dom";
import './App.css';

import HomePage from './components/HomePage/HomePage';
import LoginPage from './components/LoginPage/LoginPage';
import { isAuthenticated } from "./services/auth";

const Home = () => (
  <HomePage />
);

const Login = () => (
  <LoginPage />
);


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);


class App extends Component {
  render() {
    return (
        <div className="App">
          <Router>
            <Route exact path="/" component={LoginPage} />
            <PrivateRoute exact path="/home2" component={HomePage} />
            <Route exact path="/home" component={HomePage} />
          </Router>
        </div>
    );
  }
}

export default App;