import React, { Component } from 'react';
import './Login.css';
import Aux from '../../Components/HOC/Auxiliary';
import classes from './Login.module.css';
import Home from '../Home/Home';
import { Route, Redirect, withRouter, Switch, NavLink } from 'react-router-dom';
import Registration from '../Registration/Registration';
import Input from '../../Components/UI/input/input';
import Button from '../../Components/UI/Button/Button';
import Spinner from '../../Components/UI/Spinner/Spinner';
import axios from '../../axios-orders';

class Login extends Component {
    state = {
        password: '',
        logged: false,
        psrdVld: true,
       
    }
    svPswrd = e => {
        this.setState({
            password: e.target.value
        });
    }
    logInHandler = e =>{
        e.preventDefault();
        if(this.state.password.length >= 8){
            this.setState({logged: true});

        }else{
            this.setState({logged: false});
        }

    }

   
    
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