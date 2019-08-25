import React, {Component} from 'react';
import './App.scss';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import Main from "./components/Main";
import Navbar from "./components/Navbar";

class App extends Component{
  state = {
    A: 0
  };
  render() {
    return (
      <div className="App">
        <Navbar />
        <Router>
        <Switch>
          <Route
            path="/"
            exact
            render={() => <Main/>}
          />
        </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
