import React, { Component } from 'react';
import Aux from '../../Components/HOC/Auxiliary';
import classes from './Registration.module.css';
import { NavLink, Route, withRouter, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import Login from '../Login/Login';
import './Registration.scss';
import '../../Sass/styles.scss';
import * as actions from '../../store/actions/index';
import { connect } from  'react-redux';

class Registration extends Component {

    componentDidMount = () =>{
        if ( /*!this.props.buildingMeme &&*/ this.props.authRedirectPath !== '/Registration/' ) {
            this.props.onSetAuthRedirectPath();
            
        }
        
        this.props.history.replace('/Registration/');
        localStorage.setItem('prevPath', this.props.authRedirectPath);
        localStorage.setItem('loggedIn', false);
        localStorage.setItem('alreadyRegistered', false);
         
    }
    
  
    
    
    render(){

        
        let error = <strong className={classes.Invalid}>Your password is wrong!</strong>
        let authRedirect = null;
        if ( this.props.isAuthenticated /*&& window.location.pathname != '/Registration/'*/) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
             

            console.log(this.props.authRedirectPath);
            console.log(''+window.location.pathname);
            console.log(window.location);

        }
        return(


         <Aux>
             {authRedirect}
             <Switch>
             <Route path='/Login/'  render={()=><Login logHand={this.props.regHand} logged={this.props.logged} psrdVld={this.props.psrdVld} password={this.props.password} svPswrd={this.props.svPswrd}/>}/>
             
            <div className="formWrapper">
           
            <form className='regForm' onSubmit={ this.props.regHand }>
              
                <h1 className='logo'><i className="fab fa-fort-awesome-alt"></i><sub>Memestock</sub></h1>
                 <div className='inputs'>

                <input  className="emailInput in"
                type='email' 
                placeholder='E-mail'
                name='email'/>

                <input className="usernameInput in"
                type='text' 
                placeholder='User name'
                name='username'/>

                <input className="passInput in"
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
 

               );}
               
        }
        const mapStateToProps = state => {
            return {
                loading: state.auth.loading,
                error: state.auth.error,
                isAuthenticated: true,//state.auth.token !== null,
                //  buildingMeme: state.memeBuilder.building,
                 authRedirectPath: window.location.pathname//state.auth.authRedirectPath
            };
        };
        
        const mapDispatchToProps = dispatch => {
            return {
                // onAuth: ( email, password, isSignup ) => dispatch( actions.auth( email, password, isSignup ) ),
                onSetAuthRedirectPath: () => dispatch( actions.setAuthRedirectPath( ''+window.location.pathname ) )
            };
        };
            
export default withRouter(connect( mapStateToProps, mapDispatchToProps )(Registration));


