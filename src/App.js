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
    Email: '',
    Username: '',
    Password: '',
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
    console.log(this.props.history);
    if( this.state.Password.length >= 8 && !this.state.alreadyRegistered ) {
        this.setState({loggedIn: true});
        // eslint-disable-next-line default-case
        switch(e.target.type){
          
          case('email'):
          this.setState({Email: e.target.value});
          break;
          case('text'):
          this.setState({Username: e.target.value});
          break;
          case('password'):
          this.setState({Password: e.target.value});

        }

        const registrationRequest = {

                       Email: this.state.Email,
                       Username: this.state.Username,
                       Password: this.state.Password
                   }

        axios.post('user/register', registrationRequest)
                   .then( response => {
                        this.setState({alreadyRegistered: true});
                        console.log(response);
                   })
                   .catch( error =>{
                    this.setState({alreadyRegistered: false});
                   })

        // localStorage.setItem('current user', JSON.stringify({token:'jwt will come later', name: this.state.Username}));
    }
    else{

        this.setState({loggedIn: false, passwordIsValid:false});
    }
  }

  // currentUser = () => JSON.parse(localStorage.getItem('current user'));
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
