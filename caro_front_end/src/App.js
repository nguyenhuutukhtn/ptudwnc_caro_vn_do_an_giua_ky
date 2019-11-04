import React from 'react';
import logo from './logo.svg';
// import './App.css';
import {
  Route,
  Link,
  BrowserRouter as Router,
  Redirect
} from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/register';
import { history } from './helpers/history';
import { MDBContainer, MDBAlert, MDBNotification } from 'mdbreact';
import { alertActions } from './actions/alert.action';
import { connect } from 'react-redux';
import Home from './components/home/home';

class App extends React.Component {
  constructor(props) {
    super(props);

    history.listen((location, action) => {
      // clear alert on location change
      this.props.clearAlerts();
    });
  }
  render() {
    const { alert } = this.props;

    return (
      <div className="App">
        {/* {alert.message && (
          <MDBAlert color="danger" className={`text-center ${alert.type}`}>
            A simple success alert—check it out!
          </MDBAlert>
        )} */}

        <Router>
          <div className="main-route-place">
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            {/* <Redirect from="" to="/" /> */}
          </div>
        </Router>
      </div>
    );
  }
}

function mapState(state) {
  const { alert } = state;
  return { alert };
}

const actionCreators = {
  clearAlerts: alertActions.clear
};

const connectedApp = connect(
  mapState,
  actionCreators
)(App);

export default connectedApp;
