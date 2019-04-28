import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import CardProf from '../CardProf/CardProf';
export class User extends Component {
  state ={
    username:'',
    me:true
}

componentDidMount () { 

  console.log("User in");
}


goTo(link){
  return function(){
      window.location.href = link;
  } 
}

  render() {
    return (

      <div className="ana">
        <div className="aho">

        <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
           <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <span onClick={this.goTo('/user/')} class="nav-link">Overview</span>
          </li>
          
          <li class="nav-item">
            <span onClick={this.goTo('/user/posts')} class="nav-link">Posts</span>
          </li>
          <li class="nav-item">
            <span onClick={this.goTo('/user/comments')} class="nav-link">Comments</span>
          </li>
          <li class="nav-item">
            <span onClick={this.goTo('/user/saved')} class="nav-link">Saved</span>
          </li>
          <li class="nav-item">
            <span onClick={this.goTo('/user/hidden')} class="nav-link">Hidden</span>
          </li>
        </ul> 

      </nav>
      </div>
      </div>




      <div className="gamb">
          <div className="stuff">
            <p>Youssef</p>
          </div>


      </div>







    <CardProf></CardProf>

      </div>

        

      




    )
  }
}

export default User

