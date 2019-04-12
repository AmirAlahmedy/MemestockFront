import React, { Component } from 'react';
import {BrowserRouter as Router, Route, withRouter} from 'react-router-dom'
import axios from 'axios';
import '../PMs.css';

class sent extends React.Component {
  state = {
    Messages: [],
    isLoading: true,
    errors: null
  };
  
   
  componentDidMount() {
    const jsondata ={'mine':false}
    axios.post( 'http://localhost:4000/mohamed/pm/',jsondata, {
          headers: {
              'Content-Type': 'application/json',
    
          },
          
      })
      .then(response =>{
        console.log(response);
        console.log(response.data);
        
        this.setState({
          Messages : response.data.messages,
          isLoading : false
        });
      })
      // Let's make sure to change the loading state to display the data
      .then(Messages => {
        this.setState({
          Messages,
          isLoading: false
        });
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
  

  render() {
    const { isLoading, Messages } = this.state;
    return (
      <React.Fragment>
        <h2>Random Message</h2>
        <div>
          {!isLoading ? (
            Messages.map(message => {
              const { sender, reciever, subject,messageBody } = message;
              return (
                <div MsgSender={sender}>
                  <h2>{reciever}</h2>
                  <p>{subject}</p>
                  <p>{messageBody}</p>
                  <hr />
                </div>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </React.Fragment>
    );
  }
}
export default withRouter(sent);