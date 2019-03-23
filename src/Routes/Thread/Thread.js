import React, { Component } from 'react';
import './Thread.css';
import { Link } from 'react-router-dom';
import data from '../../Mocks/threads-data.json';
class Thread extends Component {
    // state = {
    //     username: 'GiantSteps_',
    //     subreddit: 'jazztheory',
    //     title: 'Modal Harmony Interchange',
    //     content: 'Modal Harmony is easier explained than played Modal Harmony is easier explained than played Modal Harmony is easier explained than played Modal Harmony is easier explained than played Modal Harmony is easier explained than played',
    //     comments: [
    //         {
    //             username: 'WreakingHavoc',
    //             comment: 'I rememeber when I had something to say!'
    //         },
    //         {
    //             username: 'CluelessBastard',
    //             comment: 'Oh this is so relatable'
    //         }
    //     ],
    //     upvotes: 0,
    //     enableUp: false,
    //     enableDown: false
    // }
    mocks = data.threads[2];
    //upvotes: this.state.upvotes + 1


    /**
     * Handles upvotes increments.
     * @function handleIncrement
     */
    handleIncrement = () => {
        console.log(this.state.upvotes)

        if (this.state.enableUp === true && this.state.enableDown === false) {
            this.setState({ upvotes: this.state.upvotes - 1 });
            this.setState({ enableUp: false });

        }
        else if (this.state.enableUp === false && this.state.enableDown === false) {
            this.setState({ upvotes: this.state.upvotes + 1 });
            this.setState({ enableUp: true });

        }
        else if (this.state.enableDown === true && this.state.enableUp === false) {

            this.setState({ enableDown: false });
            this.setState({ enableUp: true });
            this.setState({ upvotes: this.state.upvotes + 2 });
        }

    };

    /**
     * Handles downvotes.
     * @function handledecrement
     */
    handledecrement = () => {

        if (this.state.enableDown === true && this.state.enableUp === false) {
            this.setState({ upvotes: this.state.upvotes + 1 });
            this.setState({ enableDown: false });
        }
        else if (this.state.enableDown === false && this.state.enableUp === false) {
            this.setState({ upvotes: this.state.upvotes - 1 });
            this.setState({ enableDown: true });
        }
        else if (this.state.enableUp === true && this.state.enableDown === false) {
            this.setState({ enableDown: true });
            this.setState({ enableUp: false });
            this.setState({ upvotes: this.state.upvotes - 2 });
        }

    };
    render() {
        
        return (

            <div className='threadWrapper'>
                <div className="threadContainer">
                    <Link to='/r/' className="threadSubreddit"> r/{this.mocks.subreddit}</Link>
                    <br></br>
                    <div className="threadUsername">
                        Posted by u/{this.mocks.username}
                    </div>
                    <br></br>
                    <div className="threadTitle">{this.mocks.title}</div>

                    <p className="threadContent">{this.mocks.content}</p>

                    <span onClick={this.handleIncrement} className="incrementVotes">&#8679;</span>

                    <div className="threadUpvotes">{this.mocks.upvotes}</div>

                    <span onClick={this.handledecrement} className="decrementVotes">&#8681;</span>

                    <span className="threadComments">
                        {this.mocks.comments.length} comments
                    </span>


                </div>
            </div>
        );
    }
}

export default Thread;