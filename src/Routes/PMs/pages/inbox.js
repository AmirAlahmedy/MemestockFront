import React, { Component } from 'react';
import {BrowserRouter as Router, Route, withRouter} from 'react-router-dom'
import axios from 'axios';
import '../PMs.css';

class inbox extends React.Component {

              constructor(props) {
                super(props);
                this.state = {
              
                  Messages: [],
                isLoading: true,
                errors: null
                
                }
  
            };
  
   
  componentDidMount() {
    console.log('eshta3alb2a');
    const jsondata ={'mine':true}
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
      <aux>
      <React.Fragment>
        <div>
        <textarea 
                                className="love"
                                name="Subject"
                                id="2"
                               
                            />
                            </div>
      </React.Fragment>
      </aux>
    );
  }
}
export default withRouter(inbox);