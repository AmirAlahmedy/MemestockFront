import React, { Component } from 'react';
import './App.css';
import Home from './Routes/Home/Home';
import { Redirect, withRouter } from 'react-router-dom';
import Registration from './Routes/Registration/Registration';
import Login from './Routes/Login/Login';
import axios from './axios-orders';
import * as actions from './store/actions/index';
import { connect } from 'react-redux';


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
    this.props.onTryAutoSignup();
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
 * Handles both the registration and login attempts.
 * @function registrationHandler
 * @param {event} e - The submission of the form.
 */
  registrationHandler = e => {

    e.preventDefault();
    if( this.state.Password.length >= 8 &&  !localStorage.getItem('alreadyRegistered')) {
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
          

    }else if(this.state.Password.length >= 8 && localStorage.getItem('alreadyRegistered')){
      let inputs = e.target.querySelectorAll('input');
      this.setState({
        Credentials:{

          Username: inputs[0].value,
          Password: inputs[1].value,

        },
          loggedIn: true}, () => {
          
          axios.post('user/login', this.state.Credentials)
                 .then( response => {
                      localStorage.setItem('loggedIn', true);
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
     
     
            <div className="App" onMouseMove={this.onMouseMove}>

            {this.state.loggedIn ? <Home /> :( this.state.alreadyRegistered ? <Login regHand={this.registrationHandler} logged={this.state.loggedIn} psrdVld={this.state.passwordIsValid} password={this.state.Password} svPswrd={this.savePassword}/>:<Registration regHand={this.registrationHandler} logged={this.state.loggedIn} psrdVld={this.state.passwordIsValid} password={this.state.Password} svPswrd={this.savePassword}/> )}
   
        </div>
     
    );
  }
}


// const mapStateToProps = state => {
//   return {
//       loading: state.auth.loading,
//       error: state.auth.error,
//       isAuthenticated: state.auth.token !== null,
//       //  buildingMemeStock: state.memeStock.building,
//       authRedirectPath: state.auth.authRedirectPath,

//       loggedIn: state.loggedIn,
//       alreadyRegistered: state.alalreadyRegistered


//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//       onAuth: ( email, password, alreadyRegistered ) => dispatch( actions.auth( email, password, alreadyRegistered ) ),
//       onSetAuthRedirectPath: () => dispatch( actions.setAuthRedirectPath( '/' ) ),
      
//   };
// };
const mapStateToProps = state => {
  return {
    isAuthenticated: true//state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

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
