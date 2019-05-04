import React, { Component } from 'react';
import './Home.css';
import NavBar from '../../Components/NavBar/Navbar';
import { Route, Switch, withRouter } from 'react-router-dom';
import CreatePost from '../CreatePost/CreatePost';
import PMs from '../PMs/PMs';
import { Listings } from '../../Components/Listings/Listings'
import Settings from '../Settings/Settings';
import Subreddit from '../Subreddit/Subreddit';
import ThreadPage from '../Thread-page/thread-page';
import GoHome from '../GoHome/index.js';
import Registration from '../Registration/Registration';
import CreateSubReddit from '../CreateSubreddit/CreateSubreddit';


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
    
    this.props.history.replace('/Home/');

  }

  cardViewHandler() {
    this.setState({
      view: {
        card: true,
        classic: false
      }
    });
  }

  classicViewHandler(){
    this.setState({
      view: {
        card: false,
        classic: true
      }
    });
  }

  userHasLoggedIn(token) {
    if(token){
      localStorage.setItem("token", token);
      this.setState({
        isAuth: true
      });
    }
  }

  logout(e){
    e.preventDefault();
    localStorage.removeItem("token");
    this.setState({
      isAuth: false
    });
  }

  sortHandNew(){
    this.setState({
      sort: 'new'
    })
  }

  
  sortHandTop(){
    this.setState({
      sort: 'top'
    })
  }

  
  sortHandHot(){
    this.setState({
      sort: 'hot'
    })
  }

  render() {
    console.log(this.state.sort);

    return (
      <div className='Home' >

        <NavBar logout={this.logout.bind(this)} 
          finishLogin={this.userHasLoggedIn.bind(this)} 
          finishRegistration={this.userHasLoggedIn.bind(this)} 
          isAuth={this.state.isAuth} 
          classicViewHandler={this.classicViewHandler.bind(this)}
          cardViewHandler={this.cardViewHandler.bind(this)}
          sortHandNew={this.sortHandNew.bind(this)}
          sortHandHot={this.sortHandHot.bind(this)}
          sortHandTop={this.sortHandTop.bind(this)} />

        {
          !this.props.isGuest ?
            <Switch>

              <Route path='/PM/'  render={
                props => {
                  return (
                    <PMs token={this.props.token} />
                  );
                }
              } />
              <Route path='/CreatePost/' component={CreatePost} />
              <Route path='/settings/' render={Settings} />
              <Route path='/r/' component={Subreddit} />
              <Route path='/thread/' component={ThreadPage} />
              <Route path='/GoHome/' component={GoHome} />
              <Route path='/create-subreddit/' component={CreateSubReddit} />
            </Switch>
            :
            <Switch>
              <Route path='/Registration/' component={Registration} />
              <Route path='/Logout/' component={GoHome} />
            </Switch>
        }
              
        <Route path='/Home/' exact  render={
                  props=>{
                    console.log('sort in home',this.state.sort);
                    return(
                      <Listings authToken={this.props.token} view={this.state.view.card} sort={this.state.sort}/>
                    );
                  }
                }/>

        <footer>
          <p>
            <a href="#top" className='backtoTop'>
              <i class="fas fa-chevron-circle-up"></i>
            </a>
          </p>
        </footer>
      </div>
    );
  }
}

export default withRouter(Home);