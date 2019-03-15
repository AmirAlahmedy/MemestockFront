import React, { Component } from 'react';
import './Listings.css';
import Thread from '../Routes/Thread';

class Listings extends Component {
    render(){
        return(
           <div className='listingsContainer'> 
            <Thread/>
           </div>
        );
    }
}

export default Listings;