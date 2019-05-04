import React, { Component } from 'react';
import './index.css';
import NavBar from './Components/NavBar/Navbar';
import { Route, Switch, withRouter, Redirect, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import CreatePost from './Routes/CreatePost/CreatePost';
import PMs from './Routes/PMs/PMs';
import { Listings } from './Components/Listings/Listings'
import Settings from './Routes/Settings/Settings';
import Subreddit from './Routes/Subreddit/Subreddit';
import ThreadPage from './Routes/Thread-page/thread-page';
import * as actions from './store/actions/index';
import GoHome from './Routes/GoHome/index.js';
import CreateSubReddit from './Routes/CreateSubreddit/CreateSubreddit';
import User from './Components/User/User';
import Moderation from './Routes/ModerationPage/ModerationPage';
import axios from './axios-orders';
import Notifications from './Routes/Notifications/Notifications';
import io from 'socket.io-client';

class Home extends Component {

  state = {
    isAuth: Boolean(localStorage.getItem("token")),
    view: {
      card: true,
      classic: false
    },
    sort: 'new'
  }


  componentDidMount = () => {
    const roots = ["http://localhost:3000", "http://localhost:3000/", "http://18.217.163.16/", "http://18.217.163.16"]
    if (roots.includes(window.location.href)) {
      window.location.href = "/Home";
    }

    window.addEventListener("scroll", (e) => {
      if(!document.getElementById("topJump")) return;
      if (window.scrollY > 0) {
        document.getElementById("topJump").className = "backtoTop";
      } else {
        document.getElementById("topJump").className = "hidden";
      }

    });

    if (!this.state.isAuth) {
      axios.get("/guest")
        .then(resp => {
          if (!resp.data.Token) throw new Error("Couldn't Sign you as a guest...");
          this.userHasLoggedIn(resp.data.Token, "guest");
        })
    } else if (localStorage.getItem("Username") !== "guest") {
      this.socket = io("http://18.217.163.16/", {
        path: "/api/socket.io",
        query: {
          token: localStorage.getItem("token")
        }
      });
      this.socket.on('connect', function () {
        console.log("socket connected");
      });
      this.socket.on('notification', function(data){
        console.log("notification data: ", data);
      });
    }

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


  userHasLoggedIn(token, username) {
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("Username", username);
      window.location.reload();
    }
  }

  logout(e) {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("Username");
    window.location.reload();
  }

  sortHandNew() {
    this.setState({
      sort: 'new'
    })
    this.updateSort('new');
  }


  sortHandTop() {
    this.setState({
      sort: 'top'
    })
    this.updateSort('top');
  }


  sortHandHot() {
    this.setState({
      sort: 'hot'
    });
    this.updateSort('hot');
  }

  sortChanged() {
    // alert('sort cahnged');
    //La2 //La2!!!
    console.log("sort changed...");
  }
  listingUpdater(getListing) {
    this.updateSort = getListing;
  }

  render() {
    console.log(window.pageYOffset);
    console.log("app props", this.props);
    console.log('sort in home', this.state.sort);

    window.onscroll = function () {
      if(!document.getElementById("topJump")) return;
      if (window.scrollY > 600)
        document.getElementById("topJump").className = "backtoTop";
      else
        document.getElementById("topJump").className = "hidden";
    }

    return (
      <div className='Home' >

        <NavBar logout={this.logout.bind(this)}
          finishLogin={this.userHasLoggedIn.bind(this)}
          finishRegistration={this.userHasLoggedIn.bind(this)}
          isAuth={this.state.isAuth && localStorage.getItem("Username") !== "guest"}
          classicViewHandler={this.classicViewHandler.bind(this)}
          cardViewHandler={this.cardViewHandler.bind(this)}
          sortHandNew={this.sortHandNew.bind(this)}
          sortHandHot={this.sortHandHot.bind(this)}
          sortHandTop={this.sortHandTop.bind(this)}
          onSortChange={this.sortChanged.bind(this)} />

        <Switch>
          <Route path='/PM/' component={PMs} />
          <Route path='/Inbox' component={PMs} />
          <Route path='/Sent/' component={PMs} />
          <Route path='/CreatePost/' component={CreatePost} />
          <Route path='/settings/' component={Settings} />
          <Route path='/r/' component={Subreddit} />
          <Route path='/thread/' component={ThreadPage} />
          <Route path='/GoHome/' component={GoHome} />
          <Route path='/create-subreddit/' component={CreateSubReddit} />
          <Route path='/notifications/' component={Notifications} />
          <Route path='/user/' render={
            props => {
              return <User username={this.props.username} />
            }
          } />
          <Route path='/user/moderation' component={Moderation} />
          <Route path='/Home/' render={
            props => {
              console.log('sort in home', this.state.sort);
              return <Listings listingUpdater={this.listingUpdater.bind(this)} authToken={this.props.token} view={this.state.view.card} sort={this.state.sort} />
            }
          } />
        </Switch>


        <footer>
          <p>
            <a href="#top" id="topJump" className="hidden">
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