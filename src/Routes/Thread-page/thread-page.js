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
      comments: [],
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
      replyID:'',
      deleteID: ''

   }

   componentDidMount(){

console.log(localStorage.getItem("Username"));


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
            votes:resp.data.__v || resp.data.votes,
            creator:resp.data.creatorUsername
          });
        }
   });

   var headers = {
      auth: localStorage.getItem("token")
   }

   axios.get('/comment/all/' + this.state.id, { headers: headers })
      .then(res => {
         if (res.status == 200) {
            console.log(res)
            
            //Removing duplicate comments:
            // for(let i = 0; i < res.data.comments.length; i++){
            //    for(let x = i+1; x < res.data.comments.length; x++){
            //       if(res.data.comments[i]._id === res.data.comments[x]._id){
            //          res.data.comments.splice(x, 1);
            //       }
            //    }
            // }
            for(const comment of res.data.comments){
               axios.get(`/comment/${comment._id}`)
               .then(res => {
                 if(res.data && res.status === 200){
                   let myComments = this.state.comments;
                   myComments.push(res.data);
                   this.setState({
                     comments: myComments
                   });
                 }
               });    
             
         }
      }
          else if (res.status === 404) {
            alert("Not Found");
            return Response.json;
         }
      })
      .catch(error => {
         console.log(error);
      })


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
     /* var newComment = {
          username: localStorage.getItem("username"),
          content:comment,
          reply: false,
          spoiler: document.getElementById("checkSpoiler").checked,
          locked: document.getElementById("checkLocked").checked
       }

      this.setState({ comments: [...this.state.comments, newComment] });*/


      var headers = {
         auth: localStorage.getItem("token")
      }
      var newComment = {
         // username: localStorage.getItem("username"),
          content:comment,
          reply: false,
          spoiler: document.getElementById("checkSpoiler").checked,
          locked: document.getElementById("checkLocked").checked
       }
     
      axios.post('/comment/' + this.state.id, newComment, { headers: headers })
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



   replyComment = (e) => {
      var headers = {
         auth: localStorage.getItem("token")
      }
      var newComment = {
         // username: localStorage.getItem("username"),
         content: document.getElementById("textReply").value,
          reply: true,
          spoiler: document.getElementById("checkSpoiler3").checked,
          locked: document.getElementById("checkLocked3").checked
       }
     
      axios.post('/comment/' + this.state.replyID, newComment, { headers: headers })
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
      /*const newComment = {
         id: Cid,
         username: localStorage.getItem("username"),
         content: document.getElementById("textComment").value,
       //  reply: false,
       spoiler: document.getElementById("checkSpoiler2").checked,
         locked: document.getElementById("checkLocked2").checked
         
         
      }*/


      e.preventDefault();
      console.log('Edit Clicked');
      var commentData = {
       //  c_id: Cid,
         content: document.getElementById("textComment").value,
         spoiler: document.getElementById("checkSpoiler2").checked,
         locked: document.getElementById("checkLocked2").checked
      }
      let checker = "";

      if (document.getElementById("textComment").value === checker) {
         alert("Please provide a new Comment");
         return;
      }
    
      var headers = {
         auth: localStorage.getItem("token")
      }


      axios.put('/' + Cid, commentData, { headers: headers })
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
      //this.setState({ comments: [...this.state.comments.filter(comment => comment._id !== id)] });
      console.log(id);
      //e.preventDefault();
      console.log('Delete Clicked');
      var headers = {
         auth: localStorage.getItem("token")
      }
      axios.delete('/comment/' + id, { "headers": headers })
         .then(res => {
            if (res.status == 200) {
               console.log(res);
               // e.target.remove();
               alert('Comment Deleted Successfully!');

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

  handleReply=(e)=>{
       e.preventDefault();
       this.setState({
         replyComment: true

      })
      const id = e.target.getAttribute("comment-id");
      this.setState({
         replyID: id

      })

  }

  cancelReplyComment = (e) => {
   e.preventDefault();
   this.setState({
      replyComment: false
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
                        if (localStorage.getItem("Username") === comment.username) {
                           if (comment.spoiler == false) {
                              if (comment.locked == false)
                                 return (
                                    <li className="threadComment" id="commentContainer"  >
                                       <div className="commentUser">u/{comment.username} </div>
                                       <div className="comment">{comment.content}</div>
                                       <button className="editComment" data-id={comment._id} onClick={this.editComment.bind(this)}>Edit</button>
                                       <button className="deleteComment" data-id={comment._id} onClick={this.deleteComment.bind(this)}>Delete</button>
                                       <button className="replyComment" comment-id={comment._id} onClick={this.handleReply} ><i class="fas fa-reply"></i></button>
                                    </li>
                                 );
                              else
                                 return (<li className="threadComment" id="commentContainer">
                                    <div className="commentUser">u/{comment.username} </div>
                                    <div className="comment">{comment.content}</div>
                                    <button className="editComment" data-id={comment._id} onClick={this.editComment.bind(this)}>Edit</button>
                                    <button className="deleteComment" data-id={comment._id} onClick={this.deleteComment.bind(this)}>Delete</button>
                                 </li>);
                           }
                           else {
                              if (comment.locked == false)
                                 return (
                                    <li className="threadComment" id="commentContainer">
                                       <div className="commentUser">u/{comment.username} </div>
                                       <div className="spoiler">{comment.content}</div>
                                       <button className="editComment" data-id={comment._id} onClick={this.editComment.bind(this)}>Edit</button>
                                       <button className="deleteComment" data-id={comment._id} onClick={this.deleteComment.bind(this)}>Delete</button>
                                       <button className="replyComment"  comment-id={comment._id} onClick={this.handleReply}><i class="fas fa-reply"></i></button>
                                    </li>
                                 );
                              else
                                 return (
                                    <li className="threadComment" id="commentContainer">
                                       <div className="commentUser">u/{comment.username} </div>
                                       <div className="spoiler">{comment.content}</div>
                                       <button className="editComment" data-id={comment._id} onClick={this.editComment.bind(this)}>Edit</button>
                                       <button className="deleteComment" data-id={comment._id} onClick={this.deleteComment.bind(this)}>Delete</button>
                                    </li>
                                 );
                           }
                        }
                        else {
                           if (comment.spoiler == false) {
                              if (comment.locked == false)
                                 return (<li className="threadComment" id="commentContainer">
                                    <div className="commentUser">u/{comment.username} </div>
                                    <div className="comment">{comment.content}</div>
                                    <button className="replyComment"  comment-id={comment._id} onClick={this.handleReply} ><i class="fas fa-reply"></i></button>
                                 </li>
                                 );
                              else
                                 return (
                                    <li className="threadComment" id="commentContainer">
                                       <div className="commentUser">u/{comment.username} </div>
                                       <div className="comment">{comment.content}</div>
                                    </li>
                                 );
                           }
                           else {
                              if (comment.locked == false)
                                 return (<li className="threadComment" id="commentContainer">
                                    <div className="commentUser">u/{comment.username} </div>
                                    <div className="spoiler">{comment.content}</div>
                                    <button className="replyComment"  comment-id={comment._id} onClick={this.handleReply}><i class="fas fa-reply"></i></button>
                                 </li>
                                 );
                              else
                                 return (
                                    <li className="threadComment" id="commentContainer">
                                       <div className="commentUser">u/{comment.username} </div>
                                       <div className="spoiler">{comment.content}</div>

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
               {
                  this.state.replyComment ?
                     <div className="threadComment2">

                        <form onSubmit={this.onSave}>
                           <input className="textReply" id="textReply" type="text"
                              name="comment" placeholder="Reply here..."
                              value={this.state.comment} onChange={this.onChange}
                           />
                           <input type="submit" value="Reply" className="goReply" onClick={this.replyComment.bind(this)} />
                           <input type="submit" value="Cancel" className="goCancel" onClick={this.cancelReplyComment} />

                        </form>
                        <input type="checkbox" id="checkLocked3" />
                        <button className="lockComment">Lock</button>
                        <input type="checkbox" id="checkSpoiler3" />
                        <button className="spoilerComment" >Mark as spoiler</button>
                     </div> : <div></div>
               }
            </div>








            <div className="threadPageSidebarContainer">
               
               {
                  (this.state.username==localStorage.getItem("Username")) ?
                  <div className="threadPageSidebarComponent1">
                  <button className="threadPageSidebarEditButton1" onClick={this.editPost}>EDIT POST</button>
                  <button className="threadPageSidebarDeleteButton" onClick={this.delPost}>DELETE POST</button> 
                  </div>
                  : <div></div>
                 
               }
               
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