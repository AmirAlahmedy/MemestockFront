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

// function urlBase64ToUint8Array(base64String) {
//   const padding = '='.repeat((4 - base64String.length % 4) % 4);
//   const base64 = (base64String + padding)
//     .replace(/\-/g, '+')
//     .replace(/_/g, '/');
 
//   const rawData = window.atob(base64);
//   const outputArray = new Uint8Array(rawData.length);
 
//   for (let i = 0; i < rawData.length; ++i) {
//     outputArray[i] = rawData.charCodeAt(i);
//   }
//   return outputArray;
// }
// const vapidPublicKey = 'BER0W2tD4sWrG7dYLjSp4avRvtjovXykHkxC9yUKoHjuM5or977KdoShVn_d4XUkWDDMcjrs8-dyjlkXbqD-5ZA';
// const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
// function initializePush() {
//   messaging
//       .requestPermission()
//       .then(() => {
//          return messaging.getToken();
//       })
//       .then(token => {
//           console.log("FCM Token:", token);
//           //send the token to the server to be able to send notifications in the future
//          sendTokenToServer(token);
//       })
//       .catch(error => {
//           if (error.code === "messaging/permission-blocked") {
//               console.log("Please Unblock Notification Request Manually");
//           } else {
//               console.log("Error Occurred", error);
//           }
//       });

//   messaging.onMessage(payload => {
//     console.log("payload", payload)
//   });
// }
// function handlePush(){
//   // navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
//   //   serviceWorkerRegistration.pushManager
//   //   .subscribe({
//   //     userVisibleOnly: true,
//   //     applicationServerKey: convertedVapidKey
//   //   });
//   // });
//   if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('./assets/firebase-messaging-sw.js',)
//       .then(function (registration) {
//         firebase.messaging().useServiceWorker(registration);
//         initializePush(messaging)
//         console.log("This service worker is registered")
//       }).catch(function (err) {
//         console.log('Service worker registration failed, error:', err);
//       });
//   }
// }
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
    // window.baseURL = "http://localhost:4000";
    window.baseURL = "http://18.217.163.16/api";
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
      // this.socket = io("http://localhost:4000/", {
      //   // path: "/api/socket.io",
      //   query: {
      //     token: localStorage.getItem("token")
      //   }
      // });
      // this.socket.on('connect', function () {
      //   console.log("socket connected");
      // });
      this.socket.on('notification', function(data){
        console.log("notification data: ", data);
        const cont = document.createElement("div");
        cont.innerHTML = `<p>${data.message}</p>`
        cont.classList.add("notification");
        document.body.appendChild(cont);
        cont.onclick = (e) => e.target.remove();
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
          <Route path='/user/:username?' exact component={User}/>
          <Route path='/moderation' component={Moderation} />
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