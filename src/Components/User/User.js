import React, { Component } from 'react'
import { NavLink, Route } from 'react-router-dom';
import CardProf from '../CardProf/CardProf';
import './User.css';
import axios from "../../axios-orders";
import Aux from '../HOC/Auxiliary';
import Moderation from '../../Routes/ModerationPage/ModerationPage';
import Flairs from './Flairs/Flairs';
import Thread from '../../Routes/Thread/Thread'
export class User extends Component {
  constructor(props) {
    super(props);
    this.state = {

      Comments: [],
      Posts: []

    }
  };

  getCurrentUser() {
    return localStorage.getItem("Username");
  }

  componentDidMount() {
    console.log(this.props);
    const headers = {
      'auth': localStorage.getItem("token")
    }
    let username = this.getCurrentUser();
    axios.get('/user/info/' + username, { "headers": headers })
      .then(response => {
        console.log(response);
        console.log(response.data);


        this.setState({
          Comments: response.data.comments
        });

      })
      .catch(error => {
        console.log(error.response)
        alert("Error")
      });
  }





  goTo(link) {
    return function () {
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
                  <span /*onClick={this.goTo('/user/hidden')}*/ className="nav-link"><NavLink className='profit' to="/user/flairs">Flairs</NavLink></span>
                </li>
              </ul>

            </nav>


          </div>




          <div className="gamb">
            <div className="stuff">
              <p>{localStorage.getItem('Username')}</p>
            </div>
            <Route exact path='/user/moderation' component={Moderation} />
            <Route exact path='/user/flairs' component={Flairs} />



          </div>
        </div>

        {/* <div className="postsPageContainer">
      <div className="PostsPage">
      <Thread 
                  id={this.state.id}
                  username={this.state.creator}
                  subreddit={this.state.subredditName}
                  title={this.state.threadTitle} 
                  content={this.state.threadBody}
                  upvotes={this.state.votes}
                  date={this.state.postdate}
                />
      </div>
      </div> */}

        <CardProf></CardProf>

      </Aux>







    )
  }
}

export default User

