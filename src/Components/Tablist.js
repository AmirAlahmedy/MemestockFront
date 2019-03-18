import React from 'react'
import { Switch, Route, NavLink, withRouter } from 'react-router-dom';
import Account from '../Routes/Account/Account';
import './Tablist.css'

const Tablist = (props) => {
    return (
        <div className="container">
       <div className="tablist">
         <nav>
           <NavLink to='/Settings/Account'>Account</NavLink>
         </nav>

        </div>

      </div>
    )
  }

export default Tablist
