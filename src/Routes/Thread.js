import React, { Component } from 'react';
import './Thread.css';
import { NavLink} from 'react-router-dom';
import Subreddit from './Subreddit';

class Thread extends Component {
    state = { 
        username:'GiantSteps_',
        subreddit:'jazztheory',
        title:'Modal Harmony Interchange', 
        content:'Modal Harmony is easier explained than played',
        comments:[
            {
                username:'WreakingHavoc',
                comment:'I rememeber when I had something to say!'
            },
            {
                username:'CluelessBastard',
                comment:'Oh this is so relatable'
            }
        ],
        upvotes:0
    }
    render(){
        return(
           <div>
               <div className="threadContainer">
                <NavLink className="threadSubreddit"  to='/r/'>r/{this.state.subreddit}</NavLink>
                <div className="threadUsername">
                    Posted by u/{this.state.username}
                </div>
                <div className="threadTitle"><h2>{this.state.title}</h2></div>
                <p className="threadContent">{this.state.content}</p>
                <div className="threadComments">
                    {this.state.comments.length} Comments
                </div>
                <div className="threadUpvotes">{this.state.upvotes}</div>
               </div>
           </div> 
        );
    }
}

export default Thread;