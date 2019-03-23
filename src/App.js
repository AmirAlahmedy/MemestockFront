import React, { Component } from 'react';
import './App.css';
import Home from './Routes/Home/Home';
import { BrowserRouter } from 'react-router-dom';
import Registration from './Routes/Registration/Registration';
import axios from './axios-orders';


class App extends Component {
  state = {
    Credentials: {
        Email: '',
        Username: '',
        Password: ''
      },

    passwordIsValid: true,
    loggedIn: false,
    alreadyRegistered: false  
  }

  /**
   * Saves the password
   * @function savePassword
   * @param {event} e - On the change of the password input
   */
  savePassword = e => {
    this.setState({
        Password: e.target.value
    });
  }


  /**
 * Handles both the registration and login attempts.
 * @function registrationHandler
 * @param {event} e - The submission of the form.
 */
  registrationHandler = e => {

    e.preventDefault();
    if( this.state.Password.length >= 8 && /*!this.state.alreadyRegistered*/ !localStorage.getItem('alreadyRegistered')) {
      let inputs = e.target.querySelectorAll('input');
        this.setState({
          Credentials:{

            Email: inputs[0].value,
            Username: inputs[1].value,
            Password: inputs[2].value

          },
            loggedIn: true}, () => {
            
            axios.post('user/register', this.state.Credentials)
                   .then( response => {
                        this.setState({alreadyRegistered: true});
                        localStorage.setItem('alreadyRegistered', true);
                        console.log(response);
                   })
                   .catch( error =>{
                    this.setState({alreadyRegistered: false});
                   })
          });
          

    }else if(this.state.Password.length >= 8 && /*this.state.alreadyRegistered*/ localStorage.getItem('alreadyRegistered')){
      let inputs = e.target.querySelectorAll('input');
      this.setState({
        Credentials:{

          Username: inputs[0].value,
          Password: inputs[1].value,

        },
          loggedIn: true}, () => {
          
          axios.post('user/login', this.state.Credentials)
                 .then( response => {
                      console.log(response);
                 })
                 .catch( error =>{
                  this.setState({loggedIn: false});
                 })
        });
    }else{

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
