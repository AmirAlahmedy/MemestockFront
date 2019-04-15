import React, { Component } from 'react';
import {BrowserRouter as Router, Route, withRouter} from 'react-router-dom'
import axios from 'axios';
import '../PMs.css';
import './inbox.css';

class Inbox extends React.Component {

              constructor(props) {
                super(props);
                this.state = {
              
                  Messages: [],
                isLoading: true,
                errors: null
                
                }
              
  this.handleClick = this.handleClick.bind(this); 
  this.BlockUser = this.BlockUser.bind(this);
            };
  
   
  componentDidMount() {
    console.log('eshta3alb2a');
    console.log(this.props);

    const jsondata ={'mine':true}
    axios.post( 'http://localhost:4000/me/pm/',jsondata, {
          headers: {
              'Content-Type': 'application/json',
              'auth': this.props.token
          },
          
      })
      .then(response =>{
        console.log(response);
        console.log(response.data);
        
        
        this.setState({
          Messages : response.data
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

handleClick(e){
  const element = e.target;
  const messageId=element.getAttribute("id");
  console.log(this.props.token);
  console.log(messageId);
  axios.delete( `http://localhost:4000/me/pm/delete?messageId=${messageId}`, 
  {
    headers: {
        'Content-Type': 'application/json',
        'auth': this.props.token

    },
    
})
.then(res => {
  console.log(res);
  console.log(res.data); 


  
  //in case sucess..
  

})
.catch(error => {
  console.log(error.response)


});
}

BlockUser(e){
  const element = e.target;
  const blockedUser=element.getAttribute("id");
  axios.post( 'http://localhost:4000/me/pm/block',{
    blocked: blockedUser,
    block: true
  }, {
    headers: {
        'Content-Type': 'application/json',
        'auth': this.props.token

    },
    
})
.then(res => {
  console.log(res);
  console.log(res.data);

  
  //in case sucess..
  

})
.catch(error => {
  console.log(error.response)


});
}

getMsgs()
{
  return this.state.Messages.map(msg=>(
    <div className="messageWrapper">
    <div className="MessageContainer">
    <h1 className="subjectTitle">{msg.subject}:</h1>
    <h1 className="senderUsername">from {msg.sender} sent {msg.messageDate}</h1>
    <p className="messageContent">{msg.messageBody}</p>
    <button id={msg._id} type="submit"  name="Delete" onClick={this.handleClick}>Delete  </button>   
    <button id={msg.sender} type="submit"  name="Block" onClick={this.BlockUser}>Block User</button>
    </div>
    </div>
  ))
  
}

  render() {
    let msg = this.state.Messages;
    
    return (
      <div>
  
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