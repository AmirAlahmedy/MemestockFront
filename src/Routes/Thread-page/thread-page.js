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
      ],
      editThread:true
   }
  

    showReply=()=>{


    };
   

   saveComment(e)  {
      e.preventDefault();
      const username=localStorage.getItem("username");
      //const newComment=this.newComment.value;
    
      this.setState({comments:this.state.comments.concat(username,this.newComment.value)});
      

   };
   editPost = (e) => {
      e.preventDefault();
      this.setState({
         editThread:true
      })
   };
   cancelEdit = (e) =>{
      e.preventDefault();
      this.setState({
         editThread:false
      })
   };
   handleEdit = (e) =>{ 
      e.preventDefault();
      console.log('Edit Clicked');
      var headers = {
        'auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJtZW1lc3RvY2siLCJzdWIiOiJLYXJpbSIsImlhdCI6MTU1NTI4NTc5M30.nKpRwi_EfA6ZBmGoE56MlRJ-N7DpdxmEyjua0h8UyKgeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJtZW1lc3RvY2siLCJzdWIiOiJHaWFudFN0ZXBzIiwiaWF0IjoxNTU1Mjg2NzQ2fQ.tQ49_qurWtdLeGzkoteHowHaKeFLnvrbnybDofimTk8'
      }
      let SubredditName = this.state.name;
      axios.put( 'http://localhost:4000/sr/'+SubredditName+'/thread/5cb3ce38fedd3f08b8535dc0', {headers: headers})
      .then(res => {
        if (res.status==200)
        {
          console.log(res);
          this.setState({
            subscribe:true
          }
          );
        }else if (res.status===404){
          alert("Not Found");
          return Response.json;
        }
      })
      .catch(error => {
        alert("Error Caught");
      })
   }


   render() {
    
      return (
        /*  <div class="threadPageContainer">
 
             <div className="PageThread">
                <Thread />
             </div>
          </div>*/
      <div>
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
            <div className="threadPageSidebarContainer">
            
               <div className="threadPageSidebarComponent1">
                  <button className="threadPageSidebarEditButton1" onClick={this.editPost}>EDIT POST</button>
                  <button className="threadPageSidebarDeleteButton" onClick={this.delPost}>DELETE POST</button>  
               </div>
               { 
                  this.state.editThread ?
                  <div className="threadPageSidebarComponent3">
                  <h5>EDIT A POST</h5>
                  <hr></hr>
                  <form onSubmit={this.handleEdit}>
                     <div className="formGroupthreadComponent1">
                     <label for="newThreadTitle">Enter new Title</label>
                     <textarea type="textarea" name="text" id="newThreadTitleField" placeholder = "Enter Title Here" />   
                     </div>
                     <div className="formGroupSrComponent2">
                     <label for="newThreadBody">Enter new Thread Body</label>
                     <textarea type="textarea" name="text" id="newThreadBodyField" placeholder = "Enter Body Here" />  
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