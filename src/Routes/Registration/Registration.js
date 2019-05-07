import React, { Component } from 'react';
import Aux from '../../Components/HOC/Auxiliary';
import classes from './Registration.module.css';
import { NavLink, Route, withRouter, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import Login from '../Login/Login';
import './Registration.scss';
import '../../Sass/styles.scss';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Home from '../Home/Home';
import axios from '../../axios-orders';

export default class Registration extends Component {
    state = {

    }
    componentDidMount = () => {
        // if ( /*!this.props.buildingMeme &&*/ this.props.authRedirectPath !== '/Registration/' ) {
        //     this.props.onSetAuthRedirectPath();

        // }

        // this.props.history.replace('/Registration/');
        // localStorage.setItem('prevPath', this.props.authRedirectPath);
        // localStorage.setItem('loggedIn', false);
        // localStorage.setItem('alreadyRegistered', false);

    }
/**
   * Handles registration submission 
   * @function handleSubmit
   * @param  {event} - submit event
   */
    handleSubmit(e) {
        
        e.preventDefault();
        let inputs = e.target.querySelectorAll('.regForm input');
        //TODO:: Validate data before submission.
        const data = {
            Email: inputs[0].value,
            Username: inputs[1].value,
            Password: inputs[2].value
        }
        axios.post('user/register', data)
            .then(response => {

                if(response.data.token){
                    this.props.close();
                    this.props.finishReg(response.data.token, data.Username);
                }else{
                    this.setState({
                        error: "*That's awkawrd, our servers are unable to process your request properly. Please try again later."
                    });
                }

            })
            .catch(error => {
                //error.response.data.error
                if (error.response && error.response.data && error.response.data.error) {
                    this.setState({
                        error: "*" + error.response.data.error
                    });
                } else {
                    this.setState({
                        error: "*An unknown error have occured..."
                    });
                }
                // this.setState({ alreadyRegistered: false, loggedIn: false });
                // console.log();
            })
    }

    render() {


        let error = <p className={classes.Invalid}>{this.state.error || ""}</p>
        // let authRedirect = null;
        // if ( this.props.isAuthenticated /*&& window.location.pathname != '/Registration/'*/) {
        //     authRedirect = <Redirect to={this.props.authRedirectPath} />


        //     console.log(this.props.authRedirectPath);
        //     console.log(''+window.location.pathname);
        //     console.log(window.location);

        // }
        return (


            <Aux>

                {/* <Switch>
             <Route path="/Home/" /*component={Home} render={
                 props=>{
                     return(
                        <Home isGuest={true}/>
                     );
                 }
             } /> 
             <Route path='/Login/'  render={()=><Login logHand={this.props.logHand} logged={this.props.logged} psrdVld={this.props.psrdVld} password={this.props.password} svPswrd={this.props.svPswrd}/>}/>
              */}
                <div className="formWrapper">

                    <form className='regForm' onSubmit={this.handleSubmit.bind(this)}>

                        <h1 className='logo'>SIGN UP</h1>
                        {error || null}

                        <div className='inputs'>

                            <input className="emailInput in"
                                type='email'
                                placeholder='E-mail'
                                name='email' />

                            <input className="usernameInput in"
                                type='text'
                                placeholder='User name'
                                name='username' />

                            <input className="passInput in"
                                type='password'
                                placeholder="Password"
                                onChange={this.props.svPswrd}
                                name='password' />


                        </div>

                        <button type="submit" className='registerButton'>SIGN UP</button>
                    </form>

                </div>

                {/* </Switch> */}
            </Aux>
        );


    }

}

        // const mapStateToProps = state => {
        //     return {
        //         loading: state.auth.loading,
        //         error: state.auth.error,
        //         isAuthenticated: true,//state.auth.token !== null,
        //         //  buildingMeme: state.memeBuilder.building,
        //          authRedirectPath: window.location.pathname//state.auth.authRedirectPath
        //     };
        // };

        // const mapDispatchToProps = dispatch => {
        //     return {
        //         // onAuth: ( email, password, isSignup ) => dispatch( actions.auth( email, password, isSignup ) ),
        //         onSetAuthRedirectPath: () => dispatch( actions.setAuthRedirectPath( ''+window.location.pathname ) ),

        //     };
        // };

// export default withRouter(connect( mapStateToProps, mapDispatchToProps )(Registration));