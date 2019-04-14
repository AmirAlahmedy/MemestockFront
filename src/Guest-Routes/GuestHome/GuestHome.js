import React, { Component } from 'react';
import './Home.css';
import NavBar from '../../Components/NavBar/Navbar';
import { Route, Switch, withRouter, Redirect, NavLink } from 'react-router-dom';
import { R} from "react-router";
import CreatePost from '../CreatePost/CreatePost';
import PMs from '../PMs/PMs';
import Listings from '../../Components/Listings/Listings'
import Settings from '../Settings/Settings';
import Subreddit from '../Subreddit/Subreddit';
import ThreadPage from '../Thread-page/thread-page';
import CreateSubReddit from '../CreateSubreddit/CreateSubreddit';
import NestedListings from '../../Components/Listings/NestedListings';
import * as actions from '../../store/actions/index';
import GoHome from '../GoHome/index.js';
import { connect } from 'react-redux';


class GuestHome extends Component {

  state = {
    auth: false
  }



  componentDidMount = () => {
    
     this.props.history.replace('/Home/');
     console.log(this.props.token);
     this.props.history.push(this.props.lastRoute)
     //this.props.authToken();
    
 }


 

  

  

    render() {
      let nestedRoutes = false;
      let list = nestedRoutes ?  <Route path='/Home/' exact component={NestedListings} /*render={
        props=>{
          return(
            <NestedListings />
          );
        }
      } *//>: <Route path='/Home/' exact component={Listings}/>;

      console.log(this.props.token);
        return (
          <div className='Home' >
          
           <NavBar/>
             
            <Switch>
              <Route path='/PM/'  /*component={PMs}*/ render={
                props=>{
                  return(
                    <PMs token={this.props.token}/>
                  );
                }
              }/>
              <Route path='/CreatePost/'   component={CreatePost}/>
              <Route path='/settings/'  render={Settings}/>
              <Route path='/r/' component={Subreddit}/>
              <Route path='/thread/' component={ThreadPage}/>
              <Route path='/GoHome/' component={GoHome}/>
              <Route path='/create-subreddit/' component={CreateSubReddit}/>
              {/* <Route path='/:username' component={CreateSubReddit}/> */}
              
              {list}  
            </Switch>
              
           
            {this.props.lastRoute ? <div>
              <Redirect to={this.props.lastRoute} />
            </div> : <span></span>}
           
             
          
          <footer>
            <p><a href="#top" className='backtoTop'> Back to Top</a></p>
          </footer>
        </div>
          );
      }
}

export default GuestHome;