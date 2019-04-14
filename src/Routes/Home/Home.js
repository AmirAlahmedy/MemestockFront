import React, { Component } from 'react';
import './Home.css';
import NavBar from '../../Components/NavBar/Navbar';
import { Route, Switch, withRouter, Redirect, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import CreatePost from '../CreatePost/CreatePost';
import PMs from '../PMs/PMs';
import Listings from '../../Components/Listings/Listings'
import Settings from '../Settings/Settings';
import Subreddit from '../Subreddit/Subreddit';
import ThreadPage from '../Thread-page/thread-page';
import SideBar from '../../Components/SideBar/SideBar';
import NestedListings from '../../Components/Listings/NestedListings';
import * as actions from '../../store/actions/index';
import GoHome from '../GoHome/index.js';
import Registration from '../Registration/Registration';
import CreateSubReddit from '../CreateSubreddit/CreateSubreddit';


class Home extends Component {

  state = {
    auth: false
  }



  componentDidMount = () => {
    
    console.log(this.props.token);
    this.props.history.replace('/Home/');
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

      let Routes = !this.props.isGuest ? <Route path='/Registration/' component={Registration}/>:null;

      console.log(this.props.token);
        return (
          <div className='Home' >
          
           <NavBar/>
             
              {
                !this.props.isGuest ? 
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
                </Switch>
                :
                <Switch>
                <Route path='/Registration/' component={Registration}/>
                </Switch>
              }
              {/* <Route path='/PM/'  /*component={PMs} render={
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
              <Route path='/create-subreddit/' component={CreateSubReddit}/> */}
              {/* <Route path='/:username' component={CreateSubReddit}/> */}
              
              {list}  
            
              
           
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
    onSetAuthRedirectPath: () => dispatch( actions.setAuthRedirectPath( '/' ) ),
    // authToken: () => dispatch( actions.authSuccess(this.props.token) )
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));