import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import CardProf from '../CardProf/CardProf';
import './User.css';
import Aux from '../HOC/Auxiliary';
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
      <Aux>

      <div className="ana">
        <div className="aho">

        
      <nav className="navbar navbar-expand-lg navbar-light bg-light profnav">
           <ul className="navbar-nav mr-auto proful">
          <li className="nav-item active profit">
            <span onClick={this.goTo('/user/')} class="nav-link">Overview</span>
          </li>
          
          <li className="nav-item profit">
            <span onClick={this.goTo('/user/posts')} class="nav-link">Posts</span>
          </li>
          <li className="nav-item profit">
            <span onClick={this.goTo('/user/comments')} class="nav-link">Comments</span>
          </li>
          <li className="nav-item profit">
            <span onClick={this.goTo('/user/saved')} class="nav-link">Saved</span>
          </li>
          <li className="nav-item profit">
            <span onClick={this.goTo('/user/hidden')} class="nav-link">Hidden</span>
          </li>
        </ul> 

      </nav>
      
      </div>




      <div className="gamb">
          <div className="stuff">
            <p>Youssef</p>
          </div>


      </div>
      </div>
     <CardProf></CardProf> 

      </Aux>
        

      




    )
  }
}

export default User

