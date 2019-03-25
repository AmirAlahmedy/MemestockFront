import React, { Component } from 'react';
import './Login.css';
import Aux from '../../Components/HOC/Auxiliary';
import classes from './Login.module.css';
import { NavLink, BrowserRouter as Router } from 'react-router-dom';


class Login extends Component {
   
    
    render(){

        let error = <strong className={classes.Invalid}>Your password is wrong!</strong>
        return(

        <Aux>

            <form className='regForm' onSubmit={ this.props.logHand } >
                <h1 className='logo'>Memestock</h1>
                 <div className='inputs'>

                <input className="usernameInput"
                type='text' 
                placeholder='User name'/>

                <input className="passInput"
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
            
        </Aux>
               );
               
               
            }
               
        }
            
export default Login;