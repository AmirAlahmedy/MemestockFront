import React, { Component } from 'react';
import {BrowserRouter as Router, Route, withRouter} from 'react-router-dom'
import axios from '../../../axios-orders.js';
import '../PMs.css';
import './inbox.css';

class Inbox extends React.Component {

              constructor(props) {
                super(props);
                this.state = {
              
                  Messages: [],
                  BlockList:[],
                isLoading: true,
                errors: null
                
                }
              
  this.handleClick = this.handleClick.bind(this); 
  this.BlockUser = this.BlockUser.bind(this);
  this.blockList=this.blockList.bind(this);
            };
  
   
  componentDidMount() {
    console.log(this.props);

    const jsondata ={'mine':true}
    axios.get( 'me/pm/',jsondata, {
          headers: {
              'Content-Type': 'application/json',
            'auth': localStorage.getItem("token")
          },
          
      })
      .then(response =>{
        console.log(response);
        console.log(response.data);
        
        
        this.setState({
          Messages : response.data.messages
          ,
          isLoading : false
        });
        console.log(this.state.Messages);
        
      })
      // Let's make sure to change the loading state to display the data
     /* .then(Messages => {
        this.setState({
          Messages,
          isLoading: false
        });
      })*/
      
      // We can still use the `.catch()` method since axios is promise-based
      .catch(error => {
        console.log(error.response)
        this.setState
        ({ 
          errors:true,
          isLoading: false 
        });
  });
}
// deletes a message when Clicked.
   /**
     * sends A Request to delete the message.
     * @function handleClick
     * @param {event} e - On clicking Delete Button.
     */

handleClick(e){
  const element = e.target;
  const messageId=element.getAttribute("id");
  console.log(messageId);
  axios.delete( `me/pm/delete?messageId=${messageId}`, 
  {
    headers: {
        'Content-Type': 'application/json',
            auth: localStorage.getItem("token")

    },
    
})
.then(res => {
  console.log(res);
  console.log(res.data); 
  alert("Message Successfully Deleted");


  
  //in case sucess..
  

})
.catch(error => {
  console.log(error.response)
  alert("Message Not Found");


});
}
// sending a request to block a user from sending messages to me.
   /**
     * Sends the request to Block user from sending messages.
     * @function BlockUser
     * @param {event} e - Pressing block button.
     */
BlockUser(e){
  const element = e.target;
  const blockedUser=element.getAttribute("id");
  axios.post( 'me/pm/block',{
    blocked: blockedUser,
    block: true
  }, {
    headers: {
        'Content-Type': 'application/json',
        'auth': localStorage.getItem("token")

    },
    
})
.then(res => {
  console.log(res);
  console.log(res.data);
  alert ("Block Succeeded");
  

  
  //in case sucess..
  

})
.catch(error => {
  console.log(error.response)
  if (error.response.data.error==="selfBlockAlertError")
  {
    alert ("Error you're trying to block yourself");
  }
   else if (error.response.data.error==="usersAlreadyOnBlockLists")
  {
    alert ("You've already blocked this user")
  }


});
}
blockList()
{
  axios.get  ( 'me/pm/blocklist', 
  {
    headers: {
        'Content-Type': 'application/json',
        auth: localStorage.getItem("token")

    },
    
})
.then(res => {
  console.log(res);
  console.log(res.data)
  this.setState({
    BlockList : res.data.blockList,
    isLoading : false
  });
 this.getBlockList();
})
.catch(error => {
  console.log(error.response)


});
}
// displaying the inbox messages.
   /**
     * Receiving the messages and displaying them in the inbox.
     * @function getMsgs
     */
getMsgs()
{
  if (this.state.Messages.length === 0 )
  {
    return ; 
  } 
  return this.state.Messages.map((msg)=>(
    <div className={`messageWrapper ${msg.isRead ? "read" : "unread"}`}>
      <div className="MessageContainer">
        <h1 className="subjectTitle">Subject: {msg.subject}</h1>
        <h1 className="senderUsername">From: {msg.sender}</h1>
        <br />
        <p className="messageContent">{msg.messageBody}</p>
        <button className="deleteMsg" id={msg._id} type="submit"  name="Delete" onClick={this.handleClick}>Delete  </button>   
        <button id={msg.sender} type="submit"  name="Block" onClick={this.BlockUser}>Block User</button>
        <button id={msg._id} type="submit"  name="markRead" onClick={this.MarkRead}>Mark Read  </button> 
        <button id={msg._id} type="submit"  name="markRead" onClick={this.MarkUnRead}>MarkUnRead  </button>   


      </div>
    </div>
  ));
  }
  getBlockList()
{
  if (this.state.BlockList===0)
  {
    return;
  }
  return this.state.BlockList.map((blocklist)=>(

<div className="blockeduser">
        <h1 className="blockedusername">{blocklist.blocked}</h1>
        <button id={blocklist.blocked}  type="submit"  name="unBlock" onClick={this.unBlockUser}>UnBlockUser  </button>  
        <br />
        </div>
        ));
      }
  
