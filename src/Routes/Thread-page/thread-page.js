import React, { Component } from 'react';
import Thread from '../Thread/Thread';
import GoHome from '../GoHome/index.js';
import AddComment from '../AddComment/AddComment';
import './thread-page.css';
import { Link, Route, Switch } from 'react-router-dom';
import axios from '../../axios-orders';

class ThreadPage extends Component {
   state = {
      id: window.location.href.split("/").pop(),
      comments: [
         {
            id: '1',
            username: 'WreakingHavoc',
            comment: 'I rememeber when I had something to say!',
            Locked: true,
            Spoiler: false,
            reply: false
         },
         {
            id: '2',
            username: 'CluelessBastard',
            comment: 'Oh this is so relatable',
            Locked: false,
            Spoiler: false,
            reply: false

         },
         {
            id: '3',
            username: 'Armi',
            comment: 'Awesome',
            Locked: false,
            Spoiler: true,
            reply: false
         }
      ],
      subredditName: window.location.href.split("srName=").pop().replace("#top", ""),
      editThread: false,
      threadBody:'',
      threadTitle:'',
      creator:'',
      postdate:'',
      votes:0,
      editComment: false,
      replyComment: false,
      editID: '',
      deleteID: ''

   }

   componentDidMount(){
      let srName=this.state.subredditName;
      let threadID=this.state.id;
      axios.get(`/sr/${srName}/thread/${threadID}`)
      .then(resp => {
        if(resp.data && resp.status === 200){
          this.setState({
            subredditName:resp.data.subredditName,
            threadBody:resp.data.body,
            postdate:resp.data.postDate,
            threadTitle:resp.data.title,
            votes:resp.data.__v,
            creator:resp.data.creatorUsername
          });
        }
   });
}


   editPost = (e) => {
      e.preventDefault();
      this.setState({
         editThread: true
      })
   };
   cancelEdit = (e) => {
      e.preventDefault();
      this.setState({
         editThread: false
      })
   };
   handleEdit = (e) => {
      e.preventDefault();
      console.log('Edit Clicked');

      let checker = "";

      if (document.getElementById("newThreadTitleField").value === checker) {
         alert("Please provide a new title");
         return;
      }
      else if (document.getElementById("newThreadBodyField").value === checker) {
         alert("Please provide a new bodyfor the thread");
         return;
      }
      let headers = {
         auth: localStorage.getItem("token")
      }
      var threadData = {
         title: document.getElementById("newThreadTitleField").value,
         threadBody: document.getElementById("newThreadBodyField").value
      }
      let SubredditName = this.state.subredditName;
      let threadID = this.state.id;
      axios.put('/sr/' + SubredditName + '/thread/' + threadID, threadData, { "headers": headers })
         .then(res => {
            if (res.status == 200) {
               console.log(res)
               alert('Post Edited Successfully');
            }
            else if (res.status === 404) {
               alert("Not Found");
               return Response.json;
            }
         })
         .catch(error => {
            alert("Error Caught");
         })
   }

   delPost = (e) => {
      //e.preventDefault();
      console.log('Delete Clicked');
      var headers = {
         auth: localStorage.getItem("token")
      }
      let SubredditName = this.state.subredditName;
      let threadID = this.state.id;
      axios.delete('/sr/' + SubredditName + '/thread/' + threadID, { "headers": headers })
         .then(res => {
            if (res.status == 200) {
               console.log(res);
               alert('Thread Deleted Successfully!');
               return (<Route path='/GoHome/' component={GoHome} />);
               
            } else if (res.status === 404) {
               alert("Not Found");
               return Response.json;
            }
         })
         .catch(error => {
            alert("Error Caught");
         })
   }



