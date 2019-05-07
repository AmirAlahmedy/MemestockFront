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
      upvotes: null,
      date: '',
      enableUp: false,
      enableDown: false
   }
   // mocks = data.threads[2];



   componentDidMount() {

      // this.setState({
      //    upvotes: this.props.upvotes
      // })
   }


   /**
    * Handles upvotes increments.
    * @function handleIncrement
    */
   handleIncrement = (e) => {


      // if (this.state.enableUp === true && this.state.enableDown === false) {
      //    // this.setState({ upvotes: this.state.upvotes - 1 });

      //    this.setState({ enableUp: false });

      //    console.log(this.props.id);
      //    console.log(this.props.upvotes);
      //    var postId = this.props.id;
      //    var headers = {
      //       auth: localStorage.getItem("token")
      //    }

      //    axios.post('/sr/' + postId.split("?").pop() + '/thread/' + postId.split("?").shift() + '/vote', { headers: headers })
      //       .then(res => {
      //          if (res.status == 200) {
      //             console.log(res)
      //          } else if (res.status === 404) {
      //             alert("Not Found");
      //             return Response.json;
      //          }
      //       })
      //       .catch(error => {
      //          alert("Error Caught");
      //       })
      //    this.setState({ enableUp: true });

      // }
      // else if (this.state.enableUp === false && this.state.enableDown === false) {
      //    console.log(this.props.id);
      //    console.log(this.props.upvotes);
      //    var postId = this.props.id;
      //    var headers = {
      //       auth: localStorage.getItem("token")
      //    }

      //    axios.post('/sr/' + this.state.subreddit + '/thread/' + postId + '/vote', true, { headers: headers })
      //       .then(res => {
      //          if (res.status == 200) {
      //             console.log(res)
      //          } else if (res.status === 404) {
      //             alert("Not Found");
      //             return Response.json;
      //          }
      //       })
      //       .catch(error => {
      //          alert("Error Caught");
      //       })
      //    this.setState({ enableUp: true });

      // }
      // else if (this.state.enableDown === true && this.state.enableUp === false) {

      //    this.setState({ enableDown: false });
      //    this.setState({ enableUp: true });
      //    this.setState({ upvotes: this.state.upvotes + 2 });

      //    var postId = this.props.id;
      //    var headers = {
      //       auth: localStorage.getItem("token")
      //    }

      //    axios.post('/sr/' + this.state.subreddit + '/thread/' + postId + '/vote', { headers: headers })
      //       .then(res => {
      //          if (res.status == 200) {
      //             console.log(res)
      //          } else if (res.status === 404) {
      //             alert("Not Found");
      //             return Response.json;
      //          }
      //       })
      //       .catch(error => {
      //          alert("Error Caught");
      //       })
      // }
      const srName = this.props.id.split("?").pop();
      const postID = this.props.id.split("?").shift();

      let el = e.target;
      while (el.getAttribute("type") !== "button") {
         el = el.parentElement;
      }
      if (el.getAttribute("disabled") === "true") return;

      axios.post('/sr/' + srName + '/thread/' + postID + '/vote', { "upvote": true }, { headers: { "auth": localStorage.getItem("token") } })
         .then(res => {
            if (res.status == 200) {
               this.setState({ upvotes: res.data.votes });
            } else if (res.status === 404) {
               alert("Not Found");
               return Response.json;
            }
         })
         .catch(error => {
            const errMsg = error.response.data.error;
            if (errMsg === "already voted: true ") {
               alert("Already upvoted");
               el.setAttribute("disabled", true);
               document.querySelector(".incrementVotes").setAttribute("disabled", false);
            }
            console.log(errMsg);
         })

   }

   /**
    * Handles downvotes.
    * @function handledecrement
    */
   handledecrement = (e) => {
      let el = e.target;
      while (el.getAttribute("type") !== "button") {
         el = el.parentElement;
      }
      if (el.getAttribute("disabled") === "true") return;
      const srName = this.props.id.split("?").pop();
      const postID = this.props.id.split("?").shift();
      axios.post('/sr/' + srName + '/thread/' + postID + '/vote', { "upvote": false }, { headers: { "auth": localStorage.getItem("token") } })
         .then(res => {
            if (res.status == 200) {
               this.setState({ upvotes: res.data.votes });
            } else if (res.status === 404) {
               alert("Not Found");
               return Response.json;
            }
         })
         .catch(error => {
            const errMsg = error.response.data.error;
            if (errMsg === "already voted: false ") {
               alert("Already downvoted");
               el.setAttribute("disabled", true);
               document.querySelector(".incrementVotes").setAttribute("disabled", false);
            }
            console.log(errMsg);
         });

   };

   goTo(link) {
      return function () {
         window.location.href = link;
      }
   }

   render() {
      let thrdWrapper = this.props.view ? 'threadWrapper' : 'classicThreadWrapper';
      let thrdCont = this.props.view ? "threadContainer" : 'classicThreadContainer';
      let thrdContent = this.props.view ? 'threadContent' : 'classicThreadContent';
      return (

         <div /*className={thrdWrapper}*/>
            <div className={thrdCont}>
               <div class="threadLinks">
                  {this.props.isSpoiler ?
                     <span className="spoilerAlert">Spoiler</span>
                     : null
                  }
                  <br />
                  <span onClick={this.goTo(`/r/${this.props.subreddit}`)} className="threadSubreddit"> r/{this.props.subreddit}</span>
                  .
                        <span onClick={this.goTo(`/user/${this.props.username}`)} className="posted-by">   Posted by u/{this.props.username} </span>
               </div>
               <br></br>
               <div className="threadTitle">{this.props.title}</div>

               <span onClick={this.goTo(`/thread/${this.props.id}?srName=${this.props.subreddit}`)} className="threadComments">
                  {window.location.href.includes("/thread/") ? "" : "View"}
               </span>
               <p className={window.location.href.includes("/thread/") ? "threadContent" : thrdContent}>{this.props.content}</p>
               {this.props.image ?
                  <img className="imageContent" src={`${window.baseURL}${this.props.image}`} />
                  :
                  null
               }
               <button type="button" onClick={this.handleIncrement} className="incrementVotes"><i class="fas fa-angle-up"></i></button>

               <div className="threadUpvotes">{typeof this.state.upvotes === "object" ? this.props.upvotes : this.state.upvotes}</div>

               <button type="button" onClick={this.handledecrement} className="decrementVotes"><i class="fas fa-angle-down"></i></button>



            </div>
         </div>
      );
   }
}

