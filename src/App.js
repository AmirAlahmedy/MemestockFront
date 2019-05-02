import React, { Component } from 'react';
import './index.css';
import NavBar from './Components/NavBar/Navbar';
import { Route, Switch, withRouter, Redirect, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import CreatePost from './Routes/CreatePost/CreatePost';
import PMs from './Routes/PMs/PMs';
import Listings from './Components/Listings/Listings'
import Settings from './Routes/Settings/Settings';
import Subreddit from './Routes/Subreddit/Subreddit';
import ThreadPage from './Routes/Thread-page/thread-page';
import * as actions from './store/actions/index';
import GoHome from './Routes/GoHome/index.js';
import CreateSubReddit from './Routes/CreateSubreddit/CreateSubreddit';
import User from './Components/User/User';
import Moderation from './Routes/ModerationPage/ModerationPage';

class Home extends Component {

  state = {
    isAuth: Boolean(localStorage.getItem("token")),
    view: {
      card: true,
      classic: false
    }
  }


  componentDidMount = () => {

    // console.log(this.props.token);
    // this.props.history.replace('/Home/');
    //  this.props.lastRoute != '/Registration/' ? 
    //  this.props.history.push(this.props.lastRoute)
    //  :
    //  this.props.history.replace('/Home/');
    //this.props.authToken();

  }

  cardViewHandler() {
    this.setState({
      view: {
        card: true,
        classic: false
      }
    });
  }

  classicViewHandler() {
    this.setState({
      view: {
        card: false,
        classic: true
      }
    });
  }


  userHasLoggedIn(token) {
    if (token) {
      localStorage.setItem("token", token);
      window.location.reload();
    }
  }

  logout(e) {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location.reload();
  }
  
 

  render() {
    console.log(window.pageYOffset);
    console.log("app props", this.props);
   
    window.onscroll = function(){
   
    if(window.scrollY > 600)
      document.getElementById("topJump").className = "backtoTop";
      else
      document.getElementById("topJump").className = "hidden";
   }

    return (
      <div className='Home' >

        <NavBar logout={this.logout.bind(this)}
          finishLogin={this.userHasLoggedIn.bind(this)}
          finishRegistration={this.userHasLoggedIn.bind(this)}
          isAuth={this.state.isAuth}
          classicViewHandler={this.classicViewHandler.bind(this)}
          cardViewHandler={this.cardViewHandler.bind(this)} />

        <Switch>
          <Route path='/PM/'  component={PMs}/>
          <Route path='/Inbox'  component={PMs}/>
          <Route path='/Sent/'  component={PMs}/>
          <Route path='/CreatePost/' component={CreatePost} />
          {/* <Route path='/CreatePost/' component={CreatePost} />
          <Route path='/CreatePost/' component={CreatePost} /> */}
          <Route path='/settings/' component={Settings} />
          <Route path='/r/' component={Subreddit} />
          <Route path='/thread/' component={ThreadPage} />
          <Route path='/GoHome/' component={GoHome} />
          <Route path='/create-subreddit/' component={CreateSubReddit} />
          <Route path='/user/' render={
            props=>{
              return <User username={this.props.username}/>
            }
          }/>
          <Route path='/user/moderation' component={Moderation}/>
          <Route path='/Home/' render={
            props => {
              return <Listings authToken={this.props.token} view={this.state.view.card} />
            }
          } />
        </Switch>

          
        <footer>
          <p>
            <a href="#top" id = "topJump" className="hidden">
              <i className="fas fa-chevron-circle-up"></i>
            </a>
          </p>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: true,//state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
    // token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //  onTryAutoSignup: () => dispatch( actions.authCheckState() ),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
    // authToken: () => dispatch( actions.authSuccess(this.props.token) )
  };
};

const app = withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
export {
  app
}