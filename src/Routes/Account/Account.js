import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import './Account.css'
import Edit from './Edit'
import ChangePass from './ChangePass'

class Account extends Component {
  render() {
    return (
      <div>
        <div >
          {/* <h4 className="left">Account Settings</h4> */}
          <div className="accountLinks">
            <a href='#Edit'>Update Email</a>
            <a href="#ChangePass">Change Password</a>
          </div>
        </div>

        {window.location.href.includes("#ChangePass") ? <ChangePass /> : <Edit />}

      </div>
    )
  }
}

export default Account
