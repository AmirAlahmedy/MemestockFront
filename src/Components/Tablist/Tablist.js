import React from 'react'
import { Switch, Route, Link, withRouter, NavLink } from 'react-router-dom';
import Account from '../../Routes/Account/Account';
import './Tablist.css'

const Tablist = (props) => {
    return (
        <div className="container">
       <div className="tablist">
         <nav>
           <NavLink to='/Settings/' exact activeClassName="activeTab" className="tab">Account</NavLink>
           <NavLink to='/Settings/Profile' activeClassName="activeTab" className="tab">Profile</NavLink>
         </nav>

        </div>

      </div>
    )
  }

export default Tablist
