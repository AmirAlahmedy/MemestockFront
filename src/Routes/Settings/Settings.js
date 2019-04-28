import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Account from '../Account/Account';
import SettProfile from '../SettingsProf/SettProfile';
import './Settings.css';
import Tablist from '../../Components/Tablist/Tablist' 
import Edit from '../Account/Edit'

class Settings extends Component {
  render() {
    return (
      <div className="Settings">
      <h3>User Settings</h3>
      <hr></hr>
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
