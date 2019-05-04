import React, { Component } from 'react';
import GoHome from '../GoHome/index.js';
import { Link, Route, Switch } from 'react-router-dom';
import axios from '../../axios-orders';
import './InviteModerators.css';

class Moderators extends Component {
state={
username:[],
user:'',
sr:''

}

onChangeUser=(e)=>this.setState({user:e.target.value});
onChangeSr=(e)=>this.setState({sr:e.target.value});


inviteModerators = (e) => {
    e.preventDefault();
    console.log('invite Clicked');

    let checker = "";
    if (document.getElementById("getUser").value === checker) {
        alert("Please provide a new moderator");
        return;
     }
     else if (document.getElementById("getSr").value === checker) {
        alert("Please provide a subreddit");
        return;
     }

     let headers = {
        auth: localStorage.getItem("token")
     }
var newMod={
      Username:this.state.user,
      SrName:this.state.sr
}
     //console.log(Username);
     //console.log(SrName);

     axios.put('/Moderator/Invite', newMod, { "headers": headers })
         .then(res => {
            if (res.status == 200) {
               console.log(res)
               alert('Invitation Sent');
            }
            else if (res.status === 404) {
              alert("Error sending invitation!");
               return Response.json;
            }
            else if (res.status === 402) {
               console.log(res)
                alert("Error sending invitation!");
                return Response.json;
             }
             else if (res.status === 401) {
               console.log(res)
               alert("Error sending invitation!");
             }
         })
         .catch(error => {
            alert("Error sending invitation!");
         })


}

render() {
    return (
<div className="inviteM">
<h2 className="InviteMods">Invite Moderators</h2>
<form  onSubmit={this.inviteModerators}>
    <input   className="username" type="text" id="getUser"
     name="username" placeholder="username ex:Bond_JamesBond"
     value={this.state.user} onChange={this.onChangeUser}
    />
    <br></br>
    <br></br>
    <input   className="srName" type="text"  id="getSr"
     name="username" placeholder="subreddit Name ex:Health, OneTwoThree"
     value={this.state.sr} onChange={this.onChangeSr}
    />
    <input type="submit" value="Invite" className="saveComment"/>
    
</form>

</div>
        );

   


}

}
export default Moderators;