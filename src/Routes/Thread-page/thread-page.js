import React, { Component } from 'react';
import Thread from '../Thread/Thread';
import AddComment from '../AddComment/AddComment';
import './thread-page.css';
import { Link, Route, Switch } from 'react-router-dom';
import axios from 'axios';

class ThreadPage extends Component {
   state = {

      comments: [
         {  
            id:'1',
            username: 'WreakingHavoc',
            comment: 'I rememeber when I had something to say!',
            Locked: false,
            Spoiler:false,
            reply:false
         },
         {
            id:'2',
            username: 'CluelessBastard',
            comment: 'Oh this is so relatable',
            Locked: false,
            Spoiler:false,
            reply:false

         },
         {
            id:'3',
            username:'Armi',
            comment:'Awesome',
            Locked: false,
            Spoiler:true,
            reply:false
         }
      ],
      subredditName:'OneTwoThree',
      id:'5cb477c49604eb218cbaf981',
      editThread:true,

      editComment:false,
      replyComment:false
    
    
   }
  

    
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
     
         let checker ="";
         
         if (document.getElementById("newThreadTitleField").value===checker)
         {
           alert ("Please provide a new title");
           return ;
         }
         else if (document.getElementById("newThreadBodyField").value===checker)
         { alert ("Please provide a new bodyfor the thread");
           return ;
         }
      let headers = {
        auth: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJtZW1lc3RvY2siLCJzdWIiOiJLYXJpbSIsImlhdCI6MTU1NTI4NTc5M30.nKpRwi_EfA6ZBmGoE56MlRJ-N7DpdxmEyjua0h8UyKg'
      }
      var threadData ={
         title : document.getElementById("newThreadTitleField").value,
         threadBody : document.getElementById("newThreadBodyField").value
         } 
      let SubredditName = this.state.subredditName;
      let threadID = this.state.id;
      axios.put( 'http://localhost:4000/sr/'+SubredditName+'/thread/'+threadID,threadData, {"headers": headers})
      .then(res => {
        if (res.status==200)
        {
          console.log(res)
          alert('Post Edited Successfully');
        }
        else if (res.status===404){
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
         auth: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJtZW1lc3RvY2siLCJzdWIiOiJLYXJpbSIsImlhdCI6MTU1NTI4NTc5M30.nKpRwi_EfA6ZBmGoE56MlRJ-N7DpdxmEyjua0h8UyKg'
       }
      let SubredditName = this.state.subredditName;
      let threadID = this.state.id;
      axios.delete( 'http://localhost:4000/sr/'+SubredditName+'/thread/'+threadID,{"headers": headers})
      .then(res => {
        if (res.status==200)
        {
          console.log(res);
          alert('Thread Deeted Successfully!')
        }else if (res.status===404){
          alert("Not Found");
          return Response.json;
        }
      })
      .catch(error => {
        alert("Error Caught");
      })
   }



   addComment=(comment)=>{
      const newComment ={
      username: localStorage.getItem("username"),
   comment,
   Locked: document.getElementById("checkLocked").checked,
   Spoiler:document.getElementById("checkSpoiler").checked,
   reply:false
}
      this.setState({comments:[...this.state.comments, newComment]});

      
   }
  
   deleteComment=()=>{


   }


   replyComment=()=>{


   }

   editComment = (e) => {
      e.preventDefault();
      this.setState({
         editComment:true
      })
   }

   goEdit = (e) =>{ 
      e.preventDefault();
      console.log('Edit Clicked');
      var commentData ={
         newCommentBody : document.getElementById("textComment").value,
         newLock:document.getElementById("checkLocked2").checked,
         newSpoiler:document.getElementById("checkSpoiler2").checked
         } 
         let checker ="";
         
         if (document.getElementById("textComment").value===checker)
         {
           alert ("Please provide a new Comment");
           return ;
         }
         var headers = {
            auth: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJtZW1lc3RvY2siLCJzdWIiOiJLYXJpbSIsImlhdCI6MTU1NTI4NTc5M30.nKpRwi_EfA6ZBmGoE56MlRJ-N7DpdxmEyjua0h8UyKg'
          }
          let c_id = '3';

          axios.put( 'http://localhost:4000/'+c_id,commentData.newCommentBody,commentData.newSpoiler,"false",commentData.newLock, {headers: headers})
          .then(res => {
            if (res.status==200)
            {
              console.log(res)
            }else if (res.status===404){
              alert("Not Found");
              return Response.json;
            }
          })
          .catch(error => {
            alert("Error Caught");
          })
      }

   cancelEditComment = (e) =>{
      e.preventDefault();
      this.setState({
         editComment:false
      })
   }

getID= () =>{
  const ID=document.getElementById("commentContainer").cID;
  console.log(ID);

}





   render() {
    
      return (
        
      <div>
         <div class="threadPageContainer">
            <div className="PageThread">
               <Thread />
            </div>
      
              
           
              <AddComment   addComment={this.addComment}/>
              <input type="checkbox" id="checkLocked" />
     <button className="lockComment">Lock</button>
     <input type="checkbox" id="checkSpoiler"  />
     <button className="spoilerComment" >Mark as spoiler</button>
           
            <ul>
                  {
                    this.state.comments.map(comment => {if(localStorage.getItem("username")===comment.username)
                    {
                    if(comment.Spoiler==false)
                    {
                    if(comment.Locked==false)
                      return ( 
                        <div className="threadComment" cID={comment.id} id="commentContainer" >   
                <div className="commentUser">u/{comment.username} </div>
               <div className="comment">{comment.comment}</div>
               <button className="editComment" onClick={this.editComment}>Edit</button>
               <button className="deleteComment" onClick={this.deleteComment}>Delete</button>
               <button className="replyComment" onClick={this.handleReply} >reply</button>
                     </div>
                     );
                     else
                     return( <div className="threadComment" cID={comment.id} id="commentContainer">   
                     <div className="commentUser">u/{comment.username} </div>
                    <div className="comment">{comment.comment}</div>
                    <button className="editComment" onClick={this.editComment}>Edit</button>
                    <button className="deleteComment" onClick={this.deleteComment}>Delete</button>
                    </div>);
                      }
                  else 
                  {if(comment.Locked==false)
                  return ( 
                     <div className="threadComment" cID={comment.id} id="commentContainer">   
             <div className="commentUser">u/{comment.username} </div>
            <div className="spoiler">{comment.comment}</div>
            <button className="editComment" onClick={this.editComment}>Edit</button>
            <button className="deleteComment" onClick={this.deleteComment}>Delete</button>
            <button className="replyComment" onClick={this.handleReply}>reply</button>
                  </div>
                  );
                  else
                  return ( 
                     <div className="threadComment" cID={comment.id} id="commentContainer">   
             <div className="commentUser">u/{comment.username} </div>
            <div className="spoiler">{comment.comment}</div>
            <button className="editComment" onClick={this.editComment}>Edit</button>
            <button className="deleteComment" onClick={this.deleteComment}>Delete</button>
                  </div>
                  );
                  }
                  }
                     else 
                     {
                     if(comment.Spoiler==false)
                     {
                        if(comment.Locked==false)
                     return( <div className="threadComment" cID={comment.id} id="commentContainer">   
                     <div className="commentUser">u/{comment.username} </div>
                    <div className="comment">{comment.comment}</div>
                    <button className="replyComment" onClick={this.handleReply}>reply</button>
                    </div>
                    );
                    else 
                    return ( 
                     <div className="threadComment" cID={comment.id} id="commentContainer">   
             <div className="commentUser">u/{comment.username} </div>
            <div className="spoiler">{comment.comment}</div>
            <button className="editComment">Edit</button>
            <button className="deleteComment" onClick={this.deleteComment}>Delete</button>
                  </div>
                    );
                     }
                    else
                    { 
                       if(comment.Locked==false)
                       return( <div className="threadComment" cID={comment.id} id="commentContainer">   
                    <div className="commentUser">u/{comment.username} </div>
                   <div className="spoiler">{comment.comment}</div>
                   <button className="replyComment" onClick={this.handleReply}>reply</button>
                   </div>
                   );
                  else
                  return ( 
                     <div className="threadComment" cID={comment.id} id="commentContainer">   
             <div className="commentUser">u/{comment.username} </div>
            <div className="spoiler">{comment.comment}</div>
            <button className="editComment">Edit</button>
            <button className="deleteComment" onClick={this.deleteComment}>Delete</button>
                  </div>
                  );}
                     }
                        }
                        
                        )
                       
                  }
                  
                </ul>
                { 
                  this.state.editComment ?
                  <div className="threadComment2">
                  
                  <form  onSubmit={this.onSave}>
                   <input   className="textComment" id="textComment" type="text"
                 name="comment" placeholder="Edit your comment here..."
                 value={this.state.comment} onChange={this.onChange}
                    />
                      <input type="submit" value="Edit" className="goEdit" onClick={this.goEdit}/>
                      <input type="submit" value="Cancel" className="goCancel" onClick={this.cancelEditComment}/>
    
                      </form>
                  <input type="checkbox" id="checkLocked2" />
                  <button className="lockComment">Lock</button>
                  <input type="checkbox" id="checkSpoiler2"  />
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