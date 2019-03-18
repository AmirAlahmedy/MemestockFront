import React, { Component } from 'react';
import './Home.css';
import NavBar from '../../Components/NavBar/Navbar';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import CreatePost from '../CreatePost/CreatePost';
import PMs from '../PMs/PMs';
import Listings from '../../Components/Listings/Listings'
import Settings from '../Settings/Settings';
import Subreddit from '../Subreddit/Subreddit';
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