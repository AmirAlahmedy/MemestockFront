import React, { Component } from 'react';
import {BrowserRouter as Router, Route, withRouter} from 'react-router-dom'
import axios from '../../../axios-orders.js';
import '../PMs.css';
import './sent.css';

class Sent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
  
      Messages: [],
    isLoading: true,
    errors: null
    
    }
    this.handleClick = this.handleClick.bind(this);
    /*this.handleClick = this.handleClick.bind(this); */
  };
  
   
  componentDidMount() {
    const jsondata ={'mine':false}
    axios.post( 'me/pm/',jsondata, {
          headers: {
              'Content-Type': 'application/json',
            'auth': localStorage.getItem("token")
    
          },
          
      })
      .then(response =>{
        console.log(response);
        console.log(response.data);
        
        this.setState({
          Messages : response.data.messages,
          isLoading : false
        });
        console.log(this.state.Messages);
      })
     
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
// displaying the inbox messages.
   /**
     * Receiving the messages and displaying them in the inbox.
     * @function getMsgs
     */
getMsgs()
{
  if (this.state.Messages.length === 0)
  {
    return ;
  }
  return this.state.Messages.map(msg=>(
    <div className="messageWrapper">
    <div className="MessageContainer">
    <h1 className="subjectTitle">{msg.subject}:</h1>
    <h1 className="receiverUsername">sent To {msg.receiverUsername}</h1>
    <p className="messageContent">{msg.messageBody}</p>
    <button id={msg._id} type="submit"  name="Delete" onClick={this.handleClick}>Delete  </button>   
    </div>
    </div>
  ))
  
}
// If a user want to delete the messages he/she sent.
   /**
     * Deletes sent messages.
     * @function handleClick
     * @param {event} e - Clicking on Delete button.
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

  

  render() {
    return (
      <div>
        {this.getMsgs()}
      </div>
  
    );
  }
}
export default withRouter(Sent);
