import React, { Component } from 'react';
import './Thread.css';
import { Link} from 'react-router-dom';

class Thread extends Component {
    state = {
        username: 'GiantSteps_',
        subreddit: 'jazztheory',
        title: 'Modal Harmony Interchange',
        content: 'Modal Harmony is easier explained than played Modal Harmony is easier explained than played Modal Harmony is easier explained than played Modal Harmony is easier explained than played Modal Harmony is easier explained than played',
        comments: [
            {
                username: 'WreakingHavoc',
                comment: 'I rememeber when I had something to say!'
            },
            {
                username: 'CluelessBastard',
                comment: 'Oh this is so relatable'
            }
        ],
        upvotes: 0
    }


    handleIncrement = () => {
        this.setState({ upvotes: this.state.upvotes + 1 });

    };
    handledecrement = () => {
        this.setState({ upvotes: this.state.upvotes - 1 });

    };
    render() {
        return (
            <div>
                <div className="threadContainer">
                    <Link to='/r/' className="threadSubreddit"> r/{this.state.subreddit}</Link>
                    <br></br>
                    <div className="threadUsername">
                        Posted by u/{this.state.username}
                    </div>
                    <br></br>
                    <div className="threadTitle">{this.state.title}</div>

                    <p className="threadContent">{this.state.content}</p>

                    <span onClick={this.handleIncrement} className="incrementVotes">&#8679;</span>

                    <div className="threadUpvotes">{this.state.upvotes}</div>

                    <span onClick={this.handledecrement} className="decrementVotes">&#8681;</span>

                    <span className="threadComments">
                        {this.state.comments.length} comments
                    </span>


                </div>
            </div>
        );
    }
}

export default Thread;