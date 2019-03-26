import React, { Component } from 'react';
import Aux from '../../Components/HOC/Auxiliary';
import classes from './Registration.module.css';
import { NavLink, Route, withRouter, BrowserRouter as Router, Switch } from 'react-router-dom';
import Login from '../Login/Login';
import './Registration.scss';
import '../../Sass/styles.scss';

class Registration extends Component {

    componentDidMount = () =>{
        this.props.history.replace('/Registration/');
    }
    
    render(){

        
        let error = <strong className={classes.Invalid}>Your password is wrong!</strong>
        return(


         <Aux>
             <Switch>
             <Route path='/Login/'  render={()=><Login logHand={this.props.regHand} logged={this.props.logged} psrdVld={this.props.psrdVld} password={this.props.password} svPswrd={this.props.svPswrd}/>}/>
             
            <div className="formWrapper">
            <form className='regForm' onSubmit={ this.props.regHand }>
                <h1 className='logo'><i className="fab fa-fort-awesome-alt"></i><sub>Memestock</sub></h1>
                 <div className='inputs'>

                <input  className="emailInput"
                type='email' 
                placeholder='E-mail'
                name='email'/>

                <input className="usernameInput"
                type='text' 
                placeholder='User name'
                name='username'/>

                <input className="passInput"
                type='password'
                placeholder="Password" 
                onChange={ this.props.svPswrd }
                name='password'/>

                {!this.props.logged && !this.props.psrdVld ? error:null}
                </div> 

                <button type="submit" className='registerButton'> Register </button>
                <NavLink to='/Login/'>Already Registered?</NavLink>
            </form>

        </div>

            
    
                </Switch>
        


        </Aux>
 

               );
               
               
            }
               
        }
            
export default withRouter(Registration);