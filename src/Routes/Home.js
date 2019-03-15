import React, { Component } from 'react';
import './Home.css';
import NavBar from '../Components/Navbar';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import CreatePost from './CreatePost';
import PMs from './PMs';
class Home extends Component {

  state = {
    auth: false
  }

    render() {
        return (

          <div className='Home'>
          
               <NavBar/>
             
         
              <Route path='/PM/' component={PMs}/>
              <Route path='/CreatePost/'  component={CreatePost}/>
              
              
           
           <div className='content'>
             <div className='listing'>
                 Threads
            </div>
          </div>
        </div>
          );
      }
}

export default Home;