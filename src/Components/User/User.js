import React, { Component } from 'react'
import { NavLink, Route } from 'react-router-dom';
import CardProf from '../CardProf/CardProf';
import './User.css';
import axios from "../../axios-orders";
import Aux from '../HOC/Auxiliary';
import Moderation from '../../Routes/ModerationPage/ModerationPage';

export class User extends Component {
  constructor(props) {
    super(props);
    this.state = {

       Comments: []

    }

    // this.handleClick = this.handleClick.bind(this);
    // this.BlockUser = this.BlockUser.bind(this);
    // this.blockList = this.blockList.bind(this);
  };

  getCurrentUser() {
    return localStorage.getItem("Username");
}

  componentDidMount() {
    console.log(this.props);
    const headers = {
      auth: localStorage.getItem("token")
    }
    let username = this.getCurrentUser();
    axios.get('/user/'+ username +'/comments/listing?type=hot', { "headers": headers })
      .then(response => {
        console.log(response);
        console.log(response.data);


        this.setState({
          Comments: response.data.comments
        });
        console.log(this.state.Messages);

      })
      .catch(error => {
        console.log(error.response)
        alert("Error")
      });
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
          
          <li className="nav-item profit1">
            <span /*onClick={this.goTo('/user/posts')}*/ className="nav-link"><NavLink className='profit' to="/user/posts">Posts</NavLink></span>
          </li>
          <li className="nav-item profit1">
            <span /*onClick={this.goTo('/user/comments')}*/ className="nav-link"><NavLink className='profit' to="/user/comments">Comments</NavLink></span>
          </li>
          <li className="nav-item profit1">
            <span /*onClick={this.goTo('/user/saved')}*/ className="nav-link"><NavLink className='profit' to="/user/saved">Saved</NavLink></span>
          </li>
          <li className="nav-item profit1">
            <span /*onClick={this.goTo('/user/hidden')}*/ className="nav-link"><NavLink className='profit' to="/user/hidden">Hidden</NavLink></span>
          </li>
        </ul> 

      </nav>
      
      </div>




      <div className="gamb">
          <div className="stuff">
            <p>{this.props.username}</p>
          </div>
     <Route exact path='/user/moderation' component={Moderation}/>


      </div>
      </div>

     <CardProf></CardProf> 
     {/* <Route path='/user/moderation' component={Moderation}/> */}
      
      </Aux>
        

      




    )
  }
}

export default User

