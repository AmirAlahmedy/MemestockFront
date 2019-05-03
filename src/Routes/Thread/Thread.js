import React, { Component } from 'react';
import './Thread.css';
import { Link } from 'react-router-dom';
import '../../Sass/styles.scss';
import axios from '../../axios-orders';

export default class Thread extends Component {

    state = {
        username: '',
        subreddit: '',
        title: '',
        content: '',
        comments: [],
        upvotes: 0,
        date:'',
        enableUp: false,
        enableDown: false
    }
    // mocks = data.threads[2];

    

componentDidMount(){

this.setState({
    upvotes: this.props.upvotes
 })

}


    /**
     * Handles upvotes increments.
     * @function handleIncrement
     */
    handleIncrement = () => {


        if (this.state.enableUp === true && this.state.enableDown === false) {
           // this.setState({ upvotes: this.state.upvotes - 1 });

            this.setState({ enableUp: false });

            console.log(this.props.id);
            console.log(this.props.upvotes);
           var postId =this.props.id;
          var headers = {
            auth: localStorage.getItem("token")
         }
    
        axios.post('/sr/'+this.state.subreddit+'/thread/'+postId+'/vote', { headers: headers })
        .then(res => {
           if (res.status == 200) {
              console.log(res)
           } else if (res.status === 404) {
              alert("Not Found");
              return Response.json;
           }
        })
        .catch(error => {
           alert("Error Caught");
        })
            this.setState({ enableUp: true });

        }
        else if (this.state.enableUp === false && this.state.enableDown === false) {
           this.setState({ upvotes: this.state.upvotes + 1 });
           console.log(this.props.id);
           console.log(this.props.upvotes);
           var postId =this.props.id;
          var headers = {
            auth: localStorage.getItem("token")
         }
    
        axios.post('/sr/'+this.state.subreddit+'/thread/'+postId+'/vote',true, { headers: headers })
        .then(res => {
           if (res.status == 200) {
              console.log(res)
           } else if (res.status === 404) {
              alert("Not Found");
              return Response.json;
           }
        })
        .catch(error => {
           alert("Error Caught");
        })
            this.setState({ enableUp: true });

        }
        else if (this.state.enableDown === true && this.state.enableUp === false) {

            this.setState({ enableDown: false });
            this.setState({ enableUp: true });
            this.setState({ upvotes: this.state.upvotes + 2 });

            var postId =this.props.id;
          var headers = {
            auth: localStorage.getItem("token")
         }
    
        axios.post('/sr/'+this.state.subreddit+'/thread/'+postId+'/vote', { headers: headers })
        .then(res => {
           if (res.status == 200) {
              console.log(res)
           } else if (res.status === 404) {
              alert("Not Found");
              return Response.json;
           }
        })
        .catch(error => {
           alert("Error Caught");
        })
        }   
        axios.post('/sr/'+this.state.subreddit+'/thread/'+postId+'/vote',true, { headers: headers })
        .then(res => {
           if (res.status == 200) {
              console.log(res)
           } else if (res.status === 404) {
              alert("Not Found");
              return Response.json;
           }
        })
        .catch(error => {
           alert("Error Caught");
        })

    };

    /**
     * Handles downvotes.
     * @function handledecrement
     */
    handledecrement = () => {

        if (this.state.enableDown === true && this.state.enableUp === false) {
           // this.setState({ upvotes: this.state.upvotes + 1 });
           var postId =this.props.id;
          var headers = {
            auth: localStorage.getItem("token")
         }
    
        axios.post('/sr/'+this.state.subreddit+'/thread/'+postId+'/vote', { headers: headers })
        .then(res => {
           if (res.status == 200) {
              console.log(res)
           } else if (res.status === 404) {
              alert("Not Found");
              return Response.json;
           }
        })
        .catch(error => {
           alert("Error Caught");
        })
            this.setState({ enableDown: false });
        }
        else if (this.state.enableDown === false && this.state.enableUp === false) {
           // this.setState({ upvotes: this.state.upvotes - 1 });
            this.setState({ enableDown: true });
            var postId =this.props.id;
          var headers = {
            auth: localStorage.getItem("token")
         }
    
        axios.post('/sr/'+this.state.subreddit+'/thread/'+postId+'/vote',false, { headers: headers })
        .then(res => {
           if (res.status == 200) {
              console.log(res)
           } else if (res.status === 404) {
              alert("Not Found");
              return Response.json;
           }
        })
        .catch(error => {
           alert("Error Caught");
        })
        }
        else if (this.state.enableUp === true && this.state.enableDown === false) {
            this.setState({ enableDown: true });
            this.setState({ enableUp: false });
          //  this.setState({ upvotes: this.state.upvotes - 2 });
          var postId =this.props.id;
          var headers = {
            auth: localStorage.getItem("token")
         }
    
        axios.post('/sr/'+this.state.subreddit+'/thread/'+postId+'/vote', { headers: headers })
        .then(res => {
           if (res.status == 200) {
              console.log(res)
           } else if (res.status === 404) {
              alert("Not Found");
              return Response.json;
           }
        })
        .catch(error => {
           alert("Error Caught");
        })
        
    
        axios.post('/sr/'+this.state.subreddit+'/thread/'+postId+'/vote',false, { headers: headers })
        .then(res => {
           if (res.status == 200) {
              console.log(res)
           } else if (res.status === 404) {
              alert("Not Found");
              return Response.json;
           }
        })
        .catch(error => {
           alert("Error Caught");
        })
        }

    };

    goTo(link){
        return function(){
            window.location.href = link;
        } 
    }

    render() {
        let thrdWrapper = this.props.view ? 'threadWrapper':'classicThreadWrapper';
        let thrdCont = this.props.view ? "threadContainer":'classicThreadContainer';
        let thrdContent = this.props.view ? 'threadContent':'classicThreadContent';
        return (
        
            <div /*className={thrdWrapper}*/>
                <div className={thrdCont}>
                    <div class="threadLinks">
                        <span onClick={this.goTo(`/r/${this.props.subreddit}`)} className="threadSubreddit"> r/{this.props.subreddit}</span>
                        .
                        <span onClick={this.goTo(`/user/${this.props.username}`)}className="posted-by">   Posted by u/{this.props.username} </span>
                    </div>
                    <br></br>
                    <div className="threadTitle">{this.props.title}</div>

                    <p className={thrdContent}>{this.props.content}</p>
                    <button type="button" onClick={this.handleIncrement} className="incrementVotes"><i class="fas fa-angle-up"></i></button>

<div className="threadUpvotes">{this.state.upvotes}</div>

<button type="button" onClick={this.handledecrement} className="decrementVotes"><i class="fas fa-angle-down"></i></button>
                    
                    <span onClick={this.goTo(`/thread/${this.props.id}?srName=${this.props.subreddit}`)} className="threadComments">
                        {window.location.href.includes("/thread/") ? "" : "View"}
                    </span>


                </div>
            </div>
        );
    }
}

