import React, { Component } from 'react';
import './Registration.css';
import Aux from '../../Components/HOC/Auxiliary';
import classes from './Registration.module.css';
import { NavLink, Route, withRouter } from 'react-router-dom';
import Login from '../Login/Login';



class Registration extends Component {

    componentDidMount = () =>{
        this.props.history.replace('/Registration/');
    }
    
    render(){

        
        let error = <p className={classes.Invalid}>Your password is wrong!</p>
        return(

        <Aux>

            <form className='regForm' onSubmit={ this.props.regHand }>
                <h1 className='logo'>Memestock</h1>
                 <div className='inputs'>

                <input type='email' 
                placeholder='E-mail'
                name='email'/>

                <input type='text' 
                placeholder='User name'
                name='username'/>

                <input type='password'
                placeholder="Password" 
                // value={ this.props.password } 
                onChange={ this.props.svPswrd }
                name='password'/>

                {!this.props.logged && !this.props.psrdVld ? error:null}
                </div> 

                <button type="submit" className='registerButton'> Register </button>
                <NavLink to='/Login/'>Already Registered?</NavLink>
            </form>
            <Route path='/Login/'  render={()=><Login logHand={this.props.regHand} logged={this.props.logged} psrdVld={this.props.psrdVld} password={this.props.password} svPswrd={this.props.svPswrd}/>}/>

        </Aux>
               );
               
               
            }
               
        }
            
export default withRouter(Registration);