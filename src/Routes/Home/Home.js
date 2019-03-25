import React, { Component } from 'react';
import './Home.css';
import NavBar from '../../Components/NavBar/Navbar';
import { Route, Switch, withRouter } from 'react-router-dom';
import CreatePost from '../CreatePost/CreatePost';
import PMs from '../PMs/PMs';
import Listings from '../../Components/Listings/Listings'
import Settings from '../Settings/Settings';
import Subreddit from '../Subreddit/Subreddit';
import ThreadPage from '../Thread-page/thread-page';
class Home extends Component {

  state = {
    auth: false
  }
  componentDidMount = () => {
    //axios.get('/Home/')
    this.props.history.replace('/Home/');
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
              
           
           
             {/* <Listings/> */}
          
          <footer>
            <p><a href="#top" className='backtoTop'>Top</a></p>
          </footer>
        </div>
          );
      }
}

export default withRouter(Home);