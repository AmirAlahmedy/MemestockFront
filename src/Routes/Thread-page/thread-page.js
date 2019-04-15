import React, { Component } from 'react';
import Thread from '../Thread/Thread';
import './thread-page.css';
import { Link, Route, Switch } from 'react-router-dom';
import axios from 'axios';

class ThreadPage extends Component {
   state = {

      comments: [
         {
            username: 'WreakingHavoc',
            comment: 'I rememeber when I had something to say!',
            Lock: false,
            Spoiler:false
         },
         {
            username: 'CluelessBastard',
            comment: 'Oh this is so relatable',
            Lock: false,
            Spoiler:false
         },
         {
            username:'Armi',
            comment:'Awesome',
            Lock: false,
            Spoiler:true
         }
      ]
   }
  

    showReply=()=>{


    };
   

   saveComment(e)  {
      e.preventDefault();
      const username=localStorage.getItem("username");
      //const newComment=this.newComment.value;
    
      this.setState({comments:this.state.comments.concat(username,this.newComment.value)});
      

   };

   render() {
    
      return (
        /*  <div class="threadPageContainer">
 
             <div className="PageThread">
                <Thread />
             </div>
          </div>*/
          
         <div class="threadPageContainer">
            <div className="PageThread">
               <Thread />
            </div>
      
              
           <input  type="text" ref={(input)=>this.newComment=input}  className="textComment" placeholder="write your comment here" ></input>
           <button className="saveComment" onClick={this.saveComment}>Save</button>
           
            <ul>
                  {
                    this.state.comments.map(comment => {if(localStorage.getItem("username")===comment.username)
                    {
                    if(comment.Spoiler==false)
                      return ( 
                        <div className="threadComment">   
                <div className="commentUser">u/{comment.username} </div>
               <div className="comment">{comment.comment}</div>
               <button className="editComment">Edit</button>
               <button className="deleteComment">Delete</button>
               <button className="replyComment" onClick={this.showReply}>reply</button>
               <button className="lockComment">Lock</button>
               <button className="spoilerComment">Mark as spoiler</button>
                     </div>
                     );
                  else 
                  return ( 
                     <div className="threadComment">   
             <div className="commentUser">u/{comment.username} </div>
            <div className="spoiler">{comment.comment}</div>
            <button className="editComment">Edit</button>
            <button className="deleteComment">Delete</button>
            <button className="replyComment" onClick={this.showReply}>reply</button>
            <button className="lockComment">Lock</button>
            <button className="spoilerComment">Mark as spoiler</button>
                  </div>
                  );
                  }
                     else 
                     {
                     if(comment.Spoiler==false)
                     return( <div className="threadComment">   
                     <div className="commentUser">u/{comment.username} </div>
                    <div className="comment">{comment.comment}</div>
                    <button className="replyComment" onClick={this.showReply}>reply</button>
                    </div>
                    );
                    else
                    { return( <div className="threadComment">   
                    <div className="commentUser">u/{comment.username} </div>
                   <div className="spoiler">{comment.comment}</div>
                   <button className="replyComment" onClick={this.showReply}>reply</button>
                   </div>
                   );}
                     }
                        })
                  }
                  
                </ul>
                </div>
                

      

           
         
      );

   }


}

export default ThreadPage;