import React, { Component } from 'react';
import {BrowserRouter as Router, Route, withRouter} from 'react-router-dom'
import axios from 'axios';
import '../PMs.css';

class Sent extends React.Component {
  state = {
    Messages: [],
    isLoading: true,
    errors: null
  };
  
   
  componentDidMount() {
    const jsondata ={'mine':false}
    axios.post( 'http://localhost:4000/me/pm/',jsondata, {
          headers: {
              'Content-Type': 'application/json',
              'auth':this.props.token
    
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
    return (
      <React.Fragment>
        <h2>Random Message</h2>
      </React.Fragment>
    );
  }
}
export default withRouter(Sent);