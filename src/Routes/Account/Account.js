import React from 'react'
import {Link} from 'react-router-dom';
import './Account.css'

const Account = () => {
  return (
    <div>
      <div >
     {/* <h4 className="left">Account Settings</h4> */}

    <div className="leftlinks"><Link to="#">Change/add Email</Link></div>
    <p className="emailParag">The Above Link is not working yet GUYS Stay Tunedd!</p>
    <div className="leftlinks"><Link to="#">Change Password</Link></div>
    <p className="emailParag">Change password is still oUnder Construction. We're in the process of building this functionality. Stay tuned!</p>
        </div>

        
    </div>
  )
}

export default Account
