import React, { Component } from 'react';
import './Listings.css';
import Thread from '../../Routes/Thread/Thread';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import data from '../../Mocks/threads-data.json';  
import axios from '../../axios-orders';
import '../../Sass/styles.scss';
import { connect } from 'react-redux';
import ginprodReducer from '../../store/reducers/production';
import * as actions from '../../store/actions/index';
import SideBar from '../SideBar/SideBar';
import Aux from '../HOC/Auxiliary';

let inProduction = false;

class NestedListings extends Component {
    state = {
        threads: []
    }

    //  startPosition = { startPosition:0 };
    
    componentDidMount = () => {
    console.log(this.props.ginProd); 
    
    

    if(inProduction === true && /*ginprodReducer.globalInProduction*/ localStorage.getItem('inProduction'))
    {

        axios.get('/ahmed/listing?type=new')
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
    createThread = thread => <Route path={`${this.props.match.path}/:threadId`} render={
        props => {

            return(
                <Thread // key={thread._id}
                // username={thread.subredditName}
                subreddit={thread.subredditName}
                title={thread.title} 
                content={thread.body}/>
                );
            }
    } />;


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
  
export default connect(mapStateToProps, mapDispatchToProps)(NestedListings);