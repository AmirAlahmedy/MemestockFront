import React, { Component } from 'react';
import './App.css';
import Home from './Routes/Home';
import { BrowserRouter, Redirect } from 'react-router-dom';
import Registration from './Routes/Registration';
import Settings from './Routes/Settings';


class App extends Component {
  state = {
    email: '',
    userName: '',
    password: '',
    loggedIn: false,

    login:  function () {
        this.loggedIn = true; },
    logout: () => {
        this.loggedIn = false; }
  }
  
  savePassword = event => {
    this.setState({
        password: event.target.value
    });
}

  registrationHandler = event => {

    event.preventDefault();
    console.log(this.props.history);
    if( this.state.password == 'asd' ) {
        // this.state.login();
        this.setState({loggedIn: true});
        // this.props.history.replace( '/Home/' );
    }
    else{
        alert('Password is wrong.');
    }
  }
  render() {
    let redirect = null;
    if(this.state.loggedIn){
        redirect = <Redirect to='/Home/' /> ;
    }

    return (
      <BrowserRouter>
      <div className="App">
        {/* <Home /> */}
        {redirect}
        {this.state.loggedIn ?  <Home /> :
        <Registration regHand={this.registrationHandler} logged={this.state.loggedIn} password={this.state.password} svPswrd={this.savePassword}/>}
        {/* <Registration/> */}
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
