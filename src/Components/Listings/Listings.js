import React, { Component } from 'react';
import './Listings.css';
import Thread from '../../Routes/Thread/Thread';
import { BrowserRouter as Router } from 'react-router-dom'
import data from '../../Mocks/threads-data.json';  
import axios from '../../axios-orders';

class Listings extends Component {
    reqThreads = {
                // [    
                //     {
                //         subredditName: "funny",
                //         _id:"sd232s2231",
                //         title:"love",
                //         postDate:"1998-04-23",
                //         body: "love is known for something"
                //     }

                //     {
                //         subredditName: "nature",
                //         _id:"2dsds23123d",
                //         title:"vietnam nature",
                //         postDate:"1998-04-23",
                //         body: "vietnam nature is known for something"
                //     } 
                // ]
             }

     startPosition = { startPosition:0 };
    componentDidMount = () => {
        axios.get('/ahmed/listing?type=new', {
            params: {
              startPosition: this.startPosition
            }
          })
        .then( response => {
           let reqThreads = response;
           console.log(response);
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
           <Router>

            <div className='listingsContainer'> 
                {/* <Thread/>
                <Thread/>
            <Thread/> */}
                {this.createThreads(data.threads)}
            </div>
            
        </Router> 
        );
    }
}

export default Listings;