  MarkReadAll(e){
    const element = e.target;
    const messageId=element.getAttribute("id");
    const jsondata ={'isReadRequest':true}
    console.log(messageId);
    axios.post  ( 'me/pm/markreadall',jsondata, 
    {
      headers: {
          'Content-Type': 'application/json',
          'auth': localStorage.getItem("token")
  
      },
      
  })
  .then(res => {
    console.log(res);
    if(res.data !== "OK") return;
    let msgs = this.state.Messages.map(msg => {
      msg.isRead = true;
      return msg;
    });
    console.log(msgs);
    this.setState({
      Messages: msgs
    });
  
  
    
    //in case sucess..
    
    
  })
  .catch(error => {
    console.log(error)
    alert("Message Not Found");
  
  
  });
  }
  MarkUnReadAll(e){
    const element = e.target;
    const messageId=element.getAttribute("id");
    const jsondata ={'isReadRequest':false}
    console.log(messageId);
    axios.post  ( 'me/pm/markreadall',jsondata, 
    {
      headers: {
          'Content-Type': 'application/json',
          'auth': localStorage.getItem("token")
  
      },
      
  })
  .then(res => {
    console.log(res);
    console.log(res.data); 
    
    console.log(res);
    if(res.data !== "OK") return;
    let msgs = this.state.Messages.map(msg => {
      msg.isRead = false;
      return msg;
    });
    console.log(msgs);
    this.setState({
      Messages: msgs
    });
  
  
  
    
    //in case sucess..
    
  
  })
  .catch(error => {
    console.log(error.response)
    alert("Message Not Found");
  
  
  });
  }
  MarkRead(e){
    const element = e.target;
    const messageId=element.getAttribute("id");
    const jsondata ={'isReadRequest':true, "messageId": messageId}
    console.log(messageId);
    axios.put( `me/pm/markread?messageId=${messageId}`,jsondata, 
    {
      headers: {
          'Content-Type': 'application/json',
          'auth': localStorage.getItem("token")
  
      },
      
  })
  .then(res => {
    console.log(res);
    console.log(res.data); 
   
    alert("Message Successfully Read");
    
    const wrapper = element.parentElement.parentElement;
    wrapper.classList.remove("unread");
    wrapper.classList.add("read");
    console.log(wrapper);
   
     
  
  
    
    //in case sucess..
    
  
  })
  .catch(error => {
    console.log(error.response)
    alert("Message Not Found");
  
  
  });
  }
  MarkUnRead(e){
    const element = e.target;
    const messageId=element.getAttribute("id");
    const jsondata ={'isReadRequest':false, "messageId": messageId}
    console.log(messageId);
    axios.put( `me/pm/markread?messageId=${messageId}`,jsondata, 
    {
      headers: {
          'Content-Type': 'application/json',
          'auth': localStorage.getItem("token")
  
      },
      
  })
  .then(res => {
    console.log(res);
    console.log(res.data); 
    alert("Message Successfully UnRead");
    const wrapper = element.parentElement.parentElement;
    wrapper.classList.remove("read");
    wrapper.classList.add("unread");

  
  
    
    //in case sucess..
    
  
  })
  .catch(error => {
    console.log(error.response)
    alert("Message Not Found");
  
  
  });
  }
  
  // sending a request to block a user from sending messages to me.
     /**
       * Sends the request to Block user from sending messages.
       * @function BlockUser
       * @param {event} e - Pressing block button.
       */
  BlockUser(e){
    const element = e.target;
    const blockedUser=element.getAttribute("id");
    axios.post( 'me/pm/block',{
      blocked: blockedUser,
      block: true
    }, {
      headers: {
          'Content-Type': 'application/json',
          'auth': localStorage.getItem("token")
  
      },
      
  })
  .then(res => {
    console.log(res);
    console.log(res.data);
    alert ("Block Succeeded");
    
  
    
    //in case sucess..
    
  
  })
  .catch(error => {
    console.log(error.response)
    if (error.response.data.error==="selfBlockAlertError")
    {
      alert ("Error you're trying to block yourself");
      return;
    }
     else if (error.response.data.error==="usersAlreadyOnBlockLists")
    {
      alert ("You've already blocked this user")
      return;
    }
  
  
  });
  }

  unBlockUser(e){
    const element = e.target;
    const blockedUser=element.getAttribute("id");
    axios.post( 'me/pm/block',{
      blocked: blockedUser,
      block: false
    }, {
      headers: {
          'Content-Type': 'application/json',
          'auth': localStorage.getItem("token")
  
      },
      
  })
  .then(res => {
    console.log(res);
    console.log(res.data);
    alert ("unBlock Succeeded");
    
  
    
    //in case sucess..
    
  
  })
  .catch(error => {
    console.log(error.response)
    if (error.response.data.error==="canNotBUnblockNonBlockedUser")
    {
      alert ("unblocking not blocked user");
      return;
    }
  
  
  });
  }

  render() {
    let msg = this.state.Messages;
    
    return (
      <div>
        <div className="markRead">
        <button id={msg._id} type="submit"  name="markRead" onClick={this.MarkReadAll.bind(this)}>Mark AllRead  </button> 
        <button id={msg._id} type="submit"  name="markunRead" onClick={this.MarkUnReadAll.bind(this)}>Mark All Unread  </button> 
        <button id={msg._id} type="submit"  name="blockList" onClick={this.blockList.bind(this)}>BlockList </button>  

        </div>
  
{this.getMsgs()}
  </div>
     /* <div>
     {msg.map(content=><div className="subjectTitle">{content.subject}:</div>)}
     {msg.map(content=><div className="messageContent">{content.messageBody}</div>)}
      </div>
     */
  

    );
  }
}
export default withRouter(Inbox);
