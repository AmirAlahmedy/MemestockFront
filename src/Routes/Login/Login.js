import React, { Component } from 'react';
import './Login.css';
import Aux from '../../Components/HOC/Auxiliary';
import classes from './Login.module.css';
import { withRouter, NavLink } from 'react-router-dom';


class Login extends Component {
   
    
    render(){

        let error = <p className={classes.Invalid}>Your password is wrong!</p>
        return(

        <Aux>

            <form className='regForm' onSubmit={ this.props.logHand } >
                <h1 className='logo'>Memestock</h1>
                 <div className='inputs'>

                <input type='text' 
                placeholder='User name'/>

                <input type='password'
                placeholder="Password" 
                value={ this.props.password } 
                onChange={ this.props.svPswrd }/>

                 {!this.props.logged && !this.props.psrdVld ? error:null}
                </div> 
                
                <button type="submit" className='registerButton'> Login </button>
                <NavLink to='/Registration/'>Create a new account?</NavLink>
            </form>
            
        </Aux>
               );
               
               
            }
               
        }
            
export default withRouter(Login);