   addComment = (comment) => {
      const newComment = {
         username: localStorage.getItem("username"),
         comment,
         Locked: document.getElementById("checkLocked").checked,
         Spoiler: document.getElementById("checkSpoiler").checked,
         reply: false
      }
      this.setState({ comments: [...this.state.comments, newComment] });
      var headers = {
         auth: localStorage.getItem("token")
      }


      axios.post('/' + this.state.id, newComment.comment, newComment.Spoiler, "false", newComment.Locked, { headers: headers })
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



   replyComment = () => {


   }

   editComment = (e) => {
      e.preventDefault();
      this.setState({
         editComment: true

      })
      const id = e.target.getAttribute("data-id");
      this.setState({
         editID: id

      })
   }




   goEdit = (e) => {
      const Cid = this.state.editID;
      console.log(Cid);
      const newComment = {
         id: Cid,
         username: localStorage.getItem("username"),
         comment: document.getElementById("textComment").value,
         Locked: document.getElementById("checkLocked2").checked,
         Spoiler: document.getElementById("checkSpoiler2").checked,
         reply: false
      }


      e.preventDefault();
      console.log('Edit Clicked');
      var commentData = {
         newCommentID: Cid,
         newCommentBody: document.getElementById("textComment").value,
         newLock: document.getElementById("checkLocked2").checked,
         newSpoiler: document.getElementById("checkSpoiler2").checked
      }
      let checker = "";

      if (document.getElementById("textComment").value === checker) {
         alert("Please provide a new Comment");
         return;
      }
      else {
         //this.setState({comments:[...this.state.comments.forEach(comment=>comment.id==Cid),comment.comment=newComment.comment]});
         this.setState({ comments: [...this.state.comments, newComment] });

      }
      var headers = {
         auth: localStorage.getItem("token")
      }


      axios.put('/' + Cid, commentData.newCommentBody, commentData.newSpoiler, "false", commentData.newLock, { headers: headers })
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
   deleteComment = (e) => {
      const id = e.target.getAttribute("data-id");
      this.setState({
         deleteID: id

      })
      this.setState({ comments: [...this.state.comments.filter(comment => comment.id !== id)] });
      console.log(id);
      //e.preventDefault();
      console.log('Delete Clicked');
      var headers = {
         auth: localStorage.getItem("token")
      }
      axios.delete('/sr/' + id, { "headers": headers })
         .then(res => {
            if (res.status == 200) {
               console.log(res);
               alert('Comment Deleted Successfully!')
            } else if (res.status === 404) {
               alert("Not Found");
               return Response.json;
            }
         })
         .catch(error => {
            alert("Error Caught");
         })
   }


   cancelEditComment = (e) => {
      e.preventDefault();
      this.setState({
         editComment: false
      })
   }







   render() {
      return (

         <div className="page">
            <div class="threadPageContainer">
               <div className="PageThread">
               <Thread 
                  id={this.state.id}
                  username={this.state.creator}
                  subreddit={this.state.subredditName}
                  title={this.state.threadTitle} 
                  content={this.state.threadBody}
                  upvotes={this.state.votes}
                  date={this.state.postdate}
                />
               </div>
               <div class="addCommentSection">
                  <AddComment addComment={this.addComment} />
                  <label for="checkLocked"  className="lockComment">Lock</label>
                  <input type="checkbox" name="checkLocked" id="checkLocked" />
                  <label for="checkSpoiler" className="spoilerComment" >Mark as spoiler</label>
                  <input type="checkbox" name="checkSpoiler" id="checkSpoiler" />
               </div>
               <ul class="commentList">
                  {
                     this.state.comments.map(comment => {
                        if (localStorage.getItem("username") === comment.username) {
                           if (comment.Spoiler == false) {
                              if (comment.Locked == false)
                                 return (
                                    <li className="threadComment" id="commentContainer"  >
                                       <div className="commentUser">u/{comment.username} </div>
                                       <div className="comment">{comment.comment}</div>
                                       <button className="editComment" data-id={comment.id} onClick={this.editComment.bind(this)}>Edit</button>
                                       <button className="deleteComment" data-id={comment.id} onClick={this.deleteComment.bind(this)}>Delete</button>
                                       <button className="replyComment" onClick={this.handleReply} >r<i class="fas fa-reply"></i>eply</button>
                                    </li>
                                 );
                              else
                                 return (<li className="threadComment" id="commentContainer">
                                    <div className="commentUser">u/{comment.username} </div>
                                    <div className="comment">{comment.comment}</div>
                                    <button className="editComment" data-id={comment.id} onClick={this.editComment.bind(this)}>Edit</button>
                                    <button className="deleteComment" data-id={comment.id} onClick={this.deleteComment.bind(this)}>Delete</button>
                                 </li>);
                           }
                           else {
                              if (comment.Locked == false)
                                 return (
                                    <li className="threadComment" id="commentContainer">
                                       <div className="commentUser">u/{comment.username} </div>
                                       <div className="spoiler">{comment.comment}</div>
                                       <button className="editComment" data-id={comment.id} onClick={this.editComment.bind(this)}>Edit</button>
                                       <button className="deleteComment" data-id={comment.id} onClick={this.deleteComment.bind(this)}>Delete</button>
                                       <button className="replyComment" onClick={this.handleReply}><i class="fas fa-reply"></i></button>
                                    </li>
                                 );
                              else
                                 return (
                                    <li className="threadComment" id="commentContainer">
                                       <div className="commentUser">u/{comment.username} </div>
                                       <div className="spoiler">{comment.comment}</div>
                                       <button className="editComment" data-id={comment.id} onClick={this.editComment.bind(this)}>Edit</button>
                                       <button className="deleteComment" data-id={comment.id} onClick={this.deleteComment.bind(this)}>Delete</button>
                                    </li>
                                 );
                           }
                        }
                        else {
                           if (comment.Spoiler == false) {
                              if (comment.Locked == false)
                                 return (<li className="threadComment" id="commentContainer">
                                    <div className="commentUser">u/{comment.username} </div>
                                    <div className="comment">{comment.comment}</div>
                                    <button className="replyComment" ><i class="fas fa-reply"></i></button>
                                 </li>
                                 );
                              else
                                 return (
                                    <li className="threadComment" id="commentContainer">
                                       <div className="commentUser">u/{comment.username} </div>
                                       <div className="comment">{comment.comment}</div>
                                    </li>
                                 );
                           }
                           else {
                              if (comment.Locked == false)
                                 return (<li className="threadComment" id="commentContainer">
                                    <div className="commentUser">u/{comment.username} </div>
                                    <div className="spoiler">{comment.comment}</div>
                                    <button className="replyComment" onClick={this.handleReply}><i class="fas fa-reply"></i></button>
                                 </li>
                                 );
                              else
                                 return (
                                    <li className="threadComment" id="commentContainer">
                                       <div className="commentUser">u/{comment.username} </div>
                                       <div className="spoiler">{comment.comment}</div>

                                    </li>
                                 );
                           }
                        }
                     }

                     )

                  }

               </ul>
               {
                  this.state.editComment ?
                     <div className="threadComment2">

                        <form onSubmit={this.onSave}>
                           <input className="textComment" id="textComment" type="text"
                              name="comment" placeholder="Edit your comment here..."
                              value={this.state.comment} onChange={this.onChange}
                           />
                           <input type="submit" value="Edit" className="goEdit" onClick={this.goEdit.bind(this)} />
                           <input type="submit" value="Cancel" className="goCancel" onClick={this.cancelEditComment} />

                        </form>
                        <input type="checkbox" id="checkLocked2" />
                        <button className="lockComment">Lock</button>
                        <input type="checkbox" id="checkSpoiler2" />
                        <button className="spoilerComment" >Mark as spoiler</button>
                     </div> : <div></div>
               }
            </div>







            <div className="threadPageSidebarContainer">

               <div className="threadPageSidebarComponent1">
                  <button className="threadPageSidebarEditButton1" onClick={this.editPost}>EDIT POST</button>
                  <button className="threadPageSidebarDeleteButton" onClick={this.delPost}>DELETE POST</button>
               </div>
               {
                  this.state.editThread ?
                     <div className="threadPageSidebarComponent3">
                        <h5>EDIT POST</h5>
                        <hr></hr>
                        <form onSubmit={this.handleEdit}>
                           <div className="formGroupthreadComponent1">
                              <label for="newThreadTitle">Enter new Title</label>
                              <textarea type="textarea" name="text" id="newThreadTitleField" placeholder="Enter Title Here" />
                           </div>
                           <div className="formGroupSrComponent2">
                              <label for="newThreadBody">Enter new Thread Body</label>
                              <textarea type="textarea" name="text" id="newThreadBodyField" placeholder="Enter Body Here" />
                           </div>
                           <button className="threadPageSidebarEditButton2" >EDIT POST</button>
                           <button className="threadPageSidebarCancelEditButton" onClick={this.cancelEdit}>CANCEL</button>
                        </form>
                     </div> : <div></div>
               }

            </div>
         </div>






      );

   }


}

export default ThreadPage;