import React, { Component } from 'react'
import { NavLink, Route } from 'react-router-dom';
import CardProf from '../CardProf/CardProf';
import './User.css';
import Aux from '../HOC/Auxiliary';
import Moderation from '../../Routes/ModerationPage/ModerationPage';

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
          <li className="nav-item active ">
            <span /*onClick={this.goTo('/user/')}*/ className="nav-link"><NavLink className='profit' to="/user/">Overview</NavLink></span></li>
          
          <li className="nav-item profit">
            <span /*onClick={this.goTo('/user/posts')}*/ className="nav-link"><NavLink className='profit' to="/user/posts">Posts</NavLink></span>
          </li>
          <li className="nav-item profit">
            <span /*onClick={this.goTo('/user/comments')}*/ className="nav-link"><NavLink className='profit' to="/user/comments">Comments</NavLink></span>
          </li>
          <li className="nav-item profit">
            <span /*onClick={this.goTo('/user/saved')}*/ className="nav-link"><NavLink className='profit' to="/user/saved">Saved</NavLink></span>
          </li>
          <li className="nav-item profit">
            <span /*onClick={this.goTo('/user/hidden')}*/ className="nav-link"><NavLink className='profit' to="/user/hidden">Hidden</NavLink></span>
          </li>
        </ul> 

      </nav>
      
      </div>




      <div className="gamb">
          <div className="stuff">
            <p>Youssef</p>
          </div>
     <Route path='/user/moderation' component={Moderation}/>


      </div>
      </div>

     <CardProf></CardProf> 
     {/* <Route path='/user/moderation' component={Moderation}/> */}
      
      </Aux>
        

      




    )
  }
}

export default User

