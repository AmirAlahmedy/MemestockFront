import React, { Component } from 'react';
import GoHome from '../GoHome/index.js';
import { Link, Route, Switch } from 'react-router-dom';
import axios from '../../axios-orders';
import './InviteModerators.css';
import Select from 'react-select';

class Moderators extends Component {
   state = {
      username: [],
      user: '',
      sr: '',
      subscriptions: []
   }

   onChangeUser = (e) => this.setState({ user: e.target.value });
   onChangeSr = (e) => this.setState({ sr: e.target.value });  // baoalk eh 3yez user mokhtalef ye create post 3ashan a3raf ana mashy sah wala 
   
   

   componentDidMount() {
      axios.get("/me/About/" + localStorage.getItem('Username'), { headers: { auth: localStorage.getItem("token") } })
         .then(resp => {
            if (resp.data.Subscriptions.length || resp.data.moderates.length) {
               this.setState({
                  subscriptions: [...resp.data.moderates]
               });
            }
         })
   }

   inviteModerators = (e) => {
      e.preventDefault();
      console.log('invite Clicked');

      if (!this.state.user) {
         alert("Please provide a new moderator");
         return;
      }

      if(!this.state.sr) {
         alert("Please Select a Subreddit first...");
         return
      }

      let headers = {
         auth: localStorage.getItem("token")
      }
      var newMod = {
         Username: this.state.user,
         SrName: this.state.sr
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

   setSR(option) {
      this.setState({
         sr: option.value
      });
   }

   render() {
      return (
         <div className="inviteM">
            <h2 className="InviteMods">Invite Moderators</h2>
            <form onSubmit={this.inviteModerators}>

               <Select
                  onChange={this.setSR.bind(this)}
                  options={this.state.subscriptions.map(sr => { return { value: sr, label: sr } })} />

               <input className="username" type="text" id="getUser"
                  name="username" placeholder="Moderator's Username"
                  value={this.state.user} onChange={this.onChangeUser}
               />
               {/* <br></br>
               <br></br> */}
               {/* <input className="srName" type="text" id="getSr"
                  name="username" placeholder="subreddit Name ex:Health, OneTwoThree"
                  value={this.state.sr} onChange={this.onChangeSr}
               /> */}
               <input type="submit" value="Invite" className="saveComment" />

            </form>

         </div>
      );




   }

}
export default Moderators;