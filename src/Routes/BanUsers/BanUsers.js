import React, { Component } from 'react';
import GoHome from '../GoHome/index.js';
import { Link, Route, Switch } from 'react-router-dom';
import axios from '../../axios-orders';
import './BanUsers.css';

class BanUsers extends Component {
    state={
    username:[],
    user:'',
    sr:''
    
    }
    
    onChangeUser=(e)=>this.setState({user:e.target.value});
    onChangeSr=(e)=>this.setState({sr:e.target.value});
    
    
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
         else if (document.getElementById("getSrBan").value === checker) {
            alert("Please provide a subreddit");
            return;
         }
    
         let headers = {
            auth: localStorage.getItem("token")
         }
    
         var newBan={
            Username:this.state.user,
            SrName:this.state.sr
      }
       //  console.log(Username);
         //console.log(SrName);


         //ban user
         if (document.getElementById("checkBan").checked === true) {
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
            else if  (document.getElementById("checkUnBan").checked === true) {

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

    
    render() {

        return (
    <div className="BanUser">
    <label for="checkBan"  className="BanU">Ban user</label>
    <input type="checkbox" name="checkBan" id="checkBan" />
    <label for="checkUnBan"  className="UnBanU">Unban user</label>
    <input type="checkbox" name="checkUnBan" id="checkUnBan" />
    <br></br>
    <form  onSubmit={this.BanUser}>
        <input   className="usernameBan" type="text" id="getUserBan"
         name="username" placeholder="username ex:Bond_JamesBond"
         value={this.state.user} onChange={this.onChangeUser}
        />
        <br></br>
        <br></br>
        <input   className="srNameBan" type="text"  id="getSrBan"
         name="username" placeholder="subreddit Name ex:Health, OneTwoThree"
         value={this.state.sr} onChange={this.onChangeSr}
        />
        <input type="submit" value="Done" className="saveComment"/>
        
    </form>
    
    </div>
            );
    
        }
    
    
    
    }
    
    
    export default BanUsers;