import React, { Component } from 'react';
import './Login.css';
import Aux from '../../Components/HOC/Auxiliary';
import classes from './Login.module.css';
import { NavLink, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../../Sass/styles.scss';
import Registration from '../Registration/Registration';
import axios from '../../axios-orders';


class Login extends Component {
    state = {
        forgot: " "
    }
    componentDidMount = () => {
    }
    handleSubmit(e) {
        e.preventDefault();

        let inputs = e.target.querySelectorAll('.logInForm input');
        const data = {

            Username: inputs[0].value,
            Password: inputs[1].value,

        }
        return axios.post('http://18.217.163.16/api/user/Login', data)
            .then(response => {
                if(response.data.token){
                    this.props.close();
                    this.props.finishLogin(response.data.token, data.Username);
                }else{
                    this.setState({
                        error: "*That's awkawrd, our servers are unable to process your request properly. Please try again later."
                    });
                }
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.error) {
                    this.setState({
                        error: "*" + error.response.data.error
                    });
                } else {
                    this.setState({
                        error: "*An unknown error have occured..."
                    });
                }
            })
}
forgotPassHand(e){  
    e.preventDefault();
    let username = document.getElementsByClassName('usernameInput')[0].value;
    console.log(username);
    axios.put(`/user/ForgetPassword/${username}`)
        .then(response => {
            if(response.status === 200){
                this.setState({
                    forgot: response.data.message
                })

               console.log(response);
            }
        })
        .catch(error => {
            if(error.status === 404){
                this.setState({
                    forgot: 'User Does not exist'
                })
            }
        })
}
render(){

    let error = <p className={classes.Invalid}>{this.state.error || ""}</p>
    let frgpss = this.state.forgot != " " ?  <p className={classes.Invalid}>{"*"+this.state.forgot}</p> : null;
    return (

        <Aux>
           
            <div className="logINFormWrapper">
                <form className='logInForm' onSubmit={this.handleSubmit.bind(this)} >
                    <h1 className='logo'>LOG IN</h1>
                    {error || null}
                    {frgpss}
                    <div className='inputs'>

                        <input className="usernameInput logi"
                            type='text'
                            placeholder='User name' />

                        <input className="passInput logi"
                            type='password'
                            placeholder="Password"
                            value={this.props.password}
                            onChange={this.props.svPswrd} />

                    </div>

                    <button type="submit" className='registerButton'> Login </button>
                     <a href='#' id='frgt' onClick={this.forgotPassHand.bind(this)}>Forgot your password?</a>
                   
                </form>

            </div>
        </Aux>
    );


}
               
        }

export default Login;