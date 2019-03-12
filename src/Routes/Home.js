import React, { Component } from 'react';
import './Home.css';
import NavBar from '../Components/Navbar';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

class Home extends Component {

  state = {
    auth: false
  }

    render() {
        return (<NavBar/>);
      }
}

export default Home;