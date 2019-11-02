import React from 'react';
import logo from './logo.svg';
// import './App.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/register';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="main-route-place">
          <Route exact path="/" component={Login} />
          <Route path="/register" component={Register} />
        </div>
      </Router>
    </div>
  );
}

export default App;
