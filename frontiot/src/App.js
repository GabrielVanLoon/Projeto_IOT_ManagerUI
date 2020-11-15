import React, { Component } from 'react';
import { BrowserRouter as Router,Route, Switch, Redirect } from "react-router-dom";
import HomePage from './components/HomePage/HomePage';
import LoginPage from './components/LoginPage/LoginPage';
import './App.css';
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
      <Router>
        <div className="App">
          <Route exact path="/" component={Login} />
          <PrivateRoute exact path="/home2" component={Home} />
          <Route exact path="/home" component={Home} />
        </div>
      </Router>
    );
  }
}

export default App;