import React, { Component } from 'react';
import './App.css';
import Home from './Routes/Home/Home';
import { BrowserRouter, Redirect } from 'react-router-dom';
import Registration from './Routes/Registration/Registration';
import Login from './Routes/Login/Login';
import Settings from './Routes/Settings/Settings';
import axios from './axios-orders';


class App extends Component {
  state = {
    Email: 'ameeeer.alsa@gmail.com',
    Username: 'aasaaa',
    Password: 'oooooooooooosooooooo',
    passwordIsValid: true,
    loggedIn: false,
    alreadyRegistered: false  
  }

  /**
   * Saves the password
   * @function
   * @param {event} e - On the change of the password input
   */
  savePassword = e => {
    this.setState({
        Password: e.target.value
    });
  }


  /**
 * Handles both the registration and login attempts.
 * @function
 * @param {event} e - The submission of the form.
 */
  registrationHandler = e => {

    e.preventDefault();
    if( this.state.Password.length >= 8 && !this.state.alreadyRegistered ) {
      let inputs = e.target.querySelectorAll('input');
        this.setState({
          Email: inputs[0].value,
          Username: inputs[1].value,
          Password: inputs[2].value,
          loggedIn: true});

        console.log(inputs[0].value);
        console.log(this.state);
        const registrationRequest = {

                       Email: this.state.Email,
                       Username: this.state.Username,
                       Password: this.state.Password
                   }
                   console.log(this.state);
        axios.post('user/register', registrationRequest)
                   .then( response => {
                        this.setState({alreadyRegistered: true});
                        console.log(response);
                   })
                   .catch( error =>{
                    this.setState({alreadyRegistered: false});
                   })
    }
    else{

        this.setState({loggedIn: false, passwordIsValid:false});
    }
  }


   render() {

    return (
      <BrowserRouter>
        <div className="App">
          {this.state.loggedIn ?  <Home /> :<Registration regHand={this.registrationHandler} logged={this.state.loggedIn} psrdVld={this.state.passwordIsValid} password={this.state.Password} svPswrd={this.savePassword}/>
          }
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
