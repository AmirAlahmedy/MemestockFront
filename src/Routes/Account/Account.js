import React, { Component } from 'react';
import {Link,Route,Switch} from 'react-router-dom';
import './Account.css'
import Edit from './Edit'
import  ChangePass from './ChangePass'

class Account extends Component {
  render(){
  return (
    <div>
      <div >
     {/* <h4 className="left">Account Settings</h4> */}

    <div className="leftlinks"><Link to ='/Settings/Account/Edit/'>Change/add Email</Link></div>
    <p className="emailParag">The Above Link is not working yet GUYS Stay Tunedd!</p>

    <div className="leftlinks"><Link to="/Settings/Account/ChangePass">Change Password</Link></div>
    <p className="emailParag">Change password is still oUnder Construction. We're in the process of building this functionality. Stay tuned!</p>
        </div>


        <Switch>
    <Route path='/Settings/Account/Edit'  component={Edit}/>
    <Route path='/Settings/Account/ChangePass' component={ChangePass}/>
    </Switch>
       
       
    </div>
  )
}
}

export default Account
