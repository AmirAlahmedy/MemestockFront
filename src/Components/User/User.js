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


  render() {
    return (

      <div className="ana">
        <div className="aho">

        <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
           <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <Link to ='/user/' class="nav-link">Overview </Link>
          </li>
          
          <li class="nav-item">
          <Link to ='/user/posts/' class="nav-link">Posts</Link>
          </li>
          <li class="nav-item">
          <Link to ='/user/comments/' class="nav-link">Comments</Link>
          </li>
          <li class="nav-item">
             <Link to ='/user/saved/' class="nav-link">Saved</Link>
          </li>
          <li class="nav-item">
             <Link to ='/user/hidden/' class="nav-link">Hidden</Link>
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

