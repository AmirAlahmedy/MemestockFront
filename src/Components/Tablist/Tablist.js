import React from 'react'
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import Account from '../../Routes/Account/Account';
import './Tablist.css'

const Tablist = (props) => {
    return (
        <div className="container">
       <div className="tablist">
         <nav>
           <Link to='/Settings/Account' className="tab">Account</Link>
           <Link to='/Settings/Profile' className="tab">Profile</Link>
         </nav>

        </div>

      </div>
    )
  }

export default Tablist
