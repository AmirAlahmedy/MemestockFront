import React, { Component } from 'react';
import './Home.css';
import NavBar from '../Components/Navbar';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import CreatePost from './CreatePost';
import PMs from './PMs';
import Listings from '../Components/Listings'
import Settings from './Settings';
import Subreddit from './Subreddit';
class Home extends Component {

  state = {
    auth: false
  }

    render() {
        return (

          <div className='Home'>
          
           <NavBar/>
             
            <Switch>
              <Route path='/PM/'  component={PMs}/>
              <Route path='/CreatePost/'   component={CreatePost}/>
              <Route path='/settings/'  component={Settings}/>
              <Route path='/r/' component={Subreddit}/>
              <Route path='/'  component={Listings}/>
              
            </Switch>
              
           
           <div className='content'>
             {/* <Listings/> */}
          </div>
          <footer>
            <p><a href="#top">top of page</a></p>
          </footer>
        </div>
          );
      }
}

export default Home;