import React, { Component } from 'react';
import {BrowserRouter as Router, Route, withRouter} from 'react-router-dom'
import './PMs.css';
import Head from  './Head';
import Inbox from  './pages/inbox';
import Sent from  './pages/sent';
import Aux from '../../Components/HOC/Auxiliary';
import axios from 'axios';

class PMs extends Component {
   //assume all submitted for now
   constructor(props) {
        super(props);
        this.state = {
      
          To: '',
          Subject:'',
          Message :'',
        submitting : false,
        error: false,
        
        }
          this.handleChange = this.handleChange.bind(this); 
          this.handleSubmit = this.handleSubmit.bind(this);
    };



// updating state values with form inputs each time it changes.
   /**
     * Handles change in PM inputs.
     * @function handleChange
     * @param {event} e - The change of the PM inputs.
     */
    handleChange(event) {
      this.setState({ [event.target.name]: event.target.value });
    }

//submitting the request
    /**
     * Handles PM submit.
     * @function handleSubmit
     * @param {event} e - The submission of the PM form.
     */
    handleSubmit(event) { 
          event.preventDefault();
          const msg ={
            receiverUsername : this.state.To,
             subject : this.state.Subject,
             messageBody : this.state.Message,
             headers: {
              'Content-Type': 'application/json',
             }
          }
    
          //checking before posting request if a field isn't filled with any ''
         
          let checker ="";

          if (document.getElementById("1").value===checker)
          {
            alert ("Please provide a username");
            return ;
          }
          else if (document.getElementById("2").value===checker)
          
            {alert ("Please provide a Subject");
          return ;}
          
        else if  (document.getElementById("3").value===checker)
        {
          alert ("Please provide a Message");
          return ;
        }
        console.log(msg);
        axios.post( 'http://localhost:4000/me/pm/compose',msg, {
          headers: {
            'auth': this.props.token
          }
        })
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.setState({
          error : false,
          submitting : false,
        });
        
        //in case sucess..
        alert("your message was sucessfully delievered");
  
      })
      .catch(error => {
        console.log(error.response)
        this.setState({
          error:true,
          submitting:false
        });
        if(error && error.response && error.response.statusText){
          if (error.response.statusText==="Forbidden")
          {
            alert("You've exceeded the limit of the Subject Or the User You're trying to reach doesn't exist");
          }
          else if (error.response.statusText==="Not Found")
          {
            alert ("User not Found");
          }
          else
          {
            alert("internal server error");
          }
        }
        
        
    })  ;

      }
    
  
 render()
  {

    return (
      <Router>
        <Aux>

             <Head/>
             <Route path="/Inbox" /*component={inbox}*/ render={
               props=>{
                 return(
                   <Inbox token={this.props.token}/>
                 );
               }
             }/>
                    <Route path="/Sent" /*component={inbox}*/ render={
               props=>{
                 return(
                   <Sent token={this.props.token}/>
                 );
               }
             }/>
      
          <div className="container">
                 <div className="pm-form">
                
                      

                  <Route exact path="/PM/Compose" render = {props=>(
                    <React.Fragment>
                    
                      <form name="myForm"
                        onSubmit={this.handleSubmit}>
                        <div>
                          <label>To:</label>
                          <textarea 
                              className="To"
                              name="To"
                              id="1"
                              placeholder ="(username, or /r/name for that subreddit's moderators)"
                              value={this.state.value} 
                              onChange={this.handleChange} 
                           
                              /> 
                        </div>
                  
                          <div>
                            <label>Subject:</label>
                            <textarea 
                                className="Subject"
                                name="Subject"
                                id="2"
                                value={this.state.value} 
                                onChange={this.handleChange} 
                               
                            />
                          </div>
                    
                          <div>
                            <label>Your Message:</label>
                            <textarea 
                                className="Message"
                                name="Message"
                                id="3"
                                value={this.state.value} 
                                onChange={this.handleChange} 
                                 
                                />  
                          </div>
                          <input type="submit" value="Submit" />      
                          
                      </form>


                    </React.Fragment>
                  )} />
                  

                    
                </div>    
           </div>
    
          </Aux>
      </Router>
    
    );
    }
}

export default withRouter(PMs);
