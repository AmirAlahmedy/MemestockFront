import React, { Component } from 'react';
import './Thread.css';
import { Link } from 'react-router-dom';
import '../../Sass/styles.scss';
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
        upvotes: 0,
        enableUp: false,
        enableDown: false
    }
    // mocks = data.threads[2];



    /**
     * Handles upvotes increments.
     * @function handleIncrement
     */
    handleIncrement = () => {


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
                    <Link to='/r/' className="threadSubreddit"> r/{this.props.subreddit}</Link>
                    <br></br>
                    <div className="threadUsername">
                     <Link to="/user/">   Posted by u/{this.state.username} </Link>
                    </div>
                    <br></br>
                    <div className="threadTitle">{this.props.title}</div>

                    <p className="threadContent">{this.props.content}</p>

                    <span onClick={this.handleIncrement} className="incrementVotes">&#8679;</span>

                    <div className="threadUpvotes">{this.state.upvotes}</div>

                    <span onClick={this.handledecrement} className="decrementVotes">&#8681;</span>

                    <Link to='/thread/' className="threadComments">
                        {this.state.comments.length} comments
                    </Link>


                </div>
            </div>
        );
    }
}

export default Thread;