import React, { Component } from 'react';
import './App.css';
import Home from './Routes/Home/Home';
import { BrowserRouter, Redirect } from 'react-router-dom';
import Registration from './Routes/Registration/Registration';
import Login from './Routes/Login/Login';
import Settings from './Routes/Settings/Settings';


class App extends Component {
  state = {
    email: '',
    userName: '',
    password: '',
    passwordIsValid: true,
    loggedIn: false,

    login:  function () {
        this.loggedIn = true; },
    logout: () => {
        this.loggedIn = false; },
    isLogInOpen: false,    
  }
  
  savePassword = event => {
    this.setState({
        password: event.target.value
    });
}

  registrationHandler = event => {

    event.preventDefault();
    console.log(this.props.history);
    if( this.state.password.length >= 8 ) {
        this.setState({loggedIn: true, isLogInOpen:true});
    }
    else{

        this.setState({loggedIn: false, passwordIsValid:false, isLogInOpen:false});
    }
  }
  render() {

    return (
      <BrowserRouter>
      <div className="App">
        {this.state.loggedIn ?  <Home /> :<Registration regHand={this.registrationHandler} logged={this.state.loggedIn} psrdVld={this.state.passwordIsValid} password={this.state.password} svPswrd={this.savePassword}/>
        }
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
