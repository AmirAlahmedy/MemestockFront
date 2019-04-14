import React, { Component } from 'react'
import { Link } from 'react-router-dom';
export class User extends Component {
  render() {
    return (

      <div >
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
           <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">Overview </a>
          </li>
          
          <li class="nav-item">
            <a class="nav-link" href="#">Posts</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Comments</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Saved</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Hidden</a>
          </li>
        </ul> 

      </nav>




      <div className="gamb">
          <div className="stuff">
            <p>Youssef</p>
          </div>


      </div>

      </div>

        

      




    )
  }
}

export default User

