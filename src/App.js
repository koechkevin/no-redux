import React, {Component} from 'react';
import './App.scss';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import Main from "./components/Main";
import Navbar from "./components/Navbar";

class App extends Component{
  state = {
    key: ''
  };

  updateKey = (key) => {
    this.setState({key})
  };

  componentDidMount() {
    this.setState({key: localStorage.getItem('key')});
    this.setState({data: JSON.parse(localStorage.getItem('data'))})
  }

  toRender = () => {
    return (
      (this.state.key) ? (<Main data={this.state.data} updateKey={this.updateKey}/>):''
    );
  };

  removeKey = () => {
    this.setState({key:''});
    localStorage.removeItem('key');
  };

  saveUserData = (data) => {
    this.setState({data})
  };
  render() {
    return (
      <div className="App">
        <Navbar data={this.state.data} saveUserData={this.saveUserData} apiKey={this.state.key} logout={this.removeKey}  updateKey={this.updateKey} />
        <Router>
        <Switch>
          <Route
            path="/"
            exact
            render={() => this.toRender()}
          />
        </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
