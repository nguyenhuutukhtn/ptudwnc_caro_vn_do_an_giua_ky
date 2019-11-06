import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Route,
  Link,
  BrowserRouter as Router,
  Redirect,
  Switch
} from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/register';
import { history } from './helpers/history';
import { MDBContainer, MDBAlert, MDBNotification } from 'mdbreact';
import { alertActions } from './actions/alert.action';
import { connect } from 'react-redux';
import Home from './components/home/home';
import { PrivateRoute } from './components/privateRoute/PrivateRoute';
import OfflineBoard from './components/offlineBoard/offlineBoard';
import OnlineBoard from './components/offlineBoard/onlineBoard';

class App extends React.Component {
  constructor(props) {
    super(props);

    history.listen((location, action) => {
      // clear alert on location change
      this.props.clearAlerts();
      // window.location.reload();
      console.log('history change');
    });
  }
  render() {
    const { alert } = this.props;

    return (
      <div className="App">
        {alert.message && (
          <MDBAlert className={`alert text-center ${alert.type}`}>
            {alert.message}
          </MDBAlert>
        )}
        <Router history={history}>
          <div className="main-route-place">
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/offline" component={OfflineBoard} />
              <Route path="/online" component={OnlineBoard} />
              <Redirect from="*" to="/" />
            </Switch>
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
