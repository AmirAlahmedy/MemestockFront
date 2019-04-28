import React, { Component } from 'react';


export default class ClasssicThread extends Component{
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

    goTo(link){
        return function(){
            window.location.href = link;
        } 
    }

    render() {

        return (
        
           
                <div className= 'classicThreadContiner'>
                    
                    <div className="threadTitle">{this.props.title}</div>

                    <div class="threadLinks">
                        <span onClick={this.goTo(`/r/${this.props.subreddit}`)} className="threadSubreddit"> r/{this.props.subreddit}</span>
                        .
                        <span onClick={this.goTo(`/user/${this.props.username}`)}className="posted-by">   Posted by u/{this.props.username} </span>
                    </div>
                    <br></br>

                    <button type="button" onClick={this.handleIncrement} className="incrementVotes"><i class="fas fa-angle-up"></i></button>

                    <div className="threadUpvotes">{this.state.upvotes}</div>

                    <button type="button" onClick={this.handledecrement} className="decrementVotes"><i class="fas fa-angle-down"></i></button>
                    <span onClick={this.goTo(`/thread/${this.props.id}?srName=${this.props.subreddit}`)} className="threadComments">
                        {this.state.comments.length} comments
                    </span>


                </div>
            
        );
    }
}