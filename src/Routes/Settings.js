import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Account from './Account';
import './Settings.css';
import Tablist from '../Components/Tablist' 

class Settings extends Component {
  render() {
    return (
      <div className="Settings">
      <div className="left"><h4>User Settings</h4></div>
      <Tablist/>
      <Switch>

<Route path='/Settings/Account/'  component={Account}/>


</Switch>

      </div>
    )
  }
}

export default Settings
