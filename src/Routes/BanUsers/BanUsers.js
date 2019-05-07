import React, { Component } from 'react';
import GoHome from '../GoHome/index.js';
import { Link, Route, Switch } from 'react-router-dom';
import axios from '../../axios-orders';
import './BanUsers.css';
import Select from 'react-select';

class BanUsers extends Component {
   state = {
      username: [],
      user: '',
      sr: '',
      subscriptions: []

   }

   onChangeUser = (e) => this.setState({ user: e.target.value });
   onChangeSr = (e) => this.setState({ sr: e.target.value });


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

   BanUser = (e) => {
      e.preventDefault();
      console.log('done Clicked');


      if (document.getElementById("checkBan").checked === false && document.getElementById("checkUnBan").checked === false) {
         alert("Please choose ban or unban user");
         return;
      }
      else if (document.getElementById("checkBan").checked === true && document.getElementById("checkUnBan").checked === true) {
         alert("Please choose only one from ban or unban user");
         return;
      }

      let checker = "";
      if (document.getElementById("getUserBan").value === checker) {
         alert("Please provide a name of user");
         return;
      }
      else if (!this.state.sr) {
         alert("Please provide a subreddit");
         return;
      }

      let headers = {
         auth: localStorage.getItem("token")
      }

      var newBan = {
         Username: this.state.user,
         SrName: this.state.sr
      }

      //ban user
      if (document.getElementById("checkBan").checked) {
         axios.put('/Moderator/ban', newBan, { "headers": headers })
            .then(res => {
               if (res.status == 200) {
                  console.log(res)
                  alert('User banned successfully');
               }
               else if (res.status === 404) {
                  alert("Not Found");
                  return Response.json;
               }

            })
            .catch(error => {
               alert("Error Caught");
            })

      }

      //Unban user
      else if (document.getElementById("checkUnBan").checked) {

         axios.put('/Moderator/unban', newBan, { "headers": headers })
            .then(res => {
               if (res.status == 200) {
                  console.log(res)
                  alert('User unbanned successfully');
               }
               else if (res.status === 404) {
                  alert("Not Found");
                  return Response.json;
               }

            })
            .catch(error => {
               alert("Error Caught");
            })
      }



   }


   setSR(option) {
      this.setState({
         sr: option.value
      });
   }
   render() {

      return (
         <div className="BanUser">
            <br></br>
            <p>Subreddit</p>
            <Select
               onChange={this.setSR.bind(this)}
               options={this.state.subscriptions.map(sr => { return { value: sr, label: sr } })} />

            <form onSubmit={this.BanUser}>
               <p>Username</p>
               <input className="username" type="text" id="getUserBan"
                  name="username" placeholder="Username To Be banned or unabnned"
                  value={this.state.user} onChange={this.onChangeUser}
               />
               <input type="submit" value="Done" className="saveComment" />
               <div className="formGroup">
                  <label for="checkBan" className="BanU">Ban user
                  <input type="checkbox" name="checkBan" id="checkBan" /></label>
                  <label for="checkUnBan" className="UnBanU">Unban user
                  <input type="checkbox" name="checkUnBan" id="checkUnBan" /></label>
               </div>
            </form>

         </div>
      );

   }



}


export default BanUsers;