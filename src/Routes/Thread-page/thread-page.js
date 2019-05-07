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
      threadBody: '',
      threadTitle: '',
      creator: '',
      postdate: '',
      votes: 0,
      editComment: false,
      replyComment: false,
      editID: '',
      replyID: '',
      deleteID: '',
      error: false,
      errornumber: 0

   }

   async componentDidMount() {
      let srName = this.state.subredditName;
      let threadID = this.state.id;
      axios.get(`/sr/${srName}/thread/${threadID}`)
         .then(resp => {
            if (resp.data && resp.status === 200) {
               this.setState({
                  subredditName: resp.data.subredditName,
                  threadBody: resp.data.body,
                  postdate: resp.data.postDate,
                  threadTitle: resp.data.title,
                  votes: resp.data.votes,
                  creator: resp.data.creatorUsername,
                  image: resp.data.postFile === "none" ? null : resp.data.postFile,
                  isSpoiler: resp.data.spoiler
               });
            }
         });

      // var headers = {
      //    auth: localStorage.getItem("token")
      // }

      // axios.get('/comment/all/' + this.state.id, { headers: headers })
      //    .then(res => {
      //       if (res.status == 200) {
      //          console.log(res)

      //          //Removing duplicate comments:
      //          // for(let i = 0; i < res.data.comments.length; i++){
      //          //    for(let x = i+1; x < res.data.comments.length; x++){
      //          //       if(res.data.comments[i]._id === res.data.comments[x]._id){
      //          //          res.data.comments.splice(x, 1);
      //          //       }
      //          //    }
      //          // }
      //          // for (let comment of res.data.comments) {
      //          // }



      //          for (let comment of res.data.comments) {
      //             comment.children = [];
      //             axios.get(`/comment/all/${comment._id}?comment=true`)
      //                .then(resp => {
      //                   if (resp.data && resp.status === 200) {
      //                      let comments = this.state.comments;
      //                      for (const commentState of comments) {
      //                         if (commentState._id === comment._id) {
      //                            commentState.children = resp.data.comments;
      //                         }
      //                      }
      //                      this.setState({
      //                         comments: comments
      //                      })
      //                   }
      //                });

      //          }

      //          this.setState({
      //             comments: res.data.comments
      //          });
      //       }
      //       else if (res.status === 404) {
      //          alert("Not Found");
      //          return Response.json;
      //       }
      //    })
      //    .catch(error => {
      //       console.log(error);
      //    })

      let comments = await this.getComments(threadID)
      comments = comments.filter(comment => comment.length);
      console.log(comments);
      let commentsGrouped = comments;
      // for (const comment of comments) {
      //    // const isThereSimilar = commentsGrouped.findIndex(cGroup => {
      //    //    return cGroup.findIndex(c => c.parent_id === comment.parent_id) > 0
      //    // });
      //    // if (isThereSimilar > -1) {
      //    //    console.log("found one")
      //    //    commentsGrouped[isThereSimilar].push(comment);
      //    // } else {
      //    //    console.log("none found")
      //    //    commentsGrouped.push([comment]);
      //    // }
      //    comment.children = [];
      // }
      // for (let i = 0; i<comments.length; i++) {
      //    //Search for its children...
      //    for(let j = i + 1; j < comments.length; j++){
      //       if(comments[j].parent_id === comments[i]._id){
      //          comments[i].children.push(comments[j]);
      //       }
      //    }
      // }
      // console.log(comments);

      //Now we need to link them...
      //First group ==> comments
      //Other groups => replies;
      // if(!commentsGrouped.length) return;
      for (let i = comments.length - 1; i > 0; i--) {
         const parentID = comments[i][0].parent_id;
         //Search for it's parent...
         for (let j = 0; j < i; j++) {
            for (let parent of comments[j]) {
               if (parent._id === parentID) {
                  parent.children = comments[i];
               }
            }
         }
      }
      this.setState({ allComments: comments[0] }, () => {
         console.log(this.state.allComments);
      })


   }

   getCommentsJSX(comments) {
      if (!comments) return;
      return comments.map(comment => {
         return <ul className="threadComment" >
            <div className="commentUser">u/{comment.username} </div>
            <div className={`comment ${comment.spoiler ? "spoiler" : ""}`}>{comment.content}</div>
            {!comment.locked ?
               <button className="replyComment" comment-id={comment._id} onClick={this.handleReply} >Reply</button>
               : null
            }
            {localStorage.getItem("Username") === comment.username ?
               <span>
                  <button className="editComment" data-id={comment._id} onClick={this.editComment.bind(this)}>Edit</button>
                  <button className="deleteComment" data-id={comment._id} onClick={this.deleteComment.bind(this)}>Delete</button>
               </span>
               : null}
            {this.getCommentsJSX(comment.children)}</ul>
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
      this.setState({
         error: false,
         errornumber: 0
      })
      e.preventDefault();
      console.log('Edit Clicked');

      let checker = "";

      if (document.getElementById("newThreadTitleField").value === checker) {
         this.setState({
            error: true,
            errornumber: 1
         })
         //alert("Please provide a new title");
         return;
      }
      else if (document.getElementById("newThreadBodyField").value === checker) {
         this.setState({
            error: true,
            errornumber: 2
         })
         //alert("Please provide a new bodyfor the thread");
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
               this.setState({
                  editThread: false
               })
            }
         })
         .catch(error => {
            alert(error.Response);
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
               window.location.href = "/"

            }
         })
         .catch(error => {
            alert(error.response);
         })
   }





   replyComment(e) {
      e.preventDefault();
      const comment = document.getElementById("textReply").value.trim();
      this.addComment(comment, {
         id: this.state.replyTo
      });
   }
   addComment = (comment, data) => {
      var newComment = {
         username: localStorage.getItem("Username"),
         content: comment,
         reply: Boolean(data || false),
         spoiler: document.getElementById("checkSpoiler").checked,
         locked: document.getElementById("checkLocked").checked
      }



      var headers = {
         auth: localStorage.getItem("token")
      }
      // var newComment = {
      //    // username: localStorage.getItem("username"),
      //     content:comment,
      //     reply: false,
      //     spoiler: document.getElementById("checkSpoiler").checked,
      //     locked: document.getElementById("checkLocked").checked
      //  }
      const id = data && data.id ? data.id : this.state.id
      // alert(id);
      axios.post('/comment/' + id, newComment, { headers: headers })
         .then(res => {
            if (res.status == 200) {
               console.log(res)
               window.location.reload();
            }
         })
         .catch(error => {
            alert(error.response);
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
      e.preventDefault();
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


      console.log('Edit Clicked');
      var commentData = {
         newCommentID: Cid,
         content: document.getElementById("textComment").value,
         locked: document.getElementById("checkLocked2").checked,
         spoiler: document.getElementById("checkSpoiler2").checked
      }
      let checker = "";

      if (document.getElementById("textComment").value === checker) {
         alert("Please provide a new Comment");
         return;
      }
      // else {
      //this.setState({comments:[...this.state.comments.forEach(comment=>comment.id==Cid),comment.comment=newComment.comment]});
      //  this.setState({ comments: [...this.state.comments, newComment] });

      //}
      var headers = {
         auth: localStorage.getItem("token")
      }


      axios.put('/comment/' + Cid, commentData, { headers: headers })
         .then(res => {
            if (res.status == 200) {
               console.log(res)
               const btn = document.querySelector(`button[data-id="${Cid}"]`)
               const container = btn.parentElement.parentElement
               const comment = container.querySelector(".comment");
               comment.textContent = commentData.content;
               if(commentData.locked){
                  container.querySelector(".replyComment").remove();
               }else{
                  if(container.querySelector(".replyComment")) return;
                  const replyBtn = document.createElement("button");
                  replyBtn.classList.add("replyComment");
                  replyBtn.innerHTML = `<i class="fas fa-reply"></i>`;
                  replyBtn.setAttribute("comment-id", Cid);
                  comment.after(replyBtn);
               }
               if(commentData.spoiler){
                  container.classList.add("spoiler")
               }else{
                  container.classList.remove("spoiler")
               }
               this.setState({editComment: false})
            }
         })
         .catch(error => {
            alert(error.response);
         })
   }
   deleteComment = (e) => {
      const id = e.target.getAttribute("data-id");
      const container = e.target.parentElement.parentElement;
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
               container.remove();
               alert('Comment Deleted Successfully!');

            }
         })
         .catch(error => {
            alert(error.response);
         })
   }


   cancelEditComment = (e) => {
      e.preventDefault();
      this.setState({
         editComment: false
      })
   }

   handleReply = (e) => {
      e.preventDefault();
      this.setState({
         replyComment: true

      })
      let id = e.target.getAttribute("comment-id");
      while (!id) {
         e.target = e.target.parentElement;
         id = e.target.getAttribute("comment-id");
      }
      // alert(id);
      this.setState({
         replyTo: id

      })

   }

   cancelReplyComment = (e) => {
      e.preventDefault();
      this.setState({
         replyComment: false
      })
   }

   //A recursive function to get all All levels of replies for a comment...
   //level 1 === replies for the comment
   //level 2 === replies of a reply
   async getComments(cID, commentsArray = []) {



      let comments = await axios.get("/comment/all/" + cID + "?ss", {
         headers: {
            auth: localStorage.getItem("token")
         }
      });
      comments = comments.data.comments;
      commentsArray.push(comments);
      for (const comment of comments) {
         commentsArray = await this.getComments(comment._id + "?comment=true", commentsArray);
      }
      return commentsArray;
      // if(comments.length){
      //    //Save Comments:
      //    if(!this.state.tCOmments){
      //       this.setState({
      //          tCOmments: comments
      //       });
      //    }else{
      //       let lvComments = this.state.tCOmments;
      //       let i = 0;
      //       // while(1){
      //       //    if(i === 0 && (i >= lvComments.length || typeof lvComments[i] === "number")){
      //       //       console.log("something went horrible");
      //       //       break;
      //       //    }
      //       //    if(i >= lvComments.length || typeof lvComments[i] === "number") {
      //       //       const startingIndex = lvComments.findIndex((el) => typeof el === "number");

      //       //       lvComments = lvComments.map((comment, x) => [...(comment.children || []), ...(startingIndex > 0 ? lvComments.split(startingIndex-1).concat([x]) : [x])]);
      //       //       i = 0;
      //       //       continue;
      //       //    }
      //       //    if(lvComments[i]._id === comments[0].parent_id){
      //       //       lvComments[i].children = comments;
      //       //       const OriginalComments = this.state.tCOmments;
      //       //       const startingIndex = lvComments.findIndex((el) => typeof el === "number");
      //       //       let path = lvComments.split(startingIndex-1);
      //       //       // for(const index in OriginalComments){
      //       //       //     if(index === path[0]){
      //       //       //        OriginalComments.children ? OriginalComments
      //       //       //     }
      //       //       // }  
      //       //       // if(path.length === 1){
      //       //       //    OriginalComments[path[0]].children = comments;
      //       //       // }else{
      //       //          //[0]["children"][1]["children"][2]["children"]
      //       //          let str;
      //       //          for(const pos of path){
      //       //             str.push(`[${pos}]["children"]`);
      //       //          }
      //       //          str = str.join("");
      //       //          const evaluator = Function(`
      //       //             "use strict";
      //       //             return ${OriginalComments}${str};
      //       //          `);
      //       //          console.log("evaluator", evaluator);
      //       //          // evaluator() = comments;
      //       //       // }
      //       //          for(const comment of comments){
      //       //             await this.getComments(comment._id);
      //       //          }
      //       //       break;
      //       //    }
      //       //    i++;
      //       // }
      //    }


      // }
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
                     image={this.state.image}
                     isSpoiler={this.state.isSpoiler}
                  />
               </div>
               <div class="addCommentSection">
                  <AddComment addComment={this.addComment} />
                  <label for="checkLocked" className="lockComment">Lock</label>
                  <input type="checkbox" name="checkLocked" id="checkLocked" />
                  <label for="checkSpoiler" className="spoilerComment" >Mark as spoiler</label>
                  <input type="checkbox" name="checkSpoiler" id="checkSpoiler" />
               </div>
               <ul class="commentList">
                  {this.getCommentsJSX(this.state.allComments)}
                  {/* {
                     this.state.comments.map(comment => {
                        const isCreator = localStorage.getItem("Username") === comment.username;
                        return (
                           <div>
                              <li className="threadComment" id="commentContainer"  >
                                 <div className="commentUser">u/{comment.username} </div>
                                 <div className={`comment ${comment.spoiler ? "spoiler" : ""}`}>{comment.content}</div>
                                 {localStorage.getItem("Username") === comment.username ?
                                    <span>
                                       <button className="editComment" data-id={comment._id} onClick={this.editComment.bind(this)}>Edit</button>
                                       <button className="deleteComment" data-id={comment._id} onClick={this.deleteComment.bind(this)}>Delete</button>
                                    </span>
                                    : null}
                                 {!comment.locked ?
                                    <button className="replyComment" comment-id={comment._id} onClick={this.handleReply} ><i class="fas fa-reply"></i></button>
                                    : null
                                 }
                              </li>
                              {comment.children ? comment.children.map(child => {
                                 return (
                                    <li className="threadComment reply" id="commentContainer"  >
                                       <div className="commentUser">u/{child.username} </div>
                                       <div className={`comment ${child.spoiler ? "spoiler" : ""}`}>{child.content}</div>
                                       {isCreator ?
                                          <span>
                                             <button className="editComment" data-id={child._id} onClick={this.editComment.bind(this)}>Edit</button>
                                             <button className="deleteComment" data-id={child._id} onClick={this.deleteComment.bind(this)}>Delete</button>
                                          </span>
                                          : null}

                                       {!child.locked ?
                                          <button className="replyComment" comment-id={child._id} onClick={this.handleReply} ><i class="fas fa-reply"></i></button>
                                          : null
                                       }
                                    </li>
                                 )
                              }) : null}
                           </div>
                        );

                     })

                  } */}

               </ul>
               {
                  this.state.editComment ?
                     <div className="threadComment2">

                        <form className="editForm" onSubmit={this.onSave}>
                           <input className="textComment" id="textComment" type="text"
                              name="comment" placeholder="Edit your comment here..."
                              value={this.state.comment} onChange={this.onChange}
                           />
                           <br />
                           <label className="lockComment">
                              <input type="checkbox" id="checkLocked2" />
                              Lock
                        </label>
                           <label className="spoilerComment">
                              <input type="checkbox" id="checkSpoiler2" />
                              Mark as spoiler
                        </label>
                           <br />
                           <input type="submit" value="Edit" className="goEdit" onClick={this.goEdit.bind(this)} />
                           <input type="submit" value="Cancel" className="goCancel" onClick={this.cancelEditComment} />
                           <br />
                        </form>
                     </div> : <div></div>
               }
               {
                  this.state.replyComment ?
                     <div className="threadComment2">

                        <form className="editForm" onSubmit={this.onSave}>
                           <input className="textReply textComment" id="textReply" type="text"
                              name="comment" placeholder="Reply here..."
                              value={this.state.comment} onChange={this.onChange}
                           />
                           <br />

                           <label className="lockComment">
                              <input type="checkbox" id="checkLocked3" />
                              Lock
                           </label>
                           <label className="spoilerComment">
                              <input type="checkbox" id="checkSpoiler3" />
                              Mark as spoiler
                        </label>
                           <br />
                           <input type="submit" value="Reply" className="goReply" onClick={this.replyComment.bind(this)} />
                           <input type="submit" value="Cancel" className="goCancel" onClick={this.cancelReplyComment} />

                        </form>
                     </div> : <div></div>
               }
            </div>








            <div className="threadPageSidebarContainer">

               {
                  (this.state.creator == localStorage.getItem("Username")) ?
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
                           {
                              this.state.errornumber == 1 ?
                                 <div className="errorMessageEditPost">
                                    *Please provide a  new title for the post
                              </div> : <div></div>
                           }
                           <div className="formGroupSrComponent2">
                              <label for="newThreadBody">Enter new Thread Body</label>
                              <textarea type="textarea" name="text" id="newThreadBodyField" placeholder="Enter Body Here" />
                           </div>
                           {
                              this.state.errornumber == 2 ?
                                 <div className="errorMessageEditPost">
                                    *Please provide a new body for the post
                              </div> : <div></div>
                           }
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