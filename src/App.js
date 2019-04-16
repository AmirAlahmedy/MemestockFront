import React, { Component } from 'react';
import './App.css';
import Home from './Routes/Home/Home';
import { Redirect, withRouter, Route } from 'react-router-dom';
import Registration from './Routes/Registration/Registration';
import Login from './Routes/Login/Login';
import axios from './axios-orders';
import * as actions from './store/actions/index';
import { connect } from 'react-redux';
//import 'bootstrap/dist/css/bootstrap.css';

let token = '';

class App extends Component {
  
  state = {
    Credentials: {
        Email: '',
        Username: '',
        Password: ''
      },
      auth: {
        token: '',
        loading:'',
      },

    passwordIsValid: true,
    loggedIn: false,
    alreadyRegistered: false,
  
  }

  componentDidMount = () => {
    this.props.authToken();
    window.onbeforeunload = (e) => {
      console.log('stay on the same route')
      };
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
 * Handles both the registration attempts.
 * @function registrationHandler
 * @param {event} e - The submission of the form.
 */
  registrationHandler = e => {

    e.preventDefault();
    if( this.state.Password.length >= 8 ) {
      let inputs = e.target.querySelectorAll('input');
        this.setState({
          Credentials:{

            Email: inputs[0].value,
            Username: inputs[1].value,
            Password: inputs[2].value

          },
            loggedIn: true,
          alreadyRegistered: true}, () => {
            localStorage.setItem("username", this.state.Credentials.Username);
            axios.post('user/register', this.state.Credentials)
                   .then( response => {
                        this.setState({alreadyRegistered: true});
                        localStorage.setItem('alreadyRegistered', true);
                        localStorage.setItem('loggedIn', true);
                        console.log(response.data);
                        token = response.data.token;
                        localStorage.setItem('token', token);
                        this.setState({
                          auth: {
                            token: response.data.token,
                          }
                        });
                      
                   })
                   .catch( error =>{
                    this.setState({alreadyRegistered: false, loggedIn: false});
                    console.log(error);
                   })
          });
          

    }else{

        this.setState({loggedIn: false, passwordIsValid:false});
    }
  }

   /**
 * Handles both the login attempts.
 * @function logInHandler
 * @param {event} e - The submission of the form.
 */
  logInHandler = e => {

    e.preventDefault();

    if(this.state.Password.length >= 8 ){
      let inputs = e.target.querySelectorAll('input');
      this.setState({
        Credentials:{

          Username: inputs[0].value,
          Password: inputs[1].value,

        },
          loggedIn: true}, () => {
          
          axios.post('user/Login', this.state.Credentials)
                 .then( response => {
                      localStorage.setItem('loggedIn', true);
                      console.log(response.data);
                      token = response.data.token;
                      localStorage.setItem('token', token);
                      this.setState({
                        auth: {
                          token: response.data.token,
                        }
                      });
                      console.log(token);
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
    console.log(this.state.loggedIn);
    console.log(this.state.auth.token);

    return (
      
     
            <div className="App">

            {this.state.loggedIn ? <Home  token={this.state.auth.token}/> :( this.state.alreadyRegistered ? <Login logHand={this.logInHandler} logged={this.state.loggedIn} psrdVld={this.state.passwordIsValid} password={this.state.Password} svPswrd={this.savePassword} />:<Registration regHand={this.registrationHandler} logged={this.state.loggedIn} psrdVld={this.state.passwordIsValid} password={this.state.Password} svPswrd={this.savePassword} logHand={this.logInHandler}/> )}
   
        </div>
     
    );
  }
}



const mapStateToProps = state => {
  console.log(state.auth.token);
  return {
    isAuthenticated: true,//state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
    loggedIn: state.loggedIn,
    alreadyRegistered: state.alalreadyRegistered,
    token: state.auth.token
    
  };
};

const mapDispatchToProps = dispatch => {
  console.log(token);
  return {
  //  onTryAutoSignup: () => dispatch( actions.authCheckState() ),
    onSetAuthRedirectPath: () => dispatch( actions.setAuthRedirectPath( '/' ) ),
    authToken: () => dispatch( actions.authSuccess() )
  };
};

const app =  withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
const registrationHandler = app.registrationHandler;
const logInHandler = app.logInHandler;

export{
  app,
  registrationHandler,
  logInHandler

}

// import React, { Component } from 'react';
// import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
// import { connect } from 'react-redux';
// import asyncComponent from './Components/HOC/asyncComponent/asyncComponent';

// // import Layout from './hoc/Layout/Layout';

// import Logout from './Auth/Logout/Logout';
// import * as actions from './store/actions/index';

// import Home from './Routes/Home/Home';
// import Auth from './Auth/Auth';


// const asyncAuth = asyncComponent(() => {
//   return import('./Auth/Auth');
// });

// class App extends Component {
//   componentDidMount () {
//     this.props.onTryAutoSignup();
//   }

//   render () {
//     let routes = (
//       <Switch>
//         <Route path="/auth" component={asyncAuth} />
//         <Route path="/" exact component={Auth} />
//         <Redirect to="/" />
//       </Switch>
//     );

//     if ( this.props.isAuthenticated ) {
//       routes = (
//         <Switch>
//           {/* <Route path="/checkout" component={asyncCheckout} /> */}
//           {/* <Route path="/orders" component={asyncOrders} /> */}
//           <Route path="/logout" component={Logout} />
//           <Route path="/auth" component={asyncAuth} />
//           <Route path="/Home/" exact component={Home} />
//           <Redirect to="/" />
//         </Switch>
//       );
//     }

//     return (
//       <div>
//           {routes}

//       </div>
//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//     isAuthenticated: state.auth.token !== null
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     onTryAutoSignup: () => dispatch( actions.authCheckState() )
//   };
// };

// export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
