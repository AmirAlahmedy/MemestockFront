import React, { Component } from 'react';
import {BrowserRouter as Router, Route, withRouter} from 'react-router-dom'
import axios from '../../axios-orders';


class ModerationQueue extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
      
          Reports: [],
        isLoading: true,
        errors: null
        
        }
      

    };
      
  componentDidMount() {
    console.log(this.props);

    axios.get( 'Moderator/Reports/', {
          headers: {
              'Content-Type': 'application/json',
            auth: localStorage.getItem("token")
          },
          
      })
      .then(response =>{
        console.log(response);
        console.log(response.data);
        
        
        this.setState({
          Reports : response.data
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
        if (error.response.data ="You are not a moderator to any subreddit")
        {
        alert ("you are not a moderator to any subreddit");
        }
        else if(error.response.data = "No reports")
        {
            alert ("there are no reports");
            return ;
        }
  });
}
    render (){
        return (
<div>
    <p1>HELLO</p1>
</div>
        );
    }
    }

    export default ModerationQueue;