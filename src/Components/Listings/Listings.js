import React, { Component } from 'react';
import './Listings.css';
import Thread from '../../Routes/Thread/Thread';
import { BrowserRouter as Router } from 'react-router-dom'
import data from '../../Mocks/threads-data.json';  
import axios from '../../axios-orders';

class Listings extends Component {
    state = {
        threads: []
    }

    //  startPosition = { startPosition:0 };
    
    componentDidMount = () => {
        axios.get('/ahmed/listing?type=new')
        .then( response => {
            this.reqThreads = response.data;
            console.log(response);
            let thrds = this.createThreads(response.data);
            this.setState({threads: thrds});
        })
        .catch( error => {

        })
    }



    /**
     * For generating threads from a mock service
     * @function createThread
     * @param {object} - object of the mocked thread ...Not working properly yet.
     */
    createThread = thread => <Thread 
                                    key={thread._id}
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
        console.log(data);
        return(
           <Router>

            <div className='listingsContainer'>     
                {this.state.threads}
            </div>
            
        </Router> 
        );
    }
}

export default Listings;