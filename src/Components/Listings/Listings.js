import React, { Component } from 'react';
import './Listings.css';
import Thread from '../../Routes/Thread/Thread';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom'
import data from '../../Mocks/threads-data.json';  
import axios from '../../axios-orders';
import '../../Sass/styles.scss';
import { connect } from 'react-redux';
import ginprodReducer from '../../store/reducers/production';
import * as actions from '../../store/actions/index';
import SideBar from '../SideBar/SideBar';
import Subreddit from '../../Routes/Subreddit/Subreddit';
import Aux from '../HOC/Auxiliary';
let inProduction = false;
let view = null;
class Listings extends Component {
   
   
    
    render(){
        console.log(this.props.view);
        view = this.props.view;
        localStorage.setItem('view', this.props.view);
        return(
            
           <Router>
            <Aux>
            <Switch>
                <Route path="/Home/" exact render = {
                    props => {
                        return <Threads view={this.props.view} />
                    }
                }/>
                <Route path="/r"  component={Subreddit}/>
            </Switch>
          
            </Aux>
        </Router>     
            
            
        );
        
    }
    token = this.props.authToken;

}
const token = Listings.token;

class Threads extends Component {
    state = {
        threads: []
    }

    startPosition = { startPosition:0 };
    headers = {
        'Content-Type': 'application/json',
        'auth': localStorage.getItem('token')
    }
    componentDidMount = () => {
    console.log(this.props.match);
    console.log(token);
    console.log(localStorage.getItem('token'));
  //  this.props.history.replace('/r/');

    if(inProduction === true && /*ginprodReducer.globalInProduction*/ localStorage.getItem('inProduction'))
    {

        axios.post('/me/listing?type=new', this.startPosition,  {headers: this.headers})
        .then( response => {
            this.reqThreads = response.data;
            
            let thrds = this.createThreads(response.data);
            this.setState({threads: thrds});
        })
        .catch( error => {
            
        })
    }else{
        
        let thrds = this.createThreads(data.threads);
        this.setState({threads: thrds});
    }    
    }

    
    createSubHand = () => {
        console.log('create community');
        
     } 

    /**
     * For generating threads from a mock service
     * @function createThread
     * @param {object} - object of the mocked thread ...Not working properly yet.
     */
    createThread = thread => <Thread 
                                    // key={thread._id}
                                    // username={thread.subredditName}
                                    subreddit={thread.subredditName}
                                    title={thread.title} 
                                    content={thread.body}
                                    view={this.props.view}
    />;
    
    getThreads(view){
        return this.state.threads.map(thr => <Thread 
            // key={thread._id}
            // username={thread.subredditName}
            subreddit={thr.subredditName}
            title={thr.title} 
            content={thr.body}
            view={view}
/>)
    }

    /**
     * For generating threads from a mock service
     * @function createThreads
     * @param {array} - array of the mocked threads ...Not working properly yet.
     */
    createThreads = Threads => Threads.map(this.createThread);

    render() {
      console.log(this.props.token);
     
        return (
            <Aux>

            <div className='listingsContainer'>     
                {/* {this.getThreads(this.props.view)} */}
                {this.state.threads}
            </div>
              <SideBar clickd={this.createSubHand}/>
            </Aux>
              
        )
    }
}
const mapStateToProps = state => {
    return {
      ginProd: state.globalInProduction,
      //token: state.token
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
     // token: () => dispatch( actions.authSuccess() )
    };
  };
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Listings));