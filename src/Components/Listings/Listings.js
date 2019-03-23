import React, { Component } from 'react';
import './Listings.css';
import Thread from '../../Routes/Thread/Thread';
import { withRouter } from 'react-router-dom' //To get access to the history props
import data from '../../Mocks/threads-data.json';  

class Listings extends Component {
    state = {
        forHome: true,
        subredditID: 0,
    }
    /**
     * For generating threads from a mock service
     * @function createThread
     * @param {object} - object of the mocked thread ...Not working properly yet.
     */
    createThread = thread => <Thread 
    // source={thread} 
    // key={thread}
    username={thread}
    subreddit={thread}
    title={thread} 
    content={thread}
    comments={thread}
    upvotes={thread}
    enableUp={thread}
    enableDown={thread} />;


    /**
     * For generating threads from a mock service
     * @function createThreads
     * @param {array} - array of the mocked threads ...Not working properly yet.
     */
    createThreads = Threads => Threads.map(this.createThread);

    render(){
        console.log(data);
        return(
           <div className='listingsContainer'> 
            {/* <Thread/>
            <Thread/>
            <Thread/> */}
            {this.createThreads(data.threads)}
           </div>
        );
    }
}

export default withRouter(Listings);