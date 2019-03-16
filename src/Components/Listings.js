import React, { Component } from 'react';
import './Listings.css';
import Thread from '../Routes/Thread';
import { withRouter } from 'react-router-dom' //To get access to the history props  

class Listings extends Component {
    render(){
        return(
           <div className='listingsContainer'> 
            <Thread/>
           </div>
        );
    }
}

export default withRouter(Listings);