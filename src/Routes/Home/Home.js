import React, { Component } from 'react';
import './Home.css';
import NavBar from '../../Components/NavBar/Navbar';
import { Route, Switch, withRouter, Redirect, NavLink } from 'react-router-dom';
import CreatePost from '../CreatePost/CreatePost';
import PMs from '../PMs/PMs';
import Listings from '../../Components/Listings/Listings'
import Settings from '../Settings/Settings';
import Subreddit from '../Subreddit/Subreddit';
import ThreadPage from '../Thread-page/thread-page';
import Button from '../../Components/UI/Button/Button';
import CreateSubReddit from '../CreateSubreddit/CreateSubreddit';
import SideBar from '../../Components/SideBar/SideBar';
import NestedListings from '../../Components/Listings/NestedListings';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class Home extends Component {

  state = {
    auth: false
  }



  componentDidMount = () => {
    
     this.props.history.replace('/Home/');
     console.log(this.props.token);
     //this.props.authToken();
    
 }


 

  

  

    render() {
      let nestedRoutes = false;
      let list = nestedRoutes ?  <Route path='/Home/' exact component={NestedListings}/>: <Route path='/Home/' exact component={Listings}/>;

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
              <Route path='/settings/'  component={Settings}/>
              <Route path='/r/' component={Subreddit}/>
              <Route path='/thread/' component={ThreadPage}/>
              <Route path='/create-subreddit/' component={CreateSubReddit}/>
              
              {list}  
            </Switch>
              
           
           
             
          
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