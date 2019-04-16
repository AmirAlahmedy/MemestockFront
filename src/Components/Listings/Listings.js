import React, { Component } from 'react';
import './Listings.css';
import Thread from '../../Routes/Thread/Thread';
import { BrowserRouter as Router } from 'react-router-dom'
import data from '../../Mocks/threads-data.json';  
import axios from '../../axios-orders';
import '../../Sass/styles.scss';
import { connect } from 'react-redux';
import ginprodReducer from '../../store/reducers/production';
import * as actions from '../../store/actions/index';
import SideBar from '../SideBar/SideBar';
import Aux from '../HOC/Auxiliary';

let inProduction = false;

class Listings extends Component {
    state = {
        threads: []
    }

    startPosition = { startPosition:0 };
    headers = {
        'Content-Type': 'application/json',
        'auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJtZW1lc3RvY2siLCJzdWIiOiJBcm1pIiwiaWF0IjoxNTU1MTU1MDA1fQ.XW9CbQMbQDwKVbNBaanfYLWIjDzQ6LNsIUDS5MOM09I' 
    }
    componentDidMount = () => {
    console.log(this.props.ginProd); 
    console.log(this.props.match);
    

    if(inProduction === true && /*ginprodReducer.globalInProduction*/ localStorage.getItem('inProduction'))
    {

        axios.post('/ahmed/listing?type=new', this.startPosition,  /*{headers: this.headers}*/)
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
    />;


    /**
     * For generating threads from a mock service
     * @function createThreads
     * @param {array} - array of the mocked threads ...Not working properly yet.
     */
    createThreads = Threads => Threads.map(this.createThread);

    render(){
        return(
           <Router>
            <Aux>

            <div className='listingsContainer'>     
                {this.state.threads}
            </div>
            <SideBar clickd={this.createSubHand}/>
            </Aux>
        </Router> 
        );
        
    }

}
const mapStateToProps = state => {
    return {
      ginProd: state.globalInProduction,
      token: state.token
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
     // token: () => dispatch( actions.authSuccess() )
    };
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(Listings);