import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Account from '../Account/Account';
import SettProfile from '../SettingsProf/SettProfile';
import './Settings.css';
import Tablist from '../../Components/Tablist/Tablist' 

class Settings extends Component {
  render() {
    return (
      <div className="Settings">
      <div ><h4>User Settings</h4></div>
      <Tablist/>
      <Switch>

<Route path='/Settings/Account/'  component={Account}/>
<Route path='/Settings/Profile/'  component={SettProfile}/>



</Switch>

      </div>
    )
  }
}

export default Settings
