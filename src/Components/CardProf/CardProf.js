import React, { Component } from 'react'

import defImage from '../../assets/images/redditor.png'
import axios from '../../axios-orders';
import './CardProf.css';
import { NavLink } from 'react-router-dom';

export class CardProf extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      subscriptions: [],
      cakeday: ''
    };
  }
  getCurrentUser() {
    return localStorage.getItem("Username");
  }

  // componentDidMount() {

  //   var headers = {
  //     'auth': localStorage.getItem("token")
  //   }

  //   let username = this.getCurrentUser();

  //   // axios.get('user/info/'+ username , { headers: headers })
  //   // .then(resp => {
  //   //   if (resp.status == 200) {
  //   //     console.log(resp);
  //   //     let myusername=this.state.username;
  //   //      let mysubscriptions = this.state.subscriptions;
  //   //      let mycakeday=this.state.cakeday;
  //   //      mycakeday.push(resp.data.cakeday);
  //   //      myusername.push(resp.data.Username);
  //   //      mysubscriptions.push(resp.data.Subscriptions);

  //   //     this.setState({
  //   //       username:myusername,
  //   //       cakeday:mycakeday
  //   //     });
  //   //   }
  //   //   })

  //   //     .catch(error => {
  //   //       console.log(error.response)
  //   //       alert("Error")
  //   //     });

  // };


  gotoMod() {
    window.location.href = "/moderation";
  }




  // createThread = (e) =>{
  //   e.preventDefault();
  //   this.setState({
  //     threadCreation:true
  //   })
  // }
  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   let checker ="";

  //   let postTitle = document.getElementById("postTitle").value;
  //   let postBody = document.getElementById("postBody").value;
  //   if (postTitle===checker)
  //   {
  //     alert ("Please provide a Thread title!");
  //     return ;
  //   }
  //   else if (postBody===checker)
  //   { 
  //     alert ("Please provide a Thread Body !");
  //     return ;
  //   }
  //   var headers = {
  //     'auth':  localStorage.getItem('token')
  //   }
  //   let postName = this.state.name;
  //   axios.post('http://18.217.163.16/sr/'+postName+'/thread',postTitle,postBody,{headers: headers})
  //   .then(res => {
  //     console.log(res);
  //     if (res.status==200)
  //     { 
  //       alert("Post is created!");
  //     }else if (res.status===401 || res.status===404)
  //     {
  //       alert("Post not created");
  //       return Response.json;
  //     }
  //    })
  //    .catch(error => {
  //      alert("Error Caught");
  //    })
  // }
  handleBlock() {

    var headers = {
      'auth': localStorage.getItem("token")
    }
    var data = {
      blockeduser: this.state.username
    }

    axios.put('me/user/block/', data, { headers: headers }
    )
      .then(res => {
        console.log(res);
        if (res.status == 200) {
          alert("User is blocked!");
        } else if (res.status === 401 || res.status === 404) {
          alert(" Unsuccessful");
          return Response.json;
        }
      })
      .catch(error => {
        alert("Error Caught");
      })
  }
  handleFriend() {
    var headers = {
      'auth': localStorage.getItem("token")
    }
    let data = this.state.username
    let username =
      window.location.href.split("/")
        .pop()
        .replace("#post", "")
        .replace("#comment", "");
    axios.put('me/user/Add/', { fUsername: username }, { headers: headers }
    )

      .then(res => {
        console.log(res);
        if (res.status == 200) {
          this.setState({reqStatus: "sent"})
          alert("Friend Request Sent!");
        } else if (res.status === 401 || res.status === 404) {
          alert("Friend Request Sent Unsuccessful");
          return Response.json;
        }
      })
      .catch(error => {
        alert(error.response.data.error);
      })
  }
  componentDidMount(){
    // 

    var headers = {
      'auth': localStorage.getItem("token")
    }
    let username =
      window.location.href.split("/")
        .pop()
        .replace("#post", "")
        .replace("#comment", "");
      axios.put('me/user/Add/', { fUsername: username }, { headers: headers }
      )
  
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            axios.put("me/user/removeReq", {fUsername: username}, {headers: headers})
            .then(resp => {
              console.log(resp.data);
            })
            // this.setState({req})
          } else if (res.status === 401 || res.status === 404) {
            alert("Friend Request Sent Unsuccessful");
            return Response.json;
          }
        })
        .catch(error => {
          if(error.response.data.error === "User has already sent a request to the other user"){
            this.setState({reqStatus: "sent"})
          }else if(error.response.data.error === "The User to be added is already a friend"){
            this.setState({reqStatus: "friend"})
          }else if(error.response.data.error === "The sending User is blocked"){
            this.setState({reqStatus: "blocked"})
          }
        })
  }
  handleUnblock(){
    var headers = {
      'auth': localStorage.getItem("token")
    }
    let data = this.state.username
    let username =
      window.location.href.split("/")
        .pop()
        .replace("#post", "")
        .replace("#comment", "");
    axios.put('me/user/unblock/', { unblockedUser: username }, { headers: headers }
    )

      .then(res => {
        console.log(res);
        if (res.status == 200) {
          this.setState({reqStatus: null})
        } else if (res.status === 401 || res.status === 404) {
          alert("Can't process your request right now");
        }
      })
      .catch(error => {
          alert("Can't process your request right now");
      })
  }
  removeReq(){

    var headers = {
      'auth': localStorage.getItem("token")
    }
    let data = this.state.username
    let username =
      window.location.href.split("/")
        .pop()
        .replace("#post", "")
        .replace("#comment", "");
    axios.put('/me/user/removeReq', { fUsername: username }, { headers: headers }
    )

      .then(res => {
        if (res.status == 200) {
          this.setState({reqStatus: null})
        } else if (res.status === 401 || res.status === 404) {
          alert("Can't process your request right now");
        }
      })
      .catch(error => {
          alert("Can't process your request right now");
      })
  }
  Unfriend(){

    var headers = {
      'auth': localStorage.getItem("token")
    }
    let data = this.state.username
    let username =
      window.location.href.split("/")
        .pop()
        .replace("#post", "")
        .replace("#comment", "");
    axios.put('/me/user/Unfriend', { fUsername: username }, { headers: headers }
    )

      .then(res => {
        if (res.status == 200) {
          this.setState({reqStatus: null})
        } else if (res.status === 401 || res.status === 404) {
          alert("Can't process your request right now");
        }
      })
      .catch(error => {
          alert("Can't process your request right now");
      })
  }
  render() {
    return (

      <div className='gamb'>
        <div className="userImage" style={{ backgroundImage: `url(${defImage})` }}>
        </div>
        <br />
        <div>{this.props.q}</div>
        <h5>Cake Day: {this.props.cake}</h5>

        <button type="button" id="addFriend" class="btn btn-primary" onClick={
          this.state.reqStatus === "sent" ? this.removeReq.bind(this) :
          this.state.reqStatus === "friend" ? this.Unfriend.bind(this) :
          this.state.reqStatus === "blocked" ? this.handleUnblock.bind(this) :
          !this.state.reqStatus ? this.handleFriend.bind(this) : null
        }>
          {this.state.reqStatus === "sent" ? "Remove Request" : null}
          {this.state.reqStatus === "friend" ? "Unfriend" : null}
          {this.state.reqStatus === "blocked" ? "Unblock" : null}
          {!this.state.reqStatus ? "Add Friend" : null}
        </button>
        {this.state.reqStatus === "friend" || !this.state.reqStatus ? 
        <input class="btn btn-primary" type="submit" id="blockfriend" value="Block friend" onClick={this.handleBlock.bind(this)} />
        : null
        }

        {/* <button  onClick={this.createThread} className='new-post-button'>New post</button> */}


        {/* this.state.threadCreation ?
              <div className="subredditSidebarComponent">
                {/* <h5>CREATE A POST</h5> */}

        {/* <form onSubmit={this.handleSubmit}>
                  <div className="formGroupSrComponent">
                  <label for="ThreadTitle">Enter Title</label>
                  <textarea type="textarea" name="text" id="postTitle" placeholder = "Enter Title Here" />   
                  </div>
                  <div className="formGroupSrComponent">
                  <label for="ThreadBody">Enter Body</label>
                  <textarea type="textarea" name="text" id="postBody" placeholder = "Enter Body Here" />  
                  </div>
                  <button className="srSidebarSubscribeButton">CREATE</button>
                </form> */}
        <div></div>

      </div>

    )
  }
}


export default CardProf
