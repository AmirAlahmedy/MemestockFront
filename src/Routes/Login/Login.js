import React, { Component } from 'react';
import './Login.css';
import Aux from '../../Components/HOC/Auxiliary';
import classes from './Login.module.css';
import { NavLink, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../../Sass/styles.scss';
import Registration from '../Registration/Registration';


class Login extends Component {

    componentDidMount = () =>{
        localStorage.setItem('loggedIn', false);
        localStorage.setItem('alreadyRegistered', true);


    }
    
    render(){

        let error = <strong className={classes.Invalid}>Your password is wrong!</strong>
        return(

        <Aux>
             {/* <Route path='/Registration/'  render={()=><Registration regHand={this.props.logHand} logged={this.props.logged} psrdVld={this.props.psrdVld} password={this.props.password} svPswrd={this.props.svPswrd}/>}/> */}
            <div className="logINFormWrapper">
            <form className='logInForm' onSubmit={ this.props.logHand } >
                <h1 className='logo'> <i className="fab fa-fort-awesome-alt"></i><sub>Memestock</sub></h1>
                 <div className='inputs'>

                <input className="usernameInput logi"
                type='text' 
                placeholder='User name'/>

                <input className="passInput logi"
                type='password'
                placeholder="Password" 
                value={ this.props.password } 
                onChange={ this.props.svPswrd }/>

                 {!this.props.logged && !this.props.psrdVld ? error:null}
                </div> 
                
                <button type="submit" className='registerButton'> Login </button>
                {/* <Router> */}
                    <NavLink to='/Registration/'>Create a new account?</NavLink>
                {/* </Router> */}
            </form>
            
        </div>
        </Aux>
               );
               
               
            }
               
        }
            
export default Login;