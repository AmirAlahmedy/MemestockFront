import React, { Component } from 'react';
import './Home.css';
import NavBar from '../../Components/NavBar/Navbar';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import CreatePost from '../CreatePost/CreatePost';
import PMs from '../PMs/PMs';
import Listings from '../../Components/Listings/Listings'
import Settings from '../Settings/Settings';
import Subreddit from '../Subreddit/Subreddit';
import ThreadPage from '../Thread-page/thread-page';
import auth from '../../store/reducers/auth';
// import { createStore } from 'redux';
// import { connect } from 'react-redux';


class Home extends Component {

  state = {
    auth: false
  }

  // store = createStore(auth, window.STATE_FROM_SERVER);

  componentDidMount = () => {
    //axios.get('/Home/')
     this.props.history.replace('/Home/');
    //  this.forceUpdate();
      window.onbeforeunload = e => {
        // window.location.reload();
        // e.preventDefault();
        //   e.target.reset();
      }
    
 }
  
  // shouldComponentUpdate = () => {
  //   window.onbeforeunload = () => {
    
  //     // return (<Redirect to='/Home/'/>);
  //   }
  // }

  

  

    render() {
        return (

          <div className='Home' >
          
           <NavBar/>
             
            <Switch>
              <Route path='/PM/'  component={PMs}/>
              <Route path='/CreatePost/'   component={CreatePost}/>
              <Route path='/settings/'  component={Settings}/>
              <Route path='/r/' component={Subreddit}/>
              <Route path='/thread/' component={ThreadPage}/>
              <Route path='/'  component={Listings}/>   
            </Switch>
              
           
           
             {/* <Listings/> */}
          
          <footer>
            <p><a href="#top" className='backtoTop'> Back to Top</a></p>
          </footer>
        </div>
          );
      }
}

export default withRouter(Home);