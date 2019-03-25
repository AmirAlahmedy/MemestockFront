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
    alreadyRegistered: false,
    x: 0,
    y: 0
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
//   const myroot = document.documentElement;
//   document.body.addEventListener('mousemove', evt => {
//     let x = evt.clientX / innerWidth;
//     let y = evt.clientY / innerHeight;
 
//     myroot.style.setProperty('--mouse-x', x);
//     myroot.style.setProperty('--mouse-y', y);
// });
  onMouseMove(e) {
  
  }

   render() {

    return (
      <BrowserRouter>
     
            <div className="App" onMouseMove={this.onMouseMove}>
            {/* <div className="bg"></div>
            <div className="bg bg2"></div>
            <div className="bg bg3"></div> */}
            {/* <div class="area" > */}
            
            {/* <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul> */}
            {this.state.loggedIn ?  <Home /> :<Registration regHand={this.registrationHandler} logged={this.state.loggedIn} psrdVld={this.state.passwordIsValid} password={this.state.Password} svPswrd={this.savePassword}/>
              }
    {/* </div > */}
             
            {/* </div>
          </div>
        </div> */}